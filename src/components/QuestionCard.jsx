import React, { useEffect, useState } from 'react';

const QuestionCard = ({ 
  question, 
  index, 
  total, 
  onAnswer, 
  isQuizRunning, 
  onStart, 
  onStop 
}) => {
  const answers = Object.entries(question.answers).filter(([_, val]) => val !== null);
  const correctAnswerKey = Object.entries(question.correct_answers)
    .find(([_, val]) => val === 'true')?.[0]?.replace('_correct', '');

  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (!isQuizRunning) return;
    setSelected(null);
    setTimer(15);
  }, [question, isQuizRunning]);

  useEffect(() => {
    if (!isQuizRunning || selected !== null) return;

    if (timer === 0) {
      setSelected("timeout");
      setTimeout(() => onAnswer(false), 1000);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, selected, isQuizRunning]);

  const handleClick = (key) => {
    if (!isQuizRunning || selected !== null) return;

    setSelected(key);
    const isCorrect = key === correctAnswerKey;

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl text-white max-w-3xl w-full mx-auto flex flex-col justify-between min-h-[500px]">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Question {index + 1} of {total}</h2>
          {isQuizRunning && (
            <div className="text-lg font-mono">⏳ {timer < 10 ? `0${timer}` : timer}s</div>
          )}
        </div>

        <p className="text-xl font-bold mb-6">{question.question}</p>

        <div className="grid gap-4 mb-6">
          {answers.map(([key, val]) => {
            const isCorrect = key === correctAnswerKey;
            let bgColor = "bg-gradient-to-r from-indigo-500 to-purple-500";

            if (selected) {
              if (key === selected && isCorrect) bgColor = "bg-green-600";
              else if (key === selected && !isCorrect) bgColor = "bg-red-500";
              else if (isCorrect) bgColor = "bg-green-600";
              else bgColor = "bg-gray-600";
            }

            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                disabled={!isQuizRunning || !!selected}
                className={`py-3 px-6 rounded-lg text-left w-full transition duration-300 transform ${
                  selected ? 'cursor-not-allowed' : 'hover:scale-105'
                } ${bgColor}`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>

      {/* Start/Stop Button */}
      <div className="mt-auto pt-4 flex justify-center">
        {isQuizRunning ? (
          <button
            onClick={onStop}
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-semibold"
          >
            ⏹ Stop Quiz
          </button>
        ) : (
          <button
            onClick={onStart}
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-semibold"
          >
            ▶ Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
