import ContentBox from "./contentBox";
import Sidebar from "./sidebar";
import SliderSidebar from "./sliderSidebar";

function MainContainer({isSliderbarVisible, isUserLoggedIn, videos, displayVideos, setDisplayVideos}){
    return (
        <div className="mainContainer_component">
          {!isSliderbarVisible && <Sidebar />}
          {isSliderbarVisible && <SliderSidebar isUserLoggedIn={isUserLoggedIn}/>}
          <ContentBox videos={videos} displayVideos={displayVideos} setDisplayVideos={setDisplayVideos}/>
        </div>
    )
}

export default MainContainer;