/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/context/authContext';
import { getSingleTrade, updateTrade } from '../../utils/api/tradeData';
import { getUserTeams, updateTeam } from '../../utils/api/teamData';
import TeamCard from '../../components/cards/teamCard';

export default function ViewTrade() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [trade, setTrade] = useState({});
  const { user } = useAuth();
  const [tradingForTeam, setTradingForTeam] = useState({});
  const [, setTeams] = useState([]);

  useEffect(() => {
    getSingleTrade(firebaseKey).then(setTrade);
  }, [firebaseKey]);

  const setTradeTeams = () => {
    if (trade.tradeItem1?.uid === user.uid) {
      setTradingForTeam(trade.tradeItem2);
    } else {
      setTradingForTeam(trade.tradeItem1);
    }
  };

  useEffect(() => {
    setTradeTeams();
  }, []);

  const getTeams = () => {
    getUserTeams(user.uid)
      .then((response) => Object.values(response))
      .then(setTeams);
  };

  const acceptTrade = async () => {
    const updateUserTeamPayload = { uid: tradingForTeam.uid };
    const updateTradingTeamPayload = { uid: user.uid };
    await updateTeam(updateUserTeamPayload);
    await updateTeam(updateTradingTeamPayload);
    await updateTrade({ ...trade, accepted: true }).then(() =>
      getSingleTrade(firebaseKey).then(setTrade)
    );
  };
  const rejectTrade = async () => {
    const rejectPayload = { ...trade, accepted: false };
    await updateTrade(rejectPayload).then(() =>
      getSingleTrade(firebaseKey).then(setTrade)
    );
  };

  const tradeText = () => {
    if (trade.initiatedBy === user.uid && trade.accepted === null) {
      return '<em>Pending</em>';
    }
    if (trade.initiatedBy === user.uid && !trade.accepted) {
      return '<strong>Rejected</strong>';
    }
    if (trade.initiatedBy !== user.uid && trade.accepted === null) {
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
    if (trade.accepted) {
      return '<strong>Accepted</strong>';
    }
  };

  return (
    <>
      <div className="view-trade-card">
        {trade.tradeItem1 && (
          <>
            <TeamCard teamObj={trade.tradeItem1} onUpdate={getTeams} />
            <h2>FOR</h2>
            <TeamCard teamObj={trade.tradeItem2} onUpdate={getTeams} />
          </>
        )}
        {tradeText()}
      </div>
    </>
  );
}
