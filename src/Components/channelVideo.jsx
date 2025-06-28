import { useRef } from "react";

function ChannelVideo({video, channelId, handleAddVideosBtnOnDelete}){
    const channelVideo = useRef();

    async function handleDelChannelVideo(videoId){
      // remove channel video from DOM
      channelVideo.current?.remove();

      try{
         const response = await fetch(`http://localhost:5050/channelVideo/${channelId}/${videoId}`, {
            method: "DELETE"
         });
         const data = await response.json();
         if(response.ok){
            handleAddVideosBtnOnDelete(data.videoCount);
            console.log(data.message);
         }else{
            console.log(data.message);
         }
      }catch(err){
        console.log(err)
      }
    }

    return (
        <div ref={channelVideo} className="myChannel_video_component">
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