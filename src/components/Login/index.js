import './Login.css'
import { login } from '../../services/users.js'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/icons/backgrond.jpeg'
import { useState } from 'react'

const LogIn = () => {

    const [error, setError] = useState('')
    const [logging, setLogging] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
            const email = event.target[0].value
            const password = event.target[1].value

        try {
            setLogging(true)
            const response = await login(email, password)
            const token = response.token
            console.log('Server response:', response)
            localStorage.setItem('token', token)
            localStorage.setItem('id', response.id)
            navigate('/auth/dashboard')
            setLogging(false)
        } catch (error) {
            setLogging(false)
            setError(error.response.data)
            console.error('Error response:', error.response)
            console.error('Error message:', error.message)
    }
}

    return (
        <div className="login">
            <h1>Log in</h1>
            <p className='error'>{error}</p>
            <form className='form' onSubmit={handleSubmit}>
                <input className='input' type="email" placeholder="Email" />
                <input className='input' type="password" placeholder="Password" />
                <button className='input-button' type="submit">{logging ? 'Logging...' : 'Log in'}</button>
            </form>
            <img src={img} alt='background' className='home-img' />
        </div>
    )
}

export default LogIn