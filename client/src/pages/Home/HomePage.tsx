import { Button, Container, Grid, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const initialSeries = [
  // Note: this data should be from the backend but unfortunately API is restricted for premium users
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
    type: "candlestick",
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
  const [series, setSeries] = useState(initialSeries);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const handleFilter = () => {
    if (fromDate && toDate) {
      const filteredData = initialSeries[0].data.filter(
        (dataPoint) =>
          dayjs(dataPoint.x).isAfter(fromDate) &&
          dayjs(dataPoint.x).isBefore(toDate)
      );

      setSeries([{ data: filteredData }]);
    } else {
      setSeries(initialSeries);
    }
  };

  return (
    <Container
      component="main"
      style={{
        marginTop: "100px",
      }}
      maxWidth="lg"
    >
      <Typography
        variant="h6"
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Filter Stock Data By Date
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
            />
          </Grid>
          <Grid item>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
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
