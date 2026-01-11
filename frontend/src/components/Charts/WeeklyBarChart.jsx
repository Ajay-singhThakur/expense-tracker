import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyBarChart = ({ data, dark }) => { // dark prop add kiya
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {/* Grid line color changes based on dark mode */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={dark ? "#334155" : "#f1f5f9"} 
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: dark ? '#94a3b8' : '#64748b', fontSize: 10 }} // Responsive font size
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: dark ? '#94a3b8' : '#64748b', fontSize: 10 }}
          />
          <Tooltip 
            cursor={{ fill: dark ? '#1e293b' : '#f8fafc' }}
            contentStyle={{ 
                backgroundColor: dark ? '#1e293b' : '#ffffff',
                color: dark ? '#f1f5f9' : '#1e293b',
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: dark ? '0 10px 15px -3px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.1)' 
            }}
            itemStyle={{ color: dark ? '#3b82f6' : '#2563eb' }}
          />
          <Bar 
            dataKey="amount" 
            fill="#3b82f6" 
            radius={[6, 6, 0, 0]} 
            barSize={window.innerWidth < 768 ? 20 : 30} // Mobile pe bars thode patle
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyBarChart;