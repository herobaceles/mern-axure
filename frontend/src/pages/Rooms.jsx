import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import trialImg from '../assets/trial3.jpg';
import trialImg1 from '../assets/trial2.jpg';
import trialImg2 from '../assets/trial4.jpg';
// Room data
const rooms = [
  {
    title: 'CITY VIEW STAYCATION',
    images: [ trialImg, trialImg1, trialImg2],
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
    <div className="position-relative overflow-hidden rounded-top-3" style={{ height: '160px' }}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-100"
        style={{ objectFit: 'cover', height: '160px' }}
      />
      <button
        className="position-absolute top-50 start-0 translate-middle-y btn btn-link text-white"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="position-absolute top-50 end-0 translate-middle-y btn btn-link text-white"
        onClick={goToNext}
        aria-label="Next slide"
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
    <div className="container py-4 text-center">
      <div className='container  d-flex  justify-content-start'></div>
      <h3 className="fw-semibold fs-5  mb-2">ROOMS</h3>
      <p>Your Perfect Escape, Just Around the Corner.</p>
      <div className="bg-dark mx-auto rounded-pill mb-4" style={{ height: '4px', width: '50px' }}></div>

      <div className="row g-3">
        {rooms.map((room, index) => (
          <div className="col-12 col-sm-6 col-lg-4" key={index}>
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <ImageSlider images={room.images} />
              <div className="card-body p-3 text-start">
                <p className="small mb-2">{room.description}</p>
                <div className="text-center">
                  <button
                    className="btn btn-outline-dark p-2 btn-sm rounded"
                    onClick={() => handleShowModal(room)}
                  >
                    More Info
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
            <Modal.Title className="fs-6">{selectedRoom.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontSize: '0.9rem' }}>
            <strong>Rates:</strong>
            <ul className="mb-2">
              {selectedRoom.pricing.map((price, idx) => (
                <li key={idx}>{price}</li>
              ))}
            </ul>
            <strong>Inclusions:</strong>
            <ul>
              {selectedRoom.inclusions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Rooms;
