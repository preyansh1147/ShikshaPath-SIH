import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ResultsPanel = ({ aggregate }) => {
  if (!aggregate) return null;
  const data = [
    { name: 'Science-PCM', value: aggregate.science_pcm || 0 },
    { name: 'Science-Bio', value: aggregate.science_bio || 0 },
    { name: 'Commerce', value: aggregate.commerce || 0 },
    { name: 'Arts', value: aggregate.arts || 0 }
  ];

  // determine best stream(s)
  const maxVal = Math.max(...data.map(d => d.value));

  // 🔹 Guard: if no data yet, show a message instead
  if (maxVal === 0) {
    return (
      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-xl font-semibold mb-4">Your Assessment Summary</h3>
        <p className="text-gray-600">No assessment data yet. Complete the quizzes to see results.</p>
      </div>
    );
  }

  const best = data.filter(d => d.value === maxVal).map(d => d.name);

  return (
    <div className="bg-card rounded-xl p-6 border">
      <h3 className="text-xl font-semibold mb-4">Your Assessment Summary</h3>
      <p className="mb-4">
        Top match: <strong>{best.join(', ')}</strong>
      </p>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {/* 🔹 Added distinct colors per stream */}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={['#4a90e2', '#50c878', '#f4a261', '#e76f51'][index]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Interpretation</h4>
        <p className="text-sm text-text-secondary">
          The bar heights represent fit percentage across streams. Consider exploring courses for{" "}
          <strong>{best.join(', ')}</strong>.
        </p>
      </div>
    </div>
  );
};

export default ResultsPanel;
