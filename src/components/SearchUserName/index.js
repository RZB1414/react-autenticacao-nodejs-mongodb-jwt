import './SearchUserName.css'
import { useState } from 'react'
import { getUsers } from '../../services/users'
import PatchUser from '../PatchUser'

const SearchUserName = () => {

    const [userFound, setUserFound] = useState('')
    const [userToUpdate, setUserToUpdate] = useState()

    const handleOnChange = async (e) => {
        const userSearched = e.target.value
        if (userSearched === '') {
            setUserFound('')
            return
        }
        const allUsers = await getUsers()
        const foundUser = allUsers.filter(user => user.name.toLowerCase().includes(userSearched.toLowerCase()))
        return setUserFound(foundUser)
    }

    const handleClick = (user) => {
        const userClicked = {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        }
        setUserToUpdate(userClicked)
        setUserFound('')
    }

    return (
        <div className="search-user-name">
            <h2>Search User by Name</h2>
            <form className='formSearch'>
                <input type="text" placeholder="User Name" onChange={handleOnChange} />
            </form>
            <ul className='listFound'>
                {userFound === '' ? (
                    <p></p>
                ) : (
                    userFound.map((user, index) => (
                        <li onClick={() => handleClick(user)} className='userFound' key={index}>{user.name}</li>
                    ))
                )}
            </ul>
            {userToUpdate !== null && userToUpdate !== undefined && <PatchUser userToUpdate={userToUpdate} />}
        </div>
    )
}

export default SearchUserName