"use client"

import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import trialImg from '../assets/trial3.jpg'

function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { signup, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    setPasswordError("")
    await signup(email, password, name)
    navigate("/verify-email")
  }

  const greenColor = "#28a745"

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z"/>
      <path d="M8 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="#fff"/>
    </svg>
  )

  const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
      <path d="M13.359 11.238c-1.71 1.336-3.728 2.262-5.858 2.262-4.999 0-8-5-8-5a13.134 13.134 0 0 1 2.306-3.106L.354 2.646a.5.5 0 1 1 .707-.708l13 13a.5.5 0 0 1-.708.708l-2.588-2.588zM3.271 5.055A10.785 10.785 0 0 0 1.357 8c.5 1.044 2.593 4 6.643 4a7.46 7.46 0 0 0 3.06-.618l-1.362-1.362A3 3 0 0 1 8 5a2.99 2.99 0 0 1-4.729 0z"/>
      <path d="M11.742 10.344a3 3 0 0 1-4.086-4.086l4.086 4.086z"/>
    </svg>
  )

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
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  isInvalid={!!passwordError}
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
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
