import './Dashboard.css';
import { dashboard, getUser } from '../../services/users';
import { useEffect, useState } from 'react';
import SearchBooks from '../SearchBooks';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg'
import { ReactComponent as LibraryIcon } from '../../assets/icons/library-icon.svg'
import { ReactComponent as WishListIcon } from '../../assets/icons/wishlist-icon.svg'
import Library from '../Library';
import WishList from '../WishList'

const Dashboard = () => {
    const id = localStorage.getItem('id')

    const [search, setSearch] = useState(true)
    const [library, setLibrary] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const [dataDashboard, setDataDashboard] = useState(null)
    const [dataUser, setDataUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultDashboard = await dashboard(id);
                setDataDashboard(resultDashboard)

                const resultUser = await getUser(id)
                const userFound = resultUser.userFound.name
                setDataUser(userFound)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            }
        }
        fetchData()
    }, [id]);

    function handleSearch() {
        setSearch(true)
        setLibrary(false)
        setWishlist(false)
    }

    async function handleLibrary() {
        setLibrary(true)
        setSearch(false)
        setWishlist(false)
        setRefresh(!refresh)
    }

    function handleWishlist() {
        setWishlist(true)
        setSearch(false)
        setLibrary(false)
    }

    return (
        <>
            <div className='icons'>
                <SearchIcon className='searchIcon' onClick={handleSearch} />
                <LibraryIcon className='libraryIcon' onClick={handleLibrary} />
                <WishListIcon className='wishListIcon' onClick={handleWishlist} />
            </div>
            <div className='dashboard'>
                <p>Welcome to your personal library</p>
            </div>

            <SearchBooks setHidden={search}/>
            <Library setHidden={library} refresh={refresh}/>
            <WishList setHidden={wishlist}/>
        </>

    );
}

export default Dashboard;