import './SearchBooks.css'
import { useEffect, useRef, useState } from 'react'
import BookInfo from '../BookInfo'

const SearchBooks = ({ setHidden, setRefresh }) => {

    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [selectedbook, setSelectedBook] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const searchTimeout = useRef(null)

    useEffect(() => {
        async function fetchData() {
            if (!search) {
                setData([])
                return
            }
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
                const foundBooks = await response.json()
                setData(foundBooks.items || [])
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current)
        }

        searchTimeout.current = setTimeout(() => {
            fetchData()
        }, 2000)

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current)
            }
        }
    }, [search])

    async function handleChange(e) {
        const result = e.target.value
        setSearch(result)
        if (!result) {
            setSelectedBook(null)
            setIsClicked(false)
        }
    }

    function handleClick(book) {
        setSelectedBook(book)
        setIsClicked(true)
    }

    return (
        <div className={setHidden ? 'div' : 'none'}>
            <div className='searchBooks'>
                <h1 className='searchBooks-title'>Search for a book</h1>
                <input className='searchBooksInput'
                    type='text'
                    placeholder='Choose your next adventure...'
                    onChange={handleChange}
                />
            </div>
            <div className={isClicked ? 'none' : 'resultBooks'}>
                <ul className='bookResults'>
                    {search && data ? data.map((book, index) => {
                        return (
                            <li key={index} className='book'>
                                {book.volumeInfo.imageLinks ?
                                    <img className='bookImg'
                                        onClick={handleClick.bind(this, book)}
                                        src={book.volumeInfo.imageLinks.thumbnail}
                                        alt='book cover'
                                    /> : <p></p>}
                            </li>
                        )
                    }) : <p></p>}
                </ul>
            </div>
            {selectedbook && <BookInfo setSelectedBook={setSelectedBook} book={selectedbook} isClicked={setIsClicked} setRefresh={setRefresh} />}
        </div>
    )
}

export default SearchBooks