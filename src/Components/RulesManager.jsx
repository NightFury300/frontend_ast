import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import RulesList from './RulesList';
import axios from 'axios';
import KeyValueInput from './KeyValueInput';
import "./RulesManager.css"

function RulesManager() {
  const [ruleList, setRuleList] = useState([]);
  const [evalResult,setEvalResult] = useState(false);
  const [pairs,setPairs] = useState([{key:'',value:''}])
  const [evaluationError,setEvaluationError] = useState(false)
  const [selectedRules,setSelectedRules] = useState([])

    useEffect(() => setEvaluationError(false),[ruleList,evalResult,pairs])
  const getRulesList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/users/get-rule-list");
      setRuleList(response.data.data);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  const createRule = async (ruleString) => {
    try {
      await axios.post("http://localhost:3000/api/v1/users/create-rule", { ruleString });
      getRulesList();
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const clearRules = async() => {
    try{
        await axios.get("http://localhost:3000/api/v1/users/reset-rules")
        getRulesList();
    }
    catch{
        throw Error("Something went wrong while clearing rules.")
    }
  }
  const convertPairToJSON = () => {
    const result = {};

    pairs.forEach(pair => {
    if(!(pair.key === "" || pair.value ===""))
    result[pair.key] = pair.value === "" ? " " : isNaN(pair.value) ? pair.value : Number(pair.value);
    });
    return result;
  }
  const evaluateRule = async(ruleId) => {
    const data = convertPairToJSON();
    try{        
        const response = await axios.post("http://localhost:3000/api/v1/users/evaluate-rule",{ruleId,data})
        setEvalResult(response.data.data.result) 
    }
    catch
    {
        setEvaluationError(true);   
        throw new Error("Something went wrong while evaluating Rule Expression.")
    }
  }
  const combineRules = async() => {
    try{
        const res = await axios.post("http://localhost:3000/api/v1/users/combine-rules",{rules:selectedRules})
        console.log(res);
        
        getRulesList()
    }
    catch{
        throw Error("Something went wrong while combining rules.")
    }
  }

  const selectRule = (ruleId) => {
    setSelectedRules([...selectedRules,ruleId]);
  }

  const deselectRule = (ruleId) => {
    setSelectedRules(selectedRules.filter((id) => (id != ruleId)))
  }

  useEffect(() => {
    getRulesList(); 
  }, []);

  return (
    <div className="rules-manager">
        <h1>Rules Manager</h1>
        <InputBox onCreateRule={createRule} />
        <div className="result">
            <h2 className={evaluationError ? "error" : evalResult ? "success" : "warning"}>
                {evaluationError ? "ERROR: Please Check if Active Rules are Correct and All Key-Value Pairs are provided correctly." : evalResult ? "True" : "False"}
            </h2>
        </div>
        <RulesList ruleList={ruleList} onEvaluateRule={evaluateRule} onSelectRule={selectRule} onDeselectRule={deselectRule} />
        <button onClick={combineRules}>Combine Selected Rules</button>
        <button onClick={clearRules}>Clear Rules</button>
        <KeyValueInput pairs={pairs} updatePairs={setPairs} />
    </div>
);

}
export default RulesManager;
