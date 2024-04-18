import { Auth } from "osu-web.js";
import HomeScreen from "@/components/screens/HomeScreen";
import OsuTokenProvider from "@/components/stores/OsuTokenProvider";

export default function Home() {
  let token: string = "";
  getToken()
    .then((guestToken) => {
      token = guestToken.access_token;
      console.log("tokenの取得に成功:", token);
    })
    .catch((e) => {
      console.error("tokenの取得に失敗:", e);
      alert("tokenの取得に失敗しました");
    });

  return (
    <OsuTokenProvider token={token}>
      <main>
        <HomeScreen />
      </main>
    </OsuTokenProvider>
  );
}

async function getToken() {
  console.time("getToken");
  const osuClientIdString = process.env.OSU_CLIENT_ID;
  const osuClientSecret = process.env.OSU_CLIENT_SECRET;
  const osuRedirectUrl = process.env.OSU_REDIRECT_URL;

  if (
    typeof osuClientIdString === "undefined" ||
    typeof osuClientSecret === "undefined" ||
    typeof osuRedirectUrl === "undefined"
  ) {
    throw new Error("some env values are undefined.");
  }

  const osuClientId = parseInt(osuClientIdString);
  const auth = new Auth(osuClientId, osuClientSecret, osuRedirectUrl);
  const token = await auth.clientCredentialsGrant();
  console.timeEnd("getToken");
  return token;
}
