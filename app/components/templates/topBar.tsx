// TopBar.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { catchError } from "../constants/catchError";
import { AdminUserContext, AdminUserContextData } from "@/app/context/AdminUserContext";

function TopBar() {
    const {
        userProfileInformation: userProfile,
        fetchUserProfileInformation,
    } = React.useContext(AdminUserContext) as AdminUserContextData;

    // Fetch both user profile and notifications data on component mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                await Promise.all([
                    fetchUserProfileInformation(),
                ]);
            } catch (error) {
                toast.error("Failed to fetch data. Please try again.");
                catchError(error);
            }
        };

        fetchInitialData();
    }, [fetchUserProfileInformation]);






    return (
        <div className="w-full flex items-end pr-[55px] py-3 justify-end">
            <div className="flex gap-5 items-center">
                <Link href={"/profile"}>
                    <div className="h-[40px] w-[40px] rounded-full bg-black flex-center">
                        <p className="text-white text-base font-[800]">
                            {userProfile?.data.firstName
                                ? userProfile.data.firstName.slice(0, 2).toUpperCase()
                                : "AA"}
                        </p>
                    </div>
                </Link>
            </div>


        </div>
    );
}

export default TopBar;