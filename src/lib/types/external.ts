// osu!.dbから読み込まれた譜面
export interface BeatmapLawData {
  osu_file_name: string;
  beatmap_id: number;
  beatmapset_id: number;
  md5: string;
  ranked_status: number;
  mode: number;
}

export interface BeatmapData extends BeatmapLawData {
  user_combo: number;
  max_combo: number;
}

// collection.dbから読み込まれたコレクション
export interface CollectionData {
  name: string;
  beatmapsCount: number;
  beatmapsMd5: string[];
}

// osu!.dbのデータ
export interface OsuDB {
  username: string;
  beatmaps_count: string;
  beatmaps: BeatmapLawData[];
}

// collection.dbのデータ
export interface OsuCollectionDB {
  collectionscount: number;
  collection: CollectionData[];
}

export enum BeatmapStatus {
  Unknown,
  Unsubmitted,
  Graveyard,
  Unused,
  Ranked,
  Approved,
  Qualified,
  Loved,
}
