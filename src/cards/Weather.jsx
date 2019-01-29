import React, { PureComponent } from 'react';
import Card from './Card';
import { icons } from './Section';
import umbrella from '../img/umbrella.svg';
import mask from '../img/mask.svg';
import getWeatherDetails from '../utils/weather';
import getAirDetails from '../utils/air';
import * as helper from '../utils/helper';

class Weather extends PureComponent {
  state = {
    weather: {
      loading: true,
      title: '',
      subtitle: '',
      rainy: false,
      icon: icons.clear,
    },
    air: {
      loading: true,
      aqi: 0,
    },
  };
  async getWeather() {
    const details = await getWeatherDetails();

    this.setState({
      weather: {
        loading: false,
        title: helper.isMorning() ? details.temperature.morn : details.temperature.eve + ' ° C',
        subtitle: `${details.temperature.night} ~ ${details.temperature.day}  ° C`,
        rainy: details.rainy,
        icon: details.icon,
      },
    });
  }
  async getAir() {
    const details = await getAirDetails();
    this.setState({
      air: {
        loading: false,
        aqi: details.aqi,
      },
    });
  }
  componentDidMount() {
    this.getWeather();
    this.getAir();
  }
  render() {
    return (
      <Card
        color="#38c9ba"
        {...this.state.weather}
      >
        {this.state.weather.rainy && (
          <img src={umbrella} alt="bring umbrella" className="small-icon left-bottom" />
        )}
        {!this.state.air.loading && (
          <div className="right-bottom">
            {Array.from({ length: Math.floor(this.state.air.aqi / 50) }).map((_, i) => (
              <img src={mask} alt="air condition icon" className="small-icon" key={i} />
            ))}
          </div>
        )}
      </Card>
    );
  }
}

export default Weather;
