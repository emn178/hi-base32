export function encode(raw: string|ArrayBuffer|Uint8Array|number[], asciiOnly?: boolean): string;
interface Decoder {
    (b32: string, asciiOnly?: boolean): string;
    asBytes(b32: string):number[];
}
export var decode:Decoder;

