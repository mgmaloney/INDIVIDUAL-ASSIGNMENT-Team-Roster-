import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../../utils/api/memberData';
import MemberForm from '../../../../components/forms/memberForm';

export default function EditMember() {
  const [member, setMember] = useState();
  const router = useRouter;
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMember);
  }, [firebaseKey]);

  return <MemberForm obj={member} />;
}
