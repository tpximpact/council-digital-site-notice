//this class is used to make requests to the open data api
export class OpenDataClient {
  async getOpenDataApplicationsPagination(cmsData: any[]) {
    const limit = 50;
    const arrayToSoqlString = (arr: any[]) =>
      "'" + arr.toString().replace(/,/g, "','") + "'";
    // Fetch the matching data from Camden's API
    const soql = `SELECT * FROM ${process.env.NEXT_PUBLIC_OPEN_DATA_TABLE_NAME} WHERE application_id IN (${arrayToSoqlString(
      cmsData.map((x) => x.application_id),
    )}) LIMIT ${limit}`;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OPEN_DATA_URL}/query?soql=${soql}`,
      {
        headers: {
          "X-App-Token": process.env.NEXT_PUBLIC_OPEN_DATA_APP_TOKEN,
        },
      },
    );
    const data = await response.json();
    return data;
  }
}
