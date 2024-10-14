import { catchError, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

function FromFetchRxJS(link: string) {
  return fromFetch(link).pipe(
    switchMap((res) => {
      if (res.ok) {
        return res.json();
      }
      return of({ error: true, message: `Error ${res.status}` });
    }),
    catchError((err) => {
      console.error(err);
      return of({ error: true, message: err.message });
    }),
  );
}

export default FromFetchRxJS;
