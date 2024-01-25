export function distanceInMiles(point1: any, point2: any) {

  console.log(point1)
  console.log(point2)
  
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = point1.latitude * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = point2.latitude * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (point2.longitude - point1.longitude) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );

  return d.toFixed(2);;
}

export async function getLocationFromPostcode(postcode: string) {
  const postCodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
  if (postCodeRegex.test(postcode)) {
    const postcodeRes = await fetch(
      `https://api.postcodes.io/postcodes/${postcode}`
    );
    const postcodeData = await postcodeRes.json();

    if (postcodeData.error) {
      return {
        props: {
          error: postcodeData.error,
          currentPostcode: postcode,
        },
      };
    }

    return postcodeData.result;
  }
  return null;
}
