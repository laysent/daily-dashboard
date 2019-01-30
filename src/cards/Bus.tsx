import React, { PureComponent } from 'react';
import Card, { icons } from './Card';
import getBusDetails, { busType } from '../utils/bus';
import * as helper from '../utils/helper';
import loading from '../img/loading.svg';
import play from '../img/play.svg';
import pause from '../img/pause.svg';
import wallet from '../img/wallet.svg';

const interval = 30 * 1000;

class Bus extends PureComponent {
  state: {
    buses: Array<number>;
    fetching: boolean;
    paused: boolean;
  }
  constructor(props: { }) {
    super(props);
    const time = helper.getTime();
    const catchingBus = time === helper.time.morning || time === helper.time.evening;
    this.state = {
      buses: [],
      fetching: false,
      paused: !catchingBus,
    };
  }
  stop: (() => void) | null = null;
  getBusDetails = async () => {
    const time = helper.getTime();
    if (time === helper.time.night) {
      this.setState({
        buses: [],
        fetching: false,
      });
      return;
    }
    const type = time === helper.time.morning ? busType.toCompany : busType.fromCompany;
    this.setState({
      fetching: true,
    });
    const buses = await getBusDetails(type);
    this.setState({
      buses: buses.map(seconds => Math.round(seconds / 60)),
      fetching: false,
    });
  }
  onStatusChange = () => {
    const paused = !this.state.paused;
    if (paused) {
      if (this.stop !== null) this.stop();
      this.stop = null;
    } else {
      this.stop = helper.setIntervalWhenActive(this.getBusDetails, interval);
    }
    this.setState({
      paused,
    });
  }
  componentDidMount() {
    if (this.state.paused) {
      this.getBusDetails();
    } else {
      this.stop = helper.setIntervalWhenActive(this.getBusDetails, interval);
    }
  }
  componentWillUnmount() {
    if (this.stop !== null) this.stop();
  }
  render() {
    const buses = this.state.buses;
    let title = 'Go Texi';
    if (buses.length > 0) title = `${buses[0]} min`;
    else if (this.state.fetching) title = '-';
    return (
      <Card
        color="#f9d171"
        title={title}
        subtitle={buses.length > 1 ? `${buses.slice(1).map(bus => `${bus} min`).join('/')}` : ''}
        icon={icons.bus}
        loading={false}
      >
        {this.state.fetching ? (
          <img src={loading} alt="fetching" className="small-icon right-top spinning" />
        ) : (
          <button className="icon-button right-top" onClick={this.onStatusChange}>
            <img
              src={this.state.paused ? play : pause}
              alt={this.state.paused ? 'play' : 'pause'}
              className="small-icon"
            />
          </button>
        )}
        {helper.iPhone && <a href="alipayqr://platformapi/startapp?saId=200011235" target="_blank" className="icon-button left-top">
          <img src={wallet} alt="wallet" className="small-icon" />
        </a>}
      </Card>
    );
  }
}

export default Bus;
