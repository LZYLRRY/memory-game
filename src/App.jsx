import { useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import axios from "axios";
import { decodeEntity } from "html-entities";

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);

  console.log("emojis data", emojisData);

  async function startGame(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );

      console.log(response.data);
      const dataSample = response.data.slice(0, 5);

      setEmojisData(dataSample);
      setIsGameOn(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function turnCard() {
    console.log("Memory card clicked");
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
    </main>
  );
}
export default App;
