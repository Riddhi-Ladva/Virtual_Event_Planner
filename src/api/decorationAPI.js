import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getDecorations = () => axios.get(`${BASE_URL}/decorations`);

export const submitEventPlan = (eventData) =>
  axios.post(`${BASE_URL}/event-plan`, eventData);
