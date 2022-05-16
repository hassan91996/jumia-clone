import axios  from "axios";

const instance=axios.create({
    baseURL:process.env.REACT_APP_SERVER_URL
})

instance.interceptors.request.use((req)=>{

    if(localStorage.getItem('token')){
        req.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
    }
    return req

})

export default instance