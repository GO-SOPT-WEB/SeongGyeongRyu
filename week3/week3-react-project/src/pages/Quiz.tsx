import { useState } from "react";
import styled from "styled-components";
import LevelBtn from "../component/LevelBtn";
import QuizCard from "../component/QuizCard";
import quizList, { quizInfo } from "../constant/quizInfo";

const Quiz = () => {
  const levelList = quizList.map((item: quizInfo) => item.level);
  const [level, setLevel] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  //카드가 배열되는 순서는 반드시 랜덤으로 지정
  const randomQuizList = quizList[level].imgList.sort(
    () => Math.random() - 0.5
  );
  console.log(level);

  // const handleIsCardOpen = () => {};

  return (
    <>
      <StHeader>
        🦊 매튜를 맞춰보아요 🦊
        <p>
          현재 스코어 : {currentScore}/{quizList[level].totalScore}
        </p>
      </StHeader>

      <StQuizWrapper>
        <nav>
          {levelList.map((level, idx) => (
            <LevelBtn
              key={idx}
              levelName={level}
              onClick={() => {
                setLevel(idx);
              }}
            />
          ))}
        </nav>

        <section>
          {randomQuizList.map((item, idx) => (
            <QuizCard
              key={idx}
              isOpen={true}
              quizImgSrc={item}
              // onClick={() => handleIsCardOpen()}
            />
          ))}
        </section>
      </StQuizWrapper>
    </>
  );
};

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;
  height: 10rem;
  margin-bottom: 2rem;

  font-size: 4rem;
  background-color: skyblue;

  > p {
    position: absolute;
    right: 2rem;
    bottom: 2rem;

    font-size: 2.5rem;
    background-color: yellow;
  }
`;

const StQuizWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  > nav {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }

  > section {
    display: flex;
    flex-wrap: wrap;

    width: 80%;

    gap: 3rem;
  }
`;
export default Quiz;
