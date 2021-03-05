import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Footer } from './components/Footer';
import Chart from './components/shared/Chart';
import './components/shared/Chart.css';
import { mockData } from './mockData';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [inputData, setInputData] = useState<IData[]>([]);

  useEffect(() => {
    /* axios
      .get(process.env.REACT_APP_API_ENDPOINT)
      .then((value) => setInputData(value.data))
      .catch((error) =>
        console.error("Could not get data for the charts" + error)
      ); */
    setInputData(mockData);
  }, []);

  if (inputData === null) {
    return (
      <div className="spinner">
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h2 className="title">
          {!!process.env.REACT_APP_SERVER_TITLE
            ? process.env.REACT_APP_SERVER_TITLE
            : 'WoW'}{' '}
          Statistics
        </h2>
        <div className="chart_container">
          <Chart data={inputData} chartName="race-chart" chartType="race" />
          <Chart data={inputData} chartName="class-chart" chartType="class" />
        </div>
        <Footer />
      </div>
    );
  }
};

export default App;
