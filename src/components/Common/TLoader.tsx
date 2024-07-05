import React from "react";
import { Loader } from "react-feather";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div<{ size: number }>`
    ${({ theme }) => theme.FlexCenter}
    animation: ${rotate} 2s linear infinite;
`;

const TLoader = ({ size = 16 }: { size?: number }) => {
    return (
        <LoaderWrapper size={size}>
            <Loader width={size} height={size} />
        </LoaderWrapper>
    );
};

export default TLoader;
