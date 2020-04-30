/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Palette from 'colors';
import HomePageAnimation from 'Components/HomePage/HomePageAnimation';

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

const FeatureParagraph = styled.p`
  display: block;
  font-size: 16px;
  flex: 1;
  margin-bottom: 36px;
`;

const FeatureHeader = styled.h2`
  color #${Palette[0].swatches[0].color};
  margin-bottom: 12px;
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
      </FeatureParagraph>
    </MaxWidthCenter>
  </div>
);

export default HomePage;
