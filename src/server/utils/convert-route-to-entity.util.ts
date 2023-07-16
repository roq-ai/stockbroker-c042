const mapping: Record<string, string> = {
  brokerages: 'brokerage',
  investments: 'investment',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
