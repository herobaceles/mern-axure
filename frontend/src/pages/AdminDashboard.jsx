"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { Spinner, Table, Card, Badge } from "react-bootstrap";

function AdminDashboard() {
  const [adminMessage, setAdminMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (!user || user.role !== "admin") {
          setUnauthorized(true);
          return;
        }

        const [dashboardRes, usersRes, bookingsRes] = await Promise.all([
          axios.get("/api/admin/admin-dashboard", { withCredentials: true }),
          axios.get("/api/admin/users", { withCredentials: true }),
          axios.get("/api/admin/bookings", { withCredentials: true }),
        ]);

        setAdminMessage(dashboardRes.data.message);
        setUsers(usersRes.data.users || []);
        setBookings(bookingsRes.data.bookings || []);
      } catch (err) {
        console.error("Admin fetch error:", err);
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <h3 className="text-danger mb-3">Access Denied</h3>
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="mb-3">Admin Dashboard</h1>
        <p className="lead text-muted">{adminMessage}</p>
      </div>

      <Card className="mb-5 shadow-sm">
        <Card.Header as="h4" className="bg-primary text-white"> User Accounts</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Verified</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      {u.isVerified ? (
                        <Badge bg="success">Yes</Badge>
                      ) : (
                        <Badge bg="secondary">No</Badge>
                      )}
                    </td>
                    <td>
                      <Badge bg={u.role === "admin" ? "danger" : "info"}>
                        {u.role}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header as="h4" className="bg-success text-white"> Bookings</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Room Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Nights</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.roomType}</td>
                    <td>{new Date(b.checkIn).toLocaleDateString()}</td>
                    <td>{new Date(b.checkOut).toLocaleDateString()}</td>
                    <td>{b.nights}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminDashboard;
