import { EuiPage, EuiPageBody, EuiProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./icons";
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
      <EuiProvider colorMode="light">
        <EuiPage paddingSize="none">
          <EuiPageBody paddingSize="l">
            <RouterProvider router={router} />
          </EuiPageBody>
        </EuiPage>
      </EuiProvider>
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
