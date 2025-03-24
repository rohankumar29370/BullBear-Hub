import React, { useState } from 'react';
import '../styles/market.css';

const Market = () => {
    const [stocks, setStocks] = useState([
        { ticker: 'AAPL', price: 150, quantity: 0, selected: false },
        { ticker: 'GOOGL', price: 2800, quantity: 0, selected: false },
        { ticker: 'AMZN', price: 3400, quantity: 0, selected: false }
    ]);

    const handleQuantityChange = (index, value) => {
        const newStocks = [...stocks];
        newStocks[index].quantity = value;
        setStocks(newStocks);
    };

    const handleCheckboxChange = (index) => {
        const newStocks = [...stocks];
        newStocks[index].selected = !newStocks[index].selected;
        setStocks(newStocks);
    };


    return (
        <div className="market-body">
            <h1 className="market-title">The Market</h1>
            <table className="market-table">
                <thead>
                    <tr>
                        <th>Stock Ticker</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, index) => (
                        <tr key={index}>
                            <td>{stock.ticker}</td>
                            <td>${stock.price}</td>
                            <td>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={stock.quantity || ''} 
                                    onChange={(e) => handleQuantityChange(index, e.target.value)} 
                                />
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={stock.selected} 
                                    onChange={() => handleCheckboxChange(index)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <button className="btn btn-primary">Submit Purchase Order</button>
                <button className="btn btn-secondary">Clear</button>
            </div>
        </div>
    );
};

export default Market;