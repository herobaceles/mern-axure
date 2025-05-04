"use client"

import { useState, useRef, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useToast } from "@/hooks/use-toast"

const VerificationEmailPage = () => {
  const [value, setValue] = useState(Array(6).fill(""))
  const inputRefs = useRef([])
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  const handleChange = (e, index) => {
    const val = e.target.value
    if (!/^\d*$/.test(val)) return

    const digit = val.slice(-1)
    const newValue = [...value]
    newValue[index] = digit
    setValue(newValue)

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (value[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else {
        const newValue = [...value]
        newValue[index] = ""
        setValue(newValue)
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text")
    if (!/^\d+$/.test(pasted)) return

    const digits = pasted.slice(0, 6).split("")
    const newValue = [...value]
    digits.forEach((digit, i) => {
      if (i < 6) newValue[i] = digit
    })

    setValue(newValue)
    const nextEmpty = newValue.findIndex((v) => v === "")
    if (nextEmpty !== -1) {
      inputRefs.current[nextEmpty]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const verifyEmail = async (code) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:3000/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Verification failed")
      }

      const data = await response.json()
      toast({
        title: "Email Verified",
        description: "Your email has been verified successfully",
      })
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Verification error:", error.message)
      setError(error.message)
      setIsLoading(false)
      return false
    }
  }

  const handleSubmit = async () => {
    const code = value.join("") // Join the input digits into a string
    const result = await verifyEmail(code) // Call the `verifyEmail` function directly

    if (!result) {
      toast({
        title: "Verification Failed",
        description: error || "An error occurred during verification.",
      })
    }
  }

  const isComplete = value.every((v) => v !== "")

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Verification Code</h4>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">Please enter the 6-digit verification code sent to your email.</p>

              <div className="d-flex justify-content-center mb-3">
                {value.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="form-control mx-1 text-center"
                    style={{ width: "45px", height: "45px", fontSize: "1.2rem" }}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="text-center text-sm mb-3">
                {value.join("") === "" ? (
                  <>Enter your verification email code.</>
                ) : (
                  <>You entered: {value.join("")}</>
                )}
              </div>

              <div className="d-grid">
                <button
                  className={`btn btn-primary ${!isComplete || isLoading ? "disabled" : ""}`}
                  onClick={handleSubmit}
                  disabled={!isComplete || isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify Email Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationEmailPage
