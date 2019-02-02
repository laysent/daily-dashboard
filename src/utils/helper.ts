export function isMorning() {
  return (new Date()).getHours() < 12;
}

export function isToday(date: Date) {
  const now = new Date();
  return date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate();
}

export function setIntervalWhenActive(fn: () => void, timespan: number) {
  let previous = 0;
  let id: number | null = null;
  function callback(timestamp: number) {
    if (timestamp - previous >= timespan) {
      fn();
      previous = timestamp;
    }
    id = window.requestAnimationFrame(callback);
  }
  id = window.requestAnimationFrame(callback);
  fn();
  return () => {
    if (id === null) return;
    window.cancelAnimationFrame(id);
    id = null;
  };
}

export enum time {
  morning,
  noon,
  afternoon,
  evening,
  night
};

export function getTime() {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 7) return time.night;
  if (hour < 11) return time.morning;
  if (hour < 14) return time.noon;
  if (hour < 18) return time.afternoon;
  if (hour < 22) return time.evening;
  return time.night;
}

export const iPhone = /iphone/i.test(navigator.userAgent);

interface hasWeight {
  weight: number;
}

/**
 * Weighted Random Sampling (2005;  Efraimidis, Spirakis)
 * [article](http://utopia.duth.gr/~pefraimi/research/data/2007EncOfAlg.pdf)
 * @param array list with all elements containing `weight` attributes - larger value, more likely to pick
 * @param total size of set for sampling
 */
export function weightedSampling<T extends hasWeight>(array: Array<T>, total: number): Array<T> {
  const keys: Array<T & { key: number }> = array.map((element) => {
    const random = Math.random();
    const key = random ** (1 / element.weight);
    return Object.assign({}, element, { key });
  });
  return keys
    .sort((a, b) => {
      if (a.key < b.key) return 1;
      if (a.key > b.key) return -1;
      return 0;
    })
    .slice(0, total);
}
