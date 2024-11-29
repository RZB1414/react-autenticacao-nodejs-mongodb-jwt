import axios from 'axios'

//const usersAPI = axios.create({ baseURL: 'https://autenticacao-nodejs-mongodb-jwt.vercel.app/' })
const usersAPI = axios.create({ baseURL: 'https://autenticacao-nodejs-mongodb-jwt.vercel.app/' })

async function login(email, password) {
    try {
        const response = await usersAPI.post('/auth/login', { email, password })
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

async function getUsers() {
    try {
        const response = await usersAPI.get('/auth/users')
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

async function getUser(id) {
    try {
        const response = await usersAPI.get(`/auth/user/${id}`, {
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

async function postUser(createdUser) {
    try {
        const response = await usersAPI.post('/auth/register/', createdUser)
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

async function patchUser(id, updatedUser) {
    try {
        const response = await usersAPI.patch(`/auth/user/${id}`, updatedUser)
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

async function deleteUser(id) {
    try {
        const response = await usersAPI.delete('auth/user/' + id)
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

async function dashboard(id) {
    try {
        const token = localStorage.getItem('token')
        const response = await usersAPI.get(`/auth/dashboard/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
        throw error
    }
}

export {
    login,
    getUsers,
    postUser,
    getUser,
    patchUser,
    deleteUser,
    dashboard
}