import homeBtn from '../assets/icons/home.png';
import shortsBtn from '../assets/icons/short-video.png';
import subscribe from '../assets/icons/subscribe.png';
import user from '../assets/icons/user.png';
import history from '../assets/icons/history.png';
import { useNavigate } from 'react-router-dom';

function Sidebar(){
    
    const navigate = useNavigate();

    function handleSidebarHomeBtn(){
        navigate('/')
    }

    return (
        <div className="sidebar_component">
            <button onClick={handleSidebarHomeBtn} className='sidebar_homeBtn'>
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
            <button>
                <img src={user} alt="profile" />
                <p>You</p>
            </button>
            <button>
                <img src={history} alt="history" />
                <p>History</p>
            </button>
        </div>
    )
}

export default Sidebar;