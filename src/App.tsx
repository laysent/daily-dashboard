import React, { PureComponent } from 'react';
import './App.css';
import Bus from './cards/Bus';
import Weather from './cards/Weather';
import Video from './cards/Video';
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
        children = [Weather, Bus, Video];
        break;
      case time.noon:
        children = [Video, Weather, Bus];
        break;
      case time.afternoon:
        children = [Weather, Video, Bus];
        break;
      case time.evening:
        children = [Bus, Video, Weather];
        break;
      case time.night:
        children = [Video, Weather, Bus];
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
