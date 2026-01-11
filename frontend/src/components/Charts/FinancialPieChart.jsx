import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

const FinancialPieChart = ({ data, dark }) => { // dark prop add kiya
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    // Mobile par size auto-adjust karne ke liye percentage use kiya
                    innerRadius="60%" 
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: dark ? '#1e293b' : '#ffffff',
                        color: dark ? '#f1f5f9' : '#1e293b',
                        borderRadius: '15px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                    }}
                    itemStyle={{ color: dark ? '#f1f5f9' : '#1e293b' }}
                />
                <Legend 
                    iconType="circle" 
                    verticalAlign="bottom"
                    height={36}
                    // Dark mode mein Legend ka text color change hoga
                    formatter={(value) => (
                        <span style={{ 
                            color: dark ? '#94a3b8' : '#475569', 
                            fontSize: '12px',
                            fontWeight: '500'
                        }}>
                            {value}
                        </span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default FinancialPieChart;