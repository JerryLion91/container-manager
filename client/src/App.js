import axios from 'axios';

function App() {
  axios
    .get('http://localhost:8000/api/operations?type=GATE_IN&client=Amazon')
    .then((data) => {
      console.log(data);
    });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
