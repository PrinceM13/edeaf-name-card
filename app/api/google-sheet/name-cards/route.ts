import { getInfos } from "../../../../utils/google-sheet";

export async function GET() {
  const infos = await getInfos();
  return new Response(JSON.stringify(infos));
}
