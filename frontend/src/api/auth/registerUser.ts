import { TRegisterDTO } from "@/types/register"
import Axios from "@/utils/axios"


export const registerUser = (payload: TRegisterDTO) => {
    return Axios.post('/auth/register', payload)
}
