"use client";

import FromFetchRxJS from "@/utils/fromFetchRxJS";
import { Paper } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

function RxJSPage() {
  const [countries, setCountries] = useState([]);

  const data$ = FromFetchRxJS(
    "https://restcountries.com/v3.1/all?fields=name,flags",
  );

  useEffect(() => {
    const subscriber = data$.subscribe((value) => {
      setCountries(value);
      console.log("test");
    });

    return () => {
      subscriber.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        <div>
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
