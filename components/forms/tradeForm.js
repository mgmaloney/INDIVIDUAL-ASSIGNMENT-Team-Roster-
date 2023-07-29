import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTrade } from '../../utils/api/tradeData';
import { getAllPublicTeams, getUserTeams } from '../../utils/api/teamData';

export default function TradeForm() {
  const initialState = {
    userTeam: '',
    tradingForTeam: '',
  };
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [userTeams, setUserTeams] = useState({});
  const [publicTeams, setPublicTeams] = useState({});

  useEffect(() => {
    getUserTeams(user.uid)
      .then((response) => Object.values(response))
      .then(setUserTeams);
    getAllPublicTeams()
      .then((response) => Object.values(response))
      .then(setPublicTeams);
  }, [user.uid]);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTrade(formInput);
    router.back();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput1" label="userTeam">
        <Form.Select
          aria-label="User Team"
          name="userTeam"
          onChange={handleChange}
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
      <FloatingLabel controlId="floatingInput2" label="tradingForTeam">
        <Form.Select
          aria-label="Trading For Team"
          name="tradingForTeam"
          onChange={handleChange}
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
