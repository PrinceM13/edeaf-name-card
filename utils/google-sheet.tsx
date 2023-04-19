import {
  EMAIL,
  FACEBOOK,
  FIRST_NAME,
  INSTAGRAM,
  LAST_NAME,
  LINE_ID,
  MOBILE,
  NICK_NAME,
  TIMESTAMP
} from "@/config/constant";
import { googleSheet } from "../config/google";

const range: string = "Form Responses 1!A:I";
const spreadsheetId = process.env.SHEET_ID;

interface Ids {
  [key: string]: number;
}

export const getIds = async () => {
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({
    spreadsheetId,
    range: "Form Responses 1!B:C"
  });

  // id by First + Last Name
  let ids: Ids = {};
  if (res.data.values) {
    ids = res.data.values.reduce((acc: { [key: string]: number }, el, idx) => {
      acc[el.join("-").toLocaleLowerCase()] = idx;
      return acc;
    }, {});
  }

  return ids;
};

// array of all infos
export const getInfos = async () => {
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({ spreadsheetId, range });
  const columnName = res.data.values?.shift();
  let infos;
  console.log("getInfos  values ---> ", res.data.values);

  if (columnName) {
    infos = res.data.values?.reduce((acc, el) => {
      let tempObject: Object = {};
      columnName.forEach((title, idx) => {
        tempObject = { ...tempObject, [title]: el[idx] };
      });
      acc.push(tempObject);
      return acc;
    }, []);
  }
  console.log("getInfos  infos ---> ", infos);

  return infos;
};

// single info (specific with infoId)
export const getInfo = async (infoId: string) => {
  const ids = await getIds();
  const rowNumber = 1 + ids[infoId];
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({
    spreadsheetId,
    range: `Form Responses 1!${rowNumber}:${rowNumber}`,
    majorDimension: "ROWS"
  });

  let info;
  if (res.data.values) {
    info = {
      [TIMESTAMP]: res.data.values[0][0],
      [FIRST_NAME]: res.data.values[0][1],
      [LAST_NAME]: res.data.values[0][2],
      [NICK_NAME]: res.data.values[0][3],
      [EMAIL]: res.data.values[0][4],
      [MOBILE]: res.data.values[0][5],
      [LINE_ID]: res.data.values[0][6],
      [INSTAGRAM]: res.data.values[0][7],
      [FACEBOOK]: res.data.values[0][8]
    };
  }
  console.log("getInfo  info ---> ", info);

  return info;
};

// interface DataValue {
//   [key: string]: string;
// }

// const dataValues: DataValue[] =
//   res.data.values?.slice(1).map((row) => ({
//     "First Name": row[0],
//     "Last Name": row[1]
//   })) || [];

// const ids = dataValues.reduce((acc: { [key: string]: number }, el, idx) => {
//   const id = `${el["First Name"].toLocaleLowerCase()}-${el["Last Name"].toLocaleLowerCase()}`;
//   acc[id] = idx + 1;
//   return acc;
// }, {});
