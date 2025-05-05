import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizRunning, setIsQuizRunning] = useState(false);
  const [score, setScore] = useState(0);

  const API_URL =
    "https://quizapi.io/api/v1/questions?apiKey=W3PdMwqXvnaIGDLQIpLhVbf3bihgl8qTaQvxRvV8&category=react&difficulty=Easy&limit=20&tags=React";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to fetch questions", err));
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsQuizRunning(false); // auto stop at the end
      }
    }, 1000);
  };

  const startQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setIsQuizRunning(true);
  };

  const stopQuiz = () => {
    setIsQuizRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">⚛️ React Quiz</h1>

      {questions.length > 0 && (
        <QuestionCard
          question={questions[currentIndex]}
          index={currentIndex}
          total={questions.length}
          onAnswer={handleAnswer}
          isQuizRunning={isQuizRunning}
          onStart={startQuiz}
          onStop={stopQuiz}
        />
      )}

      {!isQuizRunning && questions.length > 0 && currentIndex > 0 && (
        <div className="mt-6 text-xl font-semibold">
          ✅ You scored {score} out of {questions.length}
        </div>
      )}
    </div>
  );
};

export default Quiz;
