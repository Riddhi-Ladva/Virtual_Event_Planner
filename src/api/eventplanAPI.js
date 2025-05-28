import axios from 'axios';

const EVENTPLAN_API_URL = '/api/eventPlans';

// GET all event plans
export const getEventPlans = () => axios.get(EVENTPLAN_API_URL);

// GET event plan by ID (optional, if needed)
export const getEventPlanById = (id) => axios.get(`${EVENTPLAN_API_URL}/${id}`);

// POST a new event plan
export const createEventPlan = (eventPlanData) => axios.post(EVENTPLAN_API_URL, eventPlanData);

// PUT update event plan by ID (optional)
export const updateEventPlan = (id, updatedData) => axios.put(`${EVENTPLAN_API_URL}/${id}`, updatedData);

// DELETE event plan by ID (optional)
export const deleteEventPlan = (id) => axios.delete(`${EVENTPLAN_API_URL}/${id}`);
