//Rooms.jsx

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import trialImg from '../assets/trial3.jpg';
import trialImg1 from '../assets/trial2.jpg';
import trialImg2 from '../assets/trial4.jpg';

const rooms = [
  {
    title: 'CITY VIEW STAYCATION',
    images: [trialImg, trialImg1, trialImg2],
    description:
      'Enjoy a relaxing stay in our City View Staycation with modern amenities and stunning city views.',
    pricing: ['Weekdays: ₱2,299 (2–4 pax)', 'Weekends: ₱2,500 (2–4 pax)'],
    inclusions: ['1 Bedroom', 'Queen Bed + Sofa', 'Kitchen', 'Smart TV', 'WiFi', 'Sky Lounge'],
  },
  {
    title: 'BEACH/POOL VIEW STAYCATION',
    images: [trialImg1, trialImg, trialImg2],
    description:
      'Relax in a spacious 2-bedroom suite with pool views and full amenities.',
    pricing: ['Weekdays: ₱3,500 (4–6 pax)', 'Weekends: ₱4,000 (4–6 pax)'],
    inclusions: ['2 Bedrooms', '2 Queen Beds + Sofa', 'Pool Access', 'Kitchen', 'Smart TV', 'WiFi'],
  },
  {
    title: 'CITY VIEW STAYCATION – ROOM 2',
    images: [trialImg1, trialImg, trialImg2],
    description:
      'Stylish 1-bedroom suite with kitchenette and skyline view.',
    pricing: ['2 Pax – ₱2,000', '4 Pax – ₱2,300/2,500'],
    inclusions: ['1 Bedroom', 'Double Bed + Sofa', 'Mini Kitchen', 'Smart TV', 'WiFi', 'Toiletries'],
  },
];

// ImageSlider component
function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="position-relative overflow-hidden rounded-top-4"
      style={{ height: '180px', cursor: 'pointer' }}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-100"
        style={{
          objectFit: 'cover',
          height: '180px',
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
        }}
      />
      <button
        className="position-absolute top-50 start-3 translate-middle-y btn btn-light btn-circle shadow"
        onClick={goToPrevious}
        aria-label="Previous slide"
        style={{ width: '30px', height: '30px', borderRadius: '50%', opacity: 0.75 }}
      >
        ‹
      </button>
      <button
        className="position-absolute top-50 end-3 translate-middle-y btn btn-light btn-circle shadow"
        onClick={goToNext}
        aria-label="Next slide"
        style={{ width: '30px', height: '30px', borderRadius: '50%', opacity: 0.75 }}
      >
        ›
      </button>
    </div>
  );
}

// Rooms component
function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleShowModal = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div style={{ backgroundColor: '#fef9f3', minHeight: '100vh', padding: '3rem 1rem' }}>
      <div className="container">
        <div className="text-center mb-4">
          <h3
            className="fw-bold"
            style={{
              color: '#007a6d',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: '1.8rem',
            }}
          >
            ROOMS
          </h3>
          <p
            className="mb-3"
            style={{ color: '#4b615e', fontStyle: 'italic', fontSize: '1rem' }}
          >
            Your Perfect Escape, Just Around the Corner.
          </p>
          <div
            className="mx-auto rounded-pill"
            style={{ height: '4px', width: '50px', backgroundColor: '#007a6d' }}
          />
        </div>

        <div className="row g-3">
          {rooms.map((room, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div
                className="card h-100 shadow-sm border-0 rounded-4"
                style={{
                  backgroundColor: '#fff',
                  transition: 'transform 0.25s ease',
                  cursor: 'pointer',
                  minHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <ImageSlider images={room.images} />
                <div className="card-body p-3 d-flex flex-column justify-content-between flex-grow-1">
                  <h5
                    className="text-success fw-semibold mb-2"
                    style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem' }}
                  >
                    {room.title}
                  </h5>
                  <p className="small text-muted mb-3 flex-grow-1" style={{ fontSize: '0.9rem' }}>
                    {room.description}
                  </p>
                  <div className="text-center">
                    <button
                      className="btn btn-outline-success rounded-pill px-3 py-1 shadow-sm"
                      onClick={() => handleShowModal(room)}
                      style={{ fontWeight: '600', fontSize: '0.9rem' }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedRoom && (
          <Modal show={true} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5 text-success">{selectedRoom.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: '1rem' }}>
              <strong>Rates:</strong>
              <ul className="mb-3" style={{ paddingLeft: '1.2rem' }}>
                {selectedRoom.pricing.map((price, idx) => (
                  <li key={idx}>{price}</li>
                ))}
              </ul>
              <strong>Inclusions:</strong>
              <ul style={{ paddingLeft: '1.2rem' }}>
                {selectedRoom.inclusions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="outline-success" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Rooms;
