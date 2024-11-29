import './BookInfoLibrary.css'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-button.svg'
import { deleteBook, checkUpload, downloadFile } from '../../services/books'
import { ReactComponent as UploadIcon } from '../../assets/icons/upload-icon.svg'
import { ReactComponent as FileUploadedIcon } from '../../assets/icons/check-icon.svg'
import { ReactComponent as DownloadFileIcon } from '../../assets/icons/download-icon.svg'
import { useEffect, useState } from 'react'
import FileUpload from '../FileUpload'

const BookInfoLibrary = ({ selectedBook, setSelectedBook, isClicked, setRefresh }) => {

    const [fileClicked, setFileClicked] = useState(false)
    const [fileUploaded, setFileUploaded] = useState(false)
    const [downloadStatus, setDownloadStatus] = useState('')
    const [isDownloading, setIsDownloading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        const checkFile = async () => {
            const response = await checkUpload(selectedBook.id)
            setFileUploaded(response.hasFile)
        }
        checkFile()
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

    const handleUpload = () => {
        setFileClicked(true)
    }

    const handleDownload = async () => {
        setIsDownloading(false)
        setDownloadStatus('Downloading')
        try{
        const response = await downloadFile(selectedBook.id)
        const url = window.URL.createObjectURL(new Blob([response]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${selectedBook.title}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
        setDownloadStatus('Downloaded')
        } catch (error) {
            console.error('Download Error:', error);
            setDownloadStatus('Download failed.')
        }
        setTimeout(() => {
            setIsDownloading(true)
        }, 2000)
    }

    return (
        <div className='bookInfo'>
            <CloseIcon className='closeIcon' onClick={handleClick} />
            <DeleteIcon className='deleteIcon' onClick={handleDelete} />
            <UploadIcon className={fileUploaded ? 'none' : 'uploadIcon'} onClick={handleUpload} />
            <FileUploadedIcon className={fileUploaded ? 'fileUploadedIcon' : 'none'} />
            <DownloadFileIcon className={fileUploaded && isDownloading ? 'downloadFileIcon' : 'none'} onClick={handleDownload} />

            <FileUpload selectedBook={selectedBook} fileClicked= {fileClicked} setFileClicked={setFileClicked} />

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
            {<p className={isDownloading ? 'none' : 'downloadstatus'}>{downloadStatus}</p>}
        </div>
    )
 }

export default BookInfoLibrary