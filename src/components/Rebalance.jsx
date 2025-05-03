import React from 'react';

const Rebalance = () => {
  const suggestions = [
    { action: '🔼 Increase', asset: 'VOO', amount: '10%' },
    { action: '🔽 Reduce', asset: 'BTC', amount: '5%' },
    { action: '🔁 Reinvest', asset: 'AAPL dividends', into: 'Tech ETF' }
  ];

  return (
    <div className="section-wrapper">
      <h2>Rebalance Suggestions</h2>
      <p className="rebalance-subtext">
        Based on your current allocation and market trends, consider the following adjustments:
      </p>
      <div className="rebalance-grid">
        {suggestions.map((s, i) => (
          <div key={i} className="rebalance-card">
            {s.action === '🔁 Reinvest' ? (
              <p>
                {s.action} <strong>{s.asset}</strong> into <strong>{s.into}</strong>
              </p>
            ) : (
              <p>
                {s.action} <strong>{s.asset}</strong> by <strong>{s.amount}</strong>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rebalance;
