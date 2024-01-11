import axios from "axios"


const BASE_URL="/api/v1"
const axiosInstance=axios.create()

axiosInstance.defaultsbaseURL=BASE_URL

export default axiosInstance