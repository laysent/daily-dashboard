export enum busType {
  toCompany,
  fromCompany,
};

export default async function getBusDetails(type: busType) {
  const direction = type === busType.toCompany ? 'work' : 'home';
  const now = Date.now();
  const response = await fetch(`https://laysent-daily-transport.now.sh/?direction=${direction}&timestamp=${now}&lat=30.29365&lng=120.16142`);
  const list: Array<number> = await response.json();
  return list;
}
