import { PadLocalClient } from "./PadLocalClient";

export abstract class PadLocalClientPlugin {
    protected client: PadLocalClient;

    constructor(client: PadLocalClient) {
        this.client = client;
    }
}