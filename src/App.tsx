import { Provider } from "react-redux";
import { store } from "./models";
import Router from "./Router";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
