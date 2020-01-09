import { Consono } from "consono/es";
import { cast, defaults, defined, omit, pick, rename, replace, required, transform } from "./vicis.mjs";

const consono = Consono.factory(null, "light");

const data = {
  id: "1234",
  ok: undefined,
  hidden: "",
  domain: "main",
  date: "2017-10-15",
};

let res = null;

res = omit(data, ["ok"]);
res = required(data, ["id"]);
res = defined(data, ["id"]);
res = defaults(data, { ok: true });
res = pick(data, ["date", "domain", "id", "ok"]);
res = replace(data, { domain: "secondary" });
res = transform(data, { date: (value) => new Date(value) });
res = cast(data, { id: "integer" });
res = rename(data, { id: "ID" });

consono(res);
