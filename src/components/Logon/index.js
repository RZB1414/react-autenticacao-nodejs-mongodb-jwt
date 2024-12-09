import './Logon.css'
import { postUser } from '../../services/users.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import img from '../../assets/icons/backgrond.jpeg'
const LogOn = () => {

    const [error, setError] = useState('')
    const [creatingUser, setCreatingUser] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const createdUser = {
            name: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value,
            confirmpassword: event.target[3].value
        }

        try {
            setCreatingUser(true)
            const response = await postUser(createdUser)
            console.log('Server response:', response)
            setCreatingUser(false)
            navigate('/auth/login')
            
        } catch (error) {
            setError(error.response.data)
            console.error('Error response:', error.response)
            console.error('Error message:', error.message)
    }
}

    return (
        <div className="login">
            <h1>Log on</h1>
            <p className='error'>{error}</p>
            <form className='form' onSubmit={handleSubmit}>
                <input className='input' type="text" placeholder="Name" />
                <input className='input' type="email" placeholder="Email" />
                <input className='input' type="password" placeholder="Password" />
                <input className='input' type="password" placeholder="Confirm the password" />
                <button type="submit">{ creatingUser? 'Creating...' : 'Create User'}</button>
            </form>
            <img src={img} alt='background' className='home-img' />
        </div>
    )
}

export default LogOn