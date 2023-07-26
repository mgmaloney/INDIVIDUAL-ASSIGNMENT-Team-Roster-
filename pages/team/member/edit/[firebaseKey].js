import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../../utils/api/memberData';
import MemberForm from '../../../../components/forms/memberForm';
import MemberContext from '../../../../utils/context/memberContext';

export default function EditMember() {
  const { member, setMember } = useContext(MemberContext);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMember);
  }, [firebaseKey]);

  return <MemberForm obj={member} />;
}
