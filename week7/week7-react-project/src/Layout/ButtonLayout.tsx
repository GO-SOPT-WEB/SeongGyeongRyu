import styled, { css } from "styled-components";

export interface ButtonLayoutProps {
  isLevelBtn: boolean;
  buttonText: string;
  handleClick: () => void;
}

const ButtonLayout = (props: ButtonLayoutProps) => {
  const { isLevelBtn, buttonText, handleClick } = props;

  return (
    <StButtonWrapper
      type="button"
      isLevelBtn={isLevelBtn}
      onClick={() => handleClick()}
    >
      {buttonText}
    </StButtonWrapper>
  );
};

const StButtonWrapper = styled.button<{ isLevelBtn: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13rem;
  height: 6rem;

  border: none;
  border-radius: 2rem;

  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem gray;

  ${({ isLevelBtn }) =>
    isLevelBtn
      ? css`
          background-color: ${({ theme }) => theme.colors.Matt_Quiz_Blue};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.Matt_Quiz_Purple};
        `}

  :hover {
    background-color: blue;
  }
`;

export default ButtonLayout;
