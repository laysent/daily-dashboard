export function isMorning() {
  return (new Date()).getHours() < 12;
}

export function isToday(date: Date) {
  const now = new Date();
  return date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate();
}

export function isIn24Hours(date: Date) {
  const now = new Date();
  return (+now - +date) < 24 * 60 * 60 * 1000;
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
