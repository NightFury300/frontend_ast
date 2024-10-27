import React, { useState } from 'react';
import './RuleCard.css';

function RuleCard({ rule, onEvaluateRule, onSelectRule, onDeselectRule }) {
    const [name, setName] = useState("Rule");

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleClick = () => {
        onEvaluateRule(rule._id);
    };

    const handleCheckbox = (e) => {
        if (e.target.checked)
            onSelectRule(rule._id);
        else
            onDeselectRule(rule._id);
    };

    return (
        <div className="rule-card">
            <input
                type='checkbox'
                onClick={handleCheckbox}
            />
            <input
                type="text"
                id="nameInput"
                onChange={handleChange}
                value={name}
                placeholder="Rule Name"
            />
            <h4>{rule.rule}</h4>
            <button onClick={handleClick}>Evaluate</button>
        </div>
    );
}

export default RuleCard;
