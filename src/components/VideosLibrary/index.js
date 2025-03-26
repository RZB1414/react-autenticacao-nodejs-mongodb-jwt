import './VideosLibrary.css'
import { ReactComponent as UploadIcon } from '../../assets/icons/upload-icon.svg'
import { ReactComponent as AddIcon } from '../../assets/icons/add-circle-icon.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as CloseMarkerIcon } from '../../assets/icons/close-x-icon.svg'
import { useEffect, useState } from 'react'
import { getAllVideos, uploadVideo } from '../../services/videos'
import ShowVideo from '../ShowVideo'

const VideosLibrary = ({ setHidden }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [videoName, setVideoName] = useState('')
    const [description, setDescription] = useState('')
    const [marker, setMarker] = useState('')
    const [isMarkerClicked, setIsMarkerClicked] = useState(false)
    const [isAddingFile, setIsAddingFile] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')
    const [isVideoClicked, setIsVideoClicked] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [isCreatingNewMarker, setIsCreatingNewMarker] = useState(false)
    const [videosSaved, setVideosSaved] = useState([])
    const [allVideoMarkers, setAllVideoMarkers] = useState([])
    const [addingNewVideo, setAddingNewVideo] = useState(false)
    const [deletingVideo, setDeletingVideo] = useState(false)
    const [downloadProgress, setDownloadProgress] = useState(0)

    async function allVideos() {
        try {
            const responseAll = await getAllVideos()
            if (!Array.isArray(responseAll) || responseAll.length === 0) {
                console.log('No videos saved');
                return
            }
            const response = responseAll.filter(file => file.metadata.userId.includes(id))
            setVideosSaved(response)

            const uniqueVideoMarkers = [...new Set(response.map(file => file.metadata.marker))]
            setAllVideoMarkers(uniqueVideoMarkers)           

        } catch (error) {
            console.error(`Erro servidor => ${error.response ? error.response.data : error.message}`)
            throw error
        }
    }

    useEffect(() => {        
        allVideos()
    }, [addingNewVideo, deletingVideo])


    const id = localStorage.getItem('id')

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        setUploadStatus('')
    }

    const handleNameChange = (e) => {
        setVideoName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleMarkerChange = (e) => {
        setMarker(e.target.value)
    }

    const handleAddFile = () => {
        setIsAddingFile(true)
    }

    const handleCloseIcon = () => {
        setSelectedFile(null)
        setVideoName('')
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

    const handleVideoClicked = (file) => {
        setSelectedVideo(file)
        setIsVideoClicked(true)
    }

    const handleUpload = async () => {
        if (!videoName) {
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
        formData.append('videoFile', selectedFile)
        formData.append('videoName', videoName)
        formData.append('description', description)
        formData.append('marker', marker)
        formData.append('userId', id)

        try {
            setUploadStatus('Uploading file')
            await uploadVideo(formData, (progress) => {
                setDownloadProgress(progress)
            })
            setUploadStatus('File uploaded')
            setAddingNewVideo(!addingNewVideo)
            setTimeout(() => {
                handleCloseIcon()
            }, 2000)
        }
        catch (error) {
            const errorMessage = error.response?.data?.msg || error.response?.data || 'Error uploading file.';
            console.error('Upload Error:', errorMessage);
            setUploadStatus(errorMessage);
        }
    }

    return (
        <>
            <div className={setHidden ? 'library' : 'none'}>
                <div className={isVideoClicked ? 'none' : 'filesLibrary'}>
                    <div className='filesLibrary-header'>
                        <h1 className='filesLibrary-title'>Videos</h1>
                        <AddIcon className='filesLibrary-addIcon' onClick={handleAddFile} />

                    </div>

                    <div className={isAddingFile ? 'is-adding' : 'none'}>
                        <CloseIcon className='filesLibrary-closeIcon' onClick={handleCloseIcon} />
                        <input type='text'
                            className='filesLibrary-nameFile'
                            placeholder='Name of the file'
                            value={videoName}
                            onChange={handleNameChange}
                        />
                        <input type='text'
                            className='filesLibrary-nameFile'
                            placeholder='Description'
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <select
                            className='filesLibrary-selectMarker'
                            value={marker}
                            onChange={handleSelectMarkerChange}
                        >
                            <option
                                className='optionBox'
                                value=''>Select a marker</option>
                            {allVideoMarkers && allVideoMarkers.map((markerItem, index) => (
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
                            ? <div>
                                <div className="loader" style={{ margin: '20px' }}></div>
                                <div style={{ margin: '10px' }}>
                                    {downloadProgress}%
                                </div>
                            </div>

                            : <button className={uploadStatus === 'File uploaded' ? 'none' : 'filesLibrary-button'}
                                onClick={handleUpload}
                            >Upload</button>}
                    </div>

                    <div className={isMarkerClicked ? 'none' : 'showmarkers'}>
                        <ul className='showmarkers-list'>
                            {allVideoMarkers && allVideoMarkers.map((metadata, index) => (
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
                            {videosSaved && videosSaved.filter(file => file.metadata.marker === marker).map((file, index) => (
                                <li
                                    key={index}
                                    className='showfiles-list-item'
                                    onClick={() => handleVideoClicked(file)}>
                                    {file.filename}
                                </li>
                            ))
                            }
                        </ul>
                    </div>

                </div>

                {isVideoClicked ?
                    <ShowVideo selectedVideo={selectedVideo} isVideoClicked={isVideoClicked} setIsVideoClicked={setIsVideoClicked} setDeletingVideo={setDeletingVideo} deletingVideo={deletingVideo} /> : null}

            </div>
        </>
    )
}

export default VideosLibrary