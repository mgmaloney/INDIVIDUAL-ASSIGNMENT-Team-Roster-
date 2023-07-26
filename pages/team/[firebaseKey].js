/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import TeamContext from '../../utils/context/teamContext';
import { getTeamMembers } from '../../utils/api/memberData';
import MemberCard from '../../components/cards/memberCard';
import { getSingleTeam } from '../../utils/api/teamData';

export default function ViewTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const { team, setTeam } = useContext(TeamContext);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeam);
  }, []);

  const getTheTeamMembers = () => {
    getTeamMembers(firebaseKey)
      .then((response) => Object.values(response))
      .then(setTeamMembers);
  };

  useEffect(() => {
    getTheTeamMembers();
  }, []);

  const addButtonClick = () => {
    router.push('/team/member/new');
  };

  return (
    <>
      <div className="header">
        <h1>Team: {team?.name}</h1>
      </div>
      <div className="top-btn">
        <Button variant="primary" onClick={addButtonClick} className="m-2">
          Add a member
        </Button>
      </div>
      <div id="team-members">
        {teamMembers &&
          teamMembers.map((member) => (
            <MemberCard
              key={member.firebaseKey}
              memberObj={{ ...member }}
              teamObj={team}
              onUpdate={getTheTeamMembers}
            />
          ))}
      </div>
    </>
  );
}
