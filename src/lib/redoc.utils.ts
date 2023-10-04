import {Request, Response} from "express";
import {isObject} from "@nestjs/common/utils/shared.utils";
import {HttpServer} from "@nestjs/common";

export type DeepPartial<T> = T extends object ? {
	[P in keyof T]?: DeepPartial<T[P]>;
} : T;

/** @internal */
export function joinUrl(...parts: string[]): string {
	return parts.map(p => normalizeUrl(p)).join('/');
}

/** @internal */
export function normalizeUrl(url: string): string {
	return url.replace(/^\/+|\/+$/g, '');
}

/** @internal */
export function isBuffer<T>(value: T): boolean {
	return Buffer.isBuffer(value);
}

/** @internal */
export function isString<T>(value: T): boolean {
	return typeof value === 'string';
}

/** @internal */
export function deleteKey(obj: any, key: string|string[]): void {
	const keys = (Array.isArray(key) ? key : [key]).filter(k => !!k);
	for(let key of keys){
		try{
			delete obj[key];
		}catch{
			// ignore error
		}
	}
}

/** @internal */
export function sendHttpAsset(adapter: HttpServer, path: string, assetUrlOrBuffer: string|Buffer|object|null, bufferContentType?: string): void {
	return adapter.get(path, async (request: Request, response: Response) => {
		if(isString(assetUrlOrBuffer)){
			response.redirect(301, assetUrlOrBuffer as string);
			return;
		}else if(isBuffer(assetUrlOrBuffer)) {
			response.header('Content-Type', bufferContentType || 'application/octet-stream');
			response.end(assetUrlOrBuffer as Buffer);
			return;
		}else if(isObject(assetUrlOrBuffer)) {
			response.status(200).end(JSON.stringify(assetUrlOrBuffer, null, 2));
			return;
		}else{
			response.status(404).end();
			return;
		}
	});
}