
import Vehicle from '../src/classes/vehicle.js';

export default function normalizeData(data) {
  const output = new Vehicle(data).data;

  return output;
}
