import React from "react"

import {createRoot} from "react-dom/client"
// react v.18 부터 react-dom/client 에서 createRoot를 사용하라고 권장함

import App from "./app"; // app.js 에서 내보낸 App Component 가지고옴

const root = createRoot(document.querySelector("#root"));
root.render(<App/>);