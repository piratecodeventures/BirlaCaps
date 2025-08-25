import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Check if running standalone (no backend available)
    const isStandalone = import.meta.env.VITE_STANDALONE === 'true';
    
    if (isStandalone) {
      // Return mock data for standalone mode
      const { mockDocuments, mockAnnouncements, mockStats, mockGrievances } = await import('./mockData');
      
      const endpoint = queryKey.join("/");
      switch (endpoint) {
        case "/api/documents":
          return mockDocuments as any;
        case "/api/announcements":
          return mockAnnouncements as any;
        case "/api/admin/stats":
          return mockStats as any;
        case "/api/admin/grievances":
          return mockGrievances as any;
        default:
          return [] as any;
      }
    }

    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
