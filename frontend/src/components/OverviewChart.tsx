import { ResponsiveLine } from '@nivo/line'
import { Box, useColorModeValue } from '@chakra-ui/react'

const OverviewChart = ({ isDashboard = false }) => {
  const textColor = useColorModeValue('brand.lightGray', 'brand.lightGray')
  const gridColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  // Dummy data for the chart
  const data = [
    {
      id: "Total Sales",
      color: "brand.blue",
      data: [
        { x: "Jan", y: 4000 },
        { x: "Feb", y: 3000 },
        { x: "Mar", y: 5000 },
        { x: "Apr", y: 2780 },
        { x: "May", y: 1890 },
        { x: "Jun", y: 2390 },
        { x: "Jul", y: 3490 },
        { x: "Aug", y: 4000 },
        { x: "Sep", y: 3200 },
        { x: "Oct", y: 2800 },
        { x: "Nov", y: 4300 },
        { x: "Dec", y: 5000 },
      ],
    },
  ]

  return (
    <Box 
      height={isDashboard ? "400px" : "100%"} 
      width="100%" 
      position="relative"
      sx={{
        '.nivo-line': {
          height: '100% !important',
          width: '100% !important'
        },
        '.nivo-line-slice': {
          height: '100% !important',
          width: '100% !important'
        }
      }}
    >
      <ResponsiveLine
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: gridColor,
              },
            },
            legend: {
              text: {
                fill: textColor,
              },
            },
            ticks: {
              line: {
                stroke: gridColor,
                strokeWidth: 1,
              },
              text: {
                fill: textColor,
              },
            },
          },
          legends: {
            text: {
              fill: textColor,
            },
          },
          tooltip: {
            container: {
              color: "brand.blue",
              background: "brand.darkGray",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid brand.lightGray",
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
        curve="catmullRom"
        enableArea={isDashboard}
        areaOpacity={0.1}
        areaBaselineValue={0}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (v) => {
            if (isDashboard) return v.slice(0, 3)
            return v
          },
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? "" : "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? "" : "Total Sales",
          legendOffset: -60,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        colors={["#3182CE"]}
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
  )
}

export default OverviewChart 