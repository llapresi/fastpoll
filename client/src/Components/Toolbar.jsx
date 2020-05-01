import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import Palette from 'colors';

const TitlebarBackground = styled.div`
  width: 100%;
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
  padding-top: 17px;

  &:hover {
    border-bottom: 3px solid #${Palette[0].swatches[2].color};
  }

  &.selected {
    border-bottom: 3px solid #${Palette[0].swatches[4].color};
  }
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: #${Palette[1].swatches[4].color};
  padding-left: 6px;
  padding-right: 6px;
  height: 100%;
  vertical-align: center;
  padding-top: 21px;

  &:hover {
    border-bottom: 3px solid #${Palette[0].swatches[2].color};
  }

  &.selected {
    border-bottom: 3px solid #${Palette[0].swatches[4].color};
    color: #${Palette[0].swatches[4].color};
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
