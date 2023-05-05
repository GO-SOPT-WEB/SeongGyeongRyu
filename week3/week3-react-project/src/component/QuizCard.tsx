import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Default_Img } from "../assets";
import { CardContext } from "../contexts/cardContext";

export interface QuizCardProps {
  quizImgSrc?: string;
  handleClick: (() => void) | null;
  order: number;
  isTwoCardsOpen: boolean;
}

const QuizCard = (props: QuizCardProps) => {
  const { quizImgSrc, handleClick, order,isTwoCardsOpen } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { isCardsFlipped, setIsCardsFlipped } = useContext(CardContext);

  const handleFlipCard = () => {
    handleClick?.();

    if (isTwoCardsOpen) return;
    
    if (!isCardsFlipped[order]) {
      const tempIsCardFlipped = [...isCardsFlipped];
      tempIsCardFlipped[order] = !tempIsCardFlipped[order];
      setIsCardsFlipped(tempIsCardFlipped);
    }
  };

  useEffect(() => {
    setIsOpen(isCardsFlipped[order]);
  }, [isCardsFlipped]);

  return (
    <>
      <StQuizCard onClick={() => handleFlipCard()}>
        <div className={isOpen ? "clicked" : " "}>
          <StCardFront src={Default_Img}></StCardFront>
          <StCardBack src={quizImgSrc}></StCardBack>
        </div>
      </StQuizCard>
    </>
  );
};

const StQuizCard = styled.article`
  width: 20rem;
  height: 30rem;
  /* perspective : 자식 요소에 적용되는 원근효과  */
  /* perspective 의 숫자가 커질수록 멀리서 보는 느낌이 난다. 일반적으로 1000 이하의 값이 적당 */
  perspective: 100rem;

  > div {
    width: 100%;
    height: 100%;
    position: relative;

    /* 자식요소를 3D 공간에 배치하기 위한 속성 */
    transform-style: preserve-3d;
    transition: 0.4s;

    cursor: pointer;

    &.clicked {
      transform: rotateY(180deg);
    }
  }
`;

const StCardFront = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 3rem;
  /*뒤집었을 때 StCardFront의 뒷면이 아니라 StCardBack이 보이게 하려면 backface-visibility: hidden 필수  */
  backface-visibility: hidden;
`;

//StCardFront 스타일 상속
const StCardBack = styled(StCardFront)`
  /* 미리 뒤집어 놔야 뒤집었을 때 원래 이미지를 보여줄 수 있으니까! */
  transform: rotateY(180deg);
`;

export default QuizCard;
