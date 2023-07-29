import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTrade } from '../../utils/api/tradeData';
import {
  filterOutUserTeams,
  getUserTeams,
  getSingleTeam,
} from '../../utils/api/teamData';

export default function TradeForm() {
  const initialState = {
    userTeam: '',
    tradingForTeam: '',
  };
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [userTeams, setUserTeams] = useState([]);
  const [publicTeams, setPublicTeams] = useState([]);
  const [userTeam, setUserTeam] = useState({});
  const [tradingForTeam, setTradingForTeam] = useState({});

  useEffect(() => {
    getUserTeams(user.uid)
      .then((response) => Object.values(response))
      .then(setUserTeams);
    filterOutUserTeams(user.uid)
      .then((response) => Object.values(response))
      .then(setPublicTeams);
  }, [user.uid]);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({ ...prevState, [name]: value }));
    getSingleTeam(formInput.userTeam).then(setUserTeam);
    getSingleTeam(formInput.tradingForTeam).then(setTradingForTeam);
    console.warn(formInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.warn('submitting', 'user', userTeam, 'tradingfor', tradingForTeam);
    await createTrade({
      tradeItem1: userTeam,
      tradeItem2: tradingForTeam,
      initiatedBy: user.uid,
      pending: true,
      accepted: false,
      read: false,
    });
    router.back();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="trad-labels">Trading</h2>
      <FloatingLabel controlId="floatingInput1" label="Your Team">
        <Form.Select
          aria-label="User Team"
          name="userTeam"
          onInput={handleChange}
          className="mb-3"
          value={formInput.userTeam} // FIXME: modify code to remove error
          required
        >
          <option value="">Select a Team</option>
          {userTeams.map((team) => (
            <option key={team.firebaseKey} value={team.firebaseKey}>
              {team.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <h2 className="trade-labels">For</h2>
      <FloatingLabel controlId="floatingInput2" label="Team Requesting">
        <Form.Select
          aria-label="Trading For Team"
          name="tradingForTeam"
          onInput={handleChange}
          className="mb-3"
          value={formInput.tradingForTeam} // FIXME: modify code to remove error
          required
        >
          <option value="">Select a Team</option>
          {publicTeams.map((team) => (
            <option key={team.firebaseKey} value={team.firebaseKey}>
              {team.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <Button type="submit">Submit Request</Button>
    </Form>
  );
}
