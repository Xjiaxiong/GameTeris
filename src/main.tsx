// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./containers/App";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store";
import "./unit/const";
import "./control";
import unit from "./unit";

const { subscribeRecord } = unit;

subscribeRecord(store); // 将更新的状态记录到localStorage

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
);
