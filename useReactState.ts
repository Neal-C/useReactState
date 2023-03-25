import {  useRef, useState } from "react";
/**
 * Credits to Yoha-js on tiktok
 * In the future useMemo could be invalidated for performance reasons
 * For production : prefer Dai-shi Kato -> Valtio library
 */

export function useReactState<T extends Record<string, unknown>>(initialValue: T) {
	const [_, setIndex] = useState(0);

	const { current: PROXY } = useRef(
		new Proxy(initialValue, {
			set(obj: Record<string, unknown>, property: string, value: T[keyof T]) {

				obj[property] = value;
				setIndex((i) => i + 1);
				return true;
			},
		})
	);

	return PROXY;
}