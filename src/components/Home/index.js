import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    const handleClickLogin = (e) => {
        e.preventDefault()
        navigate('/auth/login')
    }

    const handleClickLogon = (e) => {
        e.preventDefault()
        navigate('/auth/register')
    }

    return (
        <>
            <div className='buttons'>
                <button onClick={handleClickLogin} className='button'>Log in</button>
                <button onClick={handleClickLogon} className='button'>Sign up</button>
            </div>
            <div className="home">
                <h1>Welcome to your personal library</h1>
            </div>
        </>
    )
}

export default Home