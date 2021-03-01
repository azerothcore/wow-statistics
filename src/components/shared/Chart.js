import React, {useState, useEffect} from 'react';
import Util from "./Util";
import '../shared/Chart.css';


function Chart(props) {

    const [chart, setChart] = useState();

    const isBracketLevelChanged = props.bracketLevel !== 0;

    useEffect(() => {
        const predicate = Util.getPredicateByBracketLevel(props.bracketLevel);
        setChart(Util.createChart(props.data.filter(predicate), props.chartName, props.chartType));

        return () => {
            chart && chart.dispose();
        }
    }, [isBracketLevelChanged]);


    return (
        <div id={props.chartName} className="chart"/>
    );
}

export default Chart;