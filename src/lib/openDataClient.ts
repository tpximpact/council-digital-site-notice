//this class is used to make requests to the open data api
export class OpenDataClient {
  async getOpenDataApplications(cmsData: any[]) {
    if (!cmsData || cmsData.length === 0) {
      return [];
    }
    const limit = 50;
    const arrayToSoqlString = (arr: any[]) =>
      "'" + arr.toString().replace(/,/g, "','") + "'";
    const ids = cmsData.map(
      (development: any) => development.applicationNumber,
    );
    const orderQuery = `registered_date DESC, last_uploaded DESC`;
    const whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
    // Fetch the matching data from Camden's API
    const soql = `SELECT * FROM ${process.env.NEXT_PUBLIC_OPEN_DATA_TABLE_NAME} WHERE application_id IN (${arrayToSoqlString(
      cmsData.map((x) => x.application_id),
    )}) LIMIT ${limit}`;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}.json?$limit=${limit}&$where=${whereQuery}&$order=${orderQuery}`,
    );
    const data = await res.json();
    return data;
  }
}
