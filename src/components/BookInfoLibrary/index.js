import './BookInfoLibrary.css'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-button.svg'
import { deleteBook } from '../../services/books'
import { useEffect } from 'react'

const BookInfoLibrary = ({ selectedBook, setSelectedBook, isClicked, setRefresh }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleClick = () => {
        isClicked(false)
        setSelectedBook(null)
    }

    const handleDelete = async () => {
        const response = await deleteBook(selectedBook.id)
        console.log(response);
        isClicked(false)
        setSelectedBook(null)
        setRefresh()
    }

    return (
        <div className='bookInfo'>
            <CloseIcon className='closeIcon' onClick={handleClick} />
            <DeleteIcon className='deleteIcon' onClick={handleDelete} />

            <img className='imgbook' src={selectedBook.imgUrl} alt='book cover' />
            <p className='booktitle'>{selectedBook.title}</p>
            <ul className='listauthorsbook'>
                {selectedBook.author && selectedBook.author.map((author, index) => {
                    return (
                        <li className='authorsbook' key={index}>{author}</li>
                    )
                })
                }
            </ul>
            <p className='bookdate'>Release date: {selectedBook.releaseDate}</p>
            <p>{selectedBook.description}</p>
            <p>{selectedBook.pageCount} pages.</p>
        </div>
    )
 }

export default BookInfoLibrary