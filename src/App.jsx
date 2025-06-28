import Header from "./Components/header"
import { Outlet } from "react-router-dom";

function App({isUserLoggedIn, isSliderbarVisible, setSlidebarVisible, isVideoPlayerOn, setViddeoPlayer, videos, setDisplayVideos}) {

  return (
     <div className="app_component">
       <Header isUserLoggedIn={isUserLoggedIn} isSliderbarVisible={isSliderbarVisible} setSlidebarVisible={setSlidebarVisible} setViddeoPlayer={setViddeoPlayer} isVideoPlayerOn={isVideoPlayerOn} videos={videos} setDisplayVideos={setDisplayVideos}/>
       <Outlet />
     </div>
  )
}

export default App;
