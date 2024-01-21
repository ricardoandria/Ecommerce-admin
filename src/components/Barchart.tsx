"use client";
import { useTheme } from "next-themes";
import React from "react";
import {
  Bar,
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type Props = {};

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 500000) + 1000,
  },
];

export default function Barchart({}: Props) {
  const { theme } = useTheme();
  return (
    <ResponsiveContainer width={"100%"} height={600}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke={theme === "dark" ? "white" : "black"}
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke={theme === "dark" ? "white" : "black"}
          fontSize={12}
          width={100}
          tickFormatter={(value) => `${value} Ar`}
        />
        <Bar
          dataKey={"total"}
          fill={theme === "dark" ? "white" : "black"}
          radius={[4, 4, 0, 0]}
        />
      </BarGraph>
    </ResponsiveContainer>
  );
}
