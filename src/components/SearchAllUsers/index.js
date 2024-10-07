import './Search.css'
import { getUsers } from '../../services/users';
import { useEffect, useState } from 'react';

const Search = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        try {
            getUsers().then(data => {
                setUsers(data)
            })
        } catch (error) {
            console.error(`Tá dando esse erro aqui ó ${error.message}`)
        }
    }, [users])

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} -- id: {user._id}</li>
                ))}
            </ul>
        </div>
    )
}

export default Search