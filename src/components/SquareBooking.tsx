import React, { useEffect, useState } from 'react';

const SquareBooking: React.FC = () => {
  const bookingUrl = 'https://app.squareup.com/appointments/buyer/widget/k9vo9skj1icgai/LFTKXYCHENZC7';
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const triggerHighlight = () => {
      if (window.location.hash === '#booking') {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 1800);
        setIsOpen(true);
      }
    };

    triggerHighlight();
    window.addEventListener('hashchange', triggerHighlight);
    return () => window.removeEventListener('hashchange', triggerHighlight);
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };

    (window as { openBookingModal?: () => void }).openBookingModal = handleOpen;
    const shouldOpen = sessionStorage.getItem('open-booking-modal');
    if (shouldOpen) {
      sessionStorage.removeItem('open-booking-modal');
      setIsOpen(true);
    }

    return () => {
      delete (window as { openBookingModal?: () => void }).openBookingModal;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <section className={`square-booking-section ${isHighlighted ? 'booking-highlight' : ''}`} id="booking">
      <div className="booking-container">
        <div className="booking-badges">
          <div className="badge-item">Licensed &amp; Insured</div>
          <div className="badge-item">USCG Certified</div>
          <div className="badge-item">5-Star Rated</div>
        </div>
        <h2>Book Your Adventure</h2>
        <p>Select your preferred date and time to reserve your cruise</p>
        <button className="booking-open-btn" onClick={openModal}>
          Open Booking Calendar
        </button>
        <p className="booking-note">Secure booking powered by Square</p>
      </div>
      {isOpen && (
        <div className="booking-modal" role="dialog" aria-modal="true">
          <div className="booking-modal-backdrop" onClick={closeModal} />
          <div className="booking-modal-content">
            <button className="booking-modal-close" onClick={closeModal} aria-label="Close booking modal">
              ×
            </button>
            <iframe
              title="Square Appointments Booking"
              src={bookingUrl}
              className="square-booking-iframe"
              loading="lazy"
            />
          </div>
        </div>
      )}
      <style>{`
        .square-booking-section {
          padding: 60px 20px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          text-align: center;
          transition: box-shadow 0.4s, transform 0.4s;
        }

        .square-booking-section.booking-highlight {
          box-shadow: 0 0 0 6px rgba(255, 107, 107, 0.25);
          transform: translateY(-4px);
        }

        .booking-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .booking-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .badge-item {
          background: rgba(8, 145, 178, 0.12);
          color: #1a365d;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
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

        .booking-open-btn {
          background: #FF6B6B;
          color: white;
          padding: 14px 32px;
          border-radius: 999px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 12px 30px rgba(255, 107, 107, 0.35);
        }

        .booking-open-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 38px rgba(255, 107, 107, 0.45);
        }

        .booking-note {
          font-size: 0.85rem;
          color: #718096;
          margin-top: 12px;
        }

        .booking-modal {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .booking-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
        }

        .booking-modal-content {
          position: relative;
          width: min(900px, 95vw);
          max-height: 90vh;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 2;
        }

        .booking-modal-close {
          position: absolute;
          top: 12px;
          right: 16px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          font-size: 2rem;
          line-height: 1;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          cursor: pointer;
          z-index: 3;
        }

        .square-booking-iframe {
          width: 100%;
          height: 900px;
          border: 0;
          border-radius: 12px;
          background: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 768px) {
          .square-booking-iframe {
            height: 80vh;
            border-radius: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SquareBooking;
