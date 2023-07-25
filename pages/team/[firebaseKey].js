/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getTeamMembers } from '../../utils/api/memberData';
import MemberCard from '../../components/cards/memberCard';

export default function ViewTeam() {
  const [teamMembers, setTeamMembers] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getTeamMembers(firebaseKey)
      .then((response) => Object.values(response))
      .then(setTeamMembers);
  }, [firebaseKey]);

  const getTheTeamMembers = () => {
    getTeamMembers(firebaseKey)
      .then((response) => Object.values(response))
      .then(setTeamMembers);
  };

  const addButtonClick = () => {
    router.push('/team/member/new');
  };

  return (
    <>
      {teamMembers &&
        teamMembers.map((member) => (
          <MemberCard
            key={member.firebaseKey}
            memberObj={member}
            onUpdate={getTheTeamMembers}
          />
        ))}
      <Button variant="primary" onClick={addButtonClick} className="m-2">
        Add a member
      </Button>
    </>
  );
}
