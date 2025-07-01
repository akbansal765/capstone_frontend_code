import { useState, useEffect } from "react";

function ChannelModal({setChannelModal}){
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [userEmail, setUserEmail] = useState("");

  //creating channel in Database
  async function handleCreateChannel(e){
    e.preventDefault();
    //getting data from new channle modal
    const channelDetails = {
      channelName: name,
      channelHandle: `@${handle}`
    };
    
    //clearing input fields after submission
    setName("");
    setHandle("");
    // saving channel data in the backend
    try{
        const response = await fetch(`http://localhost:5050/channel/${userEmail}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(channelDetails)
        })
        const data = await response.json();

        if(response.ok){
          alert(data.message);
          //closing the modal after creating a channel
          setChannelModal(false)
        }else{
          alert(data.message);
        }
    }catch(err){
      console.log(err.message);
    }

  }

  //getting user data from local storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("LoggedInUserData"));
    setUserEmail(data.email);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <form onSubmit={handleCreateChannel}>
            <h2 className="modal-heading">How you'll appear</h2>
            <div className="modal-avatar">
              <div className="avatar-placeholder">
                <p>{name.slice(0, 1).toUpperCase()}</p>
              </div>
            </div>
            <div className="modal-inputs">
              <input type="text" required placeholder="Channel Name" value={name} onChange={(e) => setName(e.target.value)}/>
              <input type="text" required placeholder="Select Handle" value={handle} onChange={(e) => setHandle(e.target.value)}/>
            </div>
            <p className="modal-note">
              By clicking Create Channel you agree to <a href="#">YouTube Clone’s Terms of Service</a>. Changes made to your name and profile picture are visible only on YouTube Clone and not other Google services. <a href="#">Learn more</a>
            </p>
            <div className="modal-actions">
              <button onClick={() => setChannelModal(false)} className="cancel-btn">Cancel</button>
              <button type="submit" className="create-btn">Create channel</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ChannelModal;
