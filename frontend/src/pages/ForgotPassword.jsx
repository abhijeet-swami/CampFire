import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { handleError, handleSuccess } from "../notify/Notification";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        handleSuccess(result.message);
        setEmail("");
        setTimeout(() => navigate("/reset-password"), 2000);
      } else {
        handleError(result.message || "Something went wrong");
      }
    } catch (error) {
      handleError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Forgot password
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            No worries, we’ll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-text-primary">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="
                w-full px-3 py-2.5 rounded-xl
                bg-bg border border-border
                text-text-primary text-sm
                outline-none
                focus:border-accent
              "
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-2.5 rounded-xl font-semibold
              bg-accent hover:bg-accent-hover
              text-black transition
              ${loading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Sending..." : "Reset password"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Remember your password?
          <Link
            to="/login"
            className="ml-1 font-semibold text-text-primary hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;