/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { getAllPublicTeams } from '../utils/api/teamData';
import TeamCard from '../components/cards/teamCard';

function Home() {
  const [teams, setTeams] = useState([]);

  const getPublicTeams = () => {
    getAllPublicTeams()
      .then((response) => Object.values(response))
      .then(setTeams);
  };

  useEffect(() => {
    getPublicTeams();
    console.warn(teams);
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {teams.length &&
        teams.map((team) => (
          <TeamCard
            key={team.firebaseKey}
            teamObj={team}
            onUpdate={getPublicTeams}
          />
        ))}
    </div>
  );
}

export default Home;
