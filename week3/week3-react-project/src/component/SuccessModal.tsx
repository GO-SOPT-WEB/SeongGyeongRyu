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
      <button onClick={handleClick}>X</button>
      {modalMsg}
    </StModalWrapper>
  );
};

const StModalWrapper = styled.dialog`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40rem;
  height: 30rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
`;

export default SuccessModal;
