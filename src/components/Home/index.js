import './Home.css'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/icons/backgrond.jpeg'

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
                <h1 className='home-title'>Welcome to your personal library</h1>
                <img src={img} alt='background' className='home-img' />
            </div>
        </>
    )
}

export default Home