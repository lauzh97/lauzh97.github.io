"use client";

import { Paper } from "@mui/material";
import { useState } from "react";
import { catchError, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

function RxJSPage() {
  const [countries, setCountries] = useState([]);

  const data = fromFetch(
    "https://restcountries.com/v3.1/all?fields=name,flags",
  ).pipe(
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

  data.subscribe({
    next: (result) => setCountries(result),
  });

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="mb-5">
          This page will test on RxJS to fetch a list of countries name and flag
        </div>
        <div className="grid grid-cols-5 gap-5">
          {countries.map((country) => {
            const countryName = country.name.common;
            const countryFlag = country.flags.png;

            return (
              <div className="flex-wrap">
                <Paper>
                  <div>{countryName}</div>
                  <div>
                    <img
                      className="object-scale-down h-20"
                      src={countryFlag}
                    ></img>
                  </div>
                </Paper>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RxJSPage;
