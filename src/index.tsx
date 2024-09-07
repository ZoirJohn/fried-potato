import ReactDOM from "react-dom/client";
import "./css/style.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
      <HashRouter>
            <Provider store={store}>
                  <App />
            </Provider>
      </HashRouter>
);
