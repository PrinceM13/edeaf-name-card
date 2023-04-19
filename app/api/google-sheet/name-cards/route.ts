import { getInfos } from "../../../../utils/google-sheet";

export async function GET() {
  const infos = await getInfos();
  console.log("api get all ---> ", infos);
  return new Response(JSON.stringify(infos));
}