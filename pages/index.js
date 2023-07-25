import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getAllPublicTeams } from '../utils/api/teamData';
import TeamCard from '../components/cards/teamCard';

function Home() {
  const [teams, setTeams] = useState();

  const getPublicTeams = () => {
    getAllPublicTeams().then(setTeams);
  };

  useEffect(() => {
    getPublicTeams();
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
      {/* {teams.forEach((team) => {
        <TeamCard teamObj={team} onUpdate={getPublicTeams} />;
      })} */}
    </div>
  );
}

export default Home;
