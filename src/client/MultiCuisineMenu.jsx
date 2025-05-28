import React, { useEffect, useState } from 'react';
import './menustyle.css';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MultiCuisineMenu() {
  const [menuData, setMenuData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [persons, setPersons] = useState('');
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menus')
      .then(res => setMenuData(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleToggleItem = (item) => {
    const alreadySelected = selectedItems.find(i => i.name === item.name);
    if (alreadySelected) {
      setSelectedItems(selectedItems.filter(i => i.name !== item.name));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    setTotalCost(null);
  };

  const handleCalculate = () => {
    if (selectedItems.length === 0 || !persons || persons <= 0) return;

    const total = selectedItems.reduce(
      (sum, item) => sum + (Number(item.pricePerPerson) * Number(persons)),
      0
    );
    const finalCost = Number(total.toFixed(2));

    setTotalCost(finalCost);

    const savedData = {
      menu: selectedItems.map(item => ({
        name: item.name,
        pricePerPerson: Number(item.pricePerPerson)
      })),
      persons: Number(persons),
      totalCost: finalCost
    };

    localStorage.setItem('selectedMenu', JSON.stringify(savedData));
  };

  const isSelected = (item) => selectedItems.some(i => i.name === item.name);

  return (
    <>
      <Navbar />
      <div className="menu-selection-container">
        <h2>Select Your Menu</h2>

        {/* Menu Photo Upload */}
        {/* <div className="photo-upload">
          <p>Upload Menu Photo:</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                localStorage.setItem("selectedMenuPhoto", reader.result);
              };
              if (file) {
                reader.readAsDataURL(file);
              }
            }}
          />
        </div> */}

        {Object.entries(menuData).map(([category, items]) => (
          <div key={category}>
            <h3 className="menu-category">{category}</h3>
            <div className="menu-grid">
              {items.map((item, index) => (
                <div className={`menu-card ${isSelected(item) ? 'selected' : ''}`} key={index}>
                  <img src={item.image} alt={item.name} />
                  <div className="menu-content">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <div className="menu-footer">
                      <span>₹{item.pricePerPerson.toFixed(2)} / plate</span>
                      <button onClick={() => handleToggleItem(item)}>
                        {isSelected(item) ? 'Remove' : 'Add to Plan'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {selectedItems.length > 0 && (
          <div className="cost-calculation-box">
            <h3>Selected Menus:</h3>
            <ul>
              {selectedItems.map(item => (
                <li key={item.name}>{item.name} - ₹{item.pricePerPerson.toFixed(2)}</li>
              ))}
            </ul>
            <input
              type="number"
              placeholder="Enter number of persons"
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
            />&nbsp;&nbsp;
            <button onClick={handleCalculate}>Calculate Total Cost</button>
            {totalCost && <p>Total Cost: ₹{totalCost}</p>}
            <div className="navigation-buttons">
              <button onClick={() => window.location.href = '/SelectDecoration'}>Previous</button>
              <button
                disabled={!(selectedItems.length > 0 && persons > 0 && totalCost > 0)}
                onClick={() => window.location.href = '/otherservice'}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
