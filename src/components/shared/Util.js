import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const groupBy = (list, props) => {
    return list.reduce((accumulator, currentValue) => {
        accumulator[currentValue[props]] = accumulator[currentValue[props]] + 1 || 1;
        return accumulator;
    }, []);
}

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
    '#0096aa'  // Draenei
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
    '#ff7c0a'  // Druid
];

const createChart = (data, chartName, chartType) => {

    let localChart = am4core.create(chartName, am4charts.XYChart);

    localChart.numberFormatter.numberFormat = '#.##';

    const myMap = groupBy(data, chartType);

    localChart.data = Object.keys(myMap).map(key => ({
        //add dynamic property
        [chartType] : key,
        count: myMap[key],
        color: chartType === 'race' ? raceColors[key-1] : classColors[key-1],
        bullet: process.env.PUBLIC_URL + '/wow-icons/' + chartType + '/' + (chartType === 'race' ? `${key}-${Math.round(Math.random())}` : key) + '.gif'
    }));

    // Create axis
    let categoryAxis = localChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = chartType;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
    categoryAxis.renderer.labels.template.fontSize = 15;
    categoryAxis.renderer.labels.template.disabled = true;

    let valueAxis = localChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeDasharray = "4,4";
    valueAxis.min = 0;

    // Do not crop bullets
    localChart.maskBullets = false;

    // Remove padding
    localChart.paddingBottom = 0;

    // Create series
    let series = localChart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = chartType;
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.propertyFields.stroke = "color";
    series.columns.template.column.cornerRadiusTopLeft = 15;
    series.columns.template.column.cornerRadiusTopRight = 15;

    series.calculatePercent = true;
    series.columns.template.tooltipText = "{valueY.percent}%";

    // order chart by series
    categoryAxis.sortBySeries = series;

    // Add bullet icons
    let bullet = series.bullets.push(new am4charts.Bullet());
    let image = bullet.createChild(am4core.Image);
    image.horizontalCenter = "middle";
    image.verticalCenter = "bottom";
    image.propertyFields.href = "bullet";
    image.width = 25;
    image.height = 25;

    image.tooltipText = series.columns.template.tooltipText;
    image.propertyFields.fill = "color";
    image.filters.push(new am4core.DropShadowFilter());

    // add text labels on y chart
    let valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.fontSize = 13;
    valueLabel.label.align = 'center';
    valueLabel.label.fill = am4core.color('#000');
    valueLabel.label.text = "{valueY} \n {valueY.percent}%";
    valueLabel.horizontalCenter = "left";
    valueLabel.verticalCenter = "top";
    valueLabel.locationY = 0.5;

    return localChart;
}

export default {groupBy, createChart};
