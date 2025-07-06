import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

interface BiodataForm {
    position: string;
    fullName: string;
    ktpNumber: string;
    birthPlace: string;
    birthDate: string;
    gender: string;
    religion: string;
    bloodType: string;
    maritalStatus: string;
    ktpAddress: string;
    livingAddress: string;
    email: string;
    phone: string;
    emergencyContact: string;
    skills: string;
    placementWillingness: boolean;
    expectedSalary: number;
}

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

export default function AddBiodata() {
    const [biodata, setBiodata] = useState<BiodataForm>({
        position: "",
        fullName: "",
        ktpNumber: "",
        birthPlace: "",
        birthDate: "",
        gender: "",
        religion: "",
        bloodType: "",
        maritalStatus: "",
        ktpAddress: "",
        livingAddress: "",
        email: "",
        phone: "",
        emergencyContact: "",
        skills: "",
        placementWillingness: false,
        expectedSalary: 0,
    });

    const [educationList, setEducationList] = useState<EducationForm[]>([
        {
            educationLevel: "",
            institutionName: "",
            major: "",
            graduationYear: 0,
            gpa: 0,
        },
    ]);

    const [jobHistoryList, setJobHistoryList] = useState<JobForm[]>([
        {
            companyName: "",
            lastPosition: "",
            lastSalary: 0,
            year: 0,
        },
    ]);

    const [trainingList, setTrainingList] = useState<TrainingForm[]>([
        {
            courseName: "",
            hasCertificate: false,
            year: 0,
        },
    ]);

    const handleBiodataChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;
        setBiodata((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    };

    const handleEducationChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updatedEducationList = [...educationList];
        updatedEducationList[index] = {
            ...updatedEducationList[index],
            [name]:
                name === "graduationYear" || name === "gpa"
                    ? Number(value)
                    : value,
        };
        setEducationList(updatedEducationList);
    };

    const handleJobHistoryChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updatedJobHistoryList = [...jobHistoryList];
        updatedJobHistoryList[index] = {
            ...updatedJobHistoryList[index],
            [name]:
                name === "lastSalary" || name === "year"
                    ? Number(value)
                    : value,
        };
        setJobHistoryList(updatedJobHistoryList);
    };

    const handleTrainingChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type } = e.target;
        const updatedTrainingList = [...trainingList];
        updatedTrainingList[index] = {
            ...updatedTrainingList[index],
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : name === "year"
                    ? Number(value)
                    : value,
        };
        setTrainingList(updatedTrainingList);
    };

    const addEducationEntry = () => {
        setEducationList([
            ...educationList,
            {
                educationLevel: "",
                institutionName: "",
                major: "",
                graduationYear: 0,
                gpa: 0,
            },
        ]);
    };

    const addJobHistoryEntry = () => {
        setJobHistoryList([
            ...jobHistoryList,
            {
                companyName: "",
                lastPosition: "",
                lastSalary: 0,
                year: 0,
            },
        ]);
    };

    const addTrainingEntry = () => {
        setTrainingList([
            ...trainingList,
            {
                courseName: "",
                hasCertificate: false,
                year: 0,
            },
        ]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                Swal.fire({
                    title: "Error",
                    text: "No authentication token found. Please log in again.",
                    icon: "error",
                    timer: 3000,
                });
                return;
            }

            await axios.post(
                "http://localhost:3000/biodata",
                {
                    position: biodata.position,
                    fullName: biodata.fullName,
                    ktpNumber: biodata.ktpNumber,
                    birthPlace: biodata.birthPlace,
                    birthDate: biodata.birthDate,
                    gender: biodata.gender,
                    religion: biodata.religion,
                    bloodType: biodata.bloodType,
                    maritalStatus: biodata.maritalStatus,
                    ktpAddress: biodata.ktpAddress,
                    livingAddress: biodata.livingAddress,
                    email: biodata.email,
                    phone: biodata.phone,
                    emergencyContact: biodata.emergencyContact,
                    skills: biodata.skills,
                    placementWillingness: biodata.placementWillingness,
                    expectedSalary: biodata.expectedSalary,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const educationPromises = educationList.map((education) =>
                axios.post(
                    "http://localhost:3000/biodata/education",
                    {
                        educationLevel: education.educationLevel,
                        institutionName: education.institutionName,
                        major: education.major,
                        graduationYear: education.graduationYear,
                        gpa: education.gpa,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            );

            const jobPromises = jobHistoryList.map((job) =>
                axios.post(
                    "http://localhost:3000/biodata/job",
                    {
                        companyName: job.companyName,
                        lastPosition: job.lastPosition,
                        lastSalary: job.lastSalary,
                        year: job.year,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            );

            const trainingPromises = trainingList.map((training) =>
                axios.post(
                    "http://localhost:3000/biodata/training",
                    {
                        courseName: training.courseName,
                        hasCertificate: training.hasCertificate,
                        year: training.year,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            );

            // Wait for all submissions
            await Promise.all([
                ...educationPromises,
                ...jobPromises,
                ...trainingPromises,
            ]);

            Swal.fire({
                title: "Success",
                text: "Biodata submitted successfully!",
                icon: "success",
                timer: 3000,
            });

            // Optional: Reset form or navigate
            // navigate("/profile");
        } catch (error) {
            console.error("Error submitting biodata:", error);

            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message ||
                    error.message ||
                    "An unexpected error occurred";

                Swal.fire({
                    title: "Submission Error",
                    text: errorMessage,
                    icon: "error",
                    timer: 5000,
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "An unexpected error occurred",
                    icon: "error",
                    timer: 3000,
                });
            }
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                <div className="col-md-3 col-lg-2">
                    <Sidebar />
                </div>
                <main className="col-md-9 col-lg-10 ms-auto">
                    <div className="pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2 px-4">Add Biodata</h1>
                    </div>
                    <div className="px-4 mb-4">
                        <form onSubmit={handleSubmit}>
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
                                        value={biodata.fullName}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="position"
                                        value={biodata.position}
                                        onChange={handleBiodataChange}
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
                                        value={biodata.ktpNumber}
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
                                        value={biodata.birthPlace}
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
                                        value={biodata.birthDate}
                                        onChange={handleBiodataChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Gender</label>
                                    <select
                                        className="form-select"
                                        name="gender"
                                        value={biodata.gender}
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
                                        value={biodata.religion}
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
                                        value={biodata.bloodType}
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
                                        value={biodata.maritalStatus}
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
                                        value={biodata.ktpAddress}
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
                                        value={biodata.livingAddress}
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
                                        value={biodata.email}
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
                                        value={biodata.phone}
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
                                        value={biodata.emergencyContact}
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
                                        value={biodata.skills}
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
                                        value={biodata.expectedSalary}
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
                                        checked={biodata.placementWillingness}
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
                            {educationList.map((education, index) => (
                                <div key={index} className="border p-3 mb-3">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Education Level
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="educationLevel"
                                                value={education.educationLevel}
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
                                                    education.institutionName
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
                                                value={education.major}
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
                                                value={education.graduationYear}
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
                                                value={education.gpa}
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
                            ))}

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
                            {jobHistoryList.map((jobHistory, index) => (
                                <div key={index} className="border p-3 mb-3">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="companyName"
                                                value={jobHistory.companyName}
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
                                                value={jobHistory.lastPosition}
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
                                                value={jobHistory.lastSalary}
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
                                                value={jobHistory.year}
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
                            ))}

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
                            {trainingList.map((training, index) => (
                                <div key={index} className="border p-3 mb-3">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Course Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="courseName"
                                                value={training.courseName}
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
                                                value={training.year}
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
                                                    training.hasCertificate
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
                            ))}

                            <button type="submit" className="btn btn-primary">
                                Submit Biodata
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
