import { getInfo, getInfos } from "../../../utils/google-sheet";

export async function GET() {
  const infos = await getInfos();
  console.log("api get all ---> ", infos); // debug
  const xxx = await getInfo("parames-pasitprachaja"); // debug
  return new Response(JSON.stringify(infos));
}
