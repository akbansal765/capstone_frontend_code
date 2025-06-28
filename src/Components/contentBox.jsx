import FilterButtons from "./filterButtons";
import VideosBox from "./videosBox";

function ContentBox({videos, displayVideos, setDisplayVideos}){
    return (
        <div className="contentBox_component">
          <FilterButtons videos={videos} displayVideos={displayVideos} setDisplayVideos={setDisplayVideos}/>
          <VideosBox displayVideos={displayVideos}/>
        </div>
    )
}

export default ContentBox;