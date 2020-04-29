import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import Palette from 'colors';

const bar1anim = keyframes`
  0% { transform: scale(0.4, 1); }
  25% {  transform: scale(0.2, 1); }
  50% {  transform: scale(0.7, 1); }
  75% {  transform: scale(0.5, 1); }
  100% {  transform: scale(0.4, 1); }
`;

const AnimationParent = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  :before {
    content: '';
    display: block;
    padding-top: 70%;
  }
`;

const AnimationParentInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Phone = styled.div`
  position: absolute;
  background-color: #${Palette[0].swatches[0].color};
  width: 30%;
  height: 65%;
  bottom: 0;
  border-radius: 1.8rem;
`;

const PhoneScreen = styled.div`
  position: absolute;
  background-color: white;
  top: 12%;
  bottom: 12%;
  left: 10%;
  right: 10%;
`;

const Monitor = styled.div`
  position: absolute;
  background-color: #${Palette[2].swatches[2].color};
  width: 80%;
  right: 0px;
  height: 70%;
  top: 0px;
  border-radius: 5px;
`;

const MonitorScreen = styled.div`
  position: absolute;
  background-color: white;
  top: 12px;
  bottom: 12px;
  left: 12px;
  right: 12px;
`;

const GraphBar = styled.div`
  position: relative;
  height: 20%;
  margin: 12px;
  background-color: #d5d5d5;
`;

const BarShading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(137, 206, 232);
  transform-origin: left center;
  animation: ${bar1anim} 3s ease infinite;
`;


const HomePageAnimation = () => (
  <AnimationParent>
    <AnimationParentInner>
      <Monitor>
        <MonitorScreen>
          <GraphBar>
            <BarShading />
          </GraphBar>
          <GraphBar />
          <GraphBar />
        </MonitorScreen>
      </Monitor>
      <Phone>
        <PhoneScreen>
          <GraphBar>
            <BarShading />
          </GraphBar>
          <GraphBar />
          <GraphBar />
        </PhoneScreen>
      </Phone>
    </AnimationParentInner>
  </AnimationParent>
);

export default HomePageAnimation;
