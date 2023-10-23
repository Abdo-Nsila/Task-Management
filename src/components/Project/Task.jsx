import { useState, useEffect } from "react";

import { Dialog } from "@radix-ui/themes";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function Task({
  id,
  projectName,
  title,
  url,
  niveau,
  bgcolor,
  card,
}) {
  const [visible, setVisible] = useState(true);

  //* Handle Inputs
  const [task, setTask] = useState(title);
  const [label, setLabel] = useState(niveau);
  const [color, setColor] = useState(bgcolor);
  const [image, setImage] = useState(url);

  function modifyTask() {
    let currentData = JSON.parse(localStorage.getItem("projects"));
    currentData.forEach((prj, iP) => {
      if (prj.title === projectName) {
        prj[card].forEach((currenttask, iT) => {
          if (currenttask.id === id) {
            currentData[iP][card][iT].title = task;
            currentData[iP][card][iT].image = image;
            currentData[iP][card][iT].niveau = label;
            currentData[iP][card][iT].color = color;
            // console.log(currentData[iP][card]);
          }
        });
      }
    });

    localStorage.setItem("projects", JSON.stringify(currentData));
  }

  function deleteTask() {
    console.log(task + " Deleted");
    let currentData = JSON.parse(localStorage.getItem("projects"));
    currentData.forEach((prj, iP) => {
      if (prj.title === projectName) {
        prj[card].forEach((task, iT) => {
          if (task.id === id) {
            const currentCard = prj[card].filter((card) => card.id != id);
            currentData[iP][card] = currentCard;
          }
        });
      }
      localStorage.setItem("projects", JSON.stringify(currentData));
    });
  }

  return (
    <div
      className="task"
      // onMouseOver={() => setVisible(true)}
      // onMouseLeave={() => setVisible(false)}
    >
      <div className="task-image">
        <img src={url} width="80px" />
      </div>
      {niveau && (
        <div className="niveau" style={{ backgroundColor: bgcolor }}></div>
      )}

      <p>{title}</p>
      {visible && (
        <div className="actions">
          <span onClick={() => deleteTask()} className="action">
            <DeleteForeverIcon style={{ color: "#f22" }} />
          </span>

          <Dialog.Root>
            <Dialog.Trigger>
              <span className="action">
                <EditNoteIcon />
              </span>
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: "700px" }} className="form-card">
              <Dialog.Title>
                Update info to your task
                <span className="seelct-card"> {card} </span>
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
                      accept="image/*"
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
                    <button onClick={() => modifyTask()}>Send</button>
                  </Dialog.Close>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      )}
    </div>
  );
}
