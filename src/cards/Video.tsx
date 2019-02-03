import React, { PureComponent } from 'react';
import Card, { icons } from './Card';
import { getBilibiliDetails, VideoDetails } from '../utils/video';
import * as helper from '../utils/helper';
import left from '../img/left.svg';
import right from '../img/right.svg';
import check from '../img/check.svg';

function getWatchList() {
  return import('../config'/* webpackChunkName: 'config' */).then(config => config.default.video);
}

class Video extends PureComponent {
  state: { watchList: Array<VideoDetails>, index: number } = {
    watchList: [],
    index: 0,
  }
  async getPendingWatchList() {
    const cachedDetails: {
      nextUpdateTime: number;
      videos: Array<VideoDetails>;
    } = JSON.parse(localStorage.getItem('bilibili-videos') || '{"nextUpdateTime":0,"videos":[]}');
    const shouldUpdate = cachedDetails.nextUpdateTime < Date.now();
    const [playlist, details] = await Promise.all([
      getWatchList(),
      shouldUpdate ? getBilibiliDetails() : Promise.resolve(cachedDetails),
    ]);
    const { videos } = details;
    if (shouldUpdate) {
      localStorage.setItem('bilibili-videos', JSON.stringify(details));
    }
    const watched = JSON.parse(localStorage.getItem('bilibili') || '{}');
    const unwatched = videos
    .filter((video) => {
      const season = video.seasonId;
      return playlist.bilibili.indexOf(season) >= 0;
    })
    .filter((video) => {
      const season = video.seasonId;
      const lastWatchedEpisode = watched[season] || 0;
      return lastWatchedEpisode < video.episodeNum;
    })
    .sort((videoA, videoB) => {
      const isVideoAToday = helper.isToday(new Date(videoA.date));
      const isVideoBToday = helper.isToday(new Date(videoB.date));
      if (isVideoAToday && !isVideoBToday) return -1;
      if (!isVideoAToday && isVideoBToday) return 1;
      const videoAIndex = playlist.bilibili.indexOf(videoA.seasonId);
      const videoBIndex = playlist.bilibili.indexOf(videoB.seasonId);
      if (videoAIndex < videoBIndex) return -1;
      if (videoAIndex > videoBIndex) return 1;
      return videoA.episode > videoB.episode ? 1 : -1;
    });

    this.setState({ watchList: unwatched, index: 0 });
  }
  onNext = () => {
    this.setState({
      index: this.state.index + 1,
    });
  }
  onPrevious = () => {
    this.setState({
      index: this.state.index - 1,
    });
  }
  onWatched = () => {
    const watched: any = JSON.parse(localStorage.getItem('bilibili') || '{}');
    const video = this.state.watchList[this.state.index];
    watched[video.seasonId] = video.episodeNum;
    localStorage.setItem('bilibili', JSON.stringify(watched));
    this.getPendingWatchList();
  }
  componentDidMount() {
    this.getPendingWatchList(); 
  }
  render() {
    const video = this.state.watchList[this.state.index];
    const hasUnwatched = !!video;
    const hasPrevious = this.state.index > 0;
    const hasNext = this.state.index < this.state.watchList.length - 1;
    return (
      <Card
        color="#6994e3"
        title={hasUnwatched ? 'Bilibili' : '-'}
        subtitle={hasUnwatched ? video.title : ''}
        icon={icons.video}
        loading={false}
        link={hasUnwatched ? `https://m.bilibili.com/bangumi/play/ep${video.id}` : undefined}
      >
        {hasPrevious && (
          <button className="icon-button left-top" onClick={this.onPrevious}>
            <img src={left} alt="previous" className="small-icon" />
          </button>
        )}
        {hasNext && (
          <button className="icon-button right-top" onClick={this.onNext}>
            <img src={right} alt="next" className="small-icon" />
          </button>
        )}
        <button className="icon-button left-bottom" onClick={this.onWatched}>
          <img src={check} alt="set watched" className="small-icon" />
        </button>
        <span className="right-bottom">{hasUnwatched ? video.episode : ''}</span>
      </Card>
    );
  }
}

export default Video;
