import { useState, useEffect } from 'react';
import Util from './Util';
import '../shared/Chart.css';

interface ChartProps {
  data: IData[];
  chartName: string;
  chartType: string;
  bracketLevel: number;
}

const Chart = ({ data, chartName, chartType, bracketLevel }: ChartProps) => {
  const [chart, setChart] = useState<any>();

  useEffect(() => {
    const predicate = Util.getPredicateByBracketLevel(bracketLevel);

    if (Object.keys(data).length === 0) {
      return;
    }

    setChart(Util.createChart(data.filter(predicate as any), chartName, chartType));

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [data, bracketLevel]);

  return <div id={chartName} className='chart' />;
};

export default Chart;
