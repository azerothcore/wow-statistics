import React, { useState, useEffect } from 'react';
import Util from './Util';
import '../shared/Chart.css';

interface ChartProps {
  data: any;
  chartName: string;
  chartType: string;
  bracketLevel: number;
}

const Chart: React.FC<ChartProps> = ({ data, chartName, chartType, bracketLevel }: ChartProps) => {
  const [chart, setChart] = useState<any>();

  useEffect(() => {
    const predicate = Util.getPredicateByBracketLevel(bracketLevel);

    if (Object.keys(data).length === 0) {
      return;
    }

    setChart(Util.createChart(data.filter(predicate), chartName, chartType));

    return () => {
      chart && chart.dispose();
    };
  }, [data, bracketLevel]);

  return <div id={chartName} className='chart' />;
};

export default Chart;
