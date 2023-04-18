import { getInfos } from "@/utils/google-sheet";

export async function GET(request: Request) {
  const infos = await getInfos();
  return new Response(JSON.stringify(infos));
}
