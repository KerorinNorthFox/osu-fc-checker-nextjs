import { BeatmapData, BeatmapLawData, BeatmapStatus } from "./types/external";

export async function fetchBeatmapInfo(
  beatmaps: BeatmapLawData[],
  token: string,
): Promise<BeatmapData[]> {
  console.time("fetchBeatmapInfo");
  let beatmapData: BeatmapData[] = [];
  for (let i = 0; i < beatmaps.length; i++) {
    const beatmap = beatmaps[i];
    let maxCombo = -1;
    let userCombo = -1;
    if (
      beatmap.ranked_status == BeatmapStatus.Ranked ||
      beatmap.ranked_status == BeatmapStatus.Loved ||
      beatmap.ranked_status == BeatmapStatus.Approved ||
      beatmap.ranked_status == BeatmapStatus.Qualified
    ) {
      console.log(
        `Fetch > beatmap ID:${beatmap.beatmap_id} , beatmapset ID:${beatmap.beatmapset_id} , gamemode:${beatmap.mode}`,
      );
      console.time("getMaxCombo");
      maxCombo = await getMaxCombo(beatmap, token);
      console.timeEnd("getMaxCombo");
      console.time("getUserCombo");
      try {
        userCombo = await getUserCombo(beatmap, token, 25394282); // FIXME: ユーザーを入力できるようにする
      } catch (e) {
        userCombo = 0;
      }
      console.timeEnd("getUserCombo");
    }
    beatmapData.push(
      Object.assign(beatmap, { max_combo: maxCombo, user_combo: userCombo }),
    );
  }
  console.timeEnd("fetchBeatmapInfo");
  return beatmapData;
}

async function getMaxCombo(
  beatmap: BeatmapLawData,
  token: string,
): Promise<number> {
  const res = await fetch(
    `/api/osu/beatmaps/${beatmap.beatmap_id}/attributes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: token, mode: beatmap.mode }), // TODO:beatmapから譜面のmodeを渡す
    },
  );
  const data = await res.json();
  return data.attributes.attributes.max_combo;
}

async function getUserCombo(
  beatmap: BeatmapLawData,
  token: string,
  userId: number,
): Promise<number> {
  const res = await fetch(
    `/api/osu/beatmaps/${beatmap.beatmap_id}/scores/users/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: token, mode: beatmap.mode }), // TODO:beatmapから譜面のmodeを渡す
    },
  );
  const data = await res.json();
  return data.score.score.max_combo;
}
