import axios from 'axios';

const VENUE_API_URL = '/api/venues';

// GET venues by city ID
export const getVenuesByCityId = (cityId) => axios.get(`${VENUE_API_URL}/${cityId}`);

// (Optional) POST new venue for admin/testing
export const createVenue = (venueData) => axios.post(VENUE_API_URL, venueData);
