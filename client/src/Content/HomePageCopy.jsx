/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import Palette from 'colors';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { DiHeroku } from 'react-icons/di';

const FeatureParagraph = styled.div`
  font-size: 16px;
  flex: 1;
  margin-bottom: 36px;
`;

const FeatureHeader = styled.h2`
  color #${Palette[0].swatches[0].color};
  margin-bottom: 12px;
`;

const IconParent = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: #${Palette[0].swatches[0].color};
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  font-size: 50px;
  margin-right: 24px;
`;

const TechnologyList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex-shrink: 8;
`;

const TechnologyListParent = styled.div`
  display: flex;
`;

const TechnologyHeader = styled.h3`
  color #${Palette[0].swatches[1].color};
`;

const HomePageCopy = () => (
  <>
    <FeatureHeader>Create Polls In A Snap</FeatureHeader>
    <FeatureParagraph>
      <div css={css`position:relative; padding-bottom:calc(46.88% + 44px); margin-bottom: 12px;`}>
        <iframe
          title="Fastpoll voting video"
          src="https://gfycat.com/ifr/illinformedquarterlyiggypops"
          frameBorder="0"
          scrolling="no"
          width="100%"
          height="100%"
          css={css`position:absolute;top:0;left:0;`}
          allowFullScreen
        />
      </div>
      Fastpoll allows you to easily create a poll. Simply set a name, then type in your
      poll&apos;s options and instantly create a live poll.
    </FeatureParagraph>

    <FeatureHeader>See Results As They Come In</FeatureHeader>
    <FeatureParagraph>
      <div css={css`position:relative; padding-bottom:calc(46.88% + 44px); margin-bottom: 12px;`}>
        <iframe
          title="Fastpoll voting video"
          src="https://gfycat.com/ifr/DentalAfraidGermanpinscher"
          frameBorder="0"
          scrolling="no"
          width="100%"
          height="100%"
          css={css`position:absolute;top:0;left:0;`}
          allowFullScreen
        />
      </div>
      Fastpoll uses&nbsp;
      <a href="https://pusher.com/channels">Pusher Channels</a>
      &nbsp;to allow users to see poll results update in realtime as votes are cast.
    </FeatureParagraph>

    <FeatureHeader>Battle-Tested Foundations</FeatureHeader>
    <FeatureParagraph>
      Fastpoll is developed, tested and deployed using industry standard tools.
      <div css={css`display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`}>
        <div>
          <TechnologyHeader>Front-End</TechnologyHeader>
          <TechnologyListParent>
            <IconParent>
              <FaReact />
            </IconParent>
            <TechnologyList>
              <li><strong>React</strong></li>
              <li>React Router</li>
              <li>GSAP</li>
              <li>Emotion.js</li>
            </TechnologyList>
          </TechnologyListParent>
        </div>
        <div>
          <TechnologyHeader>Back-End</TechnologyHeader>
          <TechnologyListParent>
            <IconParent>
              <FaNodeJs />
            </IconParent>
            <TechnologyList>
              <li><strong>Node.js</strong></li>
              <li>Sequelize</li>
              <li>Pusher Channels</li>
              <li>Heroku</li>
            </TechnologyList>
          </TechnologyListParent>
        </div>
        <div>
          <TechnologyHeader>Testing & Deployment</TechnologyHeader>
          <TechnologyListParent>
            <IconParent>
              <DiHeroku />
            </IconParent>
            <TechnologyList>
              <li><strong>Heroku</strong></li>
              <li>Jest</li>
              <li>React Testing Library</li>
              <li>Mocha</li>
              <li>Chai</li>
              <li>Sinon</li>
            </TechnologyList>
          </TechnologyListParent>
        </div>
      </div>
    </FeatureParagraph>
  </>
);

export default HomePageCopy;
