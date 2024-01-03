export interface ListItem {
  height: number;
  type: number;
  y: number;
  x?: number;
}

export interface BarInfo {
  guestName: string;
  homeName: string;
  listDto: any;
}
export interface ListDtoItem {
  trend: number;
  list: Array<ListDtoSubItem> | null;
}
export interface ListDtoSubItem {
  position: number;
  type: number;
  time: number;
  info?: Array<ListItem>;
}

export interface TimeInfo {
  time: number;
  info?: Array<ListItem>;
}
