import React, {Component} from 'react';
import Chart from "./components/shared/Chart";
import axios from "axios";
import style from "./components/shared/Chart.css"
import Loader from "react-loader-spinner";

class App extends Component {

    state = {
        inputData: null
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_ENDPOINT)
            .then(response => {
                this.setState({inputData: response.data})
            })
            .catch(error => {
                console.error('Could not get data for the charts' + error);
            });
    }

    render() {
        if (this.state.inputData === null) {
            return (
                <div className="spinner">
                    <Loader type="Puff" color="#00BFFF" height={100} width={100}/>
                </div>
            );
        } else {
            return (
                <div className="chart_container">
                    <Chart data={this.state.inputData} chartName="race-chart" chartType="race"/>
                    <Chart data={this.state.inputData} chartName="class-chart" chartType="class"/>
                </div>
            );

        }
    }
}

export default App;
