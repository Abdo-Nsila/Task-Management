import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

import { Dialog } from "@radix-ui/themes";

import AddIcon from "@mui/icons-material/Add";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

export default function Projects() {
  const [title, setTitle] = useState("");
  const [lacalData, setLacalData] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let stringProjects = localStorage.getItem("projects");
    if (!stringProjects) {
      //! First visit and initial localStorage
      localStorage.setItem("projects", "[]");
      stringProjects = localStorage.getItem("projects");
    }
    // Get Projects before Render it
    const showProjects = JSON.parse(stringProjects).map((project, index) => {
      return (
          <Link
            to="/"
            state={{ project: project.title }}
            key={index}
            className="box-project"
          >
            <AccountTreeIcon /> <span>{project.title}</span>
          </Link>
      );
    });
    setProjects(showProjects);
  }, [lacalData]);

  function addProject() {
    let currentData = JSON.parse(localStorage.getItem("projects"));
    const project = {
      title: title,
      tasks: [],
      doing: [],
      verify: [],
      done: []
    };
    currentData.push(project);
    localStorage.setItem("projects", JSON.stringify(currentData));
    setLacalData(JSON.parse(localStorage.getItem("projects")));
  }

  return (
    <aside>
      <div className="espace">
        <p>Espase de Travaille</p>
      </div>
      <div className="project-menu">
        <div className="add-project">
          <h4>Vos tableaux</h4>
          <Dialog.Root>
            <Dialog.Trigger>
              <span>
                <AddIcon />
              </span>
            </Dialog.Trigger>
            <Dialog.Content
              style={{ maxWidth: "500px" }}
              className="form-project"
            >
              <Dialog.Title>Set a title to your project</Dialog.Title>
              <form className="form-prj">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Dialog.Close>
                    <button>Cancel</button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <button onClick={() => addProject()}>Send</button>
                  </Dialog.Close>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        </div>
        <div className="myproject">{projects}</div>
      </div>
    </aside>
  );
}
