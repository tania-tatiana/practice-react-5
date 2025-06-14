import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../../service/exchangeAPI';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;
    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We have base currency');
    }
    try {
      const data = await getUserInfo(coords);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeInfo = createAsyncThunk(
  'currency/fetchExchangeInfo',
  async (cred, thunkAPI) => {
    try {
      const data = await exchangeCurrency(cred);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const fetchLatestSymbol = createAsyncThunk(
  'currency/fetchLatestSymbol',
  async (baseCurrency, thunkAPI) => {
    try {
      const data = await latestRates(baseCurrency);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
