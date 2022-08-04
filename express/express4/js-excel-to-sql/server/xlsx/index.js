const XLSX = require("xlsx");

const parseExcel = async (filePath = "", sheetsName = "", limit) => {
  try {
    console.time(`File time  ${sheetsName + filePath}`);
    const readOpts = {
      //下面2者一定要
      cellText: false,
      cellDates: true,
    };
    const excelData = await XLSX.readFile(filePath, readOpts);
    console.timeEnd(`File time  ${sheetsName + filePath}`);

    if (!excelData.Sheets[sheetsName])
      return {
        err: true,
        sheetsName,
        data: "Not find, please check sheet name or file path",
      };
    const data = sheetToJson(excelData, sheetsName, limit);
    return {
      sheetsName,
      data: data,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

const sheetToJson = (excelData, sheetsName, limit) => {
  //下面2者一定要
  let jsonOpts = {
    raw: false,
    dateNF: "yyyy/mm/dd HH:mm",
  };
  if (limit && typeof limit === "number") {
    const range = XLSX.utils.decode_range(excelData.Sheets[sheetsName]["!ref"]);
    range.s.r = 0;
    range.e.r = limit;
    const new_range = XLSX.utils.encode_range(range);
    jsonOpts.range = new_range;
  }
  return XLSX.utils.sheet_to_json(excelData.Sheets[sheetsName], jsonOpts);
};

module.exports = parseExcel;
