import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Button } from 'react-bootstrap';
import { createMember, updateMember } from '../../utils/api/memberData';
import { useAuth } from '../../utils/context/authContext';

import { getUserTeams } from '../../utils/api/teamData';

const initialState = {
  name: '',
  image: '',
  role: '',
  team_id: '',
  firebaseKey: '',
};
function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState({});
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getUserTeams(user.uid)
      .then((response) => Object.values(response))
      .then(setTeams);
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      await updateMember(formInput);
      router.back();
    } else {
      await createMember(formInput);
      router.back();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">
        {obj.firebaseKey ? 'Update' : 'Create'} Member
      </h2>

      <FloatingLabel
        controlId="floatingInput1"
        label="Full Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Full Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput3"
        label="Member Image"
        className="mb-3"
      >
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput5" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.team_id} // FIXME: modify code to remove error
          required
        >
          <option value="">Select a Team</option>
          {teams.map((team) => (
            <option key={team.firebaseKey} value={team.firebaseKey}>
              {team.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">
        {obj.firebaseKey ? 'Update' : 'Create'} Member
      </Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    team_id: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
