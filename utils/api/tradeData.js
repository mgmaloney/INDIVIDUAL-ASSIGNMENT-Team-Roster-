/* eslint-disable consistent-return */
import axios from 'axios';
import { clientCredentials } from '../client';

const dbURL = clientCredentials.databaseURL;

const getAllTrades = async () => {
  try {
    const { data } = await axios.get(`${dbURL}/trades.json`);
    return Object.values(data);
  } catch (e) {
    console.warn(e);
  }
};

const updateTrade = async (payload) => {
  try {
    const { data } = await axios.patch(
      `${dbURL}/trades/${payload.firebaseKey}.json`,
      payload
    );
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const createTrade = async (payload) => {
  try {
    const { data } = await axios.post(`${dbURL}/trades.json`, payload);
    const firebaseKey = data.name;
    await updateTrade({ firebaseKey });
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const deleteTrade = async (tradeFbKey) => {
  try {
    const { data } = await axios.delete(`${dbURL}/trade/${tradeFbKey}.json`);
    return data;
  } catch (e) {
    console.warn(e);
  }
};

// eslint-disable-next-line object-curly-newline
export { getAllTrades, updateTrade, createTrade, deleteTrade };
