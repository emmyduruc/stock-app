import { Container } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const series = [
  //Note: this data should be from the backend but unforunately api is restricted for premium users
  {
    data: [
      { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
      { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
      { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.67] },
      { x: new Date(1538784000000), y: [6635.69, 6651, 6629.67, 6638.24] },
      { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
      { x: new Date(1538787600000), y: [6624.53, 6636.03, 6621.68, 6624.31] },
    ],
  },
];

const options: ApexOptions = {
  chart: {
    type: "candlestick", // Ensure this is a valid type
    height: 350,
  },
  title: {
    text: "CandleStick Chart",
    align: "left",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};

export const HomePage = () => {
  return (
    <Container
      component="main"
      style={{
        marginTop: "100px",
      }}
      maxWidth="lg"
    >
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={350}
        />
      </div>
    </Container>
  );
};
