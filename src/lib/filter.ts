import { BeatmapLawData, CollectionData } from "./types/external";

// 全譜面とコレクションの譜面のMD5をマッチングさせてコレクション内の譜面のidを得る
export function matchEachMd5(
  beatmaps: BeatmapLawData[],
  collection: CollectionData,
): BeatmapLawData[] {
  // md5をキーとしてマッチするmapを作成
  let matchMd5: { [key: string]: BeatmapLawData } = {};
  beatmaps.forEach((item) => {
    matchMd5[item.md5] = item;
  });
  // collectionにある譜面をbeatmapsから抽出;
  let beatmapsInCollection: BeatmapLawData[] = [];
  collection.beatmapsMd5.forEach((item) => {
    if (matchMd5[item]) {
      beatmapsInCollection.push(matchMd5[item]);
    }
  });
  return beatmapsInCollection;
}
