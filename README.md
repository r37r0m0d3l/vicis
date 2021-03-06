![Vicis](.github/assets/banner.webp?raw=true "Vicis")

# « Vicis »

Presentation and transformation layer for data output in RESTful APIs.

•• [Vicis Documentation](https://vicis.js.org) •• [JavaScript Repository](https://github.com/vicisjs/vicis) •• [Deno Repository](https://github.com/r37r0m0d3l/deno-vicis) ••

[![npm](https://badgen.net/npm/v/vicis?&icon=npm&label=npm&color=DD3636)](https://www.npmjs.com/package/vicis)
[![downloads](https://badgen.net/npm/dt/vicis?&icon=terminal&label=downloads&color=009688)](https://www.npmjs.com/package/vicis)
[![stars](https://badgen.net/github/stars/vicisjs/vicis?&icon=github&label=stars&color=ffcc33)](https://github.com/vicisjs/vicis)
[![types](https://badgen.net/npm/types/vicis?&icon=typescript&label=types&color=1E90FF)](https://github.com/vicisjs/vicis/blob/master/dist/index.d.ts)
[![build](https://badgen.net/travis/vicisjs/vicis?&label=build)](https://travis-ci.com/vicisjs/vicis)
[![lgtm](https://badgen.net/lgtm/grade/g/vicisjs/vicis?&icon=lgtm&label=lgtm:js/ts&color=00C853)](https://lgtm.com/projects/g/vicisjs/vicis/alerts/)

This is Node.js analogue to these libraries:

-   🐘 [Fractal](https://fractal.thephpleague.com/) for PHP

-   💎 [Roar](https://github.com/trailblazer/roar) for Ruby

-   🍢 [Marshmallow](https://marshmallow.readthedocs.io/en/stable/) for Python

-   ⚡ [FastAPI - Response Model](https://fastapi.tiangolo.com/tutorial/response-model/) for Python FastAPI framework.

---

## 💬 Tl;dr

Code:

```js
import { Vicis } from "vicis";
const configuration = {
  cast: {
    // convert `_id` to integer
    _id: Vicis.INTEGER,
    // convert `registered` to boolean
    registered: Vicis.FLAG,
  },
  nullish: {
    // if not set `confirmed` set to `false`
    confirmed: false,
  },
  exclude: [
    // exclude fields with names like `password`
    /(?:password)/gi, /^(?:_)(?:_)?/,
  ],
  omit: [
    // remove fields that may be personal
    "createdAt", "updatedAt", "deletedAt",
  ],
  rename: {
    // rename `_id` to `id`
    _id: "id",
    // rename `email` to `login`
    email: "login",
  },
  replace: {
    // always replace field value with `null`
    url: null,
  },
  order: [
    // `id` and `login` goes first, then everyone else
    "id", "login",
  ],
};
const model = {
  _id: "54759309034942804",
  email: "johnwick@gmail.com",
  userPassword: "36e80092ff7f1ed72903cda9409b9d2c",
  registered: "1",
  url: "example.com",
  createdAt: "2020-01-01 01:23:45",
  __v: 1
};
const serializer = new Vicis(configuration);
serializer.data(model);
console.log(serializer.getData());
```

Output:

```json
{
  "id": 54759309034942800,
  "login": "johnwick@gmail.com",
  "confirmed": false,
  "registered": true,
  "url": null
}

```

## 🗺️ My other projects

[Full list here](https://r37r0m0d3l.icu/open_source_map)

<img src="https://raw.githubusercontent.com/r37r0m0d3l/r37r0m0d3l/master/osmap.svg" width="960" height="520" style="display:block;height:auto;margin-left:auto;margin-right:auto;min-height:520px;min-width:960px;width:100%;">

<!-- Badges -->

[buymeacoffee-url]: https://buymeacoffee.com/r37r0m0d3l
[buymeacoffee-img]: https://img.shields.io/badge/support-buymeacoffee-1E90FF.svg?&logo=buy-me-a-coffee&label=support
