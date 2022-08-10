<p align="center">
  <img style="padding: 0 30px 0 0" src="https://raw.githubusercontent.com/trpc/trpc/main/www/static/img/logo-text.svg" alt="tRPC" width="80"/>
  <img style="padding: 15px 0 5px 0" src="https://camo.githubusercontent.com/3518364b161ab1351455c0f3774d01973e25602a4b63a3e9129c21deddb2f223/68747470733a2f2f63646e2e6275696c6465722e696f2f6170692f76312f696d6167652f617373657473253246594a494762346930316a7677305352644c3542742532463636376162366332323833643463346438373866623930383361616363313066" alt="qwik-city" width="200"/>
</p>
<h1 align="center">tRPC 🤝 Qwik City</h1>

<p align="center">
  End-to-end typesafe APIs made easy with<br />
  <a href="https://trpc.io">tRPC.io</a> in <a href="https://qwik.builder.io/qwikcity/overview">Qwik City</a> applications.
  <br />
  Build & consume fully typesafe APIs, without schemas or code generation.
</p>
<br />

## Working example: [tRPC Qwik City](https://github.com/gioboa/trpc-qwik-city-example)

<br />

## Getting started

<br />

### Install `trpc-qwik-city` package

<br />

```ts
npm install trpc-qwik-city
```

or

```ts
yarn add trpc-qwik-city
```

<br />

### Create tRPC [routes](https://trpc.io/docs/router)<br /><br />

e.g.

```ts
// src/server/trpc/index.ts

import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import trpcTransformer from 'trpc-transformer';
import authors from './authors';

export const createContext = async () => ({});

export const router = trpc
  .router<inferAsyncReturnType<typeof createContext>>()
  .transformer(trpcTransformer)
  .merge('authors:', authors);

export type Router = typeof router;
```

<br />

### Expose tRPC Api

<br />

```ts
// src/routes/api/trpc/[whatever]/index.ts

import type { EndpointHandler } from '@builder.io/qwik-city';
import { resolveTRPCResponse } from 'trpc-qwik-city';
import { createContext, router } from '../../../../server/trpc';

// GET manage queries
export const onGet: EndpointHandler = async ({ request, params }) => {
  const response = await resolveTRPCResponse({
    request,
    params,
    router,
    createContext,
  });
  const json = await response.json();
  return json;
};

// POST manage mutations
export const onPost: EndpointHandler = async ({ request, params }) => {
  const response = await resolveTRPCResponse({
    request,
    params,
    router,
    createContext,
  });
  const json = await response.json();
  return json;
};
```

<br />

### Use tRPC inside component

<br />

e.g.

```ts
import trpc from '~/client/trpc';
...
...
const authors = await trpc(fetch.bind(window)).query('authors:list');
```

## License

The [ISC License](https://github.com/gioboa/trpc-qwik-city/blob/main/LICENSE).
