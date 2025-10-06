import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Heart, Shuffle, Trophy, Star, Clock } from 'lucide-react';
import { triggerConfetti, fadeInUp } from '../utils/animations';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const MiniGames: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeGame, setActiveGame] = useState<'memory' | 'quiz' | null>(null);
  
  // Memory Game State
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Quiz Game State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const cardEmojis = ['💦', '💖', '💝', '🍑', '🍆', '💞', '💓', '❤️'];
  
  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is our anniversary date?",
      options: ["29th October", "30th October", "19th May", "6th October"],
      correct: 0,
      explanation: "Biggest day of the year fr 💕"
    },
    {
      question: "What do i love about you the most?",
      options: ["Your smile", "Your Super Soaked Girllyy👀💦", "Your Love", "Small bums"],
      correct: 2,
      explanation: "I Love you soooo much💖"
    },
    {
      question: "What's my favorite thing about our relationship?",
      options: ["The laughter", "The adventures", "The comfort", "All of the above"],
      correct: 3,
      explanation: "It's everything together that makes us perfect! ✨"
    },
    {
      question: "Whats our favorite season?",
      options: ["Cold Season", "Summer", "Rain Season", "Rain and Cold Season"],
      correct: 3,
      explanation: "We Should just live in a fridge fr 🥶"
    }
  ];

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current);
    }
  }, []);

  // Memory Game Functions
  const initializeMemoryGame = () => {
    const gameCards: Card[] = [];
    cardEmojis.forEach((emoji, index) => {
      gameCards.push(
        { id: index * 2, emoji, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameStarted(true);
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length >= 2 || flippedCards.includes(cardId)) return;
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
          
          if (matchedPairs + 1 === cardEmojis.length) {
            triggerConfetti();
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Quiz Game Functions
  const startQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
        if (score + (answerIndex === quizQuestions[currentQuestion].correct ? 1 : 0) === quizQuestions.length) {
          triggerConfetti();
        }
      }
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Gamepad2 size={16} />
            <span>Fun & Games</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Let's Play Together!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Can you beat me though👀
          </p>
        </div>

        {/* Game Selection */}
        {!activeGame && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setActiveGame('memory')}
            >
              <div className="text-center">
                <div className="p-4 bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-pink-600" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Memory Match</h3>
                <p className="text-gray-600 mb-6">
                  Match the emojis and test your ka head! 
                  Can you find all the pairs and the 19inch?
                </p>
                <div className="flex justify-center space-x-2 text-2xl">
                  {cardEmojis.slice(0, 4).map((emoji, i) => (
                    <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setActiveGame('quiz')}
            >
              <div className="text-center">
                <div className="p-4 bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Star className="text-purple-600" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Love Quiz</h3>
                <p className="text-gray-600 mb-6">
                  How many can you get right baby? 
                  Take this quiz and find out!
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <Trophy className="text-yellow-500" size={24} />
                  <span className="text-gray-700 font-medium">4 Questions</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Memory Game */}
        {activeGame === 'memory' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Memory Match Game</h3>
              <button
                onClick={() => setActiveGame(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Back to Games
              </button>
            </div>

            {!gameStarted ? (
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-8">
                  Find all the matching pairs of emojis! 
                  Click two cards to flip them and see if they match.
                </p>
                <button
                  onClick={initializeMemoryGame}
                  className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold transition-colors duration-200"
                >
                  Start Game
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-center space-x-8 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">{moves}</div>
                    <div className="text-sm text-gray-600">Moves</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{matchedPairs}</div>
                    <div className="text-sm text-gray-600">Pairs Found</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className={`
                        aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl 
                        flex items-center justify-center text-3xl cursor-pointer
                        transition-all duration-300 transform hover:scale-105
                        ${card.isFlipped || card.isMatched ? 'bg-white shadow-lg' : 'hover:shadow-md'}
                        ${card.isMatched ? 'ring-2 ring-green-400' : ''}
                      `}
                      onClick={() => flipCard(card.id)}
                    >
                      {card.isFlipped || card.isMatched ? card.emoji : '❓'}
                    </div>
                  ))}
                </div>

                {matchedPairs === cardEmojis.length && (
                  <div className="text-center mt-8 p-6 bg-green-50 rounded-xl">
                    <h4 className="text-2xl font-bold text-green-800 mb-2">
                      Congratulations! 🎉
                    </h4>
                    <p className="text-green-700">
                      You found all the pairs in {moves} moves! You have an amazing memory! 💕
                    </p>
                    <button
                      onClick={initializeMemoryGame}
                      className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Quiz Game */}
        {activeGame === 'quiz' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Love Quiz</h3>
              <button
                onClick={() => setActiveGame(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Back to Games
              </button>
            </div>

            {!quizCompleted ? (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <Clock className="text-purple-600" size={20} />
                    <span className="text-gray-600">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                  </div>
                  <div className="text-purple-600 font-semibold">
                    Score: {score}/{quizQuestions.length}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => selectAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`
                          w-full p-4 text-left rounded-xl border transition-all duration-200
                          ${selectedAnswer === null 
                            ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50' 
                            : selectedAnswer === index
                              ? index === quizQuestions[currentQuestion].correct
                                ? 'border-green-400 bg-green-50 text-green-800'
                                : 'border-red-400 bg-red-50 text-red-800'
                              : index === quizQuestions[currentQuestion].correct
                                ? 'border-green-400 bg-green-50 text-green-800'
                                : 'border-gray-200 bg-gray-50 text-gray-500'
                          }
                        `}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-800">
                        {quizQuestions[currentQuestion].explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-8">
                  <h4 className="text-3xl font-bold text-gray-800 mb-4">
                    Quiz Complete! 🎊
                  </h4>
                  <div className="text-6xl mb-4">
                    {score === quizQuestions.length ? '🏆' : score >= quizQuestions.length / 2 ? '⭐' : '💝'}
                  </div>
                  <p className="text-xl text-gray-600 mb-6">
                    You scored {score} out of {quizQuestions.length}!
                  </p>
                  <p className="text-lg text-purple-700">
                    {score === quizQuestions.length 
                      ? "Perfect score! 💕"
                      : score >= quizQuestions.length / 2
                        ? "Great job! keep doing better every day! 💖"
                        : "That's okay! Every day is a chance to learn more! 💝"
                    }
                  </p>
                </div>
                
                <button
                  onClick={startQuiz}
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors duration-200"
                >
                  Take Quiz Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MiniGames;