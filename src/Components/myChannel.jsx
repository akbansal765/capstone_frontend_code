import Sidebar from "./sidebar";
import SliderSidebar from "./sliderSidebar";
import bannerImg from "../assets/icons/banner.png"
import ChannelVideo from "./channelVideo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MyChannel({isSliderbarVisible, isUserLoggedIn}){

    const params = useParams();
    const [channel, setChannel] = useState(null);
    const [channelVideos, setChannelVideos] = useState([]);

    const [showAddVideosBtn, setShowAddVideosBtn] = useState(false);

    function handleAddVideosBtnOnDelete(videoCount){
        if(videoCount == 0){
          setShowAddVideosBtn(true)
        }
    }

    async function handleAddVidoesChannelBtn(id){
      try{
        const response = await fetch(`http://localhost:5050/channelVideos/${id}`,{
            method: "POST"
        });

        const data = await response.json();

        if(response.ok){
          setChannelVideos(data);
          console.log(data)
        }else{
          alert(data.message);
        }

      }catch(err){
        console.log(err);
      }
    }

    useEffect(() => {
      if(isUserLoggedIn && params.id){
        async function fetchChannel(){
          try{
            const response = await fetch(`http://localhost:5050/channel/${params.id}`);
            const data = await response.json();            
            if(response.ok){
              setChannel(data);
              if(data.channelVideos?.length > 0){
                setChannelVideos(data.channelVideos)
              }
            }else{
              alert("Unable to fetch channel, kindly try again later!!");
            }
          }catch(err){
            console.log(err.message);
          }
        }
        fetchChannel();
       }
    }, [params]);

    // useEffect for the add videos button
    useEffect(() => {
        if (channelVideos && channelVideos.length === 0) {
          setShowAddVideosBtn(true);
        } else {
          setShowAddVideosBtn(false);
        }
    }, [channelVideos]);

    return (
        <div className="myChannel_component">
          {!isSliderbarVisible && <Sidebar />}
          {isSliderbarVisible && <SliderSidebar isUserLoggedIn={isUserLoggedIn}/>}
          {!isUserLoggedIn && <div style={{color: "rgb(143, 142, 142)", "margin": "auto", "fontSize": "4vh"}}><p>Kindly Login to view your channel</p></div>}
          {isUserLoggedIn && <div className="channel_content_container">
            <div className="channel_banner_box">
              <img src={bannerImg} alt="" />
              <p className="channel_banner_text">{channel?.channelName}</p>
            </div>

            <div className="channel_details_box">
                <div className="channel_logo_box">
                  <p>T</p>
                </div>
                <div className="channel_name_desc_box">
                  <p className="myChannel_name">{channel?.channelName}.</p>

                  <div className="myChannel_handle_subs_totalVidoes">
                    <p className="myChannelHandle">@{channel?.channelHandle}</p>
                    <span>&nbsp;&middot;&nbsp;</span>
                    <p className="myChannel_subsribers">30M Subscribers</p>
                    <span>&nbsp;&middot;&nbsp;</span>
                    <p className="myChannel_totalVidoes">{channel?.videos?.length ? channel.videos.length : 0} Vidoes</p>
                  </div>

                  <p className="myChannel_description">Welcome to our channel, your go-to destination for exciting videos across tech, entertainment, and lifestyle.</p>

                  <div className="myChannel_manageChannel_btns">
                    <button>Customise channel</button>
                    <button>Manage videos</button>
                  </div>

                </div>
            </div>

            <div className="channel_buttons_box">
                <div className="channel_buttons">
                  <button>Home</button>
                  <button className="channel_videos_button">Videos</button>
                  <button>Shorts</button>
                  <button>Live</button>
                  <button>Playlists</button>
                  <button>Posts</button>
                </div>
            </div>

            <div className="channel_videos_container">
              <div className="add-videos-wrapper">
              {showAddVideosBtn && <div style={{color: "rgb(143, 142, 142)", "margin": "0 auto 0 auto", "fontSize": "4vh"}}>
                                             <button onClick={() => handleAddVidoesChannelBtn(channel._id)} className="myChannel_addVideos_btn">Add Videos</button>
                                          </div>
              }
              </div>
              {channelVideos?.map((video, index) => {
                  return <ChannelVideo video={video} channelId={channel._id} key={index} handleAddVideosBtnOnDelete={handleAddVideosBtnOnDelete}/>
              })}
            </div>
          </div>}
        </div>
    )
}

export default MyChannel;