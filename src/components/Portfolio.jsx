import React, { useState } from 'react';
import portfolio from '../assets/PortfolioData.js';
import '../styles/Portfolio.css';
import History from './History';
import Rebalance from './Rebalance';
import Sectors from './Sectors';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("Portfolio");

  const renderTabs = () => {
    const tabs = ["Portfolio", "History", "Rebalance", "Sectors"];
    return (
      <div className="portfolio-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };

  const renderPortfolioSection = () => (
    <>
      <div className="portfolio-overview">
        <div className="portfolio-card">
          <p>Total Value</p>
          <h3>{portfolio.overview.totalValue}</h3>
        </div>
        <div className="portfolio-card">
          <p>Net P/L</p>
          <h3 className="green">{portfolio.overview.netPL}</h3>
        </div>
        <div className="portfolio-card">
          <p>Cash Balance</p>
          <h3>{portfolio.overview.cashBalance}</h3>
        </div>
      </div>

     

      <div className="portfolio-assets">
        <h2>Your Assets</h2>
        <table>
        <thead>
  <tr>
    <th>Symbol</th>
    <th>Shares</th>
    <th>Price Bought</th>
    <th>Current Price</th>
    <th>Change</th>
    <th>Sector</th>
    <th>Value</th>
  </tr>
</thead>
<tbody>
  {portfolio.assets.map((asset, i) => (
    <tr key={i}>
      <td>{asset.symbol}</td>
      <td>{asset.shares}</td>
      <td>{asset.priceBought}</td>
      <td>{asset.price}</td>
      <td style={{ color: asset.change.startsWith('+') ? '#22c55e' : '#e11d48' }}>
        {asset.change}
      </td>
      <td>{asset.sector}</td>
      <td>{asset.value}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="portfolio-wrapper">
      <header className="portfolio-hero">
        <h1>Welcome back, {portfolio.username} 👋</h1>
        <p>Your personal investment dashboard</p>
      </header>

      {renderTabs()}

      {activeTab === "Portfolio" && renderPortfolioSection()}
      {activeTab === "History" && <History />}
      {activeTab === "Rebalance" && <Rebalance />}
      {activeTab === "Sectors" && <Sectors />}
    </div>
  );
};

export default Portfolio;
