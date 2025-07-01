import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VideoPlayer from './Components/videoPlayer.jsx';
import MainContainer from './Components/mainContainer.jsx';
import RegisterLoginForm from './Components/register_login_form.jsx';
import MyChannel from './Components/myChannel.jsx';
import ErrorPage from './Components/errorElement.jsx';

// to make a central state converted the main.jsx to functional component
function Root(){
  const [isSliderbarVisible, setSlidebarVisible] = useState(false);
  const [isVideoPlayerOn, setViddeoPlayer] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  //videos state
  const [videos, setVideos] = useState([]);
  const [displayVideos, setDisplayVideos] = useState([]);
  
  //fetching all videos data in the homepage and storing the data in state variable
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5050/videos");
        const data = await response.json(); // fixed: added space between `await` and `response`
        setVideos(data);
        setDisplayVideos(data);
      } catch (err) {
        console.log(err.message);
      }
    };
  
    fetchData();
  }, []);

   const appRouter = createBrowserRouter([
      {
        path: '/',
        element: <App isUserLoggedIn={isUserLoggedIn} isSliderbarVisible={isSliderbarVisible} setSlidebarVisible={setSlidebarVisible} isVideoPlayerOn={isVideoPlayerOn} setViddeoPlayer={setViddeoPlayer} videos={videos} setDisplayVideos={setDisplayVideos}/>,
        errorElement: <ErrorPage/>,
        children: [
          {
            index: true,
            element: <MainContainer isSliderbarVisible={isSliderbarVisible} isUserLoggedIn={isUserLoggedIn} videos={videos} displayVideos={displayVideos} setDisplayVideos={setDisplayVideos}/>
          },
          {
            path: '/videoPlayer/:id',
            element: <VideoPlayer isVideoPlayerOn={isVideoPlayerOn} isUserLoggedIn={isUserLoggedIn}/>
          },
          {
            path: '/myChannel/:id',
            element: <MyChannel isSliderbarVisible={isSliderbarVisible} isUserLoggedIn={isUserLoggedIn} videos={videos}/>
          }
        ]
      },
      {
        path: '/registerLogin',
        element: <RegisterLoginForm setUserLoggedIn={setUserLoggedIn}/>
      }
    ]);

    return (
      <StrictMode>
        <RouterProvider router={appRouter}/>
      </StrictMode>
    )
}

createRoot(document.getElementById('root')).render(<Root />)
