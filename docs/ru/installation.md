# Установка

---

```bash
npm install vicis
```

```bash
yarn add vicis
```

---

## TypeScript definitions

```typescript
enum TYPES_ENUM {
  BOOLEAN = "boolean",
  NUMERIC = "numeric", // Только конечные числа
  INTEGER = "integer",
  STRING = "string",
  JSON = "json", // Преобразует в JSON
}
interface IVicisConfig {
  cast: { [prop: string]: TYPES_ENUM };
  defaults: { [prop: string]: any };
  defined: string[];
  exclude: Array<string|RegExp>;
  omit: string[];
  pick: string[];
  sort: boolean;
  rename: { [prop: string]: string };
  replace: { [prop: string]: any };
  required: string[];
  transform: { [prop: string]: Function };
}
```

?> TypeScript definition находиться в npm пакете

---
