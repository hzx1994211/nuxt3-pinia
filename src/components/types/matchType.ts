export interface IMatchListItem {
  categoryId: number;
  countryId: number;
  currentTime: string;
  followFlag: boolean;
  guestId: number;
  guestLogo: string;
  guestName: string;
  guestRed: number;
  guestScore: number;
  homeId: number;
  homeLogo: string;
  homeName: string;
  homeRed: number;
  homeScore: number;
  leagueId: number;
  leagueName: string;
  lose: number | null;
  matchId: number;
  matchState: number;
  matchTime: string;
  standard: number | null;
  win: number | null;
  isCollect?: boolean;
  countryName?: string;
  isAnimation?: boolean;
}
export interface ICountryItem {
  categoryId?: number;
  countryName?: string;
  leagueMatch?: Array<{ [key: string]: string | number | null }>;
  logo?: string | null;
  playing?: number;
  show?: boolean;
  totalMatch?: number;
  type?: number | string;
  countryId?: number;
}

export interface IMatchLiveItem {
  countryOrCatogoryId?: number;
  countryOrCatogoryName?: string;
  matches?: Array<{ [key: string]: string | number | null }>;
  type?: number;
  leagueId?: number;
  leagueName?: string;
  logo?: string | null;
  id?: number | string;
  item?: any;
  index?: number;
  active?: any;
}
