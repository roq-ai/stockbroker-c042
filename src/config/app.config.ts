interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Trader'],
  customerRoles: ['Retail Investor'],
  tenantRoles: ['Trader', 'Analyst'],
  tenantName: 'Brokerage',
  applicationName: 'stockbroker',
  addOns: ['file'],
};
