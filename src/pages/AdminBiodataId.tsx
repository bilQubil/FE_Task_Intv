import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

interface EducationForm {
    educationLevel: string;
    institutionName: string;
    major: string;
    graduationYear: number;
    gpa: number;
}

interface JobForm {
    companyName: string;
    lastPosition: string;
    lastSalary: number;
    year: number;
}

interface TrainingForm {
    courseName: string;
    hasCertificate: boolean;
    year: number;
}

interface UserData {
    id: number;
    email: string;
    position?: string;
    fullName?: string;
    ktpNumber?: string;
    birthPlace?: string;
    birthDate?: string;
    gender?: string;
    religion?: string;
    bloodType?: string;
    maritalStatus?: string;
    ktpAddress?: string;
    livingAddress?: string;
    phone?: string;
    emergencyContact?: string;
    skills?: string;
    placementWillingness?: boolean;
    expectedSalary?: number;
    EducationHistories?: EducationForm[];
    JobHistories?: JobForm[];
    TrainingHistories?: TrainingForm[];
}

export default function AdminBiodataId() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchAllData();
        }
    }, [id]);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([
                getBiodataById(),
                getEducationById(),
                getJobById(),
                getTrainingById(),
            ]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getBiodataById = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                `http://localhost:3000/admin/biodata/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching biodata:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to fetch user data",
                icon: "error",
            });
        }
    };

    const getEducationById = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                `http://localhost:3000/admin/education/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const educationData = Array.isArray(response.data)
                ? response.data
                : [];
            setUserData((prev) =>
                prev ? { ...prev, EducationHistories: educationData } : null
            );
        } catch (error) {
            console.error("Error fetching education data:", error);
            setUserData((prev) =>
                prev ? { ...prev, EducationHistories: [] } : null
            );
        }
    };

    const getJobById = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                `http://localhost:3000/admin/job/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Job response:", response.data);

            const jobData = Array.isArray(response.data) ? response.data : [];
            setUserData((prev) =>
                prev ? { ...prev, JobHistories: jobData } : null
            );
        } catch (error) {
            console.error("Error fetching job data:", error);
            setUserData((prev) =>
                prev ? { ...prev, JobHistories: [] } : null
            );
        }
    };

    const getTrainingById = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                `http://localhost:3000/admin/training/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Training response:", response.data);

            const trainingData = Array.isArray(response.data)
                ? response.data
                : [];
            setUserData((prev) =>
                prev ? { ...prev, TrainingHistories: trainingData } : null
            );
        } catch (error) {
            console.error("Error fetching training data:", error);
            setUserData((prev) =>
                prev ? { ...prev, TrainingHistories: [] } : null
            );
        }
    };

    const handleUpdateBiodata = async () => {
        if (!userData) return;

        try {
            const token = localStorage.getItem("access_token");
            await axios.put(
                `http://localhost:3000/admin/biodata/${userData.id}`,
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            Swal.fire({
                title: "Success",
                text: "User data updated successfully",
                icon: "success",
            });

            fetchAllData();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to update user",
                icon: "error",
            });
        }
    };

    const handleUpdateEducation = async () => {
        if (!userData) return;

        try {
            const token = localStorage.getItem("access_token");
            await axios.put(
                `http://localhost:3000/admin/education/${userData.id}`,
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            Swal.fire({
                title: "Success",
                text: "Education data updated successfully",
                icon: "success",
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to update education",
                icon: "error",
            });
        }
    };

    const handleUpdateJob = async () => {
        if (!userData) return;

        try {
            const token = localStorage.getItem("access_token");
            await axios.put(
                `http://localhost:3000/admin/job/${userData.id}`,
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            Swal.fire({
                title: "Success",
                text: "Job history updated successfully",
                icon: "success",
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to update job history",
                icon: "error",
            });
        }
    };

    const handleUpdateTraining = async () => {
        if (!userData) return;

        try {
            const token = localStorage.getItem("access_token");
            await axios.put(
                `http://localhost:3000/admin/training/${userData.id}`,
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            Swal.fire({
                title: "Success",
                text: "Training history updated successfully",
                icon: "success",
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to update training history",
                icon: "error",
            });
        }
    };

    const handleUpdateUser = async () => {
        if (!userData) return;

        try {
            await Promise.all([
                handleUpdateBiodata(),
                handleUpdateEducation(),
                handleUpdateJob(),
                handleUpdateTraining(),
            ]);

            Swal.fire({
                title: "Success",
                text: "All user data updated successfully",
                icon: "success",
            });

            fetchAllData();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to update user data",
                icon: "error",
            });
        }
    };

    const handleDeleteUser = async () => {
        if (!userData) return;

        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover this user data!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, keep it",
            });

            if (result.isConfirmed) {
                const token = localStorage.getItem("access_token");
                await axios.delete(
                    `http://localhost:3000/admin/biodata/${userData.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                Swal.fire({
                    title: "Deleted!",
                    text: "User data has been deleted.",
                    icon: "success",
                });

                navigate("/biodata");
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to delete user",
                icon: "error",
            });
        }
    };

    const handleBiodataChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        if (!userData) return;
        const { name, value, type } = e.target;
        setUserData({
            ...userData,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : name === "expectedSalary"
                    ? Number(value)
                    : value,
        });
    };

    const handleEducationChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!userData || !userData.EducationHistories) return;
        const { name, value } = e.target;
        const updatedEducation = [...userData.EducationHistories];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [name]:
                name === "graduationYear" || name === "gpa"
                    ? Number(value)
                    : value,
        };
        setUserData({
            ...userData,
            EducationHistories: updatedEducation,
        });
    };

    const handleJobHistoryChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!userData || !userData.JobHistories) return;
        const { name, value } = e.target;
        const updatedJobs = [...userData.JobHistories];
        updatedJobs[index] = {
            ...updatedJobs[index],
            [name]:
                name === "lastSalary" || name === "year"
                    ? Number(value)
                    : value,
        };
        setUserData({
            ...userData,
            JobHistories: updatedJobs,
        });
    };

    const handleTrainingChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!userData || !userData.TrainingHistories) return;
        const { name, value, type } = e.target;
        const updatedTraining = [...userData.TrainingHistories];
        updatedTraining[index] = {
            ...updatedTraining[index],
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : name === "year"
                    ? Number(value)
                    : value,
        };
        setUserData({
            ...userData,
            TrainingHistories: updatedTraining,
        });
    };

    const addEducationEntry = () => {
        if (!userData) return;
        setUserData({
            ...userData,
            EducationHistories: [
                ...(userData.EducationHistories || []),
                {
                    educationLevel: "",
                    institutionName: "",
                    major: "",
                    graduationYear: 0,
                    gpa: 0,
                },
            ],
        });
    };

    const addJobHistoryEntry = () => {
        if (!userData) return;
        setUserData({
            ...userData,
            JobHistories: [
                ...(userData.JobHistories || []),
                {
                    companyName: "",
                    lastPosition: "",
                    lastSalary: 0,
                    year: 0,
                },
            ],
        });
    };

    const addTrainingEntry = () => {
        if (!userData) return;
        setUserData({
            ...userData,
            TrainingHistories: [
                ...(userData.TrainingHistories || []),
                {
                    courseName: "",
                    hasCertificate: false,
                    year: 0,
                },
            ],
        });
    };

    const removeEducationEntry = (index: number) => {
        if (!userData || !userData.EducationHistories) return;
        const updatedEducation = userData.EducationHistories.filter(
            (_, i) => i !== index
        );
        setUserData({
            ...userData,
            EducationHistories: updatedEducation,
        });
    };

    const removeJobHistoryEntry = (index: number) => {
        if (!userData || !userData.JobHistories) return;
        const updatedJobs = userData.JobHistories.filter((_, i) => i !== index);
        setUserData({
            ...userData,
            JobHistories: updatedJobs,
        });
    };

    const removeTrainingEntry = (index: number) => {
        if (!userData || !userData.TrainingHistories) return;
        const updatedTraining = userData.TrainingHistories.filter(
            (_, i) => i !== index
        );
        setUserData({
            ...userData,
            TrainingHistories: updatedTraining,
        });
    };

    if (isLoading) {
        return (
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-md-3 col-lg-2">
                        <Sidebar />
                    </div>
                    <main className="col-md-9 col-lg-10 ms-auto">
                        <div className="pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2 px-4">Loading...</h1>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-md-3 col-lg-2">
                        <Sidebar />
                    </div>
                    <main className="col-md-9 col-lg-10 ms-auto">
                        <div className="pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2 px-4">User not found</h1>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    // Debug: Log the current userData to console
    console.log("Current userData:", userData);

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                <div className="col-md-3 col-lg-2">
                    <Sidebar />
                </div>
                <main className="col-md-9 col-lg-10 ms-auto">
                    <div className="pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between align-items-center">
                        <h1 className="h2 px-4">Edit User Biodata</h1>
                        <button
                            className="btn btn-secondary me-4"
                            onClick={() => navigate("/biodata")}
                        >
                            Back to List
                        </button>
                    </div>
                    <div className="px-4 mb-4">
                        <form>
                            <h3>Personal Information</h3>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        value={userData.fullName || ""}
                                        onChange={handleBiodataChange}
                                        placeholder="Enter full name"
                                        required
                                    />
                                    <small className="text-muted">
                                        Current value:{" "}
                                        {userData.fullName || "No data"}
                                    </small>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="position"
                                        value={userData.position || ""}
                                        onChange={handleBiodataChange}
                                        placeholder="Enter position"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        KTP Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ktpNumber"
                                        value={userData.ktpNumber || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Birth Place
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="birthPlace"
                                        value={userData.birthPlace || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Birth Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="birthDate"
                                        value={userData.birthDate || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Gender</label>
                                    <select
                                        className="form-select"
                                        name="gender"
                                        value={userData.gender || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        Religion
                                    </label>
                                    <select
                                        className="form-select"
                                        name="religion"
                                        value={userData.religion || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    >
                                        <option value="">
                                            Select Religion
                                        </option>
                                        <option value="Islam">Islam</option>
                                        <option value="Christianity">
                                            Christianity
                                        </option>
                                        <option value="Hinduism">
                                            Hinduism
                                        </option>
                                        <option value="Buddhism">
                                            Buddhism
                                        </option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        Blood Type
                                    </label>
                                    <select
                                        className="form-select"
                                        name="bloodType"
                                        value={userData.bloodType || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    >
                                        <option value="">
                                            Select Blood Type
                                        </option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="AB">AB</option>
                                        <option value="O">O</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        Marital Status
                                    </label>
                                    <select
                                        className="form-select"
                                        name="maritalStatus"
                                        value={userData.maritalStatus || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">
                                            Divorced
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        KTP Address
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="ktpAddress"
                                        value={userData.ktpAddress || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Living Address
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="livingAddress"
                                        value={userData.livingAddress || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={userData.email || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phone"
                                        value={userData.phone || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        Emergency Contact
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="emergencyContact"
                                        value={userData.emergencyContact || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Skills</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="skills"
                                        value={userData.skills || ""}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Expected Salary
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="expectedSalary"
                                        value={userData.expectedSalary || 0}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="placementWillingness"
                                        checked={
                                            userData.placementWillingness ||
                                            false
                                        }
                                        onChange={handleBiodataChange}
                                    />
                                    <label className="form-check-label">
                                        Willing to be Placed
                                    </label>
                                </div>
                            </div>

                            <h3 className="mt-4 d-flex justify-content-between align-items-center">
                                Education
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={addEducationEntry}
                                >
                                    + Add Education
                                </button>
                            </h3>
                            {(userData.EducationHistories || []).map(
                                (education, index) => (
                                    <div
                                        key={index}
                                        className="border p-3 mb-3"
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="mb-0">
                                                Education {index + 1}
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    removeEducationEntry(index)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Education Level
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="educationLevel"
                                                    value={
                                                        education.educationLevel ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleEducationChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Institution Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="institutionName"
                                                    value={
                                                        education.institutionName ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleEducationChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <label className="form-label">
                                                    Major
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="major"
                                                    value={
                                                        education.major || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleEducationChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label className="form-label">
                                                    Graduation Year
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="graduationYear"
                                                    value={
                                                        education.graduationYear ||
                                                        0
                                                    }
                                                    onChange={(e) =>
                                                        handleEducationChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label className="form-label">
                                                    GPA
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    className="form-control"
                                                    name="gpa"
                                                    value={education.gpa || 0}
                                                    onChange={(e) =>
                                                        handleEducationChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}

                            <h3 className="mt-4 d-flex justify-content-between align-items-center">
                                Job History
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={addJobHistoryEntry}
                                >
                                    + Add Job History
                                </button>
                            </h3>
                            {(userData.JobHistories || []).map(
                                (jobHistory, index) => (
                                    <div
                                        key={index}
                                        className="border p-3 mb-3"
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="mb-0">
                                                Job {index + 1}
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    removeJobHistoryEntry(index)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="companyName"
                                                    value={
                                                        jobHistory.companyName ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleJobHistoryChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Last Position
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lastPosition"
                                                    value={
                                                        jobHistory.lastPosition ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleJobHistoryChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Last Salary
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="lastSalary"
                                                    value={
                                                        jobHistory.lastSalary ||
                                                        0
                                                    }
                                                    onChange={(e) =>
                                                        handleJobHistoryChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Year
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="year"
                                                    value={jobHistory.year || 0}
                                                    onChange={(e) =>
                                                        handleJobHistoryChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}

                            <h3 className="mt-4 d-flex justify-content-between align-items-center">
                                Training
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={addTrainingEntry}
                                >
                                    + Add Training
                                </button>
                            </h3>
                            {(userData.TrainingHistories || []).map(
                                (training, index) => (
                                    <div
                                        key={index}
                                        className="border p-3 mb-3"
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="mb-0">
                                                Training {index + 1}
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    removeTrainingEntry(index)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Course Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="courseName"
                                                    value={
                                                        training.courseName ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleTrainingChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Year
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="year"
                                                    value={training.year || 0}
                                                    onChange={(e) =>
                                                        handleTrainingChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="hasCertificate"
                                                    checked={
                                                        training.hasCertificate ||
                                                        false
                                                    }
                                                    onChange={(e) =>
                                                        handleTrainingChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                />
                                                <label className="form-check-label">
                                                    Has Certificate
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}

                            <div className="d-flex justify-content-between mt-4">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdateUser}
                                >
                                    Update User
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeleteUser}
                                >
                                    Delete User
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
