import { Routes, Route } from "react-router-dom";

import Projects from "./components/Projects/Projects";
import Project from "./components/Project/Project";
import Header from "./components/Header/Header";
import NotFound from "./components/NotFound/NotFound";

import "./App.css"

export default function App() {
  return (
    <>
    <Header/>
      <main className="main-all">
        <Projects />
        <Routes>
          <Route path="/" element={<Project/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </main>
    </>
  );
}
