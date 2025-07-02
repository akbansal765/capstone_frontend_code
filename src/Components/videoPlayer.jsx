import likeIcon from '../assets/icons/like.png';
import dislikeIcon from '../assets/icons/dislike.png';
import { useParams } from 'react-router-dom';
import SliderSidebar from './sliderSidebar.jsx';
import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import Loader from './loader.jsx';

const Comments = lazy(() => import('./comments'));



function VideoPlayer({isVideoPlayerOn, isUserLoggedIn}){
    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);

    //getting video id in route parameters
    const params = useParams();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5050/video/${params.id}`);
          const data = await response.json(); // fixed: added space between `await` and `response`
          if(response.ok){
            setVideo(data);
            setComments(data?.comments);
          }else{
            alert(data.message);
          }
          
        } catch (err) {
          console.log(err.message);
        }
      };
    
      fetchData();
    }, [comments]);

    if (!video) {
      return <div className="loading">Loading video...</div>;
    }

    return (
        <div className="videoPlayer_component">
          <div className={`videoPlayer_sliderSidebar ${isVideoPlayerOn ? 'moveSlider' : ''}`}>
            <SliderSidebar isVideoPlayerOn={isVideoPlayerOn} isUserLoggedIn={isUserLoggedIn}/>
          </div>

          <div className="videoPlayer_video_box">
            <iframe src={video?.videoUrl}></iframe>
          </div>

          <div className="videoPlayer_details_comments_box">
            <p className="videoPlayer_title">{video?.title}</p>

            <div className="videoPlayer_channel_icon_name_like">
              <div className="videoPlayer_channel">
                 <img src={video?.channelIcon} alt="channel icon"/>
                 <p>{video?.uploader}</p>
                 <button className="videoPlayer_subscribe_btn">Subscribe</button>
              </div>
              <div className="videoPlayer_like_dislike_buttons">
                 <div className="like_dislike_btns_box">
                   <div className="like_btn_box">
                     <img src={likeIcon} alt="like" />
                     <p className="videoPlayer_likes">{video?.likes.toString().slice(0, 1)}K</p>
                   </div>
                   <div className="dislike_btn_box">
                     <img src={dislikeIcon} alt="dislike" />
                   </div>
                 </div>
              </div>
            </div>

            <p className="videoPlayer_description">{video?.description}</p>
            
            <Suspense fallback={<Loader />}>
              <Comments comments={comments} setComments={setComments} videoId={video?._id} isUserLoggedIn={isUserLoggedIn}/>
            </Suspense>

          </div>

        </div>
    )
}

export default VideoPlayer;