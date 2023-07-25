import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { getTeamMembers } from '../../utils/api/memberData';
import { deleteTeamAndMembers } from '../../utils/api/teamData';

export default function TeamCard({ teamObj, onUpdate }) {
  const [teamPlayers, setTeamPlayers] = useState();

  useEffect(() => {
    getTeamMembers(teamObj.firebaseKey).then(setTeamPlayers);
  }, [teamObj]);

  const deleteThisTeam = () => {
    deleteTeamAndMembers(teamObj.firebaseKey).then(() => onUpdate());
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img
        variant="top"
        src={teamObj.image}
        alt={teamObj.name}
        style={{ height: '400px' }}
      />
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <Card.Text>Members: {teamPlayers.length}</Card.Text>
        <Link passHref href={`/team/${teamObj.firebaseKey}`}>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link passHref href={`/team/edit/${teamObj.firebaseKey}`}>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
