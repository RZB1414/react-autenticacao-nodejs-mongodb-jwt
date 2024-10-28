import axios from "axios"

const booksAPI = axios.create({ baseURL: 'http://localhost:3000/' })

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

export {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    deleteAllBooks
}