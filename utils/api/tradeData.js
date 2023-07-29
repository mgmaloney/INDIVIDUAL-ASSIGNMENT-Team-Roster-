/* eslint-disable comma-dangle */
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

const getUserTrades = async (useruid) => {
  const trades = await getAllTrades();
  const userTrades = [];
  trades.forEach((trade) => {
    if (useruid === trade.tradeItem1.uid || useruid === trade.TradeItem2.uid) {
      userTrades.push(trade);
    }
  });
  return userTrades;
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
export { getAllTrades, getUserTrades, updateTrade, createTrade, deleteTrade };
