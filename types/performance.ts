export interface PerformanceWithMeta {
  id: string;
  // createdAt: Date;
  // updatedAt: Date;
  liveId: string;
  title: string | null;
  date: Date;
  venue: string;
  live: {
    id: string;
    title: string;
    communityId: string;
  };
  // status: $Enums.PerformanceStatus;
}
