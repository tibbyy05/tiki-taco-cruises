import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingCalendarProps {
  destinationName?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ destinationName }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('');
  const [preferredDestination, setPreferredDestination] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [addOns, setAddOns] = useState<string[]>([]);
  
  // Customer info states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destinations = [
    { value: '', label: 'Select a destination (optional)' },
    { value: 'las-olas', label: 'Las Olas & Intracoastal Cruise' },
    { value: 'sandbar', label: 'Fort Lauderdale Sandbar' },
    { value: 'intracoastal', label: 'Intracoastal Waterway Tour' },
    { value: 'beach-coast', label: 'Fort Lauderdale Beach & Coast' },
    { value: 'full-waterway', label: 'Full Waterway Tour Cruise' },
    { value: 'custom', label: 'Custom Route' }
  ];

  const timeSlots = [
    { value: '10:00', label: '10:00 AM - Morning Cruise' },
    { value: '13:00', label: '1:00 PM - Afternoon Cruise' },
    { value: '16:00', label: '4:00 PM - Evening Cruise' },
    { value: '19:00', label: '7:00 PM - Sunset Cruise' }
  ];

  const durations = [
    { value: '2', label: '2 Hours', price: 1000 },
    { value: '3', label: '3 Hours', price: 1200 },
    { value: '4', label: '4 Hours', price: 1500 }
  ];

  const availableAddOns = [
    { id: 'water-mat', name: 'Premium Floating Water Mat', price: 39.99 },
    { id: 'pool-floats', name: 'Inflatable Pool Floats (3-pack)', price: 24.99 },
    { id: 'pool-noodles', name: 'Foam Pool Noodles (5-pack)', price: 24.99 },
    { id: 'speaker', name: 'Waterproof Bluetooth Speaker Upgrade', price: 49.99 },
    { id: 'decorations', name: 'Party Decorations Package', price: 49.99 }
  ];

  const calculateTotal = () => {
    let total = 0;

    // Base price from duration
    const selectedDuration = durations.find(d => d.value === duration);
    if (selectedDuration) {
      total = selectedDuration.price;
    }

    // Extra guest surcharge (15-18 guests = $50 per guest over 14)
    if (guestCount > 14) {
      const extraGuests = guestCount - 14;
      total += extraGuests * 50;
    }

    // Add-ons
    addOns.forEach(addOnId => {
      const addOn = availableAddOns.find(a => a.id === addOnId);
      if (addOn) {
        total += addOn.price;
      }
    });

    return total;
  };

  const handleAddOnToggle = (addOnId: string) => {
    setAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get time label
    const selectedTimeSlot = timeSlots.find(t => t.value === selectedTime);
    const timeLabel = selectedTimeSlot ? selectedTimeSlot.label : selectedTime;
    
    // Get destination label
    const selectedDest = destinations.find(d => d.value === preferredDestination);
    const destinationLabel = selectedDest ? selectedDest.label : destinationName || 'Custom Cruise';
    
    // Format date
    const dateFormatted = selectedDate ? selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : '';
    
    // Get selected add-ons with details
    const selectedAddOns = addOns.map(addOnId => {
      const addOn = availableAddOns.find(a => a.id === addOnId);
      return addOn ? { name: addOn.name, price: addOn.price } : null;
    }).filter(Boolean);
    
    // Build booking data
    const bookingData = {
      destination: destinationLabel,
      dateFormatted: dateFormatted,
      timeLabel: timeLabel,
      duration: duration,
      guests: guestCount,
      addOns: selectedAddOns,
      total: calculateTotal()
    };

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          bookingData,
          ownerEmail: 'Tikitacocruises@gmail.com' // ← CHANGE THIS TO YOUR EMAIL
        })
      });

      if (response.ok) {
        alert(`Booking request submitted successfully!\nTotal: $${calculateTotal().toLocaleString()}\n\nWe'll confirm availability within 1 hour via email.`);
        
        // Reset form
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setSelectedDate(null);
        setSelectedTime('');
        setDuration('');
        setPreferredDestination('');
        setGuestCount(2);
        setAddOns([]);
      } else {
        alert('Failed to submit booking request. Please call us directly.');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Failed to submit booking request. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-12 sm:py-16 md:py-20 px-4 bg-sand scroll-mt-20">
      <div className="booking-calendar">
        <h2>Book Your Experience</h2>
        <form onSubmit={handleSubmit} className="booking-form">
        
        {/* Customer Information */}
        <div className="form-group">
          <label htmlFor="customer-name">Your Name *</label>
          <input
            id="customer-name"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="date-input"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customer-email">Email Address *</label>
          <input
            id="customer-email"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="date-input"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customer-phone">Phone Number *</label>
          <input
            id="customer-phone"
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="date-input"
            placeholder="(954) 555-1234"
            required
          />
        </div>

        {/* Date Selection */}
        <div className="form-group">
          <label htmlFor="date-picker">Select Date *</label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            placeholderText="Choose your date"
            className="date-input"
            required
          />
        </div>

        {/* Preferred Destination Selection */}
        <div className="form-group">
          <label htmlFor="destination-select">Preferred Destination</label>
          <select
            id="destination-select"
            value={preferredDestination}
            onChange={(e) => setPreferredDestination(e.target.value)}
            className="destination-select"
          >
            {destinations.map(dest => (
              <option key={dest.value} value={dest.value}>
                {dest.label}
              </option>
            ))}
          </select>
          <p className="form-note">*More than 1 destination can be visited</p>
        </div>

        {/* Time Slot Selection */}
        <div className="form-group">
          <label htmlFor="time-select">Select Time Slot *</label>
          <select
            id="time-select"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="time-select"
            required
          >
            <option value="">Choose a time</option>
            {timeSlots.map(slot => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Selection */}
        <div className="form-group">
          <label htmlFor="duration-select">Select Duration *</label>
          <div className="duration-options">
            {durations.map(dur => (
              <button
                key={dur.value}
                type="button"
                className={`duration-btn ${duration === dur.value ? 'active' : ''}`}
                onClick={() => setDuration(dur.value)}
              >
                <span className="duration-label">{dur.label}</span>
                <span className="duration-price">${dur.price.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Guest Count Selection */}
        <div className="form-group">
          <label htmlFor="guest-count">Number of Guests *</label>
          <div className="guest-selector">
            <button
              type="button"
              className="guest-btn"
              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
              disabled={guestCount <= 1}
            >
              -
            </button>
            <span className="guest-count">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
            <button
              type="button"
              className="guest-btn"
              onClick={() => setGuestCount(Math.min(18, guestCount + 1))}
              disabled={guestCount >= 18}
            >
              +
            </button>
          </div>
          {guestCount > 14 && (
            <p className="surcharge-notice">
              Extra guest surcharge: ${(guestCount - 14) * 50} ({guestCount - 14} guest{guestCount > 15 ? 's' : ''} × $50)
            </p>
          )}
          <p className="capacity-note">Maximum capacity: 18 guests</p>
        </div>

        {/* Optional Add-ons */}
        <div className="form-group">
          <label>Optional Add-ons</label>
          <div className="add-ons-list">
            {availableAddOns.map(addOn => (
              <label key={addOn.id} className="add-on-item">
                <input
                  type="checkbox"
                  checked={addOns.includes(addOn.id)}
                  onChange={() => handleAddOnToggle(addOn.id)}
                />
                <span className="add-on-name">{addOn.name}</span>
                <span className="add-on-price">${addOn.price}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Booking Summary */}
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          <div className="summary-row">
            <span>Base Rate ({duration} hours)</span>
            <span>${durations.find(d => d.value === duration)?.price.toLocaleString() || '0'}</span>
          </div>
          {guestCount > 14 && (
            <div className="summary-row">
              <span>Extra Guests ({guestCount - 14})</span>
              <span>${(guestCount - 14) * 50}</span>
            </div>
          )}
          {addOns.length > 0 && (
            <>
              {addOns.map(addOnId => {
                const addOn = availableAddOns.find(a => a.id === addOnId);
                return addOn ? (
                  <div key={addOnId} className="summary-row">
                    <span>{addOn.name}</span>
                    <span>${addOn.price}</span>
                  </div>
                ) : null;
              })}
            </>
          )}
          <div className="summary-total">
            <span>Total</span>
            <span>${calculateTotal().toLocaleString()}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={!selectedDate || !selectedTime || !duration || !customerName || !customerEmail || !customerPhone || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Request Booking'}
        </button>

        <p className="booking-note">
          By submitting, you'll receive an instant quote. Our team will confirm availability within 1 hour.
        </p>
      </form>
      </div>

      <style>{`
        .booking-calendar {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #1E3A5F;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          font-weight: 600;
          color: #4A5568;
          margin-bottom: 0.5rem;
        }

        .date-input,
        .time-select,
        .destination-select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .date-input:focus,
        .time-select:focus,
        .destination-select:focus {
          outline: none;
          border-color: #FF6B6B;
        }
        
        .form-note {
          font-size: 0.875rem;
          color: #718096;
          margin-top: 0.5rem;
          font-style: italic;
        }

        .duration-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .duration-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
        }

        .duration-btn:hover {
          border-color: #FF6B6B;
          transform: translateY(-2px);
        }

        .duration-btn.active {
          border-color: #FF6B6B;
          background: #fff5f5;
        }

        .duration-label {
          font-weight: 600;
          color: #4A5568;
          margin-bottom: 0.5rem;
        }

        .duration-price {
          color: #FF6B6B;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .guest-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 8px;
        }

        .guest-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #FF6B6B;
          background: white;
          color: #FF6B6B;
          font-size: 1.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .guest-btn:hover:not(:disabled) {
          background: #FF6B6B;
          color: white;
        }

        .guest-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .guest-count {
          font-size: 1.25rem;
          font-weight: 600;
          color: #4A5568;
          min-width: 100px;
          text-align: center;
        }

        .surcharge-notice {
          margin-top: 0.5rem;
          padding: 0.75rem;
          background: #fff5f5;
          border-left: 4px solid #FF6B6B;
          color: #c53030;
          font-weight: 500;
        }

        .capacity-note {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #718096;
        }

        .add-ons-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .add-on-item {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-on-item:hover {
          border-color: #FF6B6B;
          background: #fff5f5;
        }

        .add-on-item input[type="checkbox"] {
          width: 20px;
          height: 20px;
          margin-right: 1rem;
          cursor: pointer;
        }

        .add-on-name {
          flex: 1;
          color: #4A5568;
        }

        .add-on-price {
          font-weight: 600;
          color: #FF6B6B;
        }

        .booking-summary {
          margin-top: 2rem;
          padding: 1.5rem;
          background: #f7fafc;
          border-radius: 8px;
        }

        .booking-summary h3 {
          margin-bottom: 1rem;
          color: #1E3A5F;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;
          margin-top: 1rem;
          border-top: 2px solid #4A5568;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1E3A5F;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          margin-top: 1.5rem;
          background: #FF6B6B;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .submit-btn:hover:not(:disabled) {
          background: #e05555;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .booking-note {
          text-align: center;
          font-size: 0.875rem;
          color: #718096;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .duration-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default BookingCalendar;