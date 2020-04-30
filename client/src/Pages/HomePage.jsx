/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Palette from 'colors';
import { HomePageAnimation } from 'Components/HomePage';
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

const LinkButton = styled(Link)`
  border-radius: 12px;
  padding: 24px;
  margin: 0 auto;
  display: inline-block;
  background-color: #${Palette[2].swatches[2].color};
  color: #${Palette[0].swatches[5].color};
  font-weight: 700;
  font-size: 24px;
  text-decoration: none;
`;

const MaxWidthCenter = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
`;

const HomePage = () => (
  <div css={css`display: flex; flex-direction: column; width: 100%;`}>
    <HeroBanner>
      <MaxWidthCenter>
        <div css={css`display: flex; flex-direction: column;`}>
          <HeroText>The easiest way to create a real-time poll.</HeroText>
          <LinkButton to="/new">+ Create a New Poll</LinkButton>
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
