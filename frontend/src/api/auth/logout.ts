import Axios from "@/utils/axios";

export const logout = () => {
    return Axios.get('/auth/logout')
}