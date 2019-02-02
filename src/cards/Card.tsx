import React, { Component } from 'react';
import thunderstorm from '../img/weather/thunderstorm.svg';
import heavyRain from '../img/weather/heavy-rain.svg';
import lightRain from '../img/weather/light-rain.svg';
import snow from '../img/weather/snow.svg';
import clear from '../img/weather/clear.svg';
import cloud from '../img/weather/cloud.svg';
import bus from '../img/bus.svg';
import video from '../img/bilibili.svg';
import eating from '../img/eating.svg';

export enum icons {
  thunderstorm,
  heavyRain,
  lightRain,
  snow,
  clear,
  cloud,

  bus,
  video,
  eating,
};

const mapping = {
  [icons.thunderstorm]: thunderstorm,
  [icons.heavyRain]: heavyRain,
  [icons.lightRain]: lightRain,
  [icons.snow]: snow,
  [icons.clear]: clear,
  [icons.cloud]: cloud,

  [icons.bus]: bus,
  [icons.video]: video,
  [icons.eating]: eating,
};

class Card extends Component <{ color: string, icon: icons, title: string, subtitle: string, loading: boolean, link?: string }> {
  render() {
    const {
      color,
      icon,
      title,
      subtitle,
      loading,
      link,
      children,
    } = this.props;
    return (
      <section style={{ backgroundColor: color }}>
        {!loading && (
          <a href={link} target="_blank" className="center">
            {icon && <img className="icon" alt="icon" src={mapping[icon]} />}
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
          </a>
        )}
        {children}
      </section>
    );
  }
}

export default Card;
