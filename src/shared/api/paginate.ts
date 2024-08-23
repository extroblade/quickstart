import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";

export const usePaginate = <T extends unknown = any>(
  cb: () => any,
  config?: { deps?: any[]; initialPage?: number; data?: T[] },
): { page: number; ref: (node?: Element | null) => void } => {
  const deps = config?.deps ?? [];
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(config?.initialPage ?? 1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const { isIntersecting: isInView, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  const dataRef = useRef<T>(null);

  useEffect(() => {
    setPage(1);
    setShouldFetch(true);
    setIsEnd(false);
  }, [JSON.stringify(deps)]);

  useEffect(() => {
    if (isEnd || !shouldFetch) {
      return;
    }

    cb();
    setShouldFetch(false);
  }, [JSON.stringify(deps), shouldFetch, isEnd]);

  useLayoutEffect(() => {
    if (isEnd || !shouldFetch || dataRef?.current) {
      return;
    }
    if (
      // @ts-ignore
      dataRef.current?.length === config?.data?.length &&
      config?.data !== undefined &&
      config?.data !== null
    ) {
      setIsEnd(() => true);
    }
    // @ts-ignore
    dataRef.current = config?.data;
  }, [config?.data?.length, isEnd, shouldFetch]);
  useEffect(() => {
    if (!isInView || isEnd) {
      return;
    }
    setPage((p) => p + 1);
    setShouldFetch(true);
  }, [isInView, isEnd]);
  return { page, ref };
};

export const paginate = <
  TData extends any[] = any[],
  TState extends any[] = any[],
>({
  page,
  data,
  state,
}: {
  page: number;
  data: TData;
  state: TState;
}) => {
  return page && page > 1 ? [...state, ...data] : data;
};

export const apiPaginate = (
  pagination?: PaginateType,
  params?: URLSearchParams,
) => {
  if (pagination && params) {
    params.append("limit", pagination.limit.toString());
    const offset = String((pagination.page - 1) * pagination.limit);
    params.append("offset", offset);
  }
};
export type PaginateType = {
  limit: number;
  page: number;
};
