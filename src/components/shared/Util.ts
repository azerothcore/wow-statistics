import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

interface Player {
  level: number;
}

type Predicate = (player: Player) => boolean;

const BRACKET_LEVEL_PREDICATES: { [key: number]: Predicate } = {
  0: () => true, // no filter selected, show all levels
  1: (player: Player) => player.level < 20, // show 1-19
  2: (player: Player) => player.level >= 20 && player.level < 30,
  3: (player: Player) => player.level >= 30 && player.level < 40,
  4: (player: Player) => player.level >= 40 && player.level < 50,
  5: (player: Player) => player.level >= 50 && player.level < 60,
  6: (player: Player) => player.level >= 60 && player.level < 70,
  7: (player: Player) => player.level >= 70 && player.level < 80,
  8: (player: Player) => player.level === 80, // show 80 only
};

const getPredicateByBracketLevel = (bracketLevel: number) => {
  return BRACKET_LEVEL_PREDICATES[bracketLevel];
};

const groupBy = (list: IData[], props: string) => {
  return list.reduce((accumulator: any[], currentValue: any): string[] => {
    accumulator[currentValue[props]] = accumulator[currentValue[props]] + 1 || 1;
    return accumulator;
  }, []);
};

const raceColors = [
  '#fff468', // Human
  '#abd473', // Orc
  '#ff7c0a', // Dwarf
  '#f48cba', // Night Elf
  '#8e8e8e', // Undead
  '#9c786c', // Tauren
  '#e0e0e0', // Gnome
  '#0070dd', // Troll
  '',
  '#f9683a', // Blood Elf
  '#0096aa', // Draenei
];

const classColors = [
  '#c69b6d', // Warrior
  '#f48cba', // Paladin
  '#abd473', // Hunter
  '#fff468', // Rogue
  '#ffffff', // Priest
  '#c41e3a', // Death Knight
  '#0070dd', // Shaman
  '#3fc7eb', // Mage
  '#8788ee', // Warlock
  '',
  '#ff7c0a', // Druid
];

const createChart = (data: IData[], chartName: string, chartType: string) => {
  // empty object do not render anything
  if (data && Object.keys(data).length === 0 && data.constructor === Object) {
    return;
  }

  const localChart = am4core.create(chartName, am4charts.XYChart);

  localChart.numberFormatter.numberFormat = '#.##';

  const myMap = groupBy(data, chartType);

  localChart.data = Object.keys(myMap).map((key: any) => ({
    //add dynamic property
    [chartType]: key,
    count: myMap[key],
    color: chartType === 'race' ? raceColors[key - 1] : classColors[key - 1],
    bullet:
      import.meta.env.VITE_PUBLIC_URL +
      '/wow-icons/' +
      chartType +
      '/' +
      (chartType === 'race' ? `${key}-${Math.round(Math.random())}` : key) +
      '.gif',
  }));

  // add chart title
  const title = localChart.titles.create();
  title.text = chartName;
  title.fill = am4core.color('#d0d0d0');

  // Create axis
  const categoryAxis = localChart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = chartType;
  categoryAxis.renderer.grid.template.disabled = true;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.inside = true;
  categoryAxis.renderer.labels.template.fill = am4core.color('#fff');
  categoryAxis.renderer.labels.template.fontSize = 15;
  categoryAxis.renderer.labels.template.disabled = true;

  const valueAxis = localChart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.grid.template.strokeDasharray = '4,4';
  valueAxis.min = 0;

  // Do not crop bullets
  localChart.maskBullets = false;

  // Remove padding
  localChart.paddingBottom = 0;

  // Create series
  const series = localChart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = 'count';
  series.dataFields.categoryX = chartType;
  series.columns.template.propertyFields.fill = 'color';
  series.columns.template.propertyFields.stroke = 'color';
  series.columns.template.column.cornerRadiusTopLeft = 15;
  series.columns.template.column.cornerRadiusTopRight = 15;
  series.columns.template.maxWidth = 50;

  series.calculatePercent = true;
  series.columns.template.tooltipText = '{valueY.percent}%';

  // order chart by series
  categoryAxis.sortBySeries = series;

  // Add bullet icons
  const bullet = series.bullets.push(new am4charts.Bullet());
  const image = bullet.createChild(am4core.Image);
  image.horizontalCenter = 'middle';
  image.verticalCenter = 'bottom';
  image.propertyFields.href = 'bullet';
  image.width = 25;
  image.height = 25;

  image.tooltipText = series.columns.template.tooltipText;
  image.propertyFields.fill = 'color';
  image.filters.push(new am4core.DropShadowFilter());

  // add text labels on y chart
  const valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.fontSize = 13;
  valueLabel.label.align = 'center';
  valueLabel.label.fill = am4core.color('#000000');
  valueLabel.label.fontWeight = 'bold';
  valueLabel.label.text = '{valueY} \n {valueY.percent}%';
  valueLabel.horizontalCenter = 'left';
  valueLabel.verticalCenter = 'top';
  valueLabel.locationY = 0.5;

  return localChart;
};

export default { groupBy, createChart, getPredicateByBracketLevel };
