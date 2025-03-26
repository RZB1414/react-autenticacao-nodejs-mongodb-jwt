import axios from "axios"
import config from "../connection.js"

//const videosAPI = axios.create({ baseURL: 'http://localhost:3000' })
//const videosAPI = axios.create({ baseURL: 'https://midia-api-rzb1414s-projects.vercel.app' })
const videosAPI = axios.create({ baseURL: `${config}` })

async function uploadVideo(formData, onProgress) {
    try {
        const response = await videosAPI.post('/auth/uploadVideo', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    onProgress(progress)
                }
            }
        })
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 500) {
            console.error('Upload Error:', error.response.data.msg);
            alert(`Upload Error: ${error.response.data.msg}`);
        } else {
            console.error('Upload Error:', error);
            alert('An unexpected error occurred during the upload.');
        }
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

async function downloadVideo(id, selectedVideo, onProgress) {
    try {
        const response = await videosAPI.get(`/auth/downloadVideo/${id}`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            onDownloadProgress: (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    onProgress(progress)
                }
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
        console.error('Error:', error)
    }
}

async function deleteVideo(id) {
    try {
        const response = await videosAPI.delete(`/auth/deleteVideo/${id}`, {
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

export {
    uploadVideo,
    getAllVideos,
    downloadVideo,
    deleteVideo
}