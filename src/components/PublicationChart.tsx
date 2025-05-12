
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the Publication type structure
interface Publication {
  title: string;
  year: number | string;
  type: string;
  project?: string;
  // Add other fields that might be needed, but year is essential for the chart
}

interface PublicationChartProps {
  publications: Publication[];
}

const PublicationChart = ({ publications }: PublicationChartProps) => {
  const [chartMode, setChartMode] = useState<'yearly' | 'byType' | 'byProject'>('yearly');

  // Count publications by year
  const getYearlyData = () => {
    const publicationsByYear = publications.reduce((acc, pub) => {
      const year = pub.year.toString();
      if (!acc[year]) {
        acc[year] = { year, count: 0 };
      }
      acc[year].count += 1;
      return acc;
    }, {} as Record<string, { year: string, count: number }>);
    
    // Convert to array and sort by year
    return Object.values(publicationsByYear).sort((a, b) => 
      parseInt(a.year) - parseInt(b.year)
    );
  };

  // Count publications by type
  const getTypeData = () => {
    const publicationsByType = publications.reduce((acc, pub) => {
      const type = pub.type;
      if (!acc[type]) {
        acc[type] = { type, count: 0 };
      }
      acc[type].count += 1;
      return acc;
    }, {} as Record<string, { type: string, count: number }>);
    
    return Object.values(publicationsByType);
  };

  // Count publications by project
  const getProjectData = () => {
    const publicationsByProject = publications.reduce((acc, pub) => {
      const project = pub.project || 'Sem projeto';
      if (!acc[project]) {
        acc[project] = { project, count: 0 };
      }
      acc[project].count += 1;
      return acc;
    }, {} as Record<string, { project: string, count: number }>);
    
    return Object.values(publicationsByProject);
  };

  const getData = () => {
    switch (chartMode) {
      case 'yearly':
        return getYearlyData();
      case 'byType':
        return getTypeData();
      case 'byProject':
        return getProjectData();
      default:
        return getYearlyData();
    }
  };

  const getXAxisDataKey = () => {
    switch (chartMode) {
      case 'yearly':
        return 'year';
      case 'byType':
        return 'type';
      case 'byProject':
        return 'project';
      default:
        return 'year';
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Visualização</label>
        <Select 
          value={chartMode} 
          onValueChange={(value: 'yearly' | 'byType' | 'byProject') => setChartMode(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o modo de visualização" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yearly">Por Ano</SelectItem>
            <SelectItem value="byType">Por Tipo</SelectItem>
            <SelectItem value="byProject">Por Projeto</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getData()}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey={getXAxisDataKey()} 
              angle={-45} 
              textAnchor="end" 
              height={70} 
              tick={{ fontSize: 12 }} 
            />
            <YAxis allowDecimals={false} />
            <Tooltip 
              formatter={(value) => [`${value} publicações`]} 
              labelFormatter={(value) => `${chartMode === 'yearly' ? 'Ano' : chartMode === 'byType' ? 'Tipo' : 'Projeto'}: ${value}`}
            />
            <Legend />
            <Bar dataKey="count" fill="#A6CE39" name="Publicações" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PublicationChart;
