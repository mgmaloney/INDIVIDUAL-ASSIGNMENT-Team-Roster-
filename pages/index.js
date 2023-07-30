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
  }, []);

  return (
    <>
      <div className="header-div">
        <h1 className="header">Teams!</h1>
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
              onUpdate={getPublicTeams}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
