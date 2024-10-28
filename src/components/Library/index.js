import './Library.css';
import {getBooks, deleteBook} from '../../services/books.js'
import { useState, useEffect } from 'react';

const Library = ({ setHidden, refresh })  => {

    const id = localStorage.getItem('id')

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getBooks()
            setBooks(books)
        }
        fetchBooks()
    }, [refresh])

    const handleClick = async (e) => {
        
    }

    return (
        <div className={setHidden ? 'library' : 'none'}>
            <h1 className='libraryTitle'>Library</h1>
            <ul className='libraryList'>
                {books && books.length > 0 ? books.map((book) => {
                    return (
                        <li className='libraryListItem' 
                        key={book._id}
                        onClick={handleClick}>
                            <img src={book.imgUrl} alt='book cover' />
                        </li>
                    )
                }) : <p>No books in your library</p>}
            </ul>
        </div>
    )
}

export default Library