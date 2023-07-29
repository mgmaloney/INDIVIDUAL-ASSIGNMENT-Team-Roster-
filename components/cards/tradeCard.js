/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteTrade, updateTrade } from '../../utils/api/tradeData';
import { updateTeam } from '../../utils/api/teamData';

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

  const acceptTrade = async () => {
    const updateUserTeamPayload = { uid: tradingForTeam.uid };
    const updateTradingTeamPayload = { uid: user.uid };
    await updateTeam(updateUserTeamPayload);
    await updateTeam(updateTradingTeamPayload);
    await updateTrade({ ...tradeObj, accepted: true }).then(() => onUpdate());
  };
  const rejectTrade = async () => {
    const rejectPayload = { ...tradeObj, accepted: false };
    await updateTrade(rejectPayload).then(() => onUpdate());
  };

  const tradeText = () => {
    if (tradeObj.initiatedBy === user.uid && tradeObj.pending) {
      return <em className="pending-trade">Pending</em>;
    }
    if (
      tradeObj.initiatedBy === user.uid &&
      !tradeObj.pending &&
      !tradeObj.accepted
    ) {
      return <strong className="complete-trade">Rejected</strong>;
    }
    if (tradeObj.initiatedBy !== user.uid && tradeObj.pending) {
      return (
        <>
          <Button onClick={acceptTrade} variant="primary">
            Accept Trade
          </Button>
          <Button onClick={rejectTrade} variant="danger">
            Reject Trade
          </Button>
        </>
      );
    }
    if (tradeObj.accepted) {
      return <strong className="complete-trade">Accepted</strong>;
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
        width: '50rem',
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
          <Card.Text>{tradeText()}</Card.Text>
          <Link passHref href={`/trade/${tradeObj.firebaseKey}`}>
            <Button variant="primary" className="m-2">
              VIEW
            </Button>
          </Link>
          {tradeObj.initiatedBy === user.uid ? (
            <Button variant="danger" onClick={cancelTrade} className="m-2">
              Cancel Trade
            </Button>
          ) : (
            ''
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

TradeCard.propTypes = {
  tradeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    initiatedBy: PropTypes.string,
    accepted: PropTypes.bool,
    pending: PropTypes.bool,
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
