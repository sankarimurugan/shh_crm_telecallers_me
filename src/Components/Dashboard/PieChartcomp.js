import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated.default);

const PieChart = ({ dashLeadData }) => {
  const chartRef = useRef(null);

  const datass = dashLeadData?.aria;

  console.log("datass", datass);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (!datass?.length) return;

    let chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chartRef.current = chart;

    chart.responsive.enabled = true;

    // 🔸 Group leads by city and count
    const cityCountMap = datass.reduce((acc, item) => {
      const cityName = item.city?.name || "Unknown";
      acc[cityName] = (acc[cityName] || 0) + 1;
      return acc;
    }, {});

    // 🔸 Convert to chart-friendly array with colors
    chart.data = Object.entries(cityCountMap).map(([city, count]) => ({
      country: city,
      value: count,
      color: am4core.color(getRandomColor()),
    }));

    let pieSeries = chart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "country";

    pieSeries.labels.template.wrap = true;
    pieSeries.labels.template.maxWidth = 120;
    pieSeries.labels.template.fontSize = 10;
    pieSeries.labels.template.fill = am4core.color("#000"); // Ensure label visibility
    pieSeries.labels.template.text = "{category}: {value}"; // Show category & value
    pieSeries.labels.template.horizontalCenter = "middle";
    pieSeries.labels.template.verticalCenter = "middle";

    pieSeries.ticks.template.strokeWidth = 1.5; // Reduce arrow thickness
    pieSeries.ticks.template.length = 10; // Shorten line height
    pieSeries.ticks.template.stroke = am4core.color("#000"); // Line color

    // 🔸 Color the slices dynamically
    pieSeries.slices.template.adapter.add("fill", (fill, target) => {
      return target.dataItem ? target.dataItem.dataContext.color : fill;
    });

    // Adjust depth and angle to avoid cutting off labels
    chart.depth = 20;
    chart.angle = 40;

    return () => chart.dispose();
  }, [datass]);

  return (
    <div
      id="chartdiv"
      style={{
        width: "100%",
        height: "500px",
        maxWidth: "600px",
        margin: "auto",
      }}
    ></div>
  );
};

export default PieChart;
