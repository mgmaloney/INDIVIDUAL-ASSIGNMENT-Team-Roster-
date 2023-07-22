import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTeam } from '../../../utils/api/teamData';
import TeamForm from '../../../components/forms/teamForm';

export default function EditTeam() {
  const [team, setTeam] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeam);
  }, [firebaseKey]);

  return <TeamForm obj={team} />;
}
