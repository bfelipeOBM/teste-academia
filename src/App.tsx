import { Provider } from "react-redux";
import store from "./application/store";
import Routes from "./routes";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
}

export default App;
