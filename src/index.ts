import type { AnyRouter } from '@trpc/server';
import { resolveHTTPResponse } from '@trpc/server';
import { RequestContext } from './types';

export const resolveTRPCResponse = async <Router extends AnyRouter>({
  request,
  params,
  router,
}: {
  request: RequestContext;
  params: Record<string, string>;
  router: Router;
}): Promise<Response> => {
  const { searchParams: query, pathname } = new URL(request.url);

  const createContext = async () => {};
  const path = pathname.replace('api/trpc/', '').replace('/', '');
  const req = {
    method: request.method,
    headers: request.headers,
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
