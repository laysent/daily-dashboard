import React, { PureComponent } from 'react';
import Card, { icons } from './Card';
import { getBilibiliDetails, VideoDetails, getYoukuDetails } from '../utils/video';
import * as helper from '../utils/helper';
import left from '../img/left.svg';
import right from '../img/right.svg';
import check from '../img/check.svg';

function getWatchList() {
  return import('../config'/* webpackChunkName: 'config' */).then(config => config.default.videos);
}

async function getBilibiliUnwatched(playlist: { id: number }[]) {
  const cachedDetails: {
    nextUpdateTime: number;
    videos: Array<VideoDetails>;
  } = JSON.parse(localStorage.getItem('bilibili-videos') || '{"nextUpdateTime":0,"videos":[]}');
  const shouldUpdate = cachedDetails.nextUpdateTime < Date.now();
  const details = await (shouldUpdate ? getBilibiliDetails() : Promise.resolve(cachedDetails));
  const { videos } = details;
  if (shouldUpdate) {
    localStorage.setItem('bilibili-videos', JSON.stringify(details));
  }
  const watched = JSON.parse(localStorage.getItem('bilibili') || '{}');
  const unwatched = videos
  .filter((video) => {
    const season = video.seasonId;
    return playlist.some(video => video.id === season);
  })
  .filter((video) => {
    const season = video.seasonId;
    const lastWatchedEpisode = watched[season] || 0;
    return lastWatchedEpisode < video.episodeNum;
  });

  return unwatched;
}

async function getYoukuUnwatched(playlist: { id: number, name: string }[]) {
  const videos = await Promise.all(playlist.map(({ id, name }) => getYoukuDetails(id, name)));
  const watched = JSON.parse(localStorage.getItem('youku') || '{}');
  return videos
    .map((videoList, i) => {
      const { id } = playlist[i];
      const lastWatchedEpisode = watched[id] || 0;
      return videoList.filter(video => video.episodeNum > lastWatchedEpisode);
    })
    .reduce((prev, curr) => prev.concat(curr), []);
}

class Video extends PureComponent {
  state: { watchList: Array<VideoDetails>, index: number } = {
    watchList: [],
    index: 0,
  }
  async getPendingWatchList() {
    const playlist = await getWatchList();
    const unwatched = (await Promise.all([
      getBilibiliUnwatched(playlist.filter(video => video.source === 'bilibili')),
      getYoukuUnwatched(playlist.filter(video => video.source === 'youku')),
    ]))
    .reduce((prev, curr) => prev.concat(curr), [])
    .sort((videoA, videoB) => {
      const isVideoAToday = helper.isIn24Hours(new Date(videoA.date));
      const isVideoBToday = helper.isIn24Hours(new Date(videoB.date));
      if (isVideoAToday && !isVideoBToday) return -1;
      if (!isVideoAToday && isVideoBToday) return 1;
      const videoAIndex = playlist.findIndex(video => video.id === videoA.seasonId);
      const videoBIndex = playlist.findIndex(video => video.id === videoB.seasonId);
      if (videoAIndex < videoBIndex) return -1;
      if (videoAIndex > videoBIndex) return 1;
      return videoA.episodeNum > videoB.episodeNum ? 1 : -1;
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
    const video = this.state.watchList[this.state.index];
    const source = video.source.toLowerCase();
    const watched: any = JSON.parse(localStorage.getItem(source) || '{}');
    watched[video.seasonId] = video.episodeNum;
    localStorage.setItem(source, JSON.stringify(watched));
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
        title={hasUnwatched ? video.source : '-'}
        subtitle={hasUnwatched ? video.title : ''}
        icon={icons.video}
        loading={false}
        link={hasUnwatched ? video.href : undefined}
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
