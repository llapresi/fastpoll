/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import Palette from 'colors';
import { HomePageAnimation } from 'Components/HomePage';
import { LinkButton } from 'Components';
import { HomePageCopy } from 'Content';

const HeroBanner = styled.div`
  width: 100%;
  background-color: #${Palette[0].swatches[1].color};
  background: linear-gradient(180deg, #${Palette[0].swatches[1].color} 90%, transparent 90%);

  color: white;
`;

const HeroText = styled.h1`
  text-align: center;
  font-size: 40px;
`;

const MaxWidthCenter = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
`;

const HeroButton = styled(LinkButton)`
  font-weight: 700;
  padding: 1.5rem 2.5rem;
  font-size: 20px;
`;

const HomePage = () => (
  <div css={css`display: flex; flex-direction: column; width: 100%;`}>
    <HeroBanner>
      <MaxWidthCenter>
        <div css={css`display: flex; flex-direction: column;`}>
          <HeroText>The easiest way to create a real-time poll.</HeroText>
          <div css={css`display: flex; width: 100%; justify-content: center;`}>
            <HeroButton
              backgroundColor={`#${Palette[1].swatches[2].color}`}
              hoverColor={`#${Palette[1].swatches[1].color}`}
              textColor={`#${Palette[0].swatches[5].color}`}
              to="/polls"
            >
              See Public Polls
            </HeroButton>
            <HeroButton
              backgroundColor={`#${Palette[2].swatches[2].color}`}
              hoverColor={`#${Palette[2].swatches[1].color}`}
              textColor={`#${Palette[0].swatches[5].color}`}
              to="/new"
            >
              + Create a New Poll
            </HeroButton>
          </div>
        </div>
        <HomePageAnimation />
      </MaxWidthCenter>
    </HeroBanner>
    <MaxWidthCenter>
      <HomePageCopy />
    </MaxWidthCenter>
  </div>
);

export default HomePage;
