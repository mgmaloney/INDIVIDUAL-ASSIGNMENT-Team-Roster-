/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
import axios from 'axios';
import { clientCredentials } from '../client';

const dbURL = clientCredentials.databaseURL;

const getTeamMembers = async (teamFbKey) => {
  try {
    const { data } = await axios.get(
      `${dbURL}/members.json?orderBy="team_id"&equalTo="${teamFbKey}"`
    );
    console.warn(data);
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const getSingleMember = async (memberFbKey) => {
  try {
    const { data } = await axios.get(`${dbURL}/members/${memberFbKey}.json`);
    console.warn(data);
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const deleteMember = async (memberFbKey) => {
  try {
    const { data } = await axios.delete(`${dbURL}/members/${memberFbKey}.json`);
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const updateMember = async (payload) => {
  try {
    const { data } = await axios.patch(
      `${dbURL}/members/${payload.firebaseKey}.json`
    );
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const createMember = async () => {
  try {
    const { data } = await axios.post(`${dbURL}/members.json`);
    const firebaseKey = data.name;
    await updateMember({ firebaseKey });
    return data;
  } catch (e) {
    console.warn(e);
  }
};

export {
  getTeamMembers,
  getSingleMember,
  deleteMember,
  createMember,
  updateMember,
};
