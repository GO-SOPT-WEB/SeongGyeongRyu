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
