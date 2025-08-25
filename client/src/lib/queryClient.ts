import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { clientServices } from './clientServices';

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
  // For client-side operation, handle API requests through client services
  const endpoint = url.replace('/api', '');
  
  try {
    let result;
    
    switch (method.toUpperCase()) {
      case 'GET':
        result = await handleGetRequest(endpoint);
        break;
      case 'POST':
        result = await handlePostRequest(endpoint, data);
        break;
      case 'PATCH':
        result = await handlePatchRequest(endpoint, data);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    
    // Return a mock Response object
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    throw new Error(`API Error: ${error}`);
  }
}

async function handleGetRequest(endpoint: string) {
  switch (endpoint) {
    case '/documents':
      return await clientServices.getDocuments();
    case '/announcements':
      return await clientServices.getAnnouncements();
    case '/admin/stats':
      return await clientServices.getAdminStats();
    case '/admin/grievances':
      return await clientServices.getAdminGrievances();
    case '/policies':
      return await clientServices.getPolicies();
    case '/board-directors':
      return await clientServices.getBoardDirectors();
    case '/promoters':
      return await clientServices.getPromoters();
    default:
      return [];
  }
}

async function handlePostRequest(endpoint: string, data: any) {
  switch (endpoint) {
    case '/grievances':
      return await clientServices.createGrievance(data);
    case '/admin/announcements':
      return await clientServices.createAnnouncement(data);
    default:
      throw new Error(`Unsupported POST endpoint: ${endpoint}`);
  }
}

async function handlePatchRequest(endpoint: string, data: any) {
  const grievanceMatch = endpoint.match(/^\/admin\/grievances\/(.+)$/);
  if (grievanceMatch) {
    const id = grievanceMatch[1];
    return await clientServices.updateGrievance(id, data);
  }
  throw new Error(`Unsupported PATCH endpoint: ${endpoint}`);
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const endpoint = queryKey.join("/").replace('/api', '');
    
    try {
      const result = await handleGetRequest(endpoint);
      return result as any;
    } catch (error) {
      if (unauthorizedBehavior === "returnNull") {
        return null;
      }
      throw error;
    }
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
