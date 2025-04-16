"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
type chartItems={
   category: string;
   orders: number;
   fill: string;
}

const chartConfig = {
  orders: {
    label: "Visitors",
  },
  tshirt: {
    label: "T-shirt",
    color: "hsl(var(--chart-1))",
  },
  jeans: {
    label: "Jeans",
    color: "hsl(var(--chart-2))",
  },
  skirt: {
    label: "Skirt",
    color: "hsl(var(--chart-3))",
  },
  top: {
    label: "Top",
    color: "hsl(var(--chart-4))",
  },
  shoes: {
    label: "Shoes",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function Chart(props: {title:string, data: chartItems[]}) {
  const total = React.useMemo(() => {
    return props.data.reduce((acc, curr) => acc + curr.orders, 0)
  }, [props.data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>1 Jan - 31 Jan</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={props.data}
              dataKey="orders"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          className="fill-foreground text-base md:text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Orders
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

