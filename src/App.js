import "./App.css";
import PriceTable from "./components/PriceTable";
import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      <h2>Cryptocurrency Prices by Market Cap</h2>
      <PriceTable />
      {/* <Test /> */}
    </div>
  );
}

export default App;
