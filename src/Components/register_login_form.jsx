import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterLoginForm({setUserLoggedIn}) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const formData = {username, email, password};
    // if (!isLogin) formData.username = username;
    if(!username || !email || !password){
      alert("Kindly fill all the fields!")
      return;
    }

    try{
      const response = await fetch("http://localhost:5050/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        })

        const data = await response.json();
        console.log(response);
        console.log(data);
        if(response.ok){
          alert("User has been registered! Kindly log in to the website!!")
          setIsLogin(true);
          // after successfully registrations empty the input fields
          setUsername("");
          setEmail("");
          setPassword("");
        }else{
          alert(data.message);
        }

    }catch(err){
      console.log(err.message);
    }
    
  }

  async function handleLogin(e){
    e.preventDefault();
    const formData = {email, password};

    if(!email || !password){
      alert("Kindly fill all the fields!")
      return;
    }

    try{
      const response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        })

        const data = await response.json();
        
        if(response.ok){
          localStorage.setItem("LoggedInUserData", JSON.stringify(data));
          navigate("/");
          setUserLoggedIn(true);
          console.log('hello')
        }else{
          alert(data.message);
        }
    }catch(err){
      console.log(err.message);
    }
  };


  function handleClose() {
    navigate("/");
  }

  return (
    <div className="form-overlay">
      <div className="form-container">
        <button className="close-btn" onClick={handleClose}>Close</button>
        <h2>{isLogin ? "Log In" : "Register"}</h2>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter a username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="submit-btn">{isLogin ? "Log In" : "Register"}</button>
        </form>

        <div className="toggle-form">
          {isLogin ? (
            <>
              <p>Don't have an account?</p>
              <button onClick={() => setIsLogin(false)}>Sign up</button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button onClick={() => setIsLogin(true)}>Log in</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterLoginForm;
