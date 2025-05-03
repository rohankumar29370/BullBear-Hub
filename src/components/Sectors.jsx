import React from 'react';

const Sectors = () => {
  const sectors = [
    { name: "Technology", allocation: "35%" },
    { name: "Healthcare", allocation: "20%" },
    { name: "Financials", allocation: "15%" },
    { name: "Energy", allocation: "10%" },
    { name: "Real Estate", allocation: "8%" },
    { name: "Utilities", allocation: "7%" },
    { name: "Consumer Goods", allocation: "5%" },
  ];

  return (
    <div className="section-wrapper">
      <h2>Sector Allocation</h2>
      <p className="sector-subtext">A breakdown of your investments by sector:</p>
      <div className="sector-grid">
        {sectors.map((sector, i) => (
          <div key={i} className="sector-card">
            <h3>{sector.name}</h3>
            <p>{sector.allocation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sectors;
