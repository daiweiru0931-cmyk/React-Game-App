import { useState } from "react";

function Question({ question, onSubmit }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (!answer) return;
    onSubmit(answer);
    setAnswer("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
      {/* 圖片路徑使用 public/images */}
      <img
        className="question-image"
        src={`/images/${question.image}`}
        alt="Item"
      />

      {/* input 加上 className */}
      <input
        type="text"
        maxLength="1"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter a letter"
        className="answer-input"
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Question;
