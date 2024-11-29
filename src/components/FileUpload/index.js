import './FileUpload.css'
import{ ReactComponent as CloseIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as UploadIcon } from '../../assets/icons/upload-icon.svg'
import { useState } from 'react'
import { uploadFile } from '../../services/books'

const FileUpload = ({ selectedBook, fileClicked, setFileClicked }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadStatus, setUploadStatus] = useState('')

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        console.log(e.target.files[0]);
        
    }

    const handleUpload = async () => {
        if(!selectedFile) {
            setUploadStatus('Please select a file')
            return
        }

        const formData = new FormData()
        formData.append('textFile', selectedFile)

        try {
            const response = await uploadFile(selectedBook.id, formData)
            setUploadStatus('File uploaded successfully')
            console.log(response);
            setFileClicked(false)
        }
        catch (error) {
            console.error('Upload Error: ', error)
            setUploadStatus('Error uploading file.')
        }
    }

    return (
        <div className={fileClicked ? 'fileUpload' : 'none'}>
            <CloseIcon 
            className='fileupload-closeIcon'
            onClick={() => setFileClicked(false)}
            />
            <h1 className='fileupload-title'>Upload your file...</h1>

            <label htmlFor="file-upload" className='fileupload-label'>
                <UploadIcon className="fileupload-uploadIcon"/>
            </label>
            <input 
                id="file-upload" 
                type='file' 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
            />

            <p className='fileupload-status'>{uploadStatus}</p>

            <button 
            className='fileupload-button'
            onClick={handleUpload}
            >Upload</button>
        </div>
    )
}

export default FileUpload