import React from 'react';
import "./InputBox.css";

function InputBox({ onCreateRule }) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const ruleString = event.target.ruleString.value;
        await onCreateRule(ruleString);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>Enter Rule String:</label>
                <textarea id="ruleString" name="ruleString" required></textarea>
                <button type="submit">Create Rule</button>
            </form>
        </div>
    );
}

export default InputBox;
