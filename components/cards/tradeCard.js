import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteTrade } from '../../utils/api/tradeData';

export default function TradeCard({ tradeObj, onUpdate }) {
  const [userTeam, setUserTeam] = useState({});
  const [tradingForTeam, setTradingForTeam] = useState({});
  const { user } = useAuth();
  const setTeams = () => {
    if (tradeObj.tradeItem1.uid === user.uid) {
      setUserTeam(tradeObj.tradeItem1);
      setTradingForTeam(tradeObj.tradeItem2);
    } else {
      setUserTeam(tradeObj.tradeItem2);
      setTradingForTeam(tradeObj.tradeItem1);
    }
  };

  useEffect(() => {
    setTeams();
  }, []);

  const cancelTrade = () => {
    if (
      window.confirm(
        `Cancel trade of ${userTeam.name} for ${tradingForTeam.name}?`
      )
    ) {
      deleteTrade(tradeObj.firebaseKey).then(onUpdate());
    }
  };

  return (
    <Card
      style={{
        width: '18rem',
        margin: '10px',
      }}
    >
      <Card.Body>
        <div className="trade-card">
          <Card.Text>
            Trading {userTeam.name}{' '}
            <span>
              <strong>Owned</strong>
            </span>{' '}
            for {tradingForTeam.name}
          </Card.Text>
          <Link passHref href={`/trade/${tradeObj.firebaseKey}`}>
            <Button variant="primary" className="m-2">
              VIEW
            </Button>
          </Link>
          <Button variant="danger" onClick={cancelTrade} className="m-2">
            Cancel Trade
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

TradeCard.propTypes = {
  tradeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    tradeItem1: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      uid: PropTypes.string,
      firebaseKey: PropTypes.string,
    }).isRequired,
    tradeItem2: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      uid: PropTypes.string,
      firebaseKey: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
