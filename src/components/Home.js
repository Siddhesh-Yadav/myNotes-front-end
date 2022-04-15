import React,{useState,useEffect} from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

export const Home = () => {
  const [name, setname] = useState("")
  useEffect(async() => {
    const authtoken = localStorage.getItem("token");
    const nameresponse = await fetch("https://mynotes-back-end.herokuapp.com/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const namejson = await nameresponse.json();
    setname(namejson.name);
  })

  return (
    <div className="container my-3">
      <h2 className="text-center">Welcome {name}!</h2>
      <AddNote/>
      <Notes />
    </div>
  );
};
export default Home;
