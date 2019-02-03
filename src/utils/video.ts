interface BilibiliVideo {
  cover: string;
  delay: number;
  ep_id: number;
  favorites: number;
  follow: number;
  is_published: 0 | 1;
  pub_index: string;
  pub_time: string;
  pub_ts: number;
  season_id: number;
  season_status: number;
  square_cover: string;
  title: string;
}

interface BilibiliVideosInDay {
  date: string;
  date_ts: number;
  day_of_week: number;
  is_today: 0 | 1;
  seasons: Array<BilibiliVideo>;
}

interface BilibiliTimelineResponse {
  code: number;
  message: 'success';
  result: Array<BilibiliVideosInDay>;
}

export interface VideoDetails {
  date: number;
  episode: string;
  title: string;
  seasonId: number;
  id: number;
  episodeNum: number;
}

async function fetchBilibili() {
  const response = await fetch('https://cors-anywhere.herokuapp.com/http://bangumi.bilibili.com/web_api/timeline_global');
  const json: BilibiliTimelineResponse = await response.json();
  return json;
}

export async function getBilibiliDetails() {
  const { result } = await fetchBilibili();
  const index = result.findIndex(day => day.is_today === 1);
  const daysUntilToday = result.slice(0, index + 1);
  const daysFromToday = result.slice(index);
  const firstDayWithUnpublishedVideo =
    daysFromToday.find(day => day.seasons.findIndex(season => season.is_published === 0) >= 0);
  const videos: Array<VideoDetails> = daysUntilToday
    .map((day) => day.seasons
      .filter(season => season.is_published === 1)
      .map(season => {
        const episode = season.pub_index;
        const matched = /第([\d.]+)话/.exec(episode);
        let episodeNum = 0;
        if (matched) {
          episodeNum = +matched[1];
        }
        return {
          date: season.pub_ts * 1000,
          episode,
          title: season.title,
          seasonId: season.season_id,
          id: season.ep_id,
          episodeNum,
        };
      })
    )
    .reduce((acc, day) => acc.concat(day), []);
  let nextUpdateTime = 0;
  if (firstDayWithUnpublishedVideo) {
    const first = firstDayWithUnpublishedVideo.seasons.find(season => season.is_published === 0) as BilibiliVideo;
    nextUpdateTime = first.pub_ts * 1000;
  }
  return {
    videos,
    nextUpdateTime,
  };
}