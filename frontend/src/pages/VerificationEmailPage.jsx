import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerificationEmailPage() {
  const [value, setValue] = useState("");
  const { verifyEmail, isLoading, error, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const inputVal = e.target.value;
    if (!/^\d?$/.test(inputVal)) return;
    const newValue = value.split("");
    newValue[index] = inputVal;
    setValue(newValue.join(""));
    if (inputVal && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    const success = await verifyEmail(value);
    if (success) {
      toast.success("Your email has been verified successfully");
      await checkAuth();
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      toast.error("Verification failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow rounded-4 p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Email Verification</h3>
          <p className="text-muted mb-0">Enter the 6-digit code sent to your email</p>
        </div>

        <div className="d-flex justify-content-center gap-2 mb-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              inputMode="numeric"
              className="form-control text-center border border-2"
              style={{
                width: "48px",
                height: "56px",
                fontSize: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              value={value[i] || ""}
              onChange={(e) => handleChange(e, i)}
            />
          ))}
        </div>

        <div className="text-center text-muted small mb-3">
          {value === "" ? "Please enter the code above." : `Code: ${value}`}
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          onClick={handleSubmit}
          disabled={isLoading || value.length < 6}
        >
          {isLoading ? "Verifying..." : "Verify Email Now"}
        </button>
      </div>
    </div>
  );
}
