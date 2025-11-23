import { Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import TaskManager from "./components/task-manager/TaskManager";
import Contact from "./components/contact/Contact";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";
import MenubarDemo from "./components/menu-bar/MenuBar";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <>
      <Theme
        appearance={theme}
        accentColor="crimson"
        grayColor="sand"
        radius="full"
      >
        <MenubarDemo toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-manager" element={<TaskManager />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Theme>
    </>
  );
}

export default App;
