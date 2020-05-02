import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import Palette from 'colors';

const TitlebarBackground = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #${Palette[0].swatches[0].color};
  color: white;
  position: fixed;
  z-index: 1;
  top: 0;
`;

const TitlebarParent = styled.nav`
  width: 100%;
  height 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Title = styled(NavLink)`
  position: relative;
  font-size: 24px;
  font-weight: 600;
  color: white;
  text-decoration: none;

  :hover {
    color: rgb(225, 240, 242);
  }
  margin-left: 8px;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
  line-height: 60px;

  &:after {
    content: '';
    position: absolute;
    height: 5px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #${Palette[0].swatches[2].color};
    transform: scaleX(0);
    transition: all ease-out .2s;
  }

  &:hover:after {
    transform: scaleX(1);
  }

  &.selected:after {
    background-color: #${Palette[0].swatches[5].color};
    transform: scaleX(1);
  }
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: #${Palette[1].swatches[4].color};
  padding-left: 6px;
  padding-right: 6px;
  height: 100%;
  vertical-align: center;
  line-height: 60px;
  position: relative;


  &.selected {
    color: #${Palette[0].swatches[4].color};
  }

  &:after {
    content: '';
    position: absolute;
    height: 5px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #${Palette[0].swatches[2].color};
    transform: scaleX(0);
    transition: all ease-out .2s;
  }

  &:hover:after {
    transform: scaleX(1);
  }

  &.selected:after {
    background-color: #${Palette[0].swatches[5].color};
    transform: scaleX(1);
  }
`;


const Titlebar = () => (
  <TitlebarBackground>
    <TitlebarParent>
      <Title exact activeClassName="selected" to="/">Fastpoll</Title>
      <HeaderLink activeClassName="selected" to="/polls">Polls</HeaderLink>
      <HeaderLink activeClassName="selected" to="/new">New Poll</HeaderLink>
    </TitlebarParent>
  </TitlebarBackground>
);

export default Titlebar;
