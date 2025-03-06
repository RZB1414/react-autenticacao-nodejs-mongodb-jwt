import './Dashboard.css';
import { dashboard, getUser } from '../../services/users';
import { useEffect, useState } from 'react';
import SearchBooks from '../SearchBooks';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg'
import { ReactComponent as LibraryIcon } from '../../assets/icons/library-icon.svg'
import { ReactComponent as VideosIcon } from '../../assets/icons/video-library.svg'
import Library from '../Library';
import { useNavigate } from 'react-router-dom';
import Videos from '../VideosLibrary';

const Dashboard = () => {
    const id = localStorage.getItem('id')

    const navigate = useNavigate()

    const [search, setSearch] = useState(true)
    const [library, setLibrary] = useState(false)
    const [videos, setVideos] = useState(false)
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
        setVideos(false)
    }

    async function handleLibrary() {
        setLibrary(true)
        setSearch(false)
        setVideos(false)
    }

    function handleVideos() {
        setVideos(true)
        setSearch(false)
        setLibrary(false)
    }

    function handleRefresh() {
        setRefresh(!refresh)
    }

    function handleLogout() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <>
            <button className='logout' onClick={handleLogout}>Logout</button>
            <div className='icons'>
                <SearchIcon className='searchIcon' onClick={handleSearch} />
                <LibraryIcon className='libraryIcon' onClick={handleLibrary} />
                <VideosIcon className='wishListIcon' onClick={handleVideos} />
            </div>
            <div className='dashboard'>
                <p>Welcome to your personal library</p>
            </div>

            <SearchBooks setHidden={search} setRefresh={handleRefresh}/>
            <Library setHidden={library} refresh={refresh} setRefresh={handleRefresh}/>
            <Videos setHidden={videos}/>
        </>

    );
}

export default Dashboard;