import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Card from "./Card";
import "./Project.css";

export default function Project() {
  const location = useLocation();
  const [cards, setCards] = useState([]);
  const [myproject, setMyproject] = useState();

  useEffect(() => {
    if (location.state) {
      const { project } = location.state;
      setMyproject(project);
      const stringProjects = localStorage.getItem("projects");
      const currentProject = JSON.parse(stringProjects).filter(
        (prj) => prj.title === project
      );
      const cards = ["tasks", "doing", "verify", "done"];
      const showCards = cards.map((card, index) => (
        <Card key={index} name={card} projectName={project} project={currentProject[0]}/>
      ));
      setCards(showCards);
    }
  }, [location.state,JSON.parse(localStorage.getItem("projects"))]);

  //! Project No Selected
  if (!myproject) {
    return (
      <div className="no-project">
        <h2>No project selected</h2>
      </div>
    );
  }

  //! Project Selected
  else {
    return (
      <main className="main-card">
        <div className="effect">
          <div className="project-info">
            <div className="project-container">
              <h1>{myproject}</h1>
            </div>
          </div>
          {cards}
        </div>
      </main>
    );
  }
}
