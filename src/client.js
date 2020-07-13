import * as contentful from "contentful";
import dotenv from "dotenv";

dotenv.config();

export const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});
