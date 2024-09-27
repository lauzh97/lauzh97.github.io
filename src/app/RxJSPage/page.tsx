"use client";

import { Paper } from "@mui/material";
import Image from "next/image";
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
          {countries.map((country, index) => {
            const countryName = country["name"]["common"];
            const countryFlag = country["flags"]["png"];

            return (
              <div className="flex-wrap" key={index}>
                <Paper>
                  <div>{countryName}</div>
                  <div>
                    <Image
                      className="object-scale-down h-20 w-full"
                      width={0}
                      height={0}
                      src={countryFlag}
                      alt={countryName}
                    ></Image>
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
