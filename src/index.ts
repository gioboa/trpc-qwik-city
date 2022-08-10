import { RequestContext } from '@builder.io/qwik-city';
import type { AnyRouter } from '@trpc/server';
import { resolveHTTPResponse } from '@trpc/server';
import { HTTPHeaders } from '@trpc/server/dist/declarations/src/http/internals/types';

export const resolveTRPCResponse = async <Router extends AnyRouter>({
  request,
  router,
}: {
  request: RequestContext;
  router: Router;
}): Promise<Response> => {
  const { searchParams: query, pathname } = new URL(request.url);

  const createContext = async () => {};
  const path = pathname.replace('api/trpc/', '').replace('/', '');
  const req = {
    method: request.method,
    headers: request.headers as unknown as HTTPHeaders,
    query,
    body: await request.text(),
  };
  const httpResponse = await resolveHTTPResponse({ router, req, path, createContext });

  const { status, headers, body } = httpResponse as {
    status: number;
    headers: Record<string, string>;
    body: string;
  };

  return new Response(body, { status, headers });
};
