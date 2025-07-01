function ChannelVideo({video, channelId, setChannelVideos}){
    async function handleDelChannelVideo(videoId){
    
    //removing the channelVideo from DOM by changing the state and re-rendering the compoent
    setChannelVideos(prev => prev.filter(video => video.videoId != videoId));

      // removing channel video from database
      try{
         const response = await fetch(`http://localhost:5050/channelVideo/${channelId}/${videoId}`, {
            method: "DELETE"
         });
         const data = await response.json();
         if(response.ok){
            alert(data.message)
         }else{
            alert(data.message)
         }
      }catch(err){
        console.log(err)
      }
    }

    return (
        <div className="myChannel_video_component">
            <div className="myChannel_thumbnail_box">
                <img src={video?.thumbnailUrl} alt="video thumbnail" />
            </div>
            <div className="myChannel_video_content_box">
                <div className="myChannel_video_details_box">
                    <div className="myChannel_video_logo_title">
                        <p className="myChannel_video_title">{video?.title}</p>
                    </div>
                    <div className="myChannel_views_and_edit_delete_video_box">
                        <div>
                            <span className="myChannel_video_views">{video?.views.toString().slice(0, 2)}K views</span>
                            <span> | </span>
                            <span className="myChannel_video_timestamp">{video?.uploadDate}</span>
                        </div>
                        <div>
                            <button onClick={() => handleDelChannelVideo(video?.videoId)}>
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default ChannelVideo;