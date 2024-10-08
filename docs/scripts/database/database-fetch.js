const SheetID = '1m-q3BGvsdo_PDZa00KS-mgZGeiEHIDWVuQLHOy058N8';

async function fetchSheet(page,pageID) {
  try {
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${SheetID}/gviz/tq?sheet=${pageID}&range=A2:Z`);
    let answer = await response.text();
    let data = JSON.parse(answer.substring(47).slice(0,-2));

    let database = [];
    data.table.rows.forEach(element => {
      let row = [];
      element.c.forEach(rv => {
        row.push(rv ? rv.v : null); 
      });
      database.push(row);
    });

    // console.log(database);
    sessionStorage.setItem(`${page}-DataBase`, JSON.stringify(database));
    return database;

  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
}

function GetSheet(page,pageID) {
  let data = JSON.parse(sessionStorage.getItem(`${page}-DataBase`)) || fetchSheet(page,pageID);
  // let data = fetchSheet(page,pageID);
  return data;
}

export { GetSheet };