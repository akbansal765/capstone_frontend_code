import homeBtn from '../assets/icons/home.png';
import shortsBtn from '../assets/icons/short-video.png';
import subscribe from '../assets/icons/subscribe.png';
import history from '../assets/icons/history.png';
import playlists from '../assets/icons/playlist.png';
import yourVidoes from '../assets/icons/yourVideos.png';
import yourMovies from '../assets/icons/video-editing.png';
import yourCourses from '../assets/icons/learning.png';
import rightArrow from '../assets/icons/chevron.png';
import channelIcon from '../assets/icons/television.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SliderSidebar({isUserLoggedIn}){

    const [channels, setChannels] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate()

    function handleHomeButton(){
        navigate('/');
    }

    //passing the channel id to route paramters
    function handleOpenChannel(id){
        navigate(`/myChannel/${id}`);
    }

    //getting user data from local storage and storing user email in state variable
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("LoggedInUserData"));
      setUserEmail(data?.email);
    }, []);

    //fetch all the channels in the sliderbar if user is logged in
    useEffect(() => {
      if(isUserLoggedIn && userEmail){
        async function fetchChannels(){
          try{
            const response = await fetch(`http://localhost:5050/channels/${userEmail}`);
            const data = await response.json();
            
            if(response.ok){
              setChannels(data);
            }else{
              alert("Unable to fetch channels, kindly try again later!!")
            }
          }catch(err){
            console.log(err.message);
          }
        }
        fetchChannels();
       }
    }, [userEmail]);

    return (
        <div className="sliderSider_component">
          <div className="first_box_home_shorts_subsriptions">
             <button onClick={handleHomeButton} className='slider_home_button'>
                <img src={homeBtn} alt="home" />
                <p>Home</p>
             </button>
             <button>
                <img src={shortsBtn} alt="shorts" />
                <p>Shorts</p>
             </button>
             <button>
                <img src={subscribe} alt="subscriptions" />
                <p>Subscriptions</p>
             </button>
          </div>

          <div className="second_box_you_history">
            <button className='sliderBar_profile_button'>
                <p>You</p>
                <img src={rightArrow} alt="profile" />
            </button>
            <button>
                <img src={history} alt="history" />
                <p>History</p>
            </button>
            <button>
                <img src={playlists} alt="playlists" />
                <p>Playlists</p>
            </button>
            <button>
                <img src={yourVidoes} alt="your vidoes" />
                <p>Your vidoes</p>
            </button>
            <button>
                <img src={yourMovies} alt="your movies" />
                <p>Your movies</p>
            </button>
            <button>
                <img src={yourCourses} alt="your courses" />
                <p>Your courses</p>
            </button>
          </div>

          <div className="thirdBox_myChannels">
            <p>My Channels</p>
            {isUserLoggedIn && <>
                              {channels?.map(channel => {
                                return <button onClick={() => handleOpenChannel(channel?._id)} key={channel?._id}>
                                        <img src={channelIcon} alt="my channel" />
                                        <p>{channel?.channelName}</p>
                                      </button>
                              })}
                               </>
            }
            {!isUserLoggedIn && <p className='myChannels_text_not_login'>Sign-in to view your channels</p>}
          </div>

          <div className="copyright_text">
            <p>Copyright © Akash Bansal 2025. All rights reserved.</p>
          </div>
        </div>
    )
}

export default SliderSidebar;