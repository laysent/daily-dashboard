import React, { PureComponent } from 'react';
import Sampler from 'random-sampler';
import Card, { icons } from './Card';
import * as helper from '../utils/helper';

function getEating() {
  return import('../config' /* webpackChunkName */).then(config => config.default.eating);
}

class Eating extends PureComponent {
  state: { loading: boolean, eating: Array<{ name: string }> } = {
    loading: true,
    eating: [],
  };
  sampler: Sampler = new Sampler();
  componentDidMount() {
    this.update();
  }
  update = () => {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
    }
    getEating().then((list) => {
      const time = helper.getTime();
      const weekday = (new Date()).getDay();
      const filtered = list.filter((food) => {
        if (typeof food.restrict === 'undefined') return true;
        const restrict = food.restrict;
        if (typeof restrict.day !== 'undefined' && restrict.day.indexOf(weekday) < 0) return false;
        if (typeof restrict.meal !== 'undefined') {
          if (restrict.meal === 'dinner') {
            if (time !== helper.time.evening) return false;
          } else if (restrict.meal === 'lunch') {
            if (time !== helper.time.noon) return false;
          }
        }
        return true;
      });
      this.setState({
        eating: this.sampler.sample(filtered, 5, element => element.weight),
        loading: false,
      });
    });
  }
  render() {
    const [first, ...rest] = this.state.eating;
    return (
      <Card
        color="#cc5c75"
        title={first && first.name}
        subtitle={first && rest.map(food => food.name).join('/')}
        icon={icons.eating}
        loading={this.state.loading}
      />
    )
  }
}

export default Eating;
