import axios from 'axios';
import { clientCredentials } from '../client';
import { deleteMember, getTeamMembers } from './memberData';

const dbURL = clientCredentials.databaseURL;

const getAllPublicTeams = async () => {
  try {
    const { data } = await axios.get(
      `${dbURL}/teams.json?orderBy="private"&equalTo=false`
    );
    return data;
  } catch (e) {
    console.warn(e);
  }
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

const updateTeam = async (payload) => {
  try {
    const { data } = await axios.patch(
      `${dbURL}/teams/${payload.firebaseKey}.json`
    );
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const createTeam = async () => {
  try {
    const { data } = await axios.post(`${dbURL}/teams.json`);
    let firebaseKey = data.name;
    await updateTeam({ firebaseKey });
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const deleteTeamAndMembers = async (firebaseKey) => {
  try {
    const { teamMembers } = await getTeamMembers(firebaseKey);
    for (member of teamMembers) {
      deleteMember(member.firebaseKey);
    }
    const { teamData } = await axios.delete(
      `${dbURL}/teams.json/"${firebaseKey}"`
    );

    return teamData;
  } catch (e) {
    console.warn(e);
  }
};

export {
  getAllPublicTeams,
  getUserTeams,
  updateTeam,
  createTeam,
  deleteTeamAndMembers,
};
