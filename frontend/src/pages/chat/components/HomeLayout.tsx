import React from "react"
import { Navigate } from "react-router-dom";

const HomeLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/auth/login" replace />

    return (
        <div>
            Welcome to home layout
            {children}
        </div>
    )
}

export default HomeLayout
