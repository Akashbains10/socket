import { Navigate } from "react-router-dom";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

  const token = localStorage.getItem('token');

  if (token) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#fafafae6] px-12 py-6 rounded-lg shadow-md w-full md:max-w-[30%] max-w-[90%]">
        {children}
      </div>
    </div>
  );

}

export default AuthLayout
