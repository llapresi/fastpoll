import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import Palette from 'colors';
import { gsap } from 'gsap';

// Bar Graph positions for each keyframe of the home page animation
// Access like:
// animKeyframes[keyframeIndex][barNumber]
const animKeyframes = [
  [0.2, 0.4, 0.2],
  [0.4, 0.53, 0.25],
  [0.36, 0.57, 0.63],
  [0.5, 0.5, 0.5],
];

const AnimationParent = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 24px;

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
  background-color: #${Palette[1].swatches[2].color};
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
  transform: scale(0.5, 1);
`;


const HomePageAnimation = () => {
  const monitorBar1 = useRef(null);
  const monitorBar2 = useRef(null);
  const monitorBar3 = useRef(null);

  const phoneBar1 = useRef(null);
  const phoneBar2 = useRef(null);
  const phoneBar3 = useRef(null);

  const [barsAnimation] = useState(gsap.timeline({ repeat: -1 }));

  useEffect(() => {
    // Iterate our keyframes index to build the animation
    for (let i = 0; i < animKeyframes.length; i += 1) {
      barsAnimation
        .to(monitorBar1.current, 1, { scaleX: animKeyframes[i][0] })
        .to(phoneBar1.current, 1, { scaleX: animKeyframes[i][0] }, '-=1')
        .to(monitorBar2.current, 1, { scaleX: animKeyframes[i][1] }, '-=1')
        .to(phoneBar2.current, 1, { scaleX: animKeyframes[i][1] }, '-=1')
        .to(monitorBar3.current, 1, { scaleX: animKeyframes[i][2] }, '-=1')
        .to(phoneBar3.current, 1, { scaleX: animKeyframes[i][2] }, '-=1');
    }

    return () => {
      barsAnimation.kill();
    };
  }, []);

  return (
    <AnimationParent>
      <AnimationParentInner>
        <Monitor>
          <MonitorScreen>
            <GraphBar>
              <BarShading ref={monitorBar1} />
            </GraphBar>
            <GraphBar>
              <BarShading ref={monitorBar2} />
            </GraphBar>
            <GraphBar>
              <BarShading ref={monitorBar3} />
            </GraphBar>
          </MonitorScreen>
        </Monitor>
        <Phone>
          <PhoneScreen>
            <GraphBar>
              <BarShading ref={phoneBar1} />
            </GraphBar>
            <GraphBar>
              <BarShading ref={phoneBar2} />
            </GraphBar>
            <GraphBar>
              <BarShading ref={phoneBar3} />
            </GraphBar>
          </PhoneScreen>
        </Phone>
      </AnimationParentInner>
    </AnimationParent>
  );
};

export default HomePageAnimation;
