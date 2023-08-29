import React, { useState, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import PageHeader from "components/PageHeader/PageHeader";
import { useGetSalesQuery } from "store/api";
import { ResponsiveLine } from "@nivo/line";

const Monthly = ({ isDashboard = false }) => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date("2021-01-15"));
  console.log("🚀 ~ file: index.js:13 ~ Daily ~ startDate:", startDate);
  const [endDate, setEndDate] = useState(new Date("2021-01-31"));
  console.log("🚀 ~ file: index.js:15 ~ Daily ~ endDate:", endDate);
  const { data } = useGetSalesQuery();

  console.log("🚀 ~ file: index.js:12 ~ Daily ~ data:", data);

  const dailyData = useMemo(() => {
    if (!data) return [];
    const { monthlyData } = data;
    const totalSalesLine = {
      id: "Sales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "Units",
      color: theme.palette.secondary[600],
      data: [],
    };
    monthlyData.forEach((monthData) => {
      totalSalesLine.data.push({
        x: monthData.month,
        y: monthData.totalSales,
      });
      totalUnitsLine.data.push({
        x: monthData.month,
        y: monthData.totalUnits,
      });
    });
    return [totalSalesLine, totalUnitsLine];
  }, [data]);

  return (
    <Box
      sx={{
        "& .ant-picker.ant-picker-focused,& .ant-picker:hover": {
          borderColor: theme.palette.secondary[200],
        },
      }}
    >
      <PageHeader title="MONTHLY SALES" subtitle="Chart of monthlysales" />

      <Box m={"1.5rem 0"} height={"80vh"}>
        <ResponsiveLine
          data={dailyData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="monotoneX"
          enableArea={isDashboard}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => {
              if (isDashboard) return v.slice(0, 3);
              return v;
            },
            orient: "bottom",
            tickSize: 5,
            tickValues: 1,
            tickPadding: 5,
            tickRotation: 90,
            legend: isDashboard ? "" : "Daily",
            legendOffset: 40,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 10,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: false,
            legendOffset: -60,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointLabel={() => {
            return "z";
          }}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={
            !isDashboard
              ? [
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 30,
                    translateY: -40,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]
              : undefined
          }
        />
      </Box>
    </Box>
  );
};

export default Monthly;
