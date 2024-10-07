import './Login.css'
import { postUser } from '../../services/users.js'

const LogOn = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const createdUser = {
            name: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value,
            confirmpassword: event.target[3].value
        }

        try {
            const response = await postUser(createdUser)
            console.log('Server response:', response)
            event.target.reset()
            
        } catch (error) {
            console.error('Error response:', error.response)
            console.error('Error message:', error.message)
    }
}

    return (
        <div className="login">
            <h1>Log on</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input className='input' type="text" placeholder="Name" />
                <input className='input' type="email" placeholder="Email" />
                <input className='input' type="password" placeholder="Password" />
                <input className='input' type="password" placeholder="Confirm the password" />
                <button type="submit">Create User</button>
            </form>
        </div>
    )
}

export default LogOn