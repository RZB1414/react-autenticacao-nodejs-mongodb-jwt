import './Login.css'
import { login } from '../../services/users.js'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
            const email = event.target[0].value
            const password = event.target[1].value

        try {
            const response = await login(email, password)
            const token = response.token
            console.log('Server response:', response)
            localStorage.setItem('token', token)
            localStorage.setItem('id', response.id)
            navigate('/auth/dashboard')
        } catch (error) {
            console.error('Error response:', error.response)
            console.error('Error message:', error.message)
    }
}

    return (
        <div className="login">
            <h1>Log in</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input className='input' type="email" placeholder="Email" />
                <input className='input' type="password" placeholder="Password" />
                <button className='input-button' type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LogIn