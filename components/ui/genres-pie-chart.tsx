"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TopGenresChartProps {
  genres: {
    name: string,
    count: number
  }[]
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const GenresPieChart = ({ genres }: TopGenresChartProps) => {
  const allGenres = genres

  const topGenres = allGenres.sort((a, b) => b.count - a.count).slice(0, 5)

  const total = topGenres.reduce((sum, genre) => sum + genre.count, 0)

  const chartConfig = topGenres.reduce(
    (acc, genre, index) => {
      acc[genre.name] = {
        label: genre.name,
        color: COLORS[index % COLORS.length],
      }
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  )

  return (
    <Card className="w-full mx-auto border-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold ">Most Watched Genres</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full h-[300px] md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topGenres}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={30}
                fill="#8884d8"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {topGenres.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <h3 className="text-lg font-semibold mb-2">Legend</h3>
          <ul className="space-y-2">
            {topGenres.map((genre, index) => (
              <li key={genre.name} className="flex items-center">
                <span
                  className="w-4 h-4 mr-2 rounded-xl"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="flex-grow">{genre.name}</span>
                <span className="font-semibold">
                  {genre.count} ({((genre.count / total) * 100).toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default GenresPieChart

