import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Portfolio.css';
import '../styles/Investment.css';

const Portfolio = ({ user }) => {
    console.log('Portfolio component rendered with user:', user);
    
    // Validate user prop with the correct structure
    if (!user || !user.isLoggedIn || !user.userId || !user.user) {
        console.log('User validation failed:', { user });
        return (
            <>
                <ToastContainer />
                <div>Please log in to view your portfolio.</div>
            </>
        );
    }

    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [investments, setInvestments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolios = async () => {
            console.log('Fetching portfolios for user:', user.userId);
            setIsLoading(true);
            setError(null);
            try {
                const base_url = 'http://127.0.0.1:5000';
                const url = `${base_url}/portfolio/get-all/${user.userId}`;
                console.log('Fetching from URL:', url);
                
                const response = await fetch(url);
                console.log('Portfolio response status:', response.status);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Failed to get portfolios for user ${user.user}`);
                }
                
                const data = await response.json();
                console.log('Received portfolios:', data);
                
                if (!Array.isArray(data)) {
                    throw new Error('Invalid response format: expected an array of portfolios');
                }
                
                setPortfolios(data);
            } catch (err) {
                console.error('Error fetching portfolios:', err);
                setError(err.message);
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolios();
    }, [user.userId, user.user]);

    const handleShowInvestments = async (portfolio) => {
        console.log('Selected portfolio:', portfolio);

        if (!portfolio || !portfolio.id) {
            toast.error('Invalid portfolio selected');
            return;
        }

        setIsLoading(true);
        try {
            const base_url = 'http://127.0.0.1:5000';
            const url = `${base_url}/investment/get-all/${portfolio.id}`;
            console.log('Fetching investments from:', url);

            const response = await fetch(url);
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error(errorData.message || 'Failed to get investments');
            }
            
            const data = await response.json();
            console.log('Received investments:', data);
            
            setInvestments(data);
            setSelectedPortfolio(portfolio);
        } catch (err) {
            console.error('Error in handleShowInvestments:', err);
            toast.error(err.message);
            setInvestments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSellInvestment = async (investment) => {
        if (!investment || !investment.id || !investment.ticker || !investment.quantity) {
            toast.error('Invalid investment selected');
            return;
        }

        const quantityToSell = parseInt(prompt(`Enter quantity to sell for ${investment.ticker} (max: ${investment.quantity}):`));
        if (isNaN(quantityToSell) || quantityToSell <= 0 || quantityToSell > investment.quantity) {
            toast.error(`Please enter a valid quantity between 1 and ${investment.quantity}`);
            return;
        }

        const salePrice = parseFloat(prompt(`Enter the sale price for ${investment.ticker}:`));
        if (isNaN(salePrice) || salePrice <= 0) {
            toast.error('Please enter a valid sale price');
            return;
        }

        setIsLoading(true);
        try {
            const base_url = 'http://127.0.0.1:5000';
            const url = `${base_url}/investment/sell`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    investmentId: investment.id,
                    qty: quantityToSell,
                    price: salePrice
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to sell investment ${investment.ticker}`);
            }

            toast.success(`Successfully sold ${quantityToSell} of ${investment.ticker} at $${salePrice.toFixed(2)}`);
            // Refresh investments after successful sale
            handleShowInvestments({ id: investment.portfolio_id, name: selectedPortfolio.name });
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePortfolio = async (portfolioId) => {
        if (!window.confirm('Are you sure you want to delete this portfolio?')) {
            return;
        }

        setIsLoading(true);
        try {
            console.log('Attempting to delete portfolio:', portfolioId);
            const base_url = 'http://127.0.0.1:5000';
            const response = await fetch(`${base_url}/portfolio/delete/${portfolioId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Delete response status:', response.status);
            const responseData = await response.json();
            console.log('Delete response data:', responseData);

            if (!response.ok) {
                const errorMessage = responseData.message || responseData.error || 'Unable to delete portfolio';
                console.error('Delete error:', errorMessage);
                toast.error(errorMessage);
                return; // Return early without throwing error
            }

            toast.success('Portfolio deleted successfully');
            const updatedPortfolios = portfolios.filter(p => p.id !== portfolioId);
            console.log('Updated portfolios after deletion:', updatedPortfolios);
            setPortfolios(updatedPortfolios);
            if (selectedPortfolio && selectedPortfolio.id === portfolioId) {
                setSelectedPortfolio(null);
                setInvestments([]);
            }
        } catch (err) {
            console.error('Error deleting portfolio:', err);
            const errorMessage = err.message || 'Unable to delete portfolio';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <>
                <ToastContainer />
                <div className="loading">Loading portfolios...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <ToastContainer />
                <div className="error">Error: {error}</div>
            </>
        );
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="portfolio-container">
                <h1>User Portfolios</h1>
                {portfolios && portfolios.length > 0 ? (
                    <table className="portfolio-table">
                        <thead>
                            <tr>
                                <th>Portfolio Name</th>
                                <th>Strategy</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolios.map((portfolio) => (
                                <tr key={portfolio.id}>
                                    <td>{portfolio.name}</td>
                                    <td>{portfolio.strategy}</td>
                                    <td>
                                        <button
                                            onClick={() => handleShowInvestments(portfolio)}
                                            disabled={isLoading}
                                            className="action-button show-button"
                                        >
                                            Show
                                        </button>
                                        <button
                                            onClick={() => handleDeletePortfolio(portfolio.id)}
                                            className="delete-button"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Deleting..." : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📊</div>
                        <p>No portfolios found. Create a new portfolio to start tracking your investments.</p>
                    </div>
                )}
                <h1>Investments</h1>
                {investments && investments.length > 0 ? (
                    <div className="investments-container">
                        <table className="investments-table">
                            <thead>
                                <tr>
                                    <th>Portfolio</th>
                                    <th>Ticker</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investments.map((investment) => (
                                    <tr key={investment.id}>
                                        <td>{selectedPortfolio?.name}</td>
                                        <td>{investment.ticker}</td>
                                        <td>${investment.price.toFixed(2)}</td>
                                        <td>{investment.quantity}</td>
                                        <td>{new Date(investment.date).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                onClick={() => handleSellInvestment(investment)}
                                                className="sell-button"
                                                disabled={isLoading}
                                            >
                                                Sell
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    selectedPortfolio ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">💼</div>
                            <p>No investments in this portfolio yet. Add some investments to start building your portfolio.</p>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <p>Select a portfolio above to view its investments.</p>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default Portfolio;