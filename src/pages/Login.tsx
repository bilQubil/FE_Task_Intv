import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:3000/auth/login",
                {
                    email,
                    password,
                }
            );

            // Store access token and user info in localStorage
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            Swal.fire({
                title: "Success",
                text: "Login successful",
                icon: "success",
                timer: 1500,
            });

            // Redirect based on user role
            if (response.data.user.isAdmin) {
                navigate("/biodata");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            const err = error as AxiosError;
            Swal.fire({
                title: "Error",
                text:
                    (err.response?.data as { message: string })?.message ||
                    "Invalid email or password",
                icon: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Login</h2>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </form>

                            <div className="text-center">
                                <p className="mb-0">
                                    Don't have an account?{" "}
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register here
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
