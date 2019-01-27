interface Air {
  aqi: number;
  attributions: Array<{
    url: string;
    name: string;
  }>;
  city: {
    geo: [number, number];
    name: string;
    url: string;
  };
  debug: {
    sync: string;
  };
  dominentpol: string;
  iaqi: {
    co: { v: number };
    no2: { v: number };
    o3: { v: number };
    pm10: { v: number };
    pm25: { v: number };
    so2: { v: number };
    w: { v: number };
  };
  idx: number;
  time: {
    v: number;
  };
}

interface AirResponse {
  status: 'ok';
  data: Air;
}

export default async function getAirDetails() {
  // http://aqicn.org/city/zhejiang/hangzhoushi/chaohuiwuqu/ to get @722
  const url = 'https://api.waqi.info/feed/@722/?token=877232d674043e76c5ea9037b8772e1aa4dbd702';
  const response = await fetch(url);
  const json: AirResponse = await response.json();
  return json.data;
}
