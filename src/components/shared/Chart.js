import React, {useState, useEffect} from 'react';
import Util from "./Util";
import '../shared/Chart.css';


function Chart(props) {

    const [chart, setChart] = useState();

    useEffect(() => {
            setChart(Util.createChart(props.data, props.chartName, props.chartType));

            return function cleanup() {
                if (chart) {
                    chart.dispose();
                }
            }
        },
        [chart, props.chartName, props.chartType, props.data]);


    return (
        <div id={props.chartName} className="chart"/>
    );
}

export default Chart;