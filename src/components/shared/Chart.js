import React, {useState, useEffect} from 'react';
import Util from "./Util";
import '../shared/Chart.css';


function Chart(props) {

    const [chart, setChart] = useState();

    useEffect(() => {
        const predicate = Util.getPredicateByBracketLevel(props.bracketLevel);

        if (Object.keys(props.data).length === 0) {
            return;
        }

        setChart(Util.createChart(props.data.filter(predicate), props.chartName, props.chartType));

        return () => {
            chart && chart.dispose();
        }
    }, [props.bracketLevel, props.data]);


    return (
        <div id={props.chartName} className="chart"/>
    );
}

export default Chart;