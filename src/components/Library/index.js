import './Library.css';
import { getBooks } from '../../services/books.js'
import { useState, useEffect } from 'react';
import BookInfoLibrary from '../BookInfoLibrary/index.js';

const Library = ({ setHidden, refresh, setRefresh }) => {

    const id = localStorage.getItem('id')

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [isClicked, setIsClicked] = useState(false)


    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getBooks()
            const userBooks = books.filter(book => book.users.includes(id))
            setBooks(userBooks)
        }
        fetchBooks()
    }, [refresh, id])

    function handleClick(book) {
        setSelectedBook(book)
        setIsClicked(true)
    }

    return (
            <div className={setHidden ? 'library' : 'none'}>
                <div className={isClicked ? 'none' : 'div'}>

                    <h1 className='libraryTitle'>Library</h1>
                    <ul className='libraryList'>
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