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

const LoaderWrapper = styled.div`
    animation: ${rotate} 1s linear infinite;
`;

const TLoader = ({ size }: { size?: number }) => {
    return (
        <LoaderWrapper>
            <Loader width={size} height={size} />
        </LoaderWrapper>
    );
};

export default TLoader;
