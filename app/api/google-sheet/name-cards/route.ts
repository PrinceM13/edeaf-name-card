import { getInfo, getInfos } from "../../../../utils/google-sheet";

export async function GET() {
  const infos = await getInfos();
  console.log("api get all ---> ", infos);
  const xxx = await getInfo("parames-pasitprachaja");
  return new Response(JSON.stringify(infos));
}
