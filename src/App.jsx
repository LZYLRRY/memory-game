import { useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import axios from "axios";
import { decodeEntity } from "html-entities";

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);

  async function startGame(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );

      console.log(response.data);
      const dataSlice = getDataSlice(response.data);
      const emojisArray = getEmojisArray(dataSlice);

      setEmojisData(emojisArray);
      setIsGameOn(true);
      console.log("random numbers", getRandomIndices(response.data));
      console.log("getDataSlice", getDataSlice(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function getDataSlice(data) {
    const randomIndices = getRandomIndices(data);
    const dataSlice = randomIndices.map((number) => data[number]);

    return dataSlice;
    // ALSO POSSIBLE ON ONE LINE, BIT LESS READABLE
    // return getRandomIndices(data).map((number) => data[number]);
  }

  function getRandomIndices(data) {
    const randomIndicesArray = [];

    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum);
      } else {
        i--;
      }
    }

    return randomIndicesArray;
  }

  function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];

    //Fisher-Yates shuffle
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairedEmojisArray[i], pairedEmojisArray[j]] = [
        pairedEmojisArray[j],
        pairedEmojisArray[i],
      ];
    }

    return pairedEmojisArray;
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
