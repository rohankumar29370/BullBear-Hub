import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/market.css';

const Market = ({ user }) => {
    const [stocks, setStocks] = useState([
        { ticker: 'AAPL', price: 195.27, quantity: 0, selected: false },
        { ticker: 'MSFT', price: 450.18, quantity: 0, selected: false },
        { ticker: 'GOOGL', price: 168.47, quantity: 0, selected: false },
        { ticker: 'AMZN', price: 200.99, quantity: 0, selected: false },
        { ticker: 'TSLA', price: 339.34, quantity: 0, selected: false },
        { ticker: 'NVDA', price: 131.29, quantity: 0, selected: false },
        { ticker: 'BRK.B', price: 503.46, quantity: 0, selected: false },
        { ticker: 'META', price: 627.06, quantity: 0, selected: false },
        { ticker: 'UNH', price: 295.57, quantity: 0, selected: false },
        { ticker: 'JNJ', price: 152.94, quantity: 0, selected: false },
        { ticker: 'V', price: 353.54, quantity: 0, selected: false },
        { ticker: 'PG', price: 165.86, quantity: 0, selected: false },
        { ticker: 'JPM', price: 260.71, quantity: 0, selected: false },
        { ticker: 'MA', price: 563.58, quantity: 0, selected: false },
        { ticker: 'HD', price: 362.71, quantity: 0, selected: false },
        { ticker: 'XOM', price: 103.03, quantity: 0, selected: false },
        { ticker: 'KO', price: 71.77, quantity: 0, selected: false },
        { ticker: 'PEP', price: 129.34, quantity: 0, selected: false },
        { ticker: 'MRK', price: 77.58, quantity: 0, selected: false },
        { ticker: 'ABBV', price: 183.26, quantity: 0, selected: false },
        { ticker: 'CVX', price: 136.54, quantity: 0, selected: false },
        { ticker: 'WMT', price: 96.34, quantity: 0, selected: false },
        { ticker: 'BAC', price: 43.20, quantity: 0, selected: false },
        { ticker: 'DIS', price: 109.72, quantity: 0, selected: false },
        { ticker: 'NFLX', price: 1185.39, quantity: 0, selected: false }
    ]);
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPortfolios = async () => {
            if (!user || !user.isLoggedIn || !user.userId) return;
            
            setIsLoading(true);
            try {
                const base_url = 'http://127.0.0.1:5000';
                const url = `${base_url}/portfolio/get-all/${user.userId}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Failed to get portfolios for user ${user.user}`);
                }
                
                const data = await response.json();
                setPortfolios(data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolios();
    }, [user]);

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

    const handlePortfolioSelect = (e) => {
        const portfolioId = e.target.value;
        const portfolio = portfolios.find(p => p.id === parseInt(portfolioId));
        setSelectedPortfolio(portfolio);
    };

    const handlePurchase = async () => {
        if (!selectedPortfolio) {
            toast.error('Please select a portfolio first');
            return;
        }

        const selectedStocks = stocks.filter(stock => stock.selected && stock.quantity > 0);
        if (selectedStocks.length === 0) {
            toast.error('Please select at least one stock and specify quantity');
            return;
        }

        setIsLoading(true);
        try {
            const base_url = 'http://127.0.0.1:5000';
            const purchasePromises = selectedStocks.map(async stock => {
                const response = await fetch(`${base_url}/investment/purchase`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        portfolioId: selectedPortfolio.id,
                        ticker: stock.ticker,
                        price: stock.price,
                        quantity: parseInt(stock.quantity)
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Failed to purchase ${stock.ticker}`);
                }

                return response;
            });

            const results = await Promise.allSettled(purchasePromises);
            
            // Check for any failures
            const failures = results.filter(result => result.status === 'rejected');
            if (failures.length > 0) {
                const errorMessages = failures.map(failure => failure.reason.message).join(', ');
                throw new Error(`Failed to purchase: ${errorMessages}`);
            }

            toast.success('Successfully purchased selected stocks');
            
            // Reset selections
            setStocks(stocks.map(stock => ({
                ...stock,
                selected: false,
                quantity: 0
            })));
        } catch (err) {
            console.error('Purchase error:', err);
            toast.error(err.message || 'Failed to complete purchase');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setStocks(stocks.map(stock => ({
            ...stock,
            selected: false,
            quantity: 0
        })));
        setSelectedPortfolio(null);
    };

    if (!user || !user.isLoggedIn) {
        return <div>Please log in to access the market.</div>;
    }

    return (
        <div className="market-body">
            <h1 className="market-title">Available Stock Options</h1>
            
            <div className="portfolio-selector">
                <label htmlFor="portfolio-select">Select Portfolio:</label>
                <select 
                    id="portfolio-select" 
                    value={selectedPortfolio?.id || ''} 
                    onChange={handlePortfolioSelect}
                    disabled={isLoading}
                >
                    <option value="">Choose a portfolio...</option>
                    {portfolios.map(portfolio => (
                        <option key={portfolio.id} value={portfolio.id}>
                            {portfolio.name}
                        </option>
                    ))}
                </select>
            </div>

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
                                    disabled={isLoading}
                                />
                            </td>
                            <td>
                                <div className="checkbox-wrapper">
                                    <input 
                                        type="checkbox" 
                                        checked={stock.selected} 
                                        onChange={() => handleCheckboxChange(index)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <button 
                    className="btn btn-market-submit" 
                    onClick={handlePurchase}
                    disabled={isLoading || !selectedPortfolio}
                >
                    Submit Purchase Order
                </button>
                <button 
                    className="btn btn-secondary"
                    onClick={handleClear}
                    disabled={isLoading}
                >
                    Clear
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Market;