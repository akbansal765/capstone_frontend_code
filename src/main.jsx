import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Components/errorElement.jsx';
import { lazy, Suspense } from 'react';
import Loader from './Components/loader.jsx';

// Lazy components
const App = lazy(() => import("./App.jsx"));
const MainContainer = lazy(() => import("./Components/mainContainer.jsx"));
const RegisterLoginForm = lazy(() => import("./Components/register_login_form.jsx"));
const MyChannel = lazy(() => import("./Components/myChannel.jsx"));
const VideoPlayer = lazy(() => import("./Components/videoPlayer.jsx"));

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
        element: <Suspense fallback={<Loader />}><App isUserLoggedIn={isUserLoggedIn} isSliderbarVisible={isSliderbarVisible} setSlidebarVisible={setSlidebarVisible} isVideoPlayerOn={isVideoPlayerOn} setViddeoPlayer={setViddeoPlayer} videos={videos} setDisplayVideos={setDisplayVideos}/></Suspense>,
        errorElement: <ErrorPage/>,
        children: [
          {
            index: true,
            element: <Suspense fallback={<Loader />}><MainContainer isSliderbarVisible={isSliderbarVisible} isUserLoggedIn={isUserLoggedIn} videos={videos} displayVideos={displayVideos} setDisplayVideos={setDisplayVideos}/></Suspense>
          },
          {
            path: '/videoPlayer/:id',
            element: <Suspense fallback={<Loader />}><VideoPlayer isVideoPlayerOn={isVideoPlayerOn} isUserLoggedIn={isUserLoggedIn}/></Suspense>
          },
          {
            path: '/myChannel/:id',
            element: <Suspense fallback={<Loader />}><MyChannel isSliderbarVisible={isSliderbarVisible} isUserLoggedIn={isUserLoggedIn} videos={videos}/></Suspense>
          }
        ]
      },
      {
        path: '/registerLogin',
        element: <Suspense fallback={<Loader />}><RegisterLoginForm setUserLoggedIn={setUserLoggedIn}/></Suspense>
      }
    ]);

    return (
      <StrictMode>
        <RouterProvider router={appRouter}/>
      </StrictMode>
    )
}

createRoot(document.getElementById('root')).render(<Root />)
