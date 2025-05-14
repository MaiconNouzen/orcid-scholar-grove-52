
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Publication } from '../types';
import { ChartContainer } from '@/components/ui/chart';

interface PublicationChartProps {
  publications: Publication[];
  projectFilter?: string;
}

const PublicationChart = ({ publications, projectFilter }: PublicationChartProps) => {
  // Filter publications if a project is specified
  const filteredPublications = projectFilter 
    ? publications.filter(pub => pub.project === projectFilter)
    : publications;

  // Count publications by year
  const publicationsByYear = filteredPublications.reduce((acc, pub) => {
    const year = pub.year.toString();
    if (!acc[year]) {
      acc[year] = { year, count: 0 };
    }
    acc[year].count += 1;
    return acc;
  }, {} as Record<string, { year: string, count: number }>);

  // Convert to array and sort by year
  const data = Object.values(publicationsByYear).sort((a, b) => 
    parseInt(a.year) - parseInt(b.year)
  );

  // Handle the case when there's no data
  if (data.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center text-gray-500">
        Nenhuma publicação disponível para mostrar no gráfico
      </div>
    );
  }

  const config = {
    publications: {
      label: 'Publicações',
      theme: {
        light: '#1E40AF', // dark blue
        dark: '#3B82F6',  // blue
      },
    },
  };

  return (
    <div className="h-60">
      <ChartContainer config={config}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="year" />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value) => [`${value} publicações`, 'Publicações']} 
            labelFormatter={(value) => `Ano: ${value}`}
          />
          <Bar dataKey="count" name="Publicações" fill="var(--color-publications)" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default PublicationChart;
