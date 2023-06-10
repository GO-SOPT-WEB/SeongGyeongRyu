import styled from "styled-components";

interface SucessModalProps {
  level: number;
  handleClick: () => void;
}

const SuccessModal = (props: SucessModalProps) => {
  const { level, handleClick } = props;

  const modalMsg =
    level === 1
      ? "🍒 매튜와 한 발 친해졌어요! 🍒"
      : level === 2
      ? "🍒 매튜 쫌 아네? 🍒"
      : "🍒 당신도 이제 매튜 박사! 🍒";

  return (
    <StModalWrapper>
      <div>
        <button onClick={handleClick}>X</button>
        {modalMsg}
      </div>
    </StModalWrapper>
  );
};

const StModalWrapper = styled.dialog`
  position: fixed;
  width: 100vw;
  height: 100vh;

  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    width: 43rem;
    height: 30rem;

    background: none;

    background-color: ${({ theme }) => theme.colors.Matt_Quiz_Yellow};
    border-radius: 3rem;
    border: none;

    font-size: 3rem;

    > button {
      position: absolute;
      top: 2rem;
      right: 2rem;

      font-size: 5rem;

      background: none;
      border: none;
    }
  }
`;

export default SuccessModal;
