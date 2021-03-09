import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Footer } from './components/Footer/Footer';
import BracketGroup from './components/brackets/BracketGroup'
import Chart from './components/shared/Chart';
import './components/shared/Chart.css';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [inputData, setInputData] = useState<IData[]>([]);
  const [bracketLevel, setBracketLevel] = useState(0);


    useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT!)
      .then((value) => setInputData(value.data))
      .catch((error) =>
        console.error('Could not get data for the charts' + error)
      );
  }, []);

  if (inputData === null) {
    return (
      <div className='spinner'>
        <Loader type='Puff' color='#00BFFF' height={100} width={100} />
      </div>
    );
  } else {
    return (
      <div className='App'>
        <h2 className='title'>
          {!!process.env.REACT_APP_SERVER_TITLE
            ? process.env.REACT_APP_SERVER_TITLE
            : 'WoW'}{' '}
          Statistics
        </h2>
          <BracketGroup parentCallback={setBracketLevel}/>

          <div className="chart_container">
              <Chart data={inputData} chartName="Race Population" chartType="race" bracketLevel={bracketLevel}/>
              <Chart data={inputData} chartName="Class Population" chartType="class" bracketLevel={bracketLevel}/>
          </div>

        <Footer/>
      </div>
    );
  }
};

export default App;
