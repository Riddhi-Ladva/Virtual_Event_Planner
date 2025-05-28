import axios from "axios";

const CITY_API_URL = "/api/cities";

// GET all cities
export const getAllCities = () => axios.get(CITY_API_URL);

// GET city by ID
export const getCityById = (id) => axios.get(`${CITY_API_URL}/${id}`);

// POST new city (optional, for admin or testing)
export const createCity = (cityData) => axios.post(CITY_API_URL, cityData);
