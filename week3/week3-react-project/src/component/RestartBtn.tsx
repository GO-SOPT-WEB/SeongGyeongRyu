import ButtonLayout from "../Layout/ButtonLayout";

export interface RestartBtnProps {
  handleRestart: () => void;
}

const RestartBtn = (props: RestartBtnProps) => {
  const { handleRestart } = props;
  return (
    <ButtonLayout
      isLevelBtn={false}
      buttonText={"Restart"}
      handleClick={() => handleRestart()}
    ></ButtonLayout>
  );
};

export default RestartBtn;
