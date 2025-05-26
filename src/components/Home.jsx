import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Home.css';

const Home = ({ user }) => {
    const [portfolioStats, setPortfolioStats] = useState({
        count: 0,
        totalValue: 0
    });
    const [userBalance, setUserBalance] = useState(0);
    const [newPortfolio, setNewPortfolio] = useState({
        name: '',
        strategy: ''
    });
    const [isCreating, setIsCreating] = useState(false);

    const fetchPortfolioStats = async () => {
        if (!user || !user.isLoggedIn || !user.userId) return;
        
        try {
            const base_url = 'http://127.0.0.1:5000';
            const url = `${base_url}/portfolio/get-all/${user.userId}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch portfolio stats');
            }
            
            const portfolios = await response.json();
            console.log('Fetched portfolios:', portfolios);

            let totalValue = 0;
            for (const portfolio of portfolios) {
                try {
                    const investmentsUrl = `${base_url}/investment/get-all/${portfolio.id}`;
                    const investmentsResponse = await fetch(investmentsUrl);
                    
                    if (investmentsResponse.ok) {
                        const investments = await investmentsResponse.json();
                        console.log(`Investments for portfolio ${portfolio.id}:`, investments);
                        
                        const portfolioValue = investments.reduce((sum, investment) => {
                            return sum + (investment.price * investment.quantity);
                        }, 0);
                        
                        totalValue += portfolioValue;
                    }
                } catch (error) {
                    console.error(`Error fetching investments for portfolio ${portfolio.id}:`, error);
                }
            }

            setPortfolioStats({
                count: portfolios.length,
                totalValue: totalValue
            });
        } catch (error) {
            console.error('Error fetching portfolio stats:', error);
        }
    };

    useEffect(() => {
        const fetchUserBalance = async () => {
            if (!user || !user.isLoggedIn || !user.userId) return;
            
            try {
                const base_url = 'http://127.0.0.1:5000';
                const url = `${base_url}/user/get-balance/${user.userId}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user balance');
                }
                
                const data = await response.json();
                setUserBalance(data.balance || 0);
            } catch (error) {
                console.error('Error fetching user balance:', error);
            }
        };

        fetchUserBalance();
        fetchPortfolioStats();
    }, [user]);

    const handleCreatePortfolio = async (e) => {
        e.preventDefault();
        if (!newPortfolio.name || !newPortfolio.strategy) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsCreating(true);
        try {
            const base_url = 'http://127.0.0.1:5000';
            const response = await fetch(`${base_url}/portfolio/create-new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newPortfolio.name,
                    strategy: newPortfolio.strategy,
                    userId: user.userId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create portfolio');
            }

            toast.success('Portfolio created successfully!');
            setNewPortfolio({ name: '', strategy: '' });
            // Refresh portfolio stats
            await fetchPortfolioStats();
        } catch (error) {
            toast.error(error.message || 'Failed to create portfolio');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="home-container">
            <div className="home-card">
                {/* Welcome Section */}
                <div className="welcome-section">
                    <h1 className="welcome-greeting">👋 Welcome, {user?.user || 'User'}</h1>
                    <div className="stats-container">
                        <p className="welcome-stats">
                            You have {portfolioStats.count} portfolio{portfolioStats.count !== 1 ? 's' : ''} | Total investment value: ${portfolioStats.totalValue.toLocaleString()}
                        </p>
                        <p className="balance-stats">
                            Current Balance: ${userBalance.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Create Portfolio Section */}
                <div className="create-portfolio-section">
                    <h2 className="section-title">Create New Portfolio</h2>
                    <form onSubmit={handleCreatePortfolio} className="create-portfolio-form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Portfolio Name"
                                value={newPortfolio.name}
                                onChange={(e) => setNewPortfolio(prev => ({ ...prev, name: e.target.value }))}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Strategy (e.g., Growth, Value, Balanced)"
                                value={newPortfolio.strategy}
                                onChange={(e) => setNewPortfolio(prev => ({ ...prev, strategy: e.target.value }))}
                                className="form-input"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="create-portfolio-button"
                            disabled={isCreating}
                        >
                            {isCreating ? 'Creating...' : 'Create Portfolio'}
                        </button>
                    </form>
                </div>

                {/* Features Section */}
                <div className="features">
                    <h2>📂 What you can do on this platform:</h2>
                    <ul>
                        <li>📊 <strong>View Your Portfolios</strong>
                            <ul>
                                <li>See all your portfolios in a neat table</li>
                                <li>Each portfolio shows its name and strategy</li>
                                <li>If you don't have any portfolios, you'll see a friendly message to create one</li>
                            </ul>
                        </li>
                        <li>🔄 <strong>Manage Your Portfolios</strong>
                            <ul>
                                <li>Click "Show" to view investments in a portfolio</li>
                                <li>Click "Delete" to remove a portfolio (you'll be asked to confirm)</li>
                                <li>You can't delete a portfolio if it has investments</li>
                            </ul>
                        </li>
                        <li>📈 <strong>Track Your Investments</strong>
                            <ul>
                                <li>After clicking "Show" on a portfolio, you'll see all its investments</li>
                                <li>Each investment shows the stock ticker, price per share, quantity, and purchase date</li>
                                <li>If a portfolio has no investments, you'll see a message to add some</li>
                            </ul>
                        </li>
                        <li>💰 <strong>Sell Your Investments</strong>
                            <ul>
                                <li>Click "Sell" on any investment to sell shares</li>
                                <li>Enter how many shares to sell and the current selling price</li>
                                <li>You'll get a notification if the sale succeeds or fails</li>
                            </ul>
                        </li>
                        <li>🔔 <strong>Stay Informed</strong>
                            <ul>
                                <li>Get notifications for successful sales and failed operations</li>
                                <li>See loading messages when operations are in progress</li>
                                <li>Buttons are disabled while operations are happening</li>
                            </ul>
                        </li>
                        <li>🔒 <strong>Security</strong>
                            <ul>
                                <li>You must be logged in to use this page</li>
                                <li>If you're not logged in, you'll be redirected to login</li>
                            </ul>
                        </li>
                        <li>👤 <strong>Navigation</strong>
                            <ul>
                                <li>Click the user icon in the navbar to return to this home page</li>
                                <li>Use the navigation menu to access different features</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;