"use client"

import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const { signup, isLoading, error, user } = useAuthStore()
    console.log(user)
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, name);
    navigate("/verify-email");
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h2>Create an Account</h2>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                  />
                </Form.Group>
                {error && <p className="text-danger fs-6">{error}</p>}
                <Button variant="primary" type="submit" className="w-100 py-2" disabled={isLoading}>
                 {isLoading ? "Loading..." : "Sign Up"}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-3 bg-light">
              <p className="mb-0">
                Already have an account?{" "}
                <a href="#" className="text-primary">
                  Log In
                </a>
              </p>
              <p>
                <a href="/">Back</a>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage;
