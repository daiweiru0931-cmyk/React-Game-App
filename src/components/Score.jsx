function Score({ correct, score, highscore }) {
    return (
      <div className="scoreboard">
        <p>Correct number: {correct}</p>
        <p>Score: {score}</p>
        <p>High score: {highscore}</p>
      </div>
    );
  }
  
  export default Score;
  