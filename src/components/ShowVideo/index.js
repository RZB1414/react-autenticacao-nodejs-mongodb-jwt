import './ShowVideo.css'
import { ReactComponent as CloseVideoIcon } from '../../assets/icons/close-x-icon.svg'
import { ReactComponent as DownloadIcon } from '../../assets/icons/download-icon.svg'
import { downloadVideo } from '../../services/videos'

const ShowVideo = ({ selectedVideo, isVideoClicked, setIsVideoClicked }) => {

    const handleSetSelectedVideo = () => {
        setIsVideoClicked(!isVideoClicked)
    }

    const handleDownload = () => {
        console.log(selectedVideo);
        downloadVideo(selectedVideo._id, selectedVideo)
    }

    return (
        <div className='showvideo'>
            <CloseVideoIcon className='xIcon' onClick={handleSetSelectedVideo} />
            <DownloadIcon className='downloadIcon' onClick={handleDownload} />
            <div className='videoInfo'>
                <p>{selectedVideo.filename}</p>
                <p>{selectedVideo.metadata.description}</p>
                <p>{selectedVideo.contentType}</p>
            </div>
        </div>
    )
}

export default ShowVideo