import styled from "styled-components";
import WeatherCardSkeleton from "./WeatherCardSkeleton";

export interface LoadingSectionProps {
  isDaily: boolean;
}

const LoadingSection = (props: LoadingSectionProps) => {
  const { isDaily } = props;

  if (isDaily) {
    return (
      <>
        <StFrameWrapper>
          <WeatherCardSkeleton />
        </StFrameWrapper>
      </>
    );
  } else {
    return (
      <StFrameWrapper>
        {Array(5)
          .fill(true)
          .map((_, idx) => (
            <WeatherCardSkeleton key={idx} />
          ))}
      </StFrameWrapper>
    );
  }
};

const StFrameWrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export default LoadingSection;
