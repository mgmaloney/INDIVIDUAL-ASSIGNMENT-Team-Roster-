/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUserTeams } from '../utils/api/teamData';
import TeamCard from '../components/cards/teamCard';

export default function MyTeams() {
  const { user } = useAuth();
  const [teams, setTeams] = useState({});

  const getTeams = () => {
    getUserTeams(user.uid)
      .then((response) => Object.values(response))
      .then(setTeams);
  };

  useEffect(() => {
    getTeams();
  }, [user.uid]);

  return (
    <>
      <div className="header-div">
        <h1 className="header">My Teams!</h1>
      </div>
      <div
        id="home-div"
        className="text-center d-flex flex-row justify-content-center align-content-center"
      >
        {teams.length &&
          teams.map((team) => (
            <TeamCard
              key={team.firebaseKey}
              teamObj={team}
              onUpdate={getTeams}
            />
          ))}
      </div>
    </>
  );
}
