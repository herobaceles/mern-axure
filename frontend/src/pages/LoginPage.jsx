"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // Clear login error when user makes changes
    if (loginError) {
      setLoginError("")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        console.log("Login attempt:", formData)

        // Simulate login logic - in a real app, this would be your API call
        if (formData.email === "test@example.com" && formData.password === "password123") {
          // Successful login
          console.log("Login successful")
          // Here you would typically:
          // 1. Store auth token in localStorage/sessionStorage
          // 2. Update global auth state
          // 3. Redirect to dashboard/home page
        } else {
          // Failed login
          setLoginError("Invalid email or password. Please try again.")
        }

        setIsSubmitting(false)
      }, 1000)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h2>Log In</h2>
            </Card.Header>
            <Card.Body className="p-4">
              {loginError && <Alert variant="danger">{loginError}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter your email"
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter your password"
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Remember me" id="remember-me" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2 mb-3" disabled={isSubmitting}>
                  {isSubmitting ? "Logging In..." : "Log In"}
                </Button>

                <div className="text-center">
                  <a href="#" className="text-primary d-block mb-3">
                    Forgot Password?
                  </a>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-3 bg-light">
              <p className="mb-0">
                Don't have an account?{" "}
                <a href="#" className="text-primary">
                  Sign Up
                </a>
              </p>
              <p><a href="/">back</a></p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
