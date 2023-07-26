import { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMember } from '../../utils/api/memberData';

import TeamContext from '../../utils/context/teamContext';

export default function MemberCard({ memberObj, onUpdate }) {
  const team = useContext(TeamContext);
  const deleteSingleMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img
        variant="top"
        src={memberObj.image}
        alt={memberObj.name}
        style={{ height: '400px', 'object-fit': 'cover' }}
      />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {memberObj.role}
        </Card.Subtitle>
        <Card.Text>Team: {team.name}</Card.Text>
        <Link passHref href={`/team/member/${memberObj.firebaseKey}`}>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link passHref href={`/team/member/edit/${memberObj.firebaseKey}`}>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteSingleMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
