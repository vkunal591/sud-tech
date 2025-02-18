"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/hooks/apiUtils";
import { useAuth } from "@/context/AuthContext";

const Register: React.FC = () => {
    const router = useRouter();
    const { token, login } = useAuth();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const localEmail = localStorage.getItem("email");
        const localPassword = localStorage.getItem("password");
        const response: any = await Post(
            "/api/register",
            {
                fullName: fullName,
                email: email || localEmail,
                phoneNumber: phoneNumber,
                password: password || localPassword,
            },
            5000
        );
        if (response?.success) {
            const token = response?.data?.token;
            const adminDetails = response?.data?.userData;
            login(token, adminDetails);
        }
    };

    return (
        <div className="bg-[url('/assets/bg/bgLogin.jpg')] bg-cover min-h-screen flex justify-center items-center">
            <div className="container-sm m-5 mx-2 bg-white shadow rounded-md h-auto items-center lg:py-2 lg:flex lg:w-2/3 lg:mx-auto">
                <div className="col mx-auto pt-6 px-10  text-center lg:mx-0 lg:flex-auto lg:py-4 lg:text-left lg:w-2/4 lg:pt-6 lg:px-2 lg:pl-10">
                    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                        <h1 className="text-2xl mb-4">Register</h1>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="fullName">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div><div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber" 
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
