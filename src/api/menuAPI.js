import axios from "axios";

const MENU_API_URL = "/api/menus";

// GET all menus
export const getAllMenus = () => axios.get(MENU_API_URL);

// GET menu by ID
export const getMenuById = (id) => axios.get(`${MENU_API_URL}/${id}`);

// POST new menu (optional, for admin/testing)
export const createMenu = (menuData) => axios.post(MENU_API_URL, menuData);
