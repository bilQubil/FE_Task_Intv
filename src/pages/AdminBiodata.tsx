import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

interface Biodata {
    id?: number;
    fullName: string;
    birthDate: string;
    position: string;
}

interface EducationHistory {
    id?: number;
    school: string;
    degree?: string;
    graduationYear?: string;
}

interface JobHistory {
    id?: number;
    company: string;
    position?: string;
    startDate?: string;
    endDate?: string;
}

interface TrainingHistory {
    id?: number;
    name: string;
    date?: string;
    description?: string;
}

interface UserData {
    id: number;
    fullName: string;
    birthDate: string;
    position: string;
    biodata?: Biodata;
    educationHistories?: EducationHistory[];
    jobHistories?: JobHistory[];
    trainingHistories?: TrainingHistory[];
}

function AdminBiodata() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                "http://localhost:3000/admin/biodata",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to fetch users",
                icon: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSelect = (user: UserData) => {
        navigate(`/biodata/${user.id}`);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div
                className="container-fluid"
                style={{ marginLeft: "280px", padding: "20px" }}
            >
                <div className="row">
                    <div className="col-md-12">
                        <h2>Users List</h2>
                        {isLoading ? (
                            <p>Loading users...</p>
                        ) : (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Birth Date</th>
                                        <th>Position</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            onClick={() =>
                                                handleUserSelect(user)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <td>{user.fullName}</td>
                                            <td>
                                                {user.birthDate.split("T")[0]}
                                            </td>
                                            <td>{user.position}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminBiodata;
