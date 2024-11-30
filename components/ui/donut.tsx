"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";



const Chart = ({ genres }: { genres: any }) => {
  const chartData = genres.slice(0, 5).map((genre: any, index: number) => ({
    name: genre.name,
    count: genre.count,
    percentage: Number(genre.percentage),
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  const chartConfig = {

  } satisfies ChartConfig;

  return (
    <Card className="flex border-0">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full max-h-[260px]"
        >
          <PieChart className="flex gap-10">
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="name"
              innerRadius={50}
              stroke="hsl(var(--background))"
              className="z-20"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} className="w-40" />}
            />

          </PieChart>
        </ChartContainer>

      </CardContent>
    </Card>
  );
};

export default Chart;
