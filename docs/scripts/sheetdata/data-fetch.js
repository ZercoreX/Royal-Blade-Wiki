const SheetID = '1m-q3BGvsdo_PDZa00KS-mgZGeiEHIDWVuQLHOy058N8';

async function fetchSheet(pageID) {
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
    sessionStorage.setItem(`${pageID}-DataBase`, JSON.stringify(database));
    return JSON.parse(sessionStorage.getItem(`${pageID}-DataBase`));

  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
}

async function GetSheet(pageIDs) {
  const entries = await Promise.all(
    pageIDs.map(async pageID => [
      pageID,
      JSON.parse(sessionStorage.getItem(`${pageID}-DataBase`)) || await fetchSheet(pageID)
      // await fetchSheet(pageID)
    ])
  );

  return Object.fromEntries(entries);
}

export { GetSheet };