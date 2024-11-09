import './BookInfo.css'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as AddIcon } from '../../assets/icons/add-circle-icon.svg'
import { addBook } from '../../services/books'
import { useEffect } from 'react'

const BookInfo = ({ setSelectedBook, book, isClicked, setRefresh }) => {

    const id = localStorage.getItem('id')
    
    const selectedBook ={
        id: book.id,
        imgUrl: book.volumeInfo.imageLinks.thumbnail,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        releaseDate: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
        pageCount: book.volumeInfo.pageCount,
        users: id
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function handleClick() {
        isClicked(false)
        setSelectedBook(null)
    }

    function handleAddwishlist() {

    }

    async function handleAddlibrary() {
        try {            
            await addBook(selectedBook).then(() => {
                isClicked(false)
                setRefresh()
            })   
        } catch (error) {
            console.error('Error adding book to library:', error)
        }
    }

    return (
        <div className='bookInfo'>
            <div className='addwishlist'>
                <AddIcon className='addIcon' onClick={handleAddwishlist}/>
                <p style={{fontSize: 18, marginLeft: 5}}>WishList</p>
            </div>
            <div className='addlibrary'>
                <AddIcon className='addIcon' onClick={handleAddlibrary} />
                <p style={{fontSize: 18, marginLeft: 5}}>Library</p>
            </div>

            <CloseIcon className='closeIcon' onClick={handleClick} />

            <img className='imgbook' src={selectedBook.imgUrl} alt='book cover' />
            <p className='booktitle'>{selectedBook.title}</p>
            <ul className='listauthorsbook'>
                {selectedBook.author.map((author, index) => {
                    return (
                        <li className='authorsbook' key={index}>{author}</li>
                    )
                })}
            </ul>
            <p className='bookdate'>Release date: {selectedBook.releaseDate}</p>
            <p>{selectedBook.description}</p>
            <p>{selectedBook.pageCount} pages.</p>
        </div>
    )
}

export default BookInfo