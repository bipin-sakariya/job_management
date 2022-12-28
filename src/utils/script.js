const fs = require('fs');

const { GoogleSpreadsheet } = require('google-spreadsheet');

const secret = require('./onesignalnotificationdem-67428-e9d8fcee7d1d.json');

const doc = new GoogleSpreadsheet(
  '1LpQsYN8c7_l518Fi3XOQXAPWKOPYw1JpkKziZ3PhACk',
);

const init = async () => {
  await doc.useServiceAccountAuth({
    client_email: secret.client_email,
    private_key: secret.private_key,
  });
};

const read = async () => {
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['hebrew'];
  await sheet.loadHeaderRow();
  const colTitles = sheet.headerValues;
  const rows = await sheet.getRows({ limit: sheet.rowCount });
  let result = {};
  rows.map(row => {
    colTitles.slice(1).forEach(title => {
      result[title] = result[title] || [];
      const key = row[colTitles[0]];
      result = {
        ...result,
        [title]: {
          ...result[title],
          [key]: row[title] !== '' ? row[title] : undefined,
        },
      };
    });
  });
  console.log(result);
  return result;
};

const write = data => {
  console.log(data['Hebrew']);
  fs.writeFile(
    `../translations/Hebrew.json`,
    JSON.stringify(data['Hebrew'], null, 2),
    err => {
      if (err) {
        console.error(err);
      }
    },
  );
  // Object.keys(data).forEach(key => {


  // });
};

init()
  .then(() => read())
  .then(data => {

    write(data)
  })
  .catch(err => console.log('ERROR!!!!', err));
