import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';

import { getSingleMember } from '../../../utils/api/memberData';
import MemberContext from '../../../utils/context/memberContext';

export default function SingleMember() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { member, setMember } = useContext(MemberContext);

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMember);
  }, [firebaseKey]);

  const returnToTeam = () => {
    router.back();
  };

  return (
    <>
      <div className="top-btn">
        <Button type="primary" onClick={returnToTeam}>
          Back to team
        </Button>
      </div>
      <div id="member-container">
        <div id="single-member">
          <img
            src={member.image}
            alt={member.name}
            style={{ width: '60%', 'object-fit': 'cover' }}
          />
          <div className="member-text text-white ms-5 details">
            <h5>{member.name}</h5>
            <h5>Role: {member.role}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
