import React, { useState, useEffect } from 'react';
import '../styles/market.css';

const Market = () => {
  const [stocks, setStocks] = useState([
    { ticker: 'AAPL', price: 150 },
    { ticker: 'GOOGL', price: 2800 },
    { ticker: 'AMZN', price: 3400 },
    { ticker: 'MSFT', price: 320 },
    { ticker: 'TSLA', price: 750 },
    { ticker: 'META', price: 290 },
    { ticker: 'NFLX', price: 420 },
    { ticker: 'NVDA', price: 850 },
    { ticker: 'JNJ', price: 165 },
    { ticker: 'PFE', price: 42 },
  ]);

  const [selectedStock, setSelectedStock] = useState(null);
  const [orderDetails, setOrderDetails] = useState({ quantity: '', priceType: 'market', limitPrice: '' });
  const [showCardForm, setShowCardForm] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => ({
          ...stock,
          price: (stock.price * (1 + (Math.random() - 0.5) / 100)).toFixed(2),
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyClick = stock => {
    setSelectedStock(stock);
    setOrderDetails({ quantity: '', priceType: 'market', limitPrice: '' });
    setShowCardForm(false);
  };

  const handleOrderSubmit = () => {
    setShowCardForm(true);
  };

  const handlePaymentSubmit = () => {
    setSelectedStock(null);
    setShowCardForm(false);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="market-body">
      <h1 className="market-title">Available Stock Options</h1>
      <table className="market-table">
        <thead>
          <tr>
            <th>Stock Ticker</th>
            <th>Price</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, i) => (
            <tr key={i}>
              <td>{stock.ticker}</td>
              <td>${stock.price}</td>
              <td>
                <button className="btn-buy" onClick={() => handleBuyClick(stock)}>Buy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Modal */}
      {selectedStock && !showCardForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Purchase {selectedStock.ticker}</h2>
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={orderDetails.quantity}
                onChange={e => setOrderDetails({ ...orderDetails, quantity: e.target.value })}
              />
            </label>

            <label>
              Price Type:
              <select
                value={orderDetails.priceType}
                onChange={e => setOrderDetails({ ...orderDetails, priceType: e.target.value })}
              >
                <option value="market">Market Price (${selectedStock.price})</option>
                <option value="limit">Limit Price</option>
              </select>
            </label>

            {orderDetails.priceType === 'limit' && (
              <label>
                Limit Price:
                <input
                  type="number"
                  min="1"
                  value={orderDetails.limitPrice}
                  onChange={e => setOrderDetails({ ...orderDetails, limitPrice: e.target.value })}
                />
              </label>
            )}

            <button className="btn" onClick={handleOrderSubmit}>Proceed to Payment</button>
            <button className="btn-secondary" onClick={() => setSelectedStock(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Card Details Modal */}
      {showCardForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Card Details</h2>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="MM/YY" />
            <input type="text" placeholder="CVV" />
            <button className="btn" onClick={handlePaymentSubmit}>Submit Payment</button>
          </div>
        </div>
      )}

      {toast && <div className="toast">✅ Purchase completed successfully!</div>}
    </div>
  );
};

export default Market;
