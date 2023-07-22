/* eslint-disable react/destructuring-assignment */
import { useRouter } from 'next/router';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Button } from 'react-bootstrap';
import { createTeam, updateTeam } from '../../utils/api/teamData';

const initialState = {
  name: '',
  image: '',
  private: false,
};

export default function TeamForm(obj) {
  const [formInput, setFormInput] = useState();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (obj.firebaseKey) {
      updateTeam(formInput);
      router.push('/');
    } else {
      createTeam(formInput);
      router.push('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">
        {obj.firebaseKey ? 'Update' : 'Create'} Team
      </h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Team Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Team Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput3"
        label="Team Logo or Image"
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

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="private"
        name="private"
        label="On Sale?"
        checked={formInput.private}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            private: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">
        {obj.firebaseKey ? 'Update' : 'Create'} Team
      </Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};
