import React, {useEffect, useState} from 'react';
import Chart from "./components/shared/Chart";
import './components/shared/Chart.css';
import Loader from "react-loader-spinner";
import BracketGroup from "./components/brackets/BracketGroup";
import './components/brackets/BracketGroup.css';
import axios from "axios";


function App() {

    const [inputData, setInputData] = useState({});
    const [bracketLevel, setBracketLevel] = useState(0);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ENDPOINT)
            .then(value => setInputData(value.data))
            .catch(error => console.error('Could not get data for the charts' + error));
    }, []);

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

                <BracketGroup parentCallback={setBracketLevel}/>

                <div className="chart_container">
                    <Chart data={inputData} chartName="Race Population" chartType="race" bracketLevel={bracketLevel}/>
                    <Chart data={inputData} chartName="Class Population" chartType="class" bracketLevel={bracketLevel}/>
                </div>
            </div>
        );
    }
}

export default App;
