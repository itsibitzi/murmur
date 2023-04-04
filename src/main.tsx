import "@elastic/eui/dist/eui_theme_light.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./icons";
import "./index.css";
import { useConfigStore } from "./state/config";
import { Editor } from "./views/Editor";
import { Menu } from "./views/Menu";

const routes = [
  { path: "/", element: <Menu /> },
  { path: "/editor/:fileId", element: <Editor /> },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
  initialIndex: 0,
});

const App = () => {
  const init = useConfigStore((state) => state.init);

  useEffect(() => init(), []);

  return (
    <React.StrictMode>
      <div className="fixed bottom-0 left-0 right-0 top-0 ">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
