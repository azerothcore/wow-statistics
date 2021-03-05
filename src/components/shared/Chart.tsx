import React, { useState, useEffect } from 'react';
import Util from './Util';
import '../shared/Chart.css';

interface ChartProps {
  data: IData[];
  chartName: string;
  chartType: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  chartName,
  chartType,
}: ChartProps) => {
  const [chart, setChart] = useState<any>();

  useEffect(() => {
    setChart(Util.createChart(data, chartName, chartType));

    return () => {
      chart && chart.dispose();
    };
  }, [data]);

  return <div id={chartName} className="chart" />;
};

export default Chart;
