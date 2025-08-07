import { LoginFormValues } from "@/pages/auth/components/Login";
import Axios from "@/utils/axios";

export const login = (payload: LoginFormValues) => {
    return Axios.post('/auth/login', payload)
}
