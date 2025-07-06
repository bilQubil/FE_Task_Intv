import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

type Biodata = {
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
};

type EducationHistory = {
    educationLevel: string;
    institutionName: string;
    major: string;
    graduationYear: number;
    gpa: number;
};

type JobHistory = {
    companyName: string;
    lastPosition: string;
    lastSalary: number;
    year: number;
};

type TrainingHistory = {
    courseName: string;
    hasCertificate: boolean;
    year: number;
};

export default function Profile() {
    const [biodata, setBiodata] = useState<Biodata | null>(null);
    const [educationHistories, setEducationHistories] = useState<
        EducationHistory[]
    >([]);
    const [jobHistories, setJobHistories] = useState<JobHistory[]>([]);
    const [trainingHistories, setTrainingHistories] = useState<
        TrainingHistory[]
    >([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const biodataResponse = await axios.get(
                    "http://localhost:3000/biodata/me",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                );
                const educationResponse = await axios.get(
                    "http://localhost:3000/biodata/education",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                );
                const jobResponse = await axios.get(
                    "http://localhost:3000/biodata/job",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                );
                const trainingResponse = await axios.get(
                    "http://localhost:3000/biodata/training",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                );

                setBiodata(biodataResponse.data);
                setEducationHistories(educationResponse.data);
                setJobHistories(jobResponse.data);
                setTrainingHistories(trainingResponse.data);
            } catch (error) {
                const err = error as AxiosError;
                Swal.fire({
                    title: "Error",
                    text:
                        (err.response?.data as { message: string })?.message ||
                        "An error occurred",
                    icon: "error",
                    timer: 3000,
                });
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                <div className="col-md-3 col-lg-2">
                    <Sidebar />
                </div>
                <main className="col-md-9 col-lg-10 ms-auto">
                    <div className="pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2 px-4">Profile</h1>
                    </div>

                    <div className="row g-4 px-4">
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h2 className="h4">Personal Information</h2>
                                </div>
                                <div className="card-body">
                                    {biodata ? (
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <h5 className="card-title">
                                                    Basic Details
                                                </h5>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="mb-2">
                                                            <strong>
                                                                Full Name:
                                                            </strong>{" "}
                                                            {biodata.fullName}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Position:
                                                            </strong>{" "}
                                                            {biodata.position}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                KTP Number:
                                                            </strong>{" "}
                                                            {biodata.ktpNumber}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Birth:
                                                            </strong>{" "}
                                                            {biodata.birthPlace}
                                                            ,{" "}
                                                            {biodata.birthDate}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="mb-2">
                                                            <strong>
                                                                Gender:
                                                            </strong>{" "}
                                                            {biodata.gender}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Religion:
                                                            </strong>{" "}
                                                            {biodata.religion}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Blood Type:
                                                            </strong>{" "}
                                                            {biodata.bloodType}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Marital Status:
                                                            </strong>{" "}
                                                            {
                                                                biodata.maritalStatus
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <h5 className="card-title">
                                                    Contact Information
                                                </h5>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="mb-2">
                                                            <strong>
                                                                Email:
                                                            </strong>{" "}
                                                            {biodata.email}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Phone:
                                                            </strong>{" "}
                                                            {biodata.phone}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Emergency
                                                                Contact:
                                                            </strong>{" "}
                                                            {
                                                                biodata.emergencyContact
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="mb-2">
                                                            <strong>
                                                                KTP Address:
                                                            </strong>{" "}
                                                            {biodata.ktpAddress}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Living Address:
                                                            </strong>{" "}
                                                            {
                                                                biodata.livingAddress
                                                            }
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Placement
                                                                Willingness:
                                                            </strong>{" "}
                                                            {biodata.placementWillingness
                                                                ? "Yes"
                                                                : "No"}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Expected Salary:
                                                            </strong>{" "}
                                                            $
                                                            {
                                                                biodata.expectedSalary
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <h5 className="card-title">
                                                    Skills
                                                </h5>
                                                <hr />
                                                <p>{biodata.skills}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No personal information available</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h2 className="h4">Education Histories</h2>
                                </div>
                                <div className="card-body">
                                    {educationHistories.length > 0 ? (
                                        educationHistories.map((edu, index) => (
                                            <div
                                                key={index}
                                                className="mb-3 row"
                                            >
                                                <div className="col-md-6">
                                                    <p className="mb-1">
                                                        <strong>
                                                            Institution:
                                                        </strong>{" "}
                                                        {edu.institutionName}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Level:</strong>{" "}
                                                        {edu.educationLevel}
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="mb-1">
                                                        <strong>Major:</strong>{" "}
                                                        {edu.major}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>
                                                            Graduation Year:
                                                        </strong>{" "}
                                                        {edu.graduationYear}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>GPA:</strong>{" "}
                                                        {edu.gpa}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No education histories found</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h2 className="h4">Job Histories</h2>
                                </div>
                                <div className="card-body">
                                    {jobHistories.length > 0 ? (
                                        jobHistories.map((job, index) => (
                                            <div
                                                key={index}
                                                className="mb-3 row"
                                            >
                                                <div className="col-md-6">
                                                    <p className="mb-1">
                                                        <strong>
                                                            Company:
                                                        </strong>{" "}
                                                        {job.companyName}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>
                                                            Last Position:
                                                        </strong>{" "}
                                                        {job.lastPosition}
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="mb-1">
                                                        <strong>
                                                            Last Salary:
                                                        </strong>{" "}
                                                        ${job.lastSalary}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Year:</strong>{" "}
                                                        {job.year}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No job histories found</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h2 className="h4">Training Histories</h2>
                                </div>
                                <div className="card-body">
                                    {trainingHistories.length > 0 ? (
                                        trainingHistories.map(
                                            (training, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-3 row"
                                                >
                                                    <div className="col-md-6">
                                                        <p className="mb-1">
                                                            <strong>
                                                                Course:
                                                            </strong>{" "}
                                                            {
                                                                training.courseName
                                                            }
                                                        </p>
                                                        <p className="mb-1">
                                                            <strong>
                                                                Certificate:
                                                            </strong>{" "}
                                                            {training.hasCertificate
                                                                ? "Yes"
                                                                : "No"}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="mb-1">
                                                            <strong>
                                                                Year:
                                                            </strong>{" "}
                                                            {training.year}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p>No training histories found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
