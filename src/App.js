import React, {useState, useEffect} from 'react';
import Chart from "./components/shared/Chart";
import axios from "axios";
import './components/shared/Chart.css';
import Loader from "react-loader-spinner";
import test from './components/test.json';

function App() {

    const [inputData, setInputData] = useState(test);
    const [bracketLevel, setBracketLevel] = useState(0);

    // useEffect(() => {
    //     axios.get(process.env.REACT_APP_API_ENDPOINT)
    //         .then(value => setInputData(value.data))
    //         .catch(error => console.error('Could not get data for the charts' + error));
    // }, []);

    if (inputData === null) {
        return (
            <div className="spinner">
                <Loader type="Puff" color="#00BFFF" height={100} width={100}/>
            </div>
        );
    } else {
        return (
            <div className="App">
                <h2 className="title">{!!process.env.REACT_APP_SERVER_TITLE ? process.env.REACT_APP_SERVER_TITLE : 'WoW'} Statistics</h2>

                <select name="level" id="level" onChange={event => setBracketLevel(event.target.value)}>
                    <option value="1">Level 1-19</option>
                    <option value="2">Level 20-29</option>
                    <option value="3">Level 30-39</option>
                </select>

                <div className="chart_container">
                    {/*<Chart data={inputData} chartName="race-chart" chartType="race"/>*/}
                    {/*<Chart data={inputData} chartName="class-chart" chartType="class"/>*/}
                    <Chart data={inputData} chartName="level-chart" chartType="race" bracketLevel={bracketLevel}/>
                </div>
            </div>
        );
    }
}

export default App;
