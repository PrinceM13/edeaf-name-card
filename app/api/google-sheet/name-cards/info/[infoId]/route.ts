import { getInfo, updateInfo } from "@/utils/google-sheet";

export async function GET(request: Request, context: { params: any }) {
  // get params
  const {
    params: { infoId }
  } = context;
  const info = await getInfo(infoId);
  return new Response(JSON.stringify(info));
}

export async function PATCH(request: Request, context: { params: any }) {
  // get params
  const {
    params: { infoId }
  } = context;

  // get body
  const body = await request.json();
  const info = await updateInfo(infoId, body);
  return new Response("info updated !");
}
