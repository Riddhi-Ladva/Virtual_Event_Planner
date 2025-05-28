const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// GET all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find({});
    const categorizedMenus = {};

    menus.forEach(menu => {
      const category = menu.category || "Uncategorized";

      if (!categorizedMenus[category]) {
        categorizedMenus[category] = [];
      }

      categorizedMenus[category].push({
        name: menu.name,
        description: menu.description,
        pricePerPerson: menu.pricePerPerson,
        Persons: menu.Persons,
        image: menu.image
      });
    });

    res.json(categorizedMenus);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get menus', error: err.message });
  }
});



module.exports = router;
