import {
  DURATION,
  EMAIL,
  FACEBOOK,
  FIRST_NAME,
  INSTAGRAM,
  LAST_NAME,
  LINE_ID,
  MOBILE,
  NICK_NAME,
  TIMESTAMP,
  VIDEO
} from "@/config/constant";
import { googleSheet } from "../config/google";

const range: string = "Form Responses 1!A:K";
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
      [FACEBOOK]: res.data.values[0][8],
      [VIDEO]: res.data.values[0][9],
      [DURATION]: res.data.values[0][10]
    };
  }

  return info;
};

// update info
export const updateInfo = async (infoId: string, body: any) => {
  const ids = await getIds();
  const rowIndex = ids[infoId];
  const googleSheetInstance = await googleSheet();

  await googleSheetInstance.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          updateCells: {
            rows: [
              {
                values: [
                  {
                    userEnteredValue: { stringValue: body[TIMESTAMP] }
                  },
                  {
                    userEnteredValue: { stringValue: body[FIRST_NAME] }
                  },
                  {
                    userEnteredValue: { stringValue: body[LAST_NAME] }
                  },
                  {
                    userEnteredValue: { stringValue: body[NICK_NAME] }
                  },
                  {
                    userEnteredValue: { stringValue: body[EMAIL] }
                  },
                  {
                    userEnteredValue: { stringValue: body[MOBILE] }
                  },
                  {
                    userEnteredValue: { stringValue: body[LINE_ID] }
                  },
                  {
                    userEnteredValue: { stringValue: body[INSTAGRAM] }
                  },
                  {
                    userEnteredValue: { stringValue: body[FACEBOOK] }
                  },
                  {
                    userEnteredValue: { stringValue: body[VIDEO] }
                  },
                  {
                    userEnteredValue: { stringValue: body[DURATION] }
                  }
                ]
              }
            ],
            fields: "userEnteredValue",
            start: { rowIndex, sheetId: 280112067 } // sheetId: 0, columnIndex: 0 <-- use as offset column
          }
        }
      ]
    }
  });
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
