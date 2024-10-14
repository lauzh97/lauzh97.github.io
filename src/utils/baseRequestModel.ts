import { Method, Body } from "./apiTypes";
import { Observable } from "rxjs";

class BaseRequestModel {
  constructor(
    private url: string,
    private method: Method,
    private headers: Headers,
    private body?: Body,
  ) {
    this.url = url;
    this.method = method || "GET";
    this.headers = headers || {};
    this.body = body;
  }

  request(): Observable<any> {
    return new Observable((observer) => {
      fetch(`${this.url}`, {
        method: this.method,
        headers: this.headers,
        body: this.body,
      })
        .then((r: any) => {
          return r.json();
        })
        .then((data: any) => {
          observer.next(data);
          observer.complete();
        })
        .catch((e: any) => {
          observer.error(e);
        });
      return () => {
        // clean up on unsubscribe
      };
    });
  }
}

export default BaseRequestModel;
