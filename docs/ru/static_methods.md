# Статические Методы

---

## Тест Конфигурации

```js
const config = {
  cast: { _id: Vicis.INTEGER, },
  omit: ["_id"],
  required: ["_id"],
  transform: { _id: (value) => Number.parseInt(value), },
};
try {
  const config = Vicis.testConfig(config);
  // имеет ту же ошибку, что и конструктор
  const serializerFromConstructor = new Vicis(config);
  // или заводской метод
  const serializerFromFactory = Vicis.factory(config);
} catch (aggregateError) {
  console.warn(aggregateError.message); // строка со всеми ошибками
  // Configuration has errors.
  // 1). 'omit' has same keys as 'cast': _id.
  // 2). 'omit' has same keys as 'required': _id.
  // 3). 'omit' has same keys as 'transform': _id.
  // 4). 'cast' has same keys as 'transform': _id.
  aggregateError.errors.forEach((validationError) => {
    console.warn(validationError.message); // одна из ошибок проверки
    // 'omit' has same keys as 'cast': _id.
    // 'omit' has same keys as 'required': _id.
    // 'omit' has same keys as 'transform': _id.
    // 'cast' has same keys as 'transform': _id.
  });
}
```

---

## Сериализация одного объекта

```js
const data = {
  id: 1,
  created_at: "2020-01-01",
};

const config = {
  rename: { created_at: "createdAt" },
};

Vicis.from(data, config);
```

<table><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js
Vicis
  .from(
    {
      id: 1,
      created_at: "2020-01-01"
    },
    {
      rename: { created_at: "createdAt" }
    }
  );
```

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json


{
  "id": 1,
  "createdAt": "2020-01-01"
}



```

</td></tr>
</tbody></table>

## Сериализация коллекции

```js
const collection = [
  { id: 1, created_at: "2020-01-01" },
  { id: 2, created_at: "2020-01-01" },
];

const config = { rename: { created_at: "createdAt" } };

Vicis.fromArray(collection, config);
```

<table width="100%"><thead><tr><td colspan="3">
</td></tr></thead><tbody>
<tr><td>

```js

Vicis.fromArray(
  [
    { id: 1, created_at: "2020-01-01" },
    { id: 2, created_at: "2020-01-01" },
  ],
  { rename: { created_at: "createdAt" } },
);

```

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
[
  {
    "id": 1,
    "createdAt": "2020-01-01"
  },
  {
    "id": 2,
    "createdAt": "2020-01-01"
  }
]
```

</td></tr>
</tbody></table>

---
