import React from "react";

const transactions = [
  { id: 1, date: "2025-05-01", time: "10:23 AM", type: "Buy", asset: "AAPL", shares: 10, price: "$170", total: "$1,700", status: "Completed", notes: "Bought during dip" },
  { id: 2, date: "2025-04-28", time: "3:45 PM", type: "Sell", asset: "TSLA", shares: 5, price: "$720", total: "$3,600", status: "Pending", notes: "Profit booking" },
  { id: 3, date: "2025-04-25", time: "11:00 AM", type: "Dividend", asset: "VOO", shares: "-", price: "$30", total: "$30", status: "Credited", notes: "Quarterly dividend" },
  { id: 4, date: "2025-04-22", time: "9:15 AM", type: "Buy", asset: "GOOGL", shares: 3, price: "$2,800", total: "$8,400", status: "Completed", notes: "Long-term tech holding" },
  { id: 5, date: "2025-04-20", time: "1:00 PM", type: "Sell", asset: "META", shares: 6, price: "$305", total: "$1,830", status: "Completed", notes: "Portfolio rebalancing" },
  { id: 6, date: "2025-04-19", time: "2:30 PM", type: "Buy", asset: "NVDA", shares: 4, price: "$650", total: "$2,600", status: "Completed", notes: "AI exposure" },
  { id: 7, date: "2025-04-18", time: "12:00 PM", type: "Buy", asset: "AMZN", shares: 2, price: "$3,200", total: "$6,400", status: "Completed", notes: "E-commerce strategy" },
  { id: 8, date: "2025-04-16", time: "10:45 AM", type: "Dividend", asset: "MSFT", shares: "-", price: "$22", total: "$22", status: "Credited", notes: "Monthly payout" },
  { id: 9, date: "2025-04-15", time: "9:30 AM", type: "Buy", asset: "BTC", shares: 0.2, price: "$32,000", total: "$6,400", status: "Completed", notes: "Crypto exposure" },
  { id: 10, date: "2025-04-14", time: "4:10 PM", type: "Sell", asset: "NFLX", shares: 1, price: "$520", total: "$520", status: "Completed", notes: "Exited position" },
  { id: 11, date: "2025-04-13", time: "11:05 AM", type: "Buy", asset: "BND", shares: 15, price: "$84", total: "$1,260", status: "Completed", notes: "Bond diversification" },
  { id: 12, date: "2025-04-12", time: "3:45 PM", type: "Buy", asset: "ARKK", shares: 7, price: "$43", total: "$301", status: "Pending", notes: "High-growth ETF" },
  { id: 13, date: "2025-04-10", time: "2:20 PM", type: "Buy", asset: "TSLA", shares: 1, price: "$710", total: "$710", status: "Completed", notes: "EV allocation" },
  { id: 14, date: "2025-04-09", time: "10:50 AM", type: "Dividend", asset: "VTI", shares: "-", price: "$15", total: "$15", status: "Credited", notes: "Broad market dividend" },
  { id: 15, date: "2025-04-08", time: "1:30 PM", type: "Sell", asset: "AMD", shares: 3, price: "$130", total: "$390", status: "Completed", notes: "Short-term profit" },
  { id: 16, date: "2025-04-07", time: "12:15 PM", type: "Buy", asset: "INTC", shares: 10, price: "$34", total: "$340", status: "Completed", notes: "Chip sector play" },
  { id: 17, date: "2025-04-06", time: "9:00 AM", type: "Buy", asset: "QQQ", shares: 2, price: "$350", total: "$700", status: "Completed", notes: "Tech ETF" },
  { id: 18, date: "2025-04-05", time: "4:30 PM", type: "Dividend", asset: "JNJ", shares: "-", price: "$18", total: "$18", status: "Credited", notes: "Pharma dividend" },
  { id: 19, date: "2025-04-04", time: "11:45 AM", type: "Buy", asset: "XLF", shares: 10, price: "$32", total: "$320", status: "Completed", notes: "Financial sector exposure" },
  { id: 20, date: "2025-04-03", time: "3:00 PM", type: "Sell", asset: "PFE", shares: 4, price: "$40", total: "$160", status: "Completed", notes: "Closed healthcare trade" },
];

const History = () => {
  return (
    <div className="section-wrapper">
      <h2>📄 Transaction History</h2>
      <table className="portfolio-table history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Asset</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Total</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.time}</td>
              <td>{tx.type}</td>
              <td>{tx.asset}</td>
              <td>{tx.shares}</td>
              <td>{tx.price}</td>
              <td>{tx.total}</td>
              <td>
                <span className={`status-badge ${tx.status.toLowerCase()}`}>
                  {tx.status}
                </span>
              </td>
              <td>{tx.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
