import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login = () => {

    const [isLoginForm, setIsLoginForm] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId: email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };


    const toggleForm = () => {
      setIsLoginForm((currentMode) => !currentMode);
      setError("");
    };



  return (
    <main className="min-h-screen bg-base-200 px-4 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-box bg-base-100 shadow-xl lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden bg-primary p-10 text-primary-content lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                devTinder
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Match with developers who build like you do.
              </h1>
              <p className="mt-4 max-w-sm text-base opacity-85">
                Sign in to continue discovering collaborators, projects, and
                profiles that fit your vibe.
              </p>
            </div>

            <div className="stats bg-primary-content/10 text-primary-content shadow-none">
              <div className="stat">
                <div className="stat-title text-primary-content/70">
                  Active builders
                </div>
                <div className="stat-value text-3xl">12k+</div>
                <div className="stat-desc text-primary-content/70">
                  connecting weekly
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8">
                <p className="text-sm font-medium text-primary">
                  {isLoginForm ? "Welcome back" : "Join devTinder"}
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  {isLoginForm ? "Login to your account" : "Create your account"}
                </h2>
                <p className="mt-2 text-sm text-base-content/70">
                  {isLoginForm
                    ? "Pick up where you left off."
                    : "Create a profile and start meeting developers."}
                </p>
              </div>

              <form className="space-y-5" onSubmit={isLoginForm ? handleLogin : handleSignUp}>
                {!isLoginForm && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="form-control">
                      <label className="label" htmlFor="firstName">
                        <span className="label-text font-medium">First name</span>
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="First name"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label" htmlFor="lastName">
                        <span className="label-text font-medium">Last name</span>
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Last name"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text font-medium">Email address</span>
                  </label>
                  <label className="input validator w-full">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </g>
                    </svg>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <p className="validator-hint mt-2 hidden text-sm">
                    Enter a valid email address.
                  </p>
                </div>

                <div className="form-control">
                  <div className="label">
                    <label className="label-text font-medium" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <label className="input validator w-full">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                      </g>
                    </svg>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete={isLoginForm ? "current-password" : "new-password"}
                      minLength="8"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <p className="validator-hint mt-2 hidden text-sm">
                    Password must be at least 8 characters.
                  </p>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button className="btn btn-primary w-full" type="submit">
                  {isLoginForm ? "Login" : "Sign Up"}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-base-content/70">
                {isLoginForm ? "New here?" : "Already have an account?"}{' '}
                <button
                  className="link link-primary font-medium no-underline hover:underline"
                  type="button"
                  onClick={toggleForm}
                >
                  {isLoginForm ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
