import { Consono } from "consono/es";
import Vicis from "./vicis.mjs";

const consono = Consono.factory(null, "light");
const data = {
  id: "1234",
  ok: undefined,
  hidden: "",
  domain: "main",
  date: "2017-10-15",
};
const config = {};

try {
  const response = Vicis.factory()
    .config(config)
    .sort(true)
    .cast({ id: "integer" })
    .defaults({ ok: true })
    .defined(["id"])
    .omit(["hidden"])
    .pick(["id", "ok"])
    .rename({ id: "ID" })
    .replace({ domain: "secondary" })
    .required(["id"])
    .transform({
      date: (value) => new Date(value),
    })
    .data(data);
  consono(response.toJSON());
} catch (error) {
  console.error(error.message);
}
