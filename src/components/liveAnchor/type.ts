export interface LiveListItem {
  liveCover: string;
  liveTitle: string;
  broadcastCategory: string | number;
  userId: number | string;
  userName: string;
  roomNumber: number;
  hotK: string;
  hot: string;
}

export interface LiveNotListItem {
  userId: string | number;
  userLogo: string;
  recentLiveTime: string;
  userName: string;
  roomNumber: number;
}
