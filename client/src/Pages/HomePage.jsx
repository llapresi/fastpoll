/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Palette from 'colors';
import HomePageAnimation from 'Components/HomePage/HomePageAnimation';

const HeroBanner = styled.div`
  width: 100%;
  background-color: #${Palette[0].swatches[1].color};
  color: white;
`;

const HeroText = styled.h1`
  display: inline-block;
  margin: 0 auto;
  font-size: 40px;
`;

const LinkButton = styled(Link)`
  border-radius: 12px;
  padding: 12px;
  margin: 0 auto;
  display: block;
  background-color: #${Palette[0].swatches[0].color};
  color: white;
  font-weight: 700;
  font-size: 24px;
  text-decoration: none;
  flex: 0 1 auto;
  margin-top: 12px;
`;

const HomePage = () => (
  <div css={css`display: flex; flex-direction: column; width: 100%; height: calc(100vh - 60px);`}>
    <HeroBanner>
      <div css={css`
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        padding: 24px;
        height: calc(100vh - 60px);
        flex-direction: column;      
      `}
      >
        <div css={css`display: flex; justify-content: center; flex-direction: column;`}>
          <HeroText>The easiest way to create a real-time poll.</HeroText>
          <LinkButton to="/new">+ Create a New Poll</LinkButton>
        </div>
        <div css={css`flex: 1 1 auto; margin: 12px; margin-top: 36px;`}>
          <div css={css`position:relative; height: 100%; margin: 0 auto;`}>
            <HomePageAnimation />
          </div>
        </div>
      </div>
    </HeroBanner>
  </div>
);

export default HomePage;
