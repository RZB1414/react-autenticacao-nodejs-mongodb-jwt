import axios from "axios"

const filesAPI = axios.create({ baseURL: 'https://buiatti-books-c3346d1487f9.herokuapp.com/' })

async function uploadFile(formData) {
    try {
        const response = await filesAPI.post('/auth/uploadFile', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

async function getAllFiles() {
    try {
        const response = await filesAPI.get('/auth/files', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

async function showFile (id) {
    try {
        console.log('service ID', id);
        
        const response = await filesAPI.get(`/auth/showFile/${id}`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response);
        
        return response
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? JSON.stringify(error.response.data) : (error.message)}`);
        throw error
    }
}

export { 
    uploadFile,
    getAllFiles,
    showFile
 }