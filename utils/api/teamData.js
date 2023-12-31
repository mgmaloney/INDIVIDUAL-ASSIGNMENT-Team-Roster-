/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
import axios from 'axios';
import { clientCredentials } from '../client';
import { deleteMember, getTeamMembers } from './memberData';

const dbURL = clientCredentials.databaseURL;

const getAllPublicTeams = async () => {
  try {
    const { data } = await axios.get(
      `${dbURL}/teams.json?orderBy="private"&equalTo=${false}`
    );
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const filterOutUserTeams = async (uid) => {
  const publicTeams = await getAllPublicTeams();
  const publicTeamsArr = Object.values(publicTeams);
  const nonUserTeams = [];
  publicTeamsArr.forEach((team) => {
    if (team.uid !== uid) {
      nonUserTeams.push(team);
    }
  });
  return nonUserTeams;
};

const getUserTeams = async (uid) => {
  try {
    const { data } = await axios.get(
      `${dbURL}/teams.json?orderBy="uid"&equalTo="${uid}"`
    );
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const getSingleTeam = async (firebaseKey) => {
  try {
    const { data } = await axios.get(`${dbURL}/teams/${firebaseKey}.json`);
    return data;
  } catch (e) {
    console.warn(e);
  }
};
const deleteTeam = async (firebaseKey) => {
  try {
    const { data } = await axios.delete(`${dbURL}/teams/${firebaseKey}.json`);
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const updateTeam = async (payload) => {
  try {
    const { data } = await axios.patch(
      `${dbURL}/teams/${payload.firebaseKey}.json`,
      payload
    );
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const createTeam = async (payload) => {
  try {
    const response = await axios.post(`${dbURL}/teams.json`, payload);
    const firebaseKey = await response.data.name;
    await updateTeam({ firebaseKey });
    return response;
  } catch (e) {
    console.warn(e);
  }
};

const deleteTeamAndMembers = async (firebaseKey) => {
  try {
    const { teamMembers } = await getTeamMembers(firebaseKey);
    teamMembers.forEach((member) => {
      deleteMember(member.firebaseKey);
    });
    const { teamData } = await axios.delete(
      `${dbURL}/teams.json/${firebaseKey}`
    );
    return teamData;
  } catch (e) {
    console.warn(e);
  }
};

export {
  getAllPublicTeams,
  filterOutUserTeams,
  getUserTeams,
  getSingleTeam,
  updateTeam,
  createTeam,
  deleteTeam,
  deleteTeamAndMembers,
};
