import {useNavigate} from 'react-router-dom'

function VideosBox({displayVideos}){
   
   const navigate = useNavigate();

   //passing the video id in route parameters
   function handleVideo(obj){
        navigate(`/videoPlayer/${obj._id}`)
   }

    return (
        <div className="videosBox_component">
            {displayVideos?.length == 0 && <div className='empty_videoBox_text'><p>Couldn't find videos, Kindly try another filters!</p></div>}
            {displayVideos?.map(obj => {
                return <div onClick={() => handleVideo(obj)} className="video_container" key={obj?.videoId}>
                            <div className="thumbnail_box">
                                <img src={obj?.thumbnailUrl} alt="" />
                            </div>
                            <div className="video_content_box">
                                <div className="channel_icon">
                                    <img src={obj?.channelIcon} alt="" />
                                </div>
                                <div className="video_details_box">
                                    <div className="video_logo_title">
                                        <p className="video_title">{obj?.title}</p>
                                    </div>
                                    <p className="channel_name">{obj?.uploader}</p>
                                    <span className="video_views">{obj?.views.toString().slice(0, 2)}K views</span><span> | </span><span className="video_timestamp">{obj?.uploadDate}</span>
                                </div>
                            </div>
                        </div>
                    })}
        </div>
    )
}

export default VideosBox;