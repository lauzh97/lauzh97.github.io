enum AllowedMethods {
  "post",
  "POST",
  "get",
  "GET",
}
export type Body =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | null
  | undefined;
export type Method = keyof typeof AllowedMethods;
