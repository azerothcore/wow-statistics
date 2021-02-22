import React, {Component} from 'react';
import Util from "./Util";
import '../shared/Chart.css';

class Chart extends Component {

    componentDidMount() {
        this.chart = Util.createChart(this.props.data, this.props.chartName, this.props.chartType);
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return <div id={this.props.chartName} className="chart"/>;
    }
}

export default Chart;