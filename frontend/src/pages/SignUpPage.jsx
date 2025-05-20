"use client"

import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import trialImg from '../assets/trial3.jpg'

function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, name)
    navigate("/verify-email")
  }

  // Replace this with your specific green color if needed
  const greenColor = "#28a745"

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 shadow rounded-4 overflow-hidden" style={{ maxWidth: "900px", minHeight: "75vh" }}>
        
        {/* Left Image Section */}
        <Col md={6} className="d-none d-md-block p-0">
          <img
            src={trialImg}
            alt="Room"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </Col>

        {/* Right Form Section */}
        <Col xs={12} md={6} className="bg-white d-flex align-items-center p-4 p-md-5">
          <div className="w-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark">Create an Account</h2>
              <p className="text-muted">Please enter your details</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </Form.Group>

              {error && <div className="text-danger mb-3">{error}</div>}

              <Button
                type="submit"
                className="w-100 py-2 text-white rounded-3"
                style={{ backgroundColor: greenColor }}
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form>

            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <Link to="/login" style={{ color: greenColor }}>Log In</Link>
              </p>
              <p>
                <Link to="/" className="text-secondary">← Back</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage
