import './FilesLibrary.css'
import { ReactComponent as UploadIcon } from '../../assets/icons/upload-icon.svg'
import { ReactComponent as AddIcon } from '../../assets/icons/add-circle-icon.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as ClosePdfIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as CloseMarkerIcon } from '../../assets/icons/close-x-icon.svg'
import { useState } from 'react'
import { uploadFile } from '../../services/files'
import ShowPdfFile from '../ShowPdfFile'

const FilesLibrary = ({ filesSaved, handleFilesRefresh, allMarkers }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [marker, setMarker] = useState('')
    const [isMarkerClicked, setIsMarkerClicked] = useState(false)
    const [isAddingFile, setIsAddingFile] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')
    const [isPdfClicked, setIsPdfClicked] = useState(false)
    const [selectedPdf, setSelectedPdf] = useState(null)
    const [isCreatingNewMarker, setIsCreatingNewMarker] = useState(false)
    

    const id = localStorage.getItem('id')

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        setUploadStatus('')
    }

    const handleNameChange = (e) => {
        setFileName(e.target.value)
    }

    const handleMarkerChange = (e) => {
        setMarker(e.target.value)
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

    const handleMarkerCloseIcon = () => {
        setMarker('')
        setIsMarkerClicked(false)
    }

    const handleMarkers = (marker) => {
        setMarker(marker)
        setIsMarkerClicked(true)
    }

    const handleSelectMarkerChange = (e) => {
        if (e.target.value === 'new') {
            setIsCreatingNewMarker(true)
            setMarker('')
        } else {
            setIsCreatingNewMarker(false)
            setMarker(e.target.value)
        }
    }

    const handlePdfClicked = (file) => {
        setIsPdfClicked(true)
        setSelectedPdf(file._id)
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

        if (!marker) {
            setUploadStatus('Please select or create a marker');
            return;
        }

        const formData = new FormData()
        formData.append('textFile', selectedFile)
        formData.append('fileName', fileName)
        formData.append('marker', marker)
        formData.append('userId', id)    

        try {
            setUploadStatus('Uploading file')
            const response = await uploadFile(formData)
            console.log('reposta', response);
            
            setUploadStatus('File uploaded')
            handleFilesRefresh()
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
                    <select
                    className='filesLibrary-selectMarker'
                    value={marker}
                    onChange={handleSelectMarkerChange}
                    >
                        <option 
                        className='optionBox'
                        value=''>Select a marker</option>
                        {allMarkers.map((markerItem, index) => (
                            <option 
                            className='optionBox-item'
                            key={index} 
                            value={markerItem}>
                                {markerItem}
                            </option>
                        ))}
                        <option value='new'>Create new marker</option>
                    </select>
                    {isCreatingNewMarker &&
                    <input type='text'
                        className='filesLibrary-markerFile'
                        placeholder='New Marker'
                        value={marker}
                        onChange={handleMarkerChange}
                    />
                    }
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

                <div className={isMarkerClicked ? 'none' : 'showmarkers'}>
                    <ul className='showmarkers-list'>
                        {allMarkers.map((metadata, index) => (
                            <li
                                onClick={() => handleMarkers(metadata)}
                                key={index}
                                className='showmarkers-list-item'>
                                {metadata}
                            </li>
                        ))
                        }
                    </ul>
                </div>

                <div className={isMarkerClicked ? 'showfiles' : 'none'}>
                    <CloseMarkerIcon className='filesLibrary-markerCloseIcon' onClick={handleMarkerCloseIcon} />
                    <ul className='showfiles-list'>
                        {filesSaved.filter(file => file.metadata.marker === marker).map((file, index) => (
                            <li
                                key={index}
                                className='showfiles-list-item'
                                onClick={() => handlePdfClicked(file)}>
                                {file.filename}
                            </li>
                        ))
                        }
                    </ul>
                </div>

            </div>
            <ClosePdfIcon className={isPdfClicked ? 'closePdfIcon' : 'none'} onClick={() => setIsPdfClicked(false)} />
            {selectedPdf && isPdfClicked ? <ShowPdfFile id={selectedPdf} /> : null}
        </>
    )
}

export default FilesLibrary