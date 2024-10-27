import React from 'react';
import './KeyValueInput.css'; // Import the CSS file

const KeyValueInput = ({ pairs, updatePairs }) => {
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPairs = [...pairs];
    updatedPairs[index][name] = value;
    updatePairs(updatedPairs);
  };

  const addPair = () => {
    updatePairs([...pairs, { key: '', value: '' }]);
  };

  const deletePair = (index) => {
    let updatedPairs = pairs;
    
    if (updatedPairs.length > 1) {
      updatedPairs = pairs.filter((_, i) => i !== index);
    }
    updatePairs(updatedPairs);
  };

  return (
    <div className="key-value-input">
      <h3>Key-Value Pair Input</h3>
      {pairs.map((pair, index) => (
        <div key={index} className="pair">
          <input
            type="text"
            name="key"
            placeholder="Key"
            value={pair.key}
            onChange={(event) => handleChange(index, event)}
            required
          />
          <input
            type="text"
            name="value"
            placeholder="Value"
            value={pair.value}
            onChange={(event) => handleChange(index, event)}
            required
          />
          <button 
            type="button" 
            onClick={() => deletePair(index)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={addPair}>
        Add Another Pair
      </button>
    </div>
  );
};

export default KeyValueInput;
