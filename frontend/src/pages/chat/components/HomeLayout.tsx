import { useAuth } from "@/provider/AuthProvider";
import Spinner from "@/ui/Spinner";
import React from "react"
import { Navigate } from "react-router-dom";

const HomeLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const {user, isLoading} = useAuth();

    if (isLoading) return <Spinner/>

    if (!user) return <Navigate to="/auth/login" replace />

    return (
        <div>
            {children}
        </div>
    )
}

export default HomeLayout
