import { Client } from "osu-web.js";

interface RequestType {
  token: string;
}

export async function POST(
  req: Request,
  { params }: { params: { beatmap: number } },
) {
  const beatmapId = params.beatmap;
  const data: RequestType = await req.json();
  const token = data.token;

  try {
    const api = new Client(token);
    const attributes = await api.beatmaps.getBeatmapAttributes(
      beatmapId,
      "osu",
    );
    console.log(beatmapId, " の譜面情報の取得に成功しました: ", attributes);
    return Response.json({ success: true, attributes: attributes });
  } catch (e) {
    console.error(beatmapId, " の譜面情報の取得に失敗しました :", e);
    return Response.json({ success: false, attributes: null });
  }
}
