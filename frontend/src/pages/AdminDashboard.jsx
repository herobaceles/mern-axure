import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState({
    show: false,
    type: null,
    userId: null,
    message: "",
  });

  const fetchData = async () => {
    try {
      const [usersRes, bookingsRes] = await Promise.all([
        fetch("http://localhost:3000/api/admin/users", { credentials: "include" }),
        fetch("http://localhost:3000/api/admin/bookings", { credentials: "include" }),
      ]);

      if (!usersRes.ok || !bookingsRes.ok) {
        throw new Error("Failed to fetch admin data");
      }

      const usersData = await usersRes.json();
      const bookingsData = await bookingsRes.json();

      const extractedUsers = Array.isArray(usersData) ? usersData : usersData.users || [];
      const extractedBookings = Array.isArray(bookingsData) ? bookingsData : bookingsData.bookings || [];

      setUsers(extractedUsers);
      setBookings(extractedBookings);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to load admin data.");
    }
  };

  const confirmLogout = () => {
    setModal({
      show: true,
      type: "logout",
      message: "Are you sure you want to log out?",
    });
  };

  const confirmDeleteUser = (userId) => {
    setModal({
      show: true,
      type: "delete",
      userId,
      message: "Are you sure you want to delete this user?",
    });
  };

  const handleConfirmedAction = async () => {
    if (modal.type === "logout") {
      try {
        await logout();
        navigate("/login", { replace: true });
      } catch (err) {
        console.error("Logout failed:", err);
        setModal({
          show: true,
          type: "alert",
          message: "Logout failed. Please try again.",
        });
        return;
      }
    }

    if (modal.type === "delete" && modal.userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/users/${modal.userId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to delete user");
        }

        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== modal.userId));
      } catch (err) {
        console.error("Delete user error:", err);
        setModal({
          show: true,
          type: "alert",
          message: err.message || "Failed to delete user",
        });
        return;
      }
    }

    setModal({ show: false, type: null, userId: null, message: "" });
  };

  useEffect(() => {
    if (!isAuthenticated && !isCheckingAuth) {
      navigate("/login");
    } else if (isAuthenticated && user?.role !== "admin") {
      navigate("/");
    } else {
      fetchData();
    }
  }, [isAuthenticated, isCheckingAuth]);

  if (isCheckingAuth) {
    return <div className="text-center mt-5">Checking authentication...</div>;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white vh-100 p-3"
        style={{ width: "250px", position: "fixed", left: 0, top: 0 }}
      >
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <span className="nav-link text-white">Dashboard</span>
          </li>
          <li className="nav-item mt-4">
            <button className="btn btn-outline-light w-100" onClick={confirmLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 ms-250" style={{ marginLeft: "250px" }}>
        {/* Top Navbar */}
        <nav className="navbar navbar-light bg-white shadow-sm px-4">
          <span className="navbar-brand mb-0 h5">Welcome, Admin</span>
        </nav>

        {/* Content Area */}
        <div className="container-fluid mt-4">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Users */}
          <div className="card mb-5">
            <div className="card-header">
              <h5>All Users</h5>
            </div>
            <div className="card-body">
              {users.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u._id}>
                          <td>{u._id}</td>
                          <td>{u.email}</td>
                          <td>{u.name}</td>
                          <td>{u.role}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => confirmDeleteUser(u._id)}
                              disabled={u._id === user?._id}
                              title={
                                u._id === user?._id
                                  ? "You cannot delete your own account"
                                  : "Delete User"
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Bookings */}
          <div className="card mb-5">
            <div className="card-header">
              <h5>All Bookings</h5>
            </div>
            <div className="card-body">
              {bookings.length === 0 ? (
                <p>No bookings found.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Guest Name</th>
                        <th>Room Type</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b._id}>
                          <td>{b._id}</td>
                          <td>{b.guestName}</td>
                          <td>{b.roomType}</td>
                          <td>{new Date(b.checkIn).toLocaleDateString()}</td>
                          <td>{new Date(b.checkOut).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.show && (
        <>
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {modal.type === "alert" ? "Alert" : "Confirmation"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() =>
                      setModal({ show: false, type: null, userId: null, message: "" })
                    }
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{modal.message}</p>
                </div>
                <div className="modal-footer">
                  {modal.type !== "alert" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() =>
                        setModal({ show: false, type: null, userId: null, message: "" })
                      }
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    className={`btn btn-${modal.type === "alert" ? "primary" : "danger"}`}
                    onClick={handleConfirmedAction}
                  >
                    {modal.type === "alert" ? "OK" : "Yes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
