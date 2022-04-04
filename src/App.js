import "./App.css";
import PriceTable from "./components/PriceTable";

function App() {
  return (
    <div className="App">
      <h2 id="title">Cryptocurrency Prices by Market Cap</h2>
      <PriceTable />
    </div>
  );
}

export default App;
