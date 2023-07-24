import logo from './logo.svg';
import Home from './pages/homepage'
import NavBar from './components/navbar';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ToDo from './components/todo';

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Home />
        <ToDo />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        {/* <Weather /> */}
    </div>
  );
}

export default App;
