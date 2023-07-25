import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { getSingleMember } from '../../../utils/api/memberData';

export default function SingleMember() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [member, setMember] = useState({});

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMember);
  }, [firebaseKey]);

  const returnToTeam = () => {
    router.push(`/team/${member.team_id}`);
  };

  return (
    <>
      <div className="top-btn">
        <Button type="primary" onClick={returnToTeam}>
          Back to team
        </Button>
      </div>
      <div id="single-member">
        <div className="d-flex flex-column">
          <img
            src={member.image}
            alt={member.name}
            style={{ width: '300px' }}
          />
        </div>
        <div className="text-white ms-5 details">
          <h5>{member.name}</h5>
          <h5>Role: {member.role}</h5>
        </div>
      </div>
    </>
  );
}
