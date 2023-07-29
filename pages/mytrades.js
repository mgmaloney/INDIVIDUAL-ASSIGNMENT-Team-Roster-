import { useEffect, useState } from 'react';
import TradeCard from '../components/cards/tradeCard';
import { getUserTrades } from '../utils/api/tradeData';
import { useAuth } from '../utils/context/authContext';

export default function MyTrades() {
  const [trades, setTrades] = useState({});
  const { user } = useAuth();

  const getTrades = () => {
    getUserTrades(user.uid).then(setTrades);
  };

  useEffect(() => {
    getTrades();
  }, []);

  return (
    <>
      <div className="header-div">
        <h1 className="header">My Trades!</h1>
      </div>
      <div
        id="home-div"
        className="text-center d-flex flex-row justify-content-center align-content-center"
      >
        {trades.length &&
          trades.map((trade) => (
            <TradeCard
              key={trade.firebaseKey}
              tradeObj={trade}
              onUpdate={getTrades}
            />
          ))}
      </div>
    </>
  );
}
