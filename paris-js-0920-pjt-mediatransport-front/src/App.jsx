import Navbar from "./components/Navbar/Navbar";
import Routes from './components/Routes/Routes'
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Navbar />
      </div>
      <Routes />
    </div>
  );
}

export default App;
