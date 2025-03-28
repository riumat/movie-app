"use client"

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
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import Link from "next/link"
import { getRatingAngle } from "@/lib/functions"

const getVoteColor = (vote: number): string => {
  // HSL: 0 = red, 120 = green
  const hue = Math.round((vote / 10) * 120);
  return `hsl(${hue}, 70%, 50%)`;
};


const chartConfig = {
  vote: {
    label: "Vote Average",
  },

} satisfies ChartConfig

const RadialChart = ({ data }: { data: { value: number, total: number } }) => {
  const chartData = [{ vote: data.value.toFixed(1) }];
  const voteColor = getVoteColor(data.value);

  return (
    <Card className="flex flex-col justify-center items-center border-none bg-transparent">
      <CardHeader className="items-center p-0 !w-0 !h-0">
        <CardDescription className="p-0 m-0" ></CardDescription>
      </CardHeader>
     <CardContent className="flex-1 p-0 w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] "
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={getRatingAngle(data.value) + 90}
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
            <RadialBar
              dataKey="vote"
              background
              cornerRadius={3}
              fill={voteColor}

            />
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
                          className="fill-foreground text-5xl font-bold"
                        >
                          {chartData[0].vote.toLocaleString()}
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
        <div className="flex flex-col items-center gap-1 text-xs leading-none text-muted-foreground">
          <p>{`Average rating based on ${data.total} votes on `}</p>
          <Link href={"https://www.themoviedb.org/"} className="hover:underline">The Movie Database</Link>
        </div>

      </CardFooter>
    </Card>
  )
}

export default RadialChart
