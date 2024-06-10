import { Button, Container, Grid, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { transformedData } from "../../utils/transform.data";
import { options } from "../../utils/candlestick.option";

export const HomePage = () => {
  const initialSeries = [
    {
      data: transformedData,
    },
  ];
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
