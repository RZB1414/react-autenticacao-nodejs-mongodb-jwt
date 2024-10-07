import { useEffect, useState } from 'react'
import { patchUser, deleteUser } from '../../services/users'
import './PatchUser.css'

const PatchUser = ({ userToUpdate }) => {

    const [name, setName] = useState(userToUpdate.name)
    const [email, setEmail] = useState(userToUpdate.email)
    const [password, setPassword] = useState(userToUpdate.password)
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        setName(userToUpdate.name)
        setEmail(userToUpdate.email)
        setPassword(userToUpdate.password)
        setIsDeleted(false)
    
    }, [userToUpdate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            name,
            email,
            password
        }
        try {
            if (updatedUser && userToUpdate.id) {
                await patchUser(userToUpdate.id, updatedUser)
                const res = await patchUser(userToUpdate.id, updatedUser);
                console.log('Server response:', res);
                
            } else {
                console.log('userToUpdate is undefined or does not have an id');
            }
        } catch (error) {
            console.log(`Erro ao atualizar usuário => ${error.response.message}`)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const res = await deleteUser(userToUpdate.id)
            console.log('Server response:', res)
            setIsDeleted(true)
            
        } catch (error) {
            console.log(`Erro ao deletar usuário => ${error.response.message}`)
        }
    }

    return (
        <div className={`${isDeleted ? 'hidden' : 'patch-user'}`}>
            <h1>Atualizar usuário</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Update</button>
                <button type='delete' onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}

export default PatchUser