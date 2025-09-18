import React, { useState } from 'react';

const Quiz = ({ questions = [], onComplete }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showHint, setShowHint] = useState(false); // 🔹 added for hint toggle

  const handleAnswer = (option) => {
    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);
    const next = index + 1;
    setShowHint(false); // 🔹 reset hint when moving to next question
    if (next < questions.length) {
      setIndex(next);
    } else {
      onComplete(nextAnswers); // send array of selected option strings back
    }
  };

  const q = questions[index];
  if (!q) return <div>No questions</div>;

  return (
    <div className="p-6 bg-card rounded-xl">
      <h3 className="text-lg font-semibold mb-4">
        Q{index + 1}. {q.question}
      </h3>

      {/* 🔹 Hint toggle button */}
      {q.hint && (
        <>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs mb-2 text-blue-500 underline"
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          {showHint && (
            <p className="text-sm text-gray-600 mb-2">{q.hint}</p>
          )}
        </>
      )}

      <div className="space-y-3">
        {q.options.map((opt, i) => {
          const text = typeof opt === 'string' ? opt : opt.text || opt;
          return (
            <button
              key={i}
              className="w-full text-left p-3 border rounded hover:bg-gray-100"
              onClick={() => handleAnswer(text)}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
