import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AuthContext } from "../git-service-context";


export default function HomePage() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const { avatar_url, name, public_repos, followers, following } = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  return (
    
      <div className="container">
        <button onClick={()=> handleLogout()}>Logout</button>
        <Link to ='/'>Statistics</Link>
        <div>
          <div className="content">
            <img src={avatar_url} alt="Avatar"/>
            <span>{name}</span>
            <span>{public_repos} Repos</span>
            <span>{followers} Followers</span>
            <span>{following} Following</span>
          </div>
        </div>
      </div>
    
  );
}

