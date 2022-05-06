import { useState } from "react";
import styled from "styled-components";
import { foodsList } from "./constant";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  header {
    font-size: 2.5rem;
  }

  .round {
    font-size: 1.5rem; 
  }
`;

const FoodContainer = styled.section`
  display: flex;

  article {
    position: relative;
  }

  p {
    position: absolute;
    top: 10rem;
    left: 10rem;
    color: white;
    font-size: 2rem;
  }

  img {
    width: 400px;
    height: 400px;
  }
`;

const roundType = (round, finalWinnerName) => {
  if (round < 3) return '과일 월드컵 준결승';
  else if (round === 3) return '과일 월드컵 결승';
  else return `최종 우승자 ${finalWinnerName}`
}

const roundDetails = (round) => {
  if (round === 1) return '1/2';
  else if (round === 2) return '2/2';
  else if (round === 3) return '1/1';
  else return null;
}

function App() {
  const [round, setRound] = useState(1);
  const [foodList, setFoodList] = useState(foodsList);
  const [finalWinFood, setWinFood] = useState(null);
  
  const handleClick = (e) => {
    const targetState = { ...foodsList.find(food => food.name === e.target.closest('article').children[1].textContent), isWin: true };
    setFoodList((prev) => [targetState, ...prev.filter(food => food.round !== round)])
    setRound((prev) => prev + 1);
    setWinFood(targetState);
  }
  
  return (
    <AppContainer>
      <header> {roundType(round, finalWinFood?.name)}</header>
      <div className="round">{roundDetails(round)}</div>
      <FoodContainer onClick={handleClick}>
        {(() => {
          switch (round) {
            case 1:
              return foodList
                      .filter(food => food.round === round)
                      .map(food => <article key={food.id}><img src={food.image} alt={food.name}></img><p>{food.name}</p></article>)
            case 2:
              return foodList
                      .filter(food => food.round === round)
                      .map(food => <article key={food.id}><img src={food.image} alt={food.name}></img><p>{food.name}</p></article>)
            case 3:
              return foodList
                      .filter(food => food.isWin === true)
                      .map(food => <article key={food.id}><img src={food.image} alt={food.name}></img><p>{food.name}</p></article>)
            case 4:
              return <article key={finalWinFood.id}><img src={finalWinFood.image} alt={finalWinFood.name}></img><p>{finalWinFood.name}</p></article> 
            default:
              return;
          }
        })()}
      </FoodContainer>
    </AppContainer>
  );
}

export default App;
