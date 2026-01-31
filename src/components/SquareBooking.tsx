import React from 'react';

const SquareBooking: React.FC = () => {
  const bookingUrl = 'https://app.squareup.com/appointments/buyer/widget/k9vo9skj1icgai/LFTKXYCHENZC7';

  return (
    <section className="square-booking-section" id="booking">
      <div className="booking-container">
        <h2>Book Your Adventure</h2>
        <p>Select your preferred date and time to reserve your cruise</p>
        <iframe
          title="Square Appointments Booking"
          src={bookingUrl}
          className="square-booking-iframe"
          loading="lazy"
        />
      </div>
      <style>{`
        .square-booking-section {
          padding: 60px 20px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          text-align: center;
        }

        .booking-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .square-booking-section h2 {
          font-size: 2.5rem;
          color: #1a365d;
          margin-bottom: 16px;
        }

        .square-booking-section p {
          font-size: 1.1rem;
          color: #4a5568;
          margin-bottom: 32px;
        }

        .square-booking-iframe {
          width: 100%;
          height: 900px;
          border: 0;
          border-radius: 12px;
          background: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </section>
  );
};

export default SquareBooking;
