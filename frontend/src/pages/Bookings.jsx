import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Spinner, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings", {
          withCredentials: true,
        });
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-4 text-center">{error}</div>;
  }

  return (
    <div style={{ backgroundColor: "#fef9f3", minHeight: "100vh", padding: "3rem 1rem" }}>
      <div className="container">
        <div className="text-center mb-4">
          <h3 className="fw-bold" style={{ color: "#007a6d", fontSize: "1.8rem" }}>
            YOUR BOOKINGS
          </h3>
          <p style={{ color: "#4b615e", fontStyle: "italic" }}>
            Track your confirmed and upcoming staycations.
          </p>
          <div
            className="mx-auto rounded-pill"
            style={{ height: "4px", width: "50px", backgroundColor: "#007a6d" }}
          />
        </div>

        {bookings.length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          <div className="row g-3">
            {bookings.map((booking) => (
              <div className="col-12 col-md-6 col-lg-4" key={booking._id}>
                <div
                  className="card h-100 shadow-sm border-0 rounded-4"
                  style={{
                    backgroundColor: "#fff",
                    transition: "transform 0.25s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedBooking(booking)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <h5 className="text-success fw-semibold mb-2">{booking.roomType}</h5>
                    <p className="small text-muted mb-2">
                      {new Date(booking.checkIn).toDateString()} -{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </p>
                    <p className="mb-2">
                      <strong>Nights:</strong> {booking.nights}
                    </p>
                    <p className="mb-2">
                      <strong>Booking ID:</strong> <span className="text-muted">{booking._id}</span>
                    </p>
                    <p className="mb-0">
                      <strong>Status:</strong>{" "}
                      {booking.paid ? (
                        <span className="text-success fw-semibold">✅ Paid</span>
                      ) : (
                        <span className="text-danger fw-semibold">❌ Unpaid</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <Modal show={true} onHide={() => setSelectedBooking(null)} centered>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5 text-success">
                {selectedBooking.roomType}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "1rem" }}>
              <p>
                <strong>Check-In:</strong>{" "}
                {new Date(selectedBooking.checkIn).toDateString()}
              </p>
              <p>
                <strong>Check-Out:</strong>{" "}
                {new Date(selectedBooking.checkOut).toDateString()}
              </p>
              <p>
                <strong>Nights:</strong> {selectedBooking.nights}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedBooking.paid ? "✅ Paid" : "❌ Not Paid"}
              </p>
              <p>
                <strong>Name:</strong> {selectedBooking.name}
                <br />
                <strong>Email:</strong> {selectedBooking.email}
              </p>
              <p>
                <strong>Booking ID:</strong> <code>{selectedBooking._id}</code>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-success" size="sm" onClick={() => setSelectedBooking(null)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Bookings;
