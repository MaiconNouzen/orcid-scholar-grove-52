
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Publication, Project } from '../types';
import { ChartContainer } from '@/components/ui/chart';

interface ProjectPublicationChartProps {
  publications: Publication[];
  projects: Project[];
}

const ProjectPublicationChart = ({ publications, projects }: ProjectPublicationChartProps) => {
  if (!publications || publications.length === 0 || !projects || projects.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center text-gray-500">
        Nenhum dado disponível para mostrar no gráfico
      </div>
    );
  }

  // Group publications by year
  const publicationsByYear: Record<string, any> = {};
  
  // Initialize years
  const currentYear = new Date().getFullYear();
  const startYear = Math.min(...publications.map(pub => pub.year));
  
  for (let year = startYear; year <= currentYear; year++) {
    publicationsByYear[year] = { year };
    projects.forEach(project => {
      publicationsByYear[year][project.name || project.id] = 0;
    });
  }

  // Count publications by project and year
  publications.forEach(pub => {
    const year = pub.year.toString();
    if (pub.project && publicationsByYear[year]) {
      // Find the project name by ID if project is an ID string
      let projectName = pub.project;
      const projectObj = projects.find(p => p.id === pub.project);
      if (projectObj) {
        projectName = projectObj.name;
      }
      
      publicationsByYear[year][projectName] = (publicationsByYear[year][projectName] || 0) + 1;
    }
  });

  // Convert to array and sort by year
  const data = Object.values(publicationsByYear).sort((a: any, b: any) => 
    parseInt(a.year) - parseInt(b.year)
  );

  // Generate colors for projects
  const projectColors = [
    '#1E40AF', // dark blue
    '#3B82F6', // blue
    '#60A5FA', // light blue
    '#93C5FD', // lighter blue
    '#BFDBFE', // lightest blue
  ];

  // Create config for the ChartContainer
  const config: {[key: string]: {label: string, color: string}} = {};
  projects.forEach((project, index) => {
    config[project.name || project.id] = {
      label: project.name || project.id,
      color: projectColors[index % projectColors.length]
    };
  });

  return (
    <div className="h-60">
      <ChartContainer config={config}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="year" />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value, name) => [`${value} publicações`, name]} 
            labelFormatter={(value) => `Ano: ${value}`}
          />
          <Legend />
          {projects.map((project, index) => (
            <Line 
              key={project.id}
              type="monotone"
              dataKey={project.name}
              stroke={`var(--color-${project.name.replace(/\s+/g, '-').toLowerCase()})`}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default ProjectPublicationChart;
