import { ResponsivePie } from '@nivo/pie'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'

const BreakdownChart = ({ isDashboard = false }) => {
  const textColor = useColorModeValue('brand.lightGray', 'brand.lightGray')
  const gridColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  // Dummy data for the chart
  const data = [
    {
      id: "Art",
      label: "Art",
      value: 45,
      color: "brand.blue",
    },
    {
      id: "Music",
      label: "Music",
      value: 30,
      color: "brand.green",
    },
    {
      id: "Writing",
      label: "Writing",
      value: 25,
      color: "brand.purple",
    },
  ]

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width="100%"
      position="relative"
    >
      <ResponsivePie
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
            },
          },
        }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={textColor}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: textColor,
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "brand.blue",
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={textColor}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Text fontSize="lg" fontWeight="bold">
          {!isDashboard && "Total:"} $48,500
        </Text>
      </Box>
    </Box>
  )
}

export default BreakdownChart 