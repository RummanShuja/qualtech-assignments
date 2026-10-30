import CounterDisplay from "./components/CounterDisplay.jsx";
import CounterButtons from "./components/CounterButtons.jsx";

function App() {
  return (
    <div className="app">
      <h2>Redux Counter</h2>

      <CounterDisplay />
      <CounterButtons />
    </div>
  );
}

export default App;
