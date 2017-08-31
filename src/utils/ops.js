// get center of array of longitude and latitude
// hacky approximation...simply take the average longitude and average latitude
// TODO: check how to do this right, a radius would be great too
// so that later i can use that radius to inform my zoom level

// FIXME: Actually stupid...mode should be used
// since many values around london should not shift the center of the map there

export const getCenterGeo = (arrayOfCoordinates) => {
  // the array currently looks like this:
  // [{name: organisationName, coordinates: [Longitude, Latitude]}]
  let length = 0;

  const [longSum, latSum] = arrayOfCoordinates.reduce(
    (currVals, a) => {
      const [currLongSum, currLatSum] = currVals;
      const [long, lat] = a.coordinates;
      length += 1;
      return [currLongSum + parseFloat(long), currLatSum + parseFloat(lat)];
    },
    [0.0, 0.0],
  );

  return [longSum / length, latSum / length];
};

// distance for two geopoints in km
// As seen on https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

const RADIUSEARTH = 6371; // Radius of the earth in km
const deg2rad = deg => deg * (Math.PI / 180);

export const distanceGeo = (lat1, lon1, lat2, lon2) => {
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = RADIUSEARTH * c; // Distance in km
  return d;
};

// faster approxiimation
export const distanceFast = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295; // Math.PI / 180
  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

// not very flexible right now... should be a generic function returning a datapoint and a set of points?
export const getClosestTrust = (location, hospitalData, waitingTimeData) => {
  // distances
  const hospitalDistances = hospitalData.map(value =>
    distanceFast(location[0], location[1], value.Latitude, value.Longitude),
  );
  const [minDistance, minHospitalIdx] = hospitalDistances.reduce(
    (prev, curr, index) => (curr < prev[0] ? [curr, index] : prev),
    [5000.0, 0],
  );
  const closestTrust = hospitalData[minHospitalIdx].ods_code;
  return closestTrust;
};
