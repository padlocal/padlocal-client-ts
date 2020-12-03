import { InitRequest, InitResponse, ServerInfo } from "../proto/padlocal_pb";
import fs from "fs";
import { GrpcClient } from "../GrpcClient";
import { ServiceError } from "@grpc/grpc-js";

export async function getServerInfo(token: string): Promise<ServerInfo> {
  // embedded server is used to get token info only

  const endpoint = process.env.PADLOCAL_ENDPOINT || "gateway.pad-local.com:31527";
  const caFilePath = process.env.PADLOCAL_CA_FILE_PATH;

  let ca;
  if (caFilePath) {
    ca = fs.readFileSync(caFilePath);
  } else {
    ca = Buffer.from(
      "-----BEGIN CERTIFICATE-----\n" +
        "MIIDUzCCAjugAwIBAgIJAKZ9GQ5Ss4jZMA0GCSqGSIb3DQEBCwUAMFgxCzAJBgNV\n" +
        "BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX\n" +
        "aWRnaXRzIFB0eSBMdGQxETAPBgNVBAMMCHBhZGxvY2FsMB4XDTIwMDkxNTE1MzE1\n" +
        "NFoXDTMwMDkxMzE1MzE1NFowWDELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUt\n" +
        "U3RhdGUxITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDERMA8GA1UE\n" +
        "AwwIcGFkbG9jYWwwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCaVWRz\n" +
        "RXmZoQFKKluWbdO3js+k/hhIRYaFqXVC6E7vEr98Zz50fviQZMoCV980sJ4DFBFA\n" +
        "zYAqCH20LBaUyPqM+4xPegCvRbwkXFXhZEnO0UOXFPrR//VuxqPWN8TMto8bZVaC\n" +
        "uxsBfzAd1GSB6399ccB5Ay6eQxyFAY1fMK6Ev575S+oGPiZBJUfeXKxl/yCKiMkE\n" +
        "FOjL5uTk9qPBDwkwyP7Mxdf5r0bMkWS+MxChLrOcXSYwyihiVLMetaeErlbywHfJ\n" +
        "THbEkjhQZugoYBEsm1VfLg985J46jvcKHirwlxCCLbfxKcfIHZejcwP9iJOgCzrg\n" +
        "MmTbs5Y004hhbr4zAgMBAAGjIDAeMAwGA1UdEwQFMAMBAf8wDgYDVR0PAQH/BAQD\n" +
        "AgIEMA0GCSqGSIb3DQEBCwUAA4IBAQAbRNJktSmyiP7GZ3UY1qKcbrxj4bee6Wik\n" +
        "2ZjZV5jKeroLn2B+fN/8RQvbVZE0uN0GntEVMU/haBSjdvxubIrvVxUvYO+ZpmSb\n" +
        "Q2+LHuHRSOWJKxNQqif5KfuTzqoFge4DHgyhXy7778xgWZWBOK9FcoLgkHEYLGbv\n" +
        "nKoOx8RkmzdM+Tuzdyr/7x01GimL4gc8EAa5ilZz1Wu0SeoEf6uxYhBk6uipdnnc\n" +
        "jjXQZD9EL3AeKLfyb0mtj3WpOdgbFg7Gd0RevtuRsRlfjma3GKnagDmtB9oqObrg\n" +
        "RoscsMdI6uk/BF+J2lm7grtHJRn4fm0mL4wI7ynFMs0+D4LvOuXU\n" +
        "-----END CERTIFICATE-----\n"
    );
  }

  const grpcClient = new GrpcClient(endpoint, undefined, ca);

  const initRequest = new InitRequest();
  initRequest.setToken(token);

  return new Promise((resolve, reject) => {
    grpcClient.stub.init(
      initRequest,
      grpcClient.newRequestMeta(),
      grpcClient.newRequestOptions(),
      (error: ServiceError | null, response: InitResponse) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.getServerinfo());
        }
      }
    );
  });
}
