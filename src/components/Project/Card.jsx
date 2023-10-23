import { useState, useEffect } from "react";
import Task from "./Task";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Dialog } from "@radix-ui/themes";
import AddIcon from "@mui/icons-material/Add";
import "./Project.css";

export default function Card({ id, name, projectName, project }) {

  //* Handle Inputs
  const [task, setTask] = useState("");
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  function addTask(card) {
    let currentData = JSON.parse(localStorage.getItem("projects"));
    currentData.forEach((prj) => {
      if (prj.title === projectName) {
        prj[card].push({
          id: crypto.randomUUID(),
          title: task,
          image: image,
          niveau: label,
          color: color,
        });
      }
    });
    localStorage.setItem("projects", JSON.stringify(currentData));
  }

  return (
    <>
      <div key={id} className="card">
        <div className="header-tasks">
          <h3>{name.charAt(0).toUpperCase() + name.slice(1, name.length)}</h3>
        </div>
        <ScrollArea.Root className="ScrollAreaRoot">
          <ScrollArea.Viewport className="ScrollAreaViewport">
            {project[name].map((task) => (
              <Task
                key={task.id}
                id={task.id}
                projectName={projectName}
                title={task.title}
                url={task.image}
                niveau={task.niveau}
                bgcolor={task.color}
                card={name}
              />
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="ScrollAreaCorner" />
        </ScrollArea.Root>

        <Dialog.Root>
          <Dialog.Trigger>
            <div className="add-tasks">
              <span>
                <AddIcon />
              </span>
              <span>Add task</span>
            </div>
          </Dialog.Trigger>
          <Dialog.Content style={{ maxWidth: "700px" }} className="form-card">
            <Dialog.Title>
              Set info to your task
              <span className="seelct-card"> {name} </span>
            </Dialog.Title>
            <form className="form-task">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                />
              </div>
              <div className="form-group">
                <label>Label</label>
                <input
                  type="text"
                  onChange={(e) => setLabel(e.target.value)}
                  value={label}
                />
              </div>
              <div className="group-image">
                <div className="form-group">
                  <label>Picture</label>
                  <input
                    accept="image/png*jpg"
                    // accept="image/png/jpg/jpeg/svg/ico"
                    type="file"
                    onChange={(e) => {
                      const reader = new FileReader();
                      const image = e.target.files[0];
                      reader.addEventListener("load", () => {
                        setImage(reader.result);
                      });
                      if (image) {
                        reader.readAsDataURL(image);
                      }
                    }}
                  />
                </div>
                <img src={image} alt="No image selected" width="80px" />
              </div>
              <div className="form-group">
                <label>Dificulty Rang</label>
                <input
                  type="color"
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="form-group">
                <Dialog.Close>
                  <button>Cancel</button>
                </Dialog.Close>
                <Dialog.Close>
                  <button onClick={() => addTask(name)}>Send</button>
                </Dialog.Close>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  );
}
