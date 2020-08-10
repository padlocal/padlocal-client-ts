import { Message } from "google-protobuf";

export namespace Utils {
    export function stringifyPB(message: Message) {

        return JSON.stringify(message.toObject(), (key, value) => {
            if (value instanceof Uint8Array) {
                return Buffer.from(value).toString("hex");
            }
            return value;
        });
    }
}