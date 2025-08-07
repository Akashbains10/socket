import Chat from "@/pages/chat/components/Chat";
import Login from "@/pages/auth/components/Login";
import Register from "@/pages/auth/components/Register";
import AuthLayout from "@/pages/auth/components/AuthLayout";
import HomeLayout from "@/pages/chat/components/HomeLayout";

export const routesGroups = [
    {
        base: 'auth',
        layout: AuthLayout,
        routes: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        base: '',
        layout: HomeLayout,
        routes: [
            {
                path: '',
                element: <Chat />
            }
        ]
    }
]