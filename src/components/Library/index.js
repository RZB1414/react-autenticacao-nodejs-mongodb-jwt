import './Library.css';
import { getBooks } from '../../services/books.js'
import { getAllFiles } from '../../services/files.js'
import { useState, useEffect } from 'react'
import BookInfoLibrary from '../BookInfoLibrary/index.js'
import { ReactComponent as Files } from '../../assets/icons/files-icon.svg'
import { ReactComponent as Books } from '../../assets/icons/book-icon.svg'
import FilesLibrary from '../FilesLibrary/index.js'

const Library = ({ setHidden, refresh, setRefresh }) => {

    const id = localStorage.getItem('id')

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const [isClickedFiles, setIsClickedFiles] = useState(false)
    const [activeIcon, setActiveIcon] = useState('books')
    const [filesRefresh, setFilesRefresh] = useState(false)
    const [filesSaved, setFilesSaved] = useState([])
    const [allMarkers, setAllMarkers] = useState([])


    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getBooks()
            const userBooks = books.filter(book => book.users.includes(id))
            setBooks(userBooks)
        }
        fetchBooks()
    }, [refresh, id])

    async function allFiles() {
        try {
            const response = await getAllFiles()
            if (!Array.isArray(response) || response.length === 0 ) {
                console.log('No files saved');
                return
            }
            setFilesSaved(response)
            console.log(response);
            

            const uniqueMarkers = [...new Set(response.map(file => file.metadata))]
            setAllMarkers(uniqueMarkers)
        } catch (error) {
            console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
            throw error
        }
    }

    useEffect(() => {
        allFiles()
    }, [filesRefresh])

    function handleClick(book) {
        setSelectedBook(book)
        setIsClicked(true)
    }

    function handleFiles() {
        setIsClickedFiles(true)
        setActiveIcon('files')
    }

    function handleBooks() {
        setIsClickedFiles(false)
        setActiveIcon('books')
    }

    function handleFilesRefresh() {
        setFilesRefresh(!filesRefresh)
    }

    return (
        <div className={setHidden ? 'library' : 'none'}>
            <div className={isClicked ? 'none' : 'div'}>
                <div className='library-options'>
                    <Books className={`booksIcon ${activeIcon === 'books' ? 'active' : ''}`} onClick={handleBooks} />
                    <Files className={`filesIcon ${activeIcon === 'files' ? 'active' : ''}`} onClick={handleFiles} />
                </div>
                <ul className={isClickedFiles ? 'none' : 'libraryList'}>
                    {books && books.length > 0 ? books.map((book) => {
                        return (
                            <li className='libraryListItem'
                                key={book._id}
                                onClick={handleClick.bind(this, book)}>
                                <img src={book.imgUrl} alt='book cover' />
                            </li>
                        )
                    }) : <p>No books in your library</p>}
                </ul>
                {isClickedFiles ? <FilesLibrary filesSaved={filesSaved} handleFilesRefresh={handleFilesRefresh} allMarkers={allMarkers} /> : null}
            </div>
            {selectedBook && <BookInfoLibrary
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                isClicked={setIsClicked}
                setRefresh={setRefresh}
            />}
        </div>
    )
}

export default Library