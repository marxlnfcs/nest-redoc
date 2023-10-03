export function joinUrl(...parts: string[]): string {
	return parts.map(p => normalizeUrl(p)).join('/');
}

export function normalizeUrl(url: string): string {
	return url.replace(/^\/+|\/+$/g, '');
}

export function isBuffer<T>(value: T): boolean {
	return Buffer.isBuffer(value);
}

export function isString<T>(value: T): boolean {
	return typeof value === 'string';
}