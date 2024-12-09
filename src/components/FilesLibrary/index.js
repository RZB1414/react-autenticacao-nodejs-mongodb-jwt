import './FilesLibrary.css'
import { ReactComponent as UploadIcon } from '../../assets/icons/upload-icon.svg'
import { ReactComponent as AddIcon } from '../../assets/icons/add-circle-icon.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as ClosePdfIcon } from '../../assets/icons/close-x-icon.svg'
import { useState } from 'react'
import { uploadFile } from '../../services/files'
import ShowPdfFile from '../ShowPdfFile'

const FilesLibrary = ({ filesSaved, filesRefresh, handleFilesRefresh }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [isAddingFile, setIsAddingFile] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')
    const [isPdfClicked, setIsPdfClicked] = useState(false)
    const [selectedPdf, setSelectedPdf] = useState(null)

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        setUploadStatus('')       
    }

    const handleNameChange = (e) => {
        setFileName(e.target.value)
    }

    const handleAddFile = () => {
        setIsAddingFile(true)
    }

    const handleCloseIcon = () => {
        setSelectedFile(null)
        setFileName('')
        setUploadStatus('')
        setIsAddingFile(false)
    }

    const handlePdfClicked = (file) => {
        setIsPdfClicked(true)
        setSelectedPdf(file._id)
        console.log(file._id);
        
    }

    const handleUpload = async () => {
        if (!fileName) {
            setUploadStatus('Please name the file')
            return
        }

        if (!selectedFile) {
            setUploadStatus('Please select a file')
            return
        }

        const formData = new FormData()
        formData.append('textFile', selectedFile)
        formData.append('fileName', fileName)

        try {
            setUploadStatus('Uploading file')
            const response = await uploadFile(formData)
            setUploadStatus('File uploaded')
            handleFilesRefresh(!filesRefresh)
            console.log(response)
            setTimeout(() => {
                handleCloseIcon()
            }, 2000)
        }
        catch (error) {
            console.error('Upload Error: ', error)
            setUploadStatus('Error uploading file.')
        }
    }

    return (
        <>
        <div className={isPdfClicked ? 'none' : 'filesLibrary'}>
            <div className='filesLibrary-header'>
                <h1 className='filesLibrary-title'>Files</h1>
                <AddIcon className='filesLibrary-addIcon' onClick={handleAddFile} />

            </div>

            <div className={isAddingFile ? 'is-adding' : 'none'}>
                <CloseIcon className='filesLibrary-closeIcon' onClick={handleCloseIcon} />
                <input type='text'
                    className='filesLibrary-nameFile'
                    placeholder='Name of the file'
                    value={fileName}
                    onChange={handleNameChange}
                />
                <label htmlFor='file-upload' className='filesLibrary-label'>
                    <UploadIcon className='filesLibrary-uploadIcon' onClick={handleAddFile} />
                </label>
                <p>{selectedFile ? selectedFile.name : ''}</p>
                <input
                    id='file-upload'
                    type='file'
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <p className='fileupload-status'>{uploadStatus}</p>
                {uploadStatus === 'Uploading file' 
                ? <div className="loader" style={{ marginTop: '20px' }}></div>
                : <button className={uploadStatus === 'File uploaded' ? 'none' : 'filesLibrary-button'}
                    onClick={handleUpload}
                >Upload</button>}
            </div>
            
            <div className='showfiles'>
                    <ul className='showfiles-list'>
                        {filesSaved.map((file, index) => (
                            <li 
                                onClick={() => handlePdfClicked(file)}
                                className='show-files-list-item' 
                                key={index}>
                                {file.filename}

                            </li>
                        ))}
                    </ul>
            </div>
        </div>
        <ClosePdfIcon className={isPdfClicked ? 'closePdfIcon' : 'none'} onClick={() => setIsPdfClicked(false)} />
        {selectedPdf && isPdfClicked ? <ShowPdfFile id={selectedPdf} /> : null}
        </>
    )
}

export default FilesLibrary