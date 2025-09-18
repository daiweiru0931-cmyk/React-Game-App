import { useState, useEffect } from "react";
import Question from "./components/Question";
import Score from "./components/Score";
import DecryptedText from "./components/DecryptedText";
import ScrollVelocity from "./components/ScrollVelocity";
import PixelBlast from "./components/PixelBlast";
import "./App.css";

const questions = [
  { image: "bubble-tea.png", answer: "b" },
  { image: "cat.png", answer: "c" },
  { image: "hamburger.png", answer: "h" },
  { image: "ice-hockey.png", answer: "i" },
  { image: "mountain.png", answer: "m" },
];

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    const timer = setTimeout(() => setShowRules(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startGame = () => setGameStarted(true);

  const checkAnswer = (answer) => {
    if (answer.toLowerCase() === currentQuestion.answer) {
      setCorrect(correct + 1);
      setScore((prev) => {
        const newScore = prev + 10;
        if (newScore > highscore) setHighscore(newScore);
        return newScore;
      });
    } else {
      setScore((prev) => prev - 5);
      alert("You get it wrong! ❌");
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (questionIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const restartGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setCorrect(0);
    setFinished(false);
    setGameStarted(false);
    setShowRules(false);
    setTimeout(() => setShowRules(true), 1500);
  };

  // 自適配 PixelBlast 顆粒大小和密度
  const computePixelSettings = () => {
    const basePixel = Math.max(4, Math.min(windowSize.width, windowSize.height) / 120);
    const density = Math.min(2, Math.max(1, windowSize.width / 1200));
    return { pixelSize: basePixel, patternDensity: density };
  };

  const { pixelSize, patternDensity } = computePixelSettings();

  return (
    <div className="box">
      {/* PixelBlast 背景 */}
      <div className="pixel-blast-container">
        <PixelBlast
          variant="circle"
          pixelSize={pixelSize}
          color="#B19EEF"
          patternScale={3}
          patternDensity={patternDensity}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* 遊戲內容 */}
      <div className="app-container">
        {!gameStarted && (
          <div>
            <DecryptedText
              text="Which letter does it start?"
              animateOn="view"
              revealDirection="center"
              speed={150}
              style={{ fontSize: "3rem", fontWeight: "bold", color: "#8a08e7" }}
            />
          </div>
        )}

        {showRules && !gameStarted && (
          <div className="rules">
            <h2>Game Rules:</h2>
            <p>
              Type the first letter of the image name. <br />
              You get 10 points for each correct answer and lose 5 points for each wrong one. <br />
              There is no gift if you get all correct. 🤪
            </p>
            <button onClick={startGame}>Start Game</button>
          </div>
        )}

        {gameStarted && (
          <>
            <div style={{ marginBottom: "20px" }}>
              <ScrollVelocity
                texts={["Which letter does it start?", "Which letter does it start?"]}
                velocity={20}
                className="custom-scroll-text"
              />
            </div>

            <div className="game">
              <Score correct={correct} score={score} highscore={highscore} />

              <div className="question-container">
                {!finished ? (
                  <Question question={currentQuestion} onSubmit={checkAnswer} />
                ) : (
                  <>
                    <h2 style={{ color: "#00ffa6" }}>Congratulations! Completing the game.</h2>
                    <button className="restart-btn" onClick={restartGame}>
                      Play Again
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;