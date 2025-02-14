import axios from "axios"

//const booksAPI = axios.create({ baseURL: 'http://localhost:3000/' })
const booksAPI = axios.create({ baseURL: 'https://midia-api-rzb1414s-projects.vercel.app' })


async function getBooks() {
    try {
        const response = await booksAPI.get('/auth/books', {
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

async function getBook(id) {
    try {
        const response = await booksAPI.get(`/auth/book/${id}`, {
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

async function addBook(createdBook) {
    try {
        const bookExists = await getBook(createdBook.id)
        if (bookExists) {
            alert('You already have this book');
            return;
        }
        const response = await booksAPI.post('/auth/addBook', createdBook, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data);
        
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

async function deleteBook(id) {
    try {
        const response = await booksAPI.delete(`/auth/book/${id}`, {
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

async function deleteAllBooks() {
    try {
        const response = await booksAPI.delete('/auth/books', {
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

async function uploadFile(selectedBookId, formData) {
    console.log(selectedBookId, formData);
    
    try {
        const response = await booksAPI.post(`/auth/book/${selectedBookId}/upload`, formData, {
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

async function checkUpload(id) {    
    try {
        const response = await booksAPI.get(`auth/book/${id}/upload`, {
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

async function downloadFile(id) {
    try {
        const response = await booksAPI.get(`/auth/book/${id}/download`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            responseType: 'blob'
        })        
        return response.data

    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }	
}

export {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    deleteAllBooks,
    uploadFile,
    checkUpload,
    downloadFile
}