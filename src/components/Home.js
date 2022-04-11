import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

export const Home = () => {
  return (
    <div className="container my-3">
      <h2 className="text-center">My Notes App</h2>
      <AddNote/>
      <Notes />
    </div>
  );
};
export default Home;
