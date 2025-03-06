import axios from "axios"

//const videosAPI = axios.create({ baseURL: 'http://localhost:3000' })
const videosAPI = axios.create({ baseURL: 'https://midia-api-rzb1414s-projects.vercel.app' })

async function uploadVideo(formData) {
    try {
        const response = await videosAPI.post('/auth/uploadVideo', formData, {
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

async function getAllVideos() {
    try {
        const response = await videosAPI.get('/auth/videos', {
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

async function downloadVideo(id, selectedVideo) {
    try {
        const response = await videosAPI.get(`/auth/downloadVideo/${id}`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        const filename = `${selectedVideo.filename}.mp4`;

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
        
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

export {
    uploadVideo,
    getAllVideos,
    downloadVideo
}