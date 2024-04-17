import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
const OsuDBParser = require("osu-db-parser");

interface RequestType {
  dbType: string;
  data: number[];
}

export async function POST(req: Request) {
  try {
    const data: RequestType = await req.json();
    const osuDBBuffer = new Uint8Array(data.data).buffer;

    if (data.dbType == "collection") {
      const parser = new OsuDBParser(null, osuDBBuffer);
      const osuCollectionData: OsuCollectionDB = parser.getCollectionData();
      console.log(">>collection.db is loaded!");
      return Response.json({ success: true, data: osuCollectionData });
    } else if (data.dbType == "osu") {
      const parser = new OsuDBParser(osuDBBuffer);
      const osuData: OsuDB = parser.getOsuDBData();
      console.log(">>osu!.db is loaded!");
      return Response.json({ success: true, data: osuData });
    }
  } catch (e) {
    console.log("Error has occurred ->", e);
    return Response.json({ success: false, data: null });
  }
}
