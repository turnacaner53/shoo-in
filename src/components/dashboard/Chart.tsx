'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartConfig, ChartContainer } from '../ui/chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#4F46E5',
  },
} satisfies ChartConfig;

interface ChartProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

export default function Chart({ data }: ChartProps) {
  const processedData = aggregateData(data);

  return (
    <ChartContainer config={chartConfig} className='h-[400px] w-full'>
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          stroke='var(--color-desktop)'
          activeDot={{ r: 8 }}
          dataKey='revenue'
        />
      </LineChart>
    </ChartContainer>
  );
}

const aggregateData = (data: any) => {
  const aggregated = data.reduce((acc: any, curr: any) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      acc[curr.date] = curr.revenue;
    }
    return acc;
  }, {});

  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};
