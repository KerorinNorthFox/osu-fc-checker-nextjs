import { Client } from "osu-web.js";

interface RequestType {
  token: string;
}

export async function POST(
  req: Request,
  { params }: { params: { beatmap: number; user: number } },
) {
  const beatmapId = params.beatmap;
  const userId = params.user;
  const data: RequestType = await req.json();
  const token = data.token;

  try {
    const api = new Client(token);
    const score = await api.beatmaps.getBeatmapUserScore(beatmapId, userId);
    console.log(beatmapId, " のスコア情報の取得に成功しました:", score);
    return Response.json({ success: true, score: score });
  } catch (e) {
    console.log(beatmapId, " のスコア情報の取得に失敗しました:", e);
    return Response.json({ success: false, score: null });
  }
}
