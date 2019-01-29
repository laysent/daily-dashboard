import React, { Component } from 'react';
import thunderstorm from '../img/weather/thunderstorm.svg';
import heavyRain from '../img/weather/heavy-rain.svg';
import lightRain from '../img/weather/light-rain.svg';
import snow from '../img/weather/snow.svg';
import clear from '../img/weather/clear.svg';
import cloud from '../img/weather/cloud.svg';
import bus from '../img/bus.svg';

export enum icons {
  thunderstorm,
  heavyRain,
  lightRain,
  snow,
  clear,
  cloud,

  bus,
};

const mapping = {
  [icons.thunderstorm]: thunderstorm,
  [icons.heavyRain]: heavyRain,
  [icons.lightRain]: lightRain,
  [icons.snow]: snow,
  [icons.clear]: clear,
  [icons.cloud]: cloud,

  [icons.bus]: bus,
};

class Section extends Component <{ className: string, icon: icons, title: string, subtitle: string, loading: boolean }> {
  render() {
    const {
      className,
      icon,
      title,
      subtitle,
      loading,
      children,
    } = this.props;
    return (
      <section className={className}>
        {!loading && (
          <React.Fragment>
            <img className="icon" alt="icon" src={mapping[icon]} />
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
          </React.Fragment>
        )}
        {children}
      </section>
    );
  }
}

export default Section;
