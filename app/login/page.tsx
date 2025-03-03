"use client";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import images from "../../public/images";
import InputField from "../components/ui/TextInput";
import Link from "next/link";
import { Icons } from "../components/ui/icons";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
import { signIn, useSession } from "next-auth/react";
import ApiRoutes from "../api/apiRoutes";
import { loginUser } from "../api/apiClients";
import { AdminUserContext } from "../context/AdminUserContext";
import { ApplicationRoutes } from "../components/constants/ApplicationRoutes";
import TextInput from "../components/ui/TextInput";


function LoginPage() {
    const adminUserContext = useContext(AdminUserContext);
    const { fetchUserProfileInformation } = adminUserContext ?? {}; // add null check
    const { data: session, status, update } = useSession()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [authError, setAuthError] = useState("")
    const [revealPassword, setRevealPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (status === "authenticated" && session) {
            console.log("Access Token:", session.user.accessToken)
            router.push(ApplicationRoutes.Dashboard)
        }
    }, [status, session, router])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});
        setAuthError("");
        setIsLoading(true);

        const validationErrors: { email?: string; password?: string } = {};

        if (!email.trim()) {
            validationErrors.email = "Email is required.";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            validationErrors.email = "Enter a valid email address.";
        }

        if (!password.trim()) {
            validationErrors.password = "Password is required.";
        } else if (password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setAuthError("Invalid email or password.");
            } else {
                // Fetch user profile after successful login
                await fetchUserProfileInformation?.();
                router.push(ApplicationRoutes.Dashboard);
            }
        } catch (error) {
            console.error("Login error:", error);
            setAuthError("An error occurred while logging in.");
            setIsLoading(false);
        }

    };

    const handleChange = (field: "email" | "password", value: string) => {
        if (errors[field]) {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }))
        }

        if (field === "email") setEmail(value)
        if (field === "password") setPassword(value)
    }

    return (
        <div className="fixed p-12 overflow-y-auto inset-0 w-screen bg-screen bg-background flex-col flex-center">
            <Image src={images.logo || "/placeholder.svg"} height={50} width={160} alt="Logo" className="mb-[30px] mt-20" />
            <div className="w-[611px] h-[517px] bg-white rounded-[20px] py-[45px] px-12">
                <div className="flex-center mb-[44px] w-full flex-col">
                    <h3 className="">Welcome Admin</h3>
                    <p className="text-lg">Enter your login credentials to continue</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-black mb-1">Email Address</label>
                        <TextInput
                            name="email"
                            type="text"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            error={errors.email}
                        />
                    </div>
                    <div className="mt-6">
                        <label className="text-black mb-1">Your Password</label>
                        <div className="relative">
                            <TextInput
                                name="pasddword"
                                type={revealPassword ? "text" : "password"}
                                placeholder="************"
                                value={password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                error={errors.password}
                            />
                            <button
                                type="button"
                                onClick={() => setRevealPassword(!revealPassword)}
                                className="absolute right-5 top-4"
                            >
                                {revealPassword ? <Icons.EyeOpen /> : <Icons.Eye />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end mt-2">
                        <Link className="text-[#333333] font-semibold text-sm" href={"/forgot-password"}>
                            Forgot Password?
                        </Link>
                    </div>

                    {authError && <p className="text-red-600 text-sm mt-2">{authError}</p>}

                    <Button type="submit" disabled={isLoading} className="relative w-full mt-[50px] text-sm">
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage




