import React, { Component } from 'react';
import './App.css';
import Section, { icons } from './Section';
import getWeatherDetails from './utils/weather';
import getAirDetails from './utils/air';
import getBusDetails, { busType } from './utils/bus';
import umbrella from './img/umbrella.svg';
import mask from './img/mask.svg';

function isMorning() {
  return (new Date()).getHours() <= 10;
}

class App extends Component {
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
    buses: [],
  };
  async getWeather() {
    const details = await getWeatherDetails();

    this.setState({
      weather: {
        loading: false,
        title: isMorning() ? details.temperature.morn : details.temperature.eve + ' ° C',
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
  async getBusDetails() {
    const type = isMorning() ? busType.toCompany : busType.fromCompany;
    const buses = await getBusDetails(type);
    this.setState({
      buses: buses.map(seconds => Math.round(seconds / 60)),
    });
  }
  componentDidMount() {
    this.getWeather();
    this.getAir();
    this.getBusDetails();
  }
  render() {
    const buses = this.state.buses;
    return (
      <main className="app">
        <Section
          className="weather"
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
        </Section>
        <Section
          className="transport"
          title={buses.length > 0 ? `${buses[0]} min` : '-'}
          subtitle={buses.length > 1 ? `${buses.slice(1).map(bus => `${bus} min`).join('/')}` : ''}
          icon={icons.bus}
          loading={false}
        />
      </main>
    );
  }
}

export default App;
