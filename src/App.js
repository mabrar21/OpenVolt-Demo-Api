import './App.css';
import {Provider} from "react-redux";
import {Home} from "./page/home";
import store from "./store/store";

function App() {
  return (
      <Provider store={store}>
        <div className="App"
             style={{
               backgroundColor: '#cbcbcb',
               width: '100%',
               height: '100%',
               minHeight: '100vh',
             }}>
          <Home/>
        </div>
      </Provider>
  );
}

export default App;
