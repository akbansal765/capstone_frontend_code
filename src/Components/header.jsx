import hamburgerMenu from '../assets/icons/hamburger.png';
import youtubeIcon from '../assets/icons/youtube_icon.png';
import searchIcon from '../assets/icons/search-interface-symbol.png';
import micIcon from '../assets/icons/mic.png';
import profileIcon from '../assets/icons/user.png';
import { useNavigate } from 'react-router-dom';
import ChannelModal from './channelModal';
import { useEffect, useState } from 'react';

function Header({isUserLoggedIn, isSliderbarVisible, setSlidebarVisible, isVideoPlayerOn, setViddeoPlayer, videos, setDisplayVideos}){
    
    const [channelModal, setChannelModal] = useState(false);
    const [user, setUser] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    function handleSliderBar(){
      setSlidebarVisible(!isSliderbarVisible)
      setViddeoPlayer(!isVideoPlayerOn);
    }

    // naviating to loginRegister page after pressing sign in butotn
    function handleSignInButton(){
       navigate('/registerLogin')
    }

    // open the create new channel modal after pressing the button
    function handleCreateChannelButton(){
      setChannelModal(true);
    }

    function handleSearchButton(){
      const searchByTitleVideos = videos.filter(video => video.title.toLowerCase().includes(searchInput.toLowerCase()))
      setDisplayVideos(searchByTitleVideos);
    }
 
    // getting user data from local storage and storing the data in state variable
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("LoggedInUserData"));
      setUser(data || null);
    }, []);
    

    return (
       <>
        <div className="header_component">
            <div className="menu_and_logo_box">
              <button onClick={handleSliderBar}>
                <img src={hamburgerMenu} alt="menu" />
              </button>
              <img src={youtubeIcon} alt="youtube icon" />
            </div>

            <div className="search_bar_box">
              <div className="searchBar">
                <input type="text" placeholder='Search' onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
                <button className="search_button" onClick={handleSearchButton}>
                    <img src={searchIcon} alt="search" />
                </button>
              </div>
              <div className="mic_box">
                <img src={micIcon} alt="voice ask" />
              </div>
            </div>

            <div className="login_signup_box">
              {isUserLoggedIn && <button onClick={handleCreateChannelButton} className="createChannel_btn">+ Channel</button>}
              {!isUserLoggedIn && <button onClick={handleSignInButton} className="signIn_button">
                                    <img src={profileIcon} alt="sign in" />
                                    <p>Sign in</p>
                                  </button>
               }
               {isUserLoggedIn && <p className='welcome_message_after_login'>Welcome, {user?.username}</p>}
            </div>
        </div>
        {channelModal && <ChannelModal setChannelModal={setChannelModal}/>}
      </>
    )
}

export default Header;