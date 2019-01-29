import React, { PureComponent } from 'react';
import Card, { icons } from './Card';
import getBusDetails, { busType } from '../utils/bus';
import * as helper from '../utils/helper';

class Bus extends PureComponent {
  state = {
    buses: [],
    loading: true,
  }
  stop: (() => void) | null = null;
  getBusDetails = async () => {
    const time = helper.getTime();
    if (time === helper.time.night) {
      this.setState({
        buses: [],
        loading: false,
      });
      return;
    }
    const type = time === helper.time.morning ? busType.toCompany : busType.fromCompany;
    const buses = await getBusDetails(type);
    this.setState({
      buses: buses.map(seconds => Math.round(seconds / 60)),
      loading: false,
    });
  }
  componentDidMount() {
    this.stop = helper.setIntervalWhenActive(this.getBusDetails, 30 * 1000);
  }
  componentWillUnmount() {
    if (this.stop !== null) this.stop();
  }
  render() {
    const buses = this.state.buses;
    let title = 'Go Texi';
    if (buses.length > 0) title = `${buses[0]} min`;
    else if (this.state.loading) title = '-';
    return (
      <Card
        color="#f9d171"
        title={title}
        subtitle={buses.length > 1 ? `${buses.slice(1).map(bus => `${bus} min`).join('/')}` : ''}
        icon={icons.bus}
        loading={false}
      />
    );
  }
}

export default Bus;
