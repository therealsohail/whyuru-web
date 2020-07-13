import * as contentful from "contentful";
import dotenv from "dotenv";

dotenv.config();

export const client = contentful.createClient({
  space: "avoacs4jbkh9",
  accessToken: "-Af4XMcpNDtMJiEAkhO-gSHwd-y9OpLAp5lvkOQhoR0",
});
