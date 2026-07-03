export function getStoreTokenFromRequest(request: Request): string | null {
  return request.headers.get("X-Store-Token");
}

export function storeAdminStorageKey(slug: string): string {
  return `cgc_store_admin_${slug}`;
}

export function saveStoreAdminSession(slug: string, token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(storeAdminStorageKey(slug), token);
}

export function getStoreAdminSession(slug: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(storeAdminStorageKey(slug));
}

export function clearStoreAdminSession(slug: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(storeAdminStorageKey(slug));
}
