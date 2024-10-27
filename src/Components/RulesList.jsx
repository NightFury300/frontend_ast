import React from 'react';
import './RulesList.css'; // Import the CSS file
import RuleCard from './RuleCard';

function RulesList({ ruleList, onEvaluateRule, onSelectRule, onDeselectRule }) {    
    return (
        <div className="rules-list">
            <h2>Rules List</h2> {/* Optional heading for the list */}
            {ruleList.map((rule) => (
                <RuleCard 
                    key={rule._id} 
                    rule={rule} 
                    onEvaluateRule={onEvaluateRule} 
                    onSelectRule={onSelectRule} 
                    onDeselectRule={onDeselectRule} 
                /> 
            ))}
        </div>
    );
}

export default RulesList;
