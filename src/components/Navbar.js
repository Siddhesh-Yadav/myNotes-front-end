import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link,useLocation } from "react-router-dom";




const Navbar = () => {
  const logout=()=>{
    localStorage.removeItem('token');
  }
  const location= useLocation();
  useEffect (() => {  
    return () => {
      console.log(location.pathname)
    }
  }, [location])
  
  return (
    <nav className="navbar navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Navbar</Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      </div>
        {!localStorage.getItem("token")?<form className="d-flex">
          <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
          <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        </form>:<Link className="btn btn-primary mx-2" onClick={logout} to="/login" role="button">Logout</Link>}
    </div>
  </nav>
  )
}

export default Navbar