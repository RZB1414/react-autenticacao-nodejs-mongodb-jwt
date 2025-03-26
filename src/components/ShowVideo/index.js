import './ShowVideo.css'
import { ReactComponent as CloseVideoIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-button.svg'
import { downloadVideo, deleteVideo } from '../../services/videos'
import { useState } from 'react'

const ShowVideo = ({ selectedVideo, isVideoClicked, setIsVideoClicked, setDeletingVideo, deletingVideo }) => {

    const [downloadProgress, setDownloadProgress] = useState(0)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    const handleSetSelectedVideo = () => {
        setIsVideoClicked(!isVideoClicked)
    }

    const handleDeleteVideo = () => {
        setShowDeleteConfirmation(true)
    }

    const handleConfirmDelete = async () => {
        await deleteVideo(selectedVideo._id)
        setDeletingVideo(!deletingVideo)
        setShowDeleteConfirmation(false)
        setIsVideoClicked(!isVideoClicked)
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false)
    }

    const handleDownload = () => {
        console.log(selectedVideo);
        downloadVideo(selectedVideo._id, selectedVideo, (progress) => {
            setDownloadProgress(progress)
        })
    }

    const formatBytesToMB = (bytes) => {
        return (bytes / (1024 * 1024)).toFixed(2) // Converte bytes para MB e fixa em 2 casas decimais
    }

    return (
        <div className='showvideo'>
            <CloseVideoIcon className='xIcon' onClick={handleSetSelectedVideo} />
            {!showDeleteConfirmation ? (
                <DeleteIcon className='deleteicon' onClick={handleDeleteVideo} />
            ): (
                <div className='deleteConfirmation'>
                    <button onClick={handleConfirmDelete}>Delete</button>
                    <button onClick={handleCancelDelete}>Cancel</button>
                </div>
            )}
            
            <DownloadIcon className='downloadIcon' onClick={handleDownload} />
            <div className='videoInfo'>
                <p>{selectedVideo.filename}</p>
                <p>{selectedVideo.metadata.description}</p>
                <p>{selectedVideo.contentType}</p>
                <p>{formatBytesToMB(selectedVideo.length)} MB</p>
                {downloadProgress > 0 && <p>{downloadProgress}%</p>}
            </div>
        </div>
    )
}

export default ShowVideo