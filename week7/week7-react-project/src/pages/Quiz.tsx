import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import LevelBtn from "../component/LevelBtn";
import ModalPortal from "../component/ModalPortal";
import QuizCard from "../component/QuizCard";
import RestartBtn from "../component/RestartBtn";
import SuccessModal from "../component/SuccessModal";
import quizList, { quizInfo } from "../constant/quizInfo";
import { CardContext } from "../contexts/cardContext";

const Quiz = () => {
  const levelList = quizList.map((item: quizInfo) => item.level);

  const [level, setLevel] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [isCardsFlipped, setIsCardsFlipped] = useState<boolean[]>(
    Array(quizList[level].totalScore).fill(false)
  );
  const [chosen, setChosen] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isScoreBlinking, setIsScoreBlinking] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleRandomQuizList = (quizList: quizInfo) => {
    //중복으로 값이 들어가는 걸 막기 위해 set으로 선언
    const randomQuiz = new Set();
    //단계별 정답 수(ex.Easy : 5)에 도달할 때까지 이미지 추가
    while (randomQuiz.size < quizList.totalScore) {
      //랜덤으로 추가하기 위해 random 함수 이용
      randomQuiz.add(
        quizList.imgList[Math.floor(Math.random() * quizList.imgList.length)]
      );
    }
    //이미지를 두개씩 배열에 다시 넣어서 진짜 문제 배열 만들기
    const realQuizList: string[] = [];
    //set이라서 Array로 바꿔주기 위해 Array.from 사용
    Array.from(randomQuiz).forEach((item) => {
      realQuizList.push(item as string, item as string);
    });
    //이미지 순서 섞어주기
    realQuizList.sort(() => Math.random() - 0.5);

    return realQuizList;
  };

  //level이 바뀔 때만 콜백 함수를 실행하고, 그렇지 않은 경우 (ex.clicked가 바뀌는 경우)에는 quizList를 유지한다.
  const randomQuizList = useMemo(() => {
    return handleRandomQuizList(quizList[level]);
  }, [level]);

  //레벨 바뀌면 초기화
  useEffect(() => {
    setChosen([]);
    setIsCardsFlipped([]);
    setCurrentScore(0);
  }, [level]);

  useEffect(() => {
    if (chosen.length === 2) {
      setIsChecking((prev) => !prev);
      setTimeout(() => {
        handleCheckPair(chosen);
        setIsChecking((prev) => !prev);
      }, 1000);
      setChosen([]);
    }
  }, [chosen]);

  useEffect(() => {
    setIsScoreBlinking((prev) => !prev);
    setTimeout(() => {
      setIsScoreBlinking((prev) => !prev);
    }, 3000);

    if (currentScore === quizList[level].totalScore) {
      setIsModalOpen((prev) => !prev);
    }
  }, [currentScore]);

  const handleClick = (idx: number) => {
    if (chosen.length < 2 && !isChecking) {
      setChosen((prev) => [...prev, idx]);
    }
  };

  const handleCheckPair = (chosen: number[]) => {
    if (randomQuizList[chosen[0]] === randomQuizList[chosen[1]]) {
      setCurrentScore((prev) => prev + 1);
    } else {
      const tempIsCardFlipped = [...isCardsFlipped];
      tempIsCardFlipped[chosen[0]] = !tempIsCardFlipped[chosen[0]];
      tempIsCardFlipped[chosen[1]] = !tempIsCardFlipped[chosen[1]];
      setIsCardsFlipped(tempIsCardFlipped);
    }
  };

  return (
    <>
      <CardContext.Provider value={{ isCardsFlipped, setIsCardsFlipped }}>
        <StHeader isBlinking={isScoreBlinking}>
          <RestartBtn handleRestart={() => window.location.reload()} />
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
                handleLevel={() => {
                  setLevel(idx);
                }}
              />
            ))}
          </nav>

          <section>
            {randomQuizList.map((item, idx) => (
              <QuizCard
                key={idx}
                quizImgSrc={item}
                order={idx}
                isTwoCardsOpen={isChecking}
                handleClick={() => handleClick(idx)}
              />
            ))}
          </section>
        </StQuizWrapper>
        {isModalOpen && (
          <ModalPortal>
            <SuccessModal
              level={level}
              handleClick={() => handleCloseModal()}
            />
          </ModalPortal>
        )}
      </CardContext.Provider>
    </>
  );
};

const StHeader = styled.header<{ isBlinking: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;
  height: 10rem;
  margin-bottom: 2rem;

  font-size: 4rem;
  background-color: skyblue;

  @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }

  > p {
    position: absolute;
    right: 2rem;
    bottom: 2rem;

    font-size: 2.5rem;
    background-color: yellow;

    ${({ isBlinking }) =>
      isBlinking &&
      css`
        animation: blink-effect 1s step-end infinite;
      `}
  }

  > button {
    position: absolute;
    left: 2rem;
    bottom: 2.5rem;
  }
`;

const StQuizWrapper = styled.div`
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
    justify-content: center;

    width: 85%;

    gap: 3rem;
  }
`;
export default Quiz;
