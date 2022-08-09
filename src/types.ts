import type {
  AnyRouter,
  inferRouterContext,
  inferRouterError,
  ProcedureType,
  ResponseMeta,
  TRPCError,
} from '@trpc/server';
import { HTTPHeaders } from '@trpc/server/dist/declarations/src/http/internals/types';
import type { TRPCResponse } from '@trpc/server/dist/declarations/src/rpc';

export type RouteParams = Record<string, string>;

export interface RequestContext {
  formData(): Promise<FormData>;
  headers: HTTPHeaders;
  json(): Promise<any>;
  method: string;
  text(): Promise<string>;
  url: string;
}

export interface RequestEvent {
  abort: () => void;
  next: () => Promise<void>;
  params: RouteParams;
  request: RequestContext;
  response: ResponseContext;
  url: URL;
}

export interface ResponseContext {
  readonly headers: Headers;
  readonly redirect: (url: string, status?: number) => void;
  status: number;
}

export type CreateContextFn<TRouter extends AnyRouter> = (
  event: RequestEvent
) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;

export type ResponseMetaFn<TRouter extends AnyRouter> = (opts: {
  data: TRPCResponse<unknown, inferRouterError<TRouter>>[];
  ctx?: inferRouterContext<TRouter>;
  paths?: string[];
  type: ProcedureType | 'unknown';
  errors: TRPCError[];
}) => ResponseMeta;
