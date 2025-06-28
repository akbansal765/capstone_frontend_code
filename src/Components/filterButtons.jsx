import { useEffect, useState } from "react";

function FilterButtons({videos, setDisplayVideos}){
  
    const categories = [
        "Web Development",
        "Programming",
        "JavaScript",
        "React",
        "Python",
        "C++",
        "Databases",
        "Design",
        "Frontend",
        "Backend"
    ];

    function handleAllFilterButton(){
      setDisplayVideos(videos);
    }

    function handleFilterButton(category){
      const categoryVideos = videos.filter(video => video.category == category);
      setDisplayVideos(categoryVideos);
    }

    return (
        <div className="filterButtons_component">
            <button onClick={handleAllFilterButton} id="All">All</button>
           {categories.map((category, index) => {
             return <button onClick={() => handleFilterButton(category)} id={category} key={index}>{category}</button>
           })}
        </div>
    )
}

export default FilterButtons;