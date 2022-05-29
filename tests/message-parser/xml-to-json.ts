import { parseString } from "xml2js";
import Log from "../../src/utils/Log";

export async function xmlToJson(xml: string): Promise<any> {
  return new Promise((resolve) => {
    parseString(xml, { explicitArray: false }, (err, result) => {
      if (err && Object.keys(err).length !== 0) {
        Log.warn(JSON.stringify(err));
      }
      return resolve(result);
    });
  });
}
