import styled from "styled-components";
import ButtonLayout from "../Layout/ButtonLayout";

export interface LevelBtnProps {
  levelName: string;
  handleLevel: () => void;
}

const LevelBtn = (props: LevelBtnProps) => {
  const { levelName, handleLevel } = props;
  return (
    <ButtonLayout
      isLevelBtn={true}
      buttonText={levelName}
      handleClick={() => {
        handleLevel();
      }}
    ></ButtonLayout>
  );
};

export default LevelBtn;

const StLevelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13rem;
  height: 6rem;

  border: none;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.Matt_Quiz_Blue};

  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem gray;

  :hover {
    background-color: blue;
  }
`;
