import React, { PureComponent } from 'react';
import './App.css';
import Bus from './cards/Bus';
import Weather from './cards/Weather';
import Video from './cards/Video';
import Eating from './cards/Eating';
import { time, getTime } from './utils/helper';

class App extends PureComponent {
  state: { time: time };
  constructor(props: any) {
    super(props);
    this.state = {
      time: getTime(),
    };
  }
  updateTime = () => {
    if (!document.hidden) {
      this.setState({ time: getTime() });
    }
  }
  componentDidMount() {
    document.addEventListener('visibilitychange', this.updateTime, false);
  }
  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.updateTime);
  }
  render() {
    let children: Array<any> = [];
    switch (this.state.time) {
      case time.morning:
        children = [Weather, Bus, Video, Eating];
        break;
      case time.noon:
        children = [Eating, Video, Weather, Bus];
        break;
      case time.afternoon:
        children = [Weather, Video, Eating, Bus];
        break;
      case time.evening:
        children = [Eating, Bus, Video, Weather];
        break;
      case time.night:
        children = [Video, Weather, Bus, Eating];
        break;
    }
    return (
      <main className="app">
        {children.map(child => React.createElement(child, { key: child.name }))}
      </main>
    );
  }
}

export default App;
