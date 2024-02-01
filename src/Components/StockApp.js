import logo from './logo.svg';
import './App.css';

function StockApp() {
  return (
    <div className="StockApp">
      <header className="StockApp-header">
        <img src={logo} className="StockApp-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="StockApp-link"
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

export default StockApp;