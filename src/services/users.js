import axios from 'axios'

const usersAPI = axios.create({ baseURL: 'https://autenticacao-nodejs-mongodb-jwt.vercel.app/' })

async function getUsers() {
    const response = await usersAPI.get('/auth/users')
    return response.data
}

async function getUser(id) {
    const response = await usersAPI.get(`/auth/user/${id}`)
    return response.data
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

export {
    getUsers,
    postUser,
    getUser,
    patchUser,
    deleteUser
}