"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import Link from "next/link"
import { getRatingAngle } from "@/lib/functions"


const chartConfig = {
  vote: {
    label: "Vote Average",
  },

} satisfies ChartConfig

const RadialChart = ({ data }: { data: { value: number, total: number } }) => {
  const chartData = [
    { vote: data.value.toFixed(1), fill: "#ffffff" },
  ]
  return (
    <Card className="flex flex-col justify-start items-center border-none">
      <CardHeader className="items-center p-0">
        <CardDescription ></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0  w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] "
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={getRatingAngle(data.value)}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="vote" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].vote.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Average Vote
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="flex flex-col items-center gap-1 text-sm leading-none text-muted-foreground">
          <p>{`Out of ${data.total} votes at `}</p>
          <Link href={"https://www.themoviedb.org/"} className="hover:underline">The Movie Database</Link>
        </div>

      </CardFooter>
    </Card>
  )
}

export default RadialChart
