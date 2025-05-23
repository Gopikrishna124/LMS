import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


let persistor = persistStore(store)

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
       <PersistGate persistor={persistor}>
          <App />
      </PersistGate>
  </Provider>
);
