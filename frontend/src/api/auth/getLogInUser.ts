import Axios from "@/utils/axios";

export const getLogInUser = () => {
    return Axios.get('/auth/me')
}