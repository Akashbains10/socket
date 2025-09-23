import Axios from "@/utils/axios";

export const uploadFile = (payload: File[]) => {
    const formData = new FormData();
    payload.forEach(file=> {
        formData.append('files', file)
    })
    return Axios.post('/users/upload',formData)
}