import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:3000/auth/register",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );
            if (res.data.message === "User registered successfully") {
                Swal.fire({
                    title: "Success",
                    text: "User registered successfully",
                    icon: "success",
                    timer: 1500,
                });
                navigate("/login");
            }
        } catch (error) {
            const err = error as AxiosError;
            Swal.fire({
                title: "Error",
                text:
                    (err.response?.data as { message: string })?.message ||
                    "An error occurred",
                icon: "error",
                timer: 1500,
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
                            <h2 className="text-center mb-4">Register</h2>
                            <form onSubmit={handleSubmit}>
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
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100 mb-3"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Registering...
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                            </form>

                            <div className="text-center">
                                <p className="mb-0">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={() => {
                                            navigate("/login");
                                        }}
                                    >
                                        Login here
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
