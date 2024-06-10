import { treaty } from "@elysiajs/eden";
import type { App } from "../../server/src/index";

const client = treaty<App>("localhost:3000");

export { client };
