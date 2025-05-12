
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PublicationChart = ({ publications }) => {
  // Count publications by year
  const publicationsByYear = publications.reduce((acc, pub) => {
    const year = pub.year.toString();
    if (!acc[year]) {
      acc[year] = { year, count: 0 };
    }
    acc[year].count += 1;
    return acc;
  }, {});

  // Convert to array and sort by year
  const data = Object.values(publicationsByYear).sort((a, b) => 
    parseInt(a.year) - parseInt(b.year)
  );

  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="year" />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value) => [`${value} publicações`]} 
            labelFormatter={(value) => `Ano: ${value}`}
          />
          <Bar dataKey="count" fill="#A6CE39" name="Publicações" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PublicationChart;
