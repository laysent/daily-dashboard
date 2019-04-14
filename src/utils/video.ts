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
  episodeNum: number;
  href: string;
  source: string;
}

async function fetchBilibili() {
  const response = await fetch('https://cors-anywhere.herokuapp.com/http://bangumi.bilibili.com/web_api/timeline_global');
  const json: BilibiliTimelineResponse = await response.json();
  return json;
}

export async function getYoukuDetails(id: number, name: string) : Promise<VideoDetails[]> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const container = document.createElement('div');
    container.style.display = 'none';
    window.youku_callback = (obj) => {
      if (obj.error) {
        return reject(obj);
      }
      const html = obj.html;
      container.innerHTML = html;
      document.body.appendChild(container);

      const videos: Array<VideoDetails> = Array.from(container.querySelectorAll('.p-panels ul li'))
        .map((li) => {
          const link = li.querySelector('a');
          if (!link || !li.firstChild) throw new Error('failed to parse structure');
          const url = new URL(link.href);
          const href = url.origin + url.pathname;
          // const isVIP = !!li.querySelector('.p-icon-vip');
          const episodeNum = li.firstChild.childNodes[0].textContent || '';
          const title = link.textContent || '';
          return {
            date: 0,
            href,
            episode: `#${episodeNum} ${title}`,
            episodeNum: +episodeNum,
            title: name,
            seasonId: id,
            source: 'Youku',
          };
        });

      delete window.youku_callback;
      document.body.removeChild(container);
      document.body.removeChild(script);

      resolve(videos);
    };
    script.src = `https://list.youku.com/show/module?id=${id}&tab=showInfo&callback=youku_callback`;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  });

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
          episodeNum,
          href: `https://m.bilibili.com/bangumi/play/ep${season.ep_id}`,
          source: 'Bilibili',
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