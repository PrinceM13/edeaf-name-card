import { getInfo, getInfos } from "../../../../../utils/google-sheet";

export async function GET(request: Request, context: { params: any }) {
  // get params
  const {
    params: { infoId }
  } = context;
  const info = await getInfo(infoId);
  console.log("api get by id ---> ", info); // debug
  const yyy = await getInfos(); // debug
  return new Response(JSON.stringify(info));
}
