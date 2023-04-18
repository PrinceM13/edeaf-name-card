import { googleSheet } from "../config/google";

const range: string = "Form Responses 1!A:I";
const spreadsheetId = process.env.SHEET_ID;

export const getIds = async () => {
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({
    spreadsheetId,
    range: "notes!A:A",
    majorDimension: "COLUMNS"
  });

  let ids;
  if (res.data.values) {
    ids = res.data.values[0].reduce((acc, el, idx) => {
      acc[el] = idx;
      return acc;
    }, {});
  }

  return ids;
};

// array of all notes
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
