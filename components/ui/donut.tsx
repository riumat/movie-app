"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const Chart = ({ genres }: { genres: any[] }) => {
  const chartData = genres.slice(0, 5)
    .sort((a, b) => b.count - a.count)
    .map((genre: any) => ({ name: genre.name, contents: genre.count }))

  return (
    <Card className="flex-1 border-0 shadow-none flex items-center w-full h-full">

      <CardContent className="w-full ">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 40
            }}
            className="w-full h-full"
          >
            <XAxis type="number" dataKey="contents" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              style={{ fontSize: "0.8rem" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="text-sm"  />}
            />
            <Bar dataKey="contents" fill="hsl(var(--chart-1))" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}

export default Chart
