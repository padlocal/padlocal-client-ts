import {Host as PBHost} from "../proto/padlocal_pb";

export class Host {
  public host: string;
  public port: number;
  public quality: number;
  public initialQuality: number;

  constructor(host: string, port: number, quality: number) {
    this.host = host;
    this.port = port;
    this.quality = quality;
    this.initialQuality = quality;
  }
}

export class HostResolver {
  /**
   * host is initialized with 5 quality gaps, so that each host will get three times to retry while connect error occurs.
   * To against
   * @param pbHostList
   */
  public static hostListFromPBHost(pbHostList:Array<PBHost>): Array<Host> {
    return pbHostList.map((pbHost, index) => {
      return new Host(pbHost.getHost(), pbHost.getPort(), (pbHostList.length - index) * 5)
    });
  }

  public static adjustHostQuality(host: Host, connectSuccess: boolean) {
    // Increase quality while connecting successfully, or decrease.
    const nextQuality = host.quality + (connectSuccess ? 2 : -2)

    // limit this maximal quality against initialQuality.
    // Or the quality number is too large, it will retry too many times after rotating to other host,
    // while the host is down suddenly after longtime successful service.
    host.quality = Math.min(host.initialQuality + 4, nextQuality);
  }

  /**
   * select host with the highest quality
   * @param hostList
   */
  public static selectBestHostFromList(hostList: Array<Host>): Host {
    let ret = hostList[0];

    for (let i = 1; i < hostList.length; ++i) {
      if (hostList[i].quality > ret.quality) {
        ret = hostList[i];
      }
    }

    return ret;
  }
}
