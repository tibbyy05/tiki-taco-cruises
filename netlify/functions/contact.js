const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { customerName, customerEmail, customerPhone, bookingData, ownerEmail } = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Format add-ons list
    const addOnsList = bookingData.addOns.length > 0 
      ? bookingData.addOns.map(addOn => `<li>${addOn.name} - $${addOn.price}</li>`).join('')
      : '<li>No add-ons selected</li>';

    const msg = {
      to: ownerEmail,
      from: {
        email: 'noreply@ai-genda.com',
        name: 'Pontoon Booking Request'
      },
      subject: `New Pontoon Booking Request - ${customerName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 0; font-family: 'Arial', 'Helvetica', sans-serif; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0066cc 0%, #003d7a 100%); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 18px; font-weight: 700; color: #0066cc; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #00bcd4; padding-bottom: 8px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: 700; color: #2d3748; margin-bottom: 5px; font-size: 13px; text-transform: uppercase; }
            .field-value { color: #333333; font-size: 16px; padding: 12px; background: #f8f9fa; border-left: 4px solid #00bcd4; border-radius: 4px; }
            .field-value a { color: #0066cc; text-decoration: none; font-weight: 600; }
            .add-ons-list { list-style: none; padding: 0; margin: 10px 0 0 0; }
            .add-ons-list li { padding: 8px 12px; background: #f0f9ff; border-left: 3px solid #00bcd4; margin-bottom: 5px; border-radius: 4px; }
            .total-box { background: linear-gradient(135deg, #0066cc 0%, #003d7a 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px; }
            .total-label { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9; margin-bottom: 5px; }
            .total-amount { font-size: 32px; font-weight: 700; }
            .divider { height: 2px; background: linear-gradient(90deg, transparent, #00bcd4, transparent); margin: 30px 0; }
            .footer { background: #003d7a; padding: 30px 20px; text-align: center; }
            .footer-brand { color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: 400; }
            .footer-link { color: #00bcd4; text-decoration: none; font-size: 20px; font-weight: 700; }
            .footer-link:hover { color: #ffffff; }
            .footer-tagline { color: #a8d5e5; margin: 10px 0 0 0; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⛵ New Pontoon Booking Request</h1>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">Customer Information</div>
                <div class="field">
                  <div class="field-label">Name</div>
                  <div class="field-value">${customerName}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email Address</div>
                  <div class="field-value"><a href="mailto:${customerEmail}">${customerEmail}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Phone</div>
                  <div class="field-value"><a href="tel:${customerPhone}">${customerPhone}</a></div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Booking Details</div>
                <div class="field">
                  <div class="field-label">Date</div>
                  <div class="field-value">${bookingData.dateFormatted}</div>
                </div>
                <div class="field">
                  <div class="field-label">Time Slot</div>
                  <div class="field-value">${bookingData.timeLabel}</div>
                </div>
                <div class="field">
                  <div class="field-label">Duration</div>
                  <div class="field-value">${bookingData.duration} Hours</div>
                </div>
                <div class="field">
                  <div class="field-label">Destination</div>
                  <div class="field-value">${bookingData.destination}</div>
                </div>
                <div class="field">
                  <div class="field-label">Number of Guests</div>
                  <div class="field-value">${bookingData.guests} Guest${bookingData.guests > 1 ? 's' : ''}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Add-ons</div>
                <ul class="add-ons-list">
                  ${addOnsList}
                </ul>
              </div>

              <div class="total-box">
                <div class="total-label">Total Amount</div>
                <div class="total-amount">$${bookingData.total.toLocaleString()}</div>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="footer">
              <p class="footer-brand">Powered by <a href="https://ai-genda.com" class="footer-link" target="_blank">Ai-genda</a></p>
              <p class="footer-tagline">Professional web design & development services</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await sgMail.send(msg);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };
    
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message })
    };
  }
};