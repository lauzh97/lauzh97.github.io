"use client";

import ApiService from "@/services/apiServices";
import CountryList from "./CountryList";
import { useEffect, useState } from "react";
import { map } from "rxjs";

interface Country {
  name: {
    common: string;
  };
}

function AutoCompletePage() {
  const [countries, setCountries] = useState([""]);

  useEffect(() => {
    // async function fetchCountries() {
    //   const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
    //   const data = await res.json();
    //   setCountries(
    //     data.map(
    //       (country: { name: { common: string } }) => country.name.common,
    //     ),
    //   );
    // }
    // fetchCountries();

    const subscription = ApiService.get(
      "https://restcountries.com/v3.1/all?fields=name",
    )
      .pipe(
        map((data: Country[]) => {
          return data.map((country) => {
            return country.name.common;
          });
        }),
      )
      .subscribe((data) => {
        setCountries(data);
      });

    return () => {
      subscription.unsubscribe();
      console.log("test unsubscribe: " + subscription.closed);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        <div>This page will test on Material UI Autocomplete/Combo box</div>
        <div>
          <CountryList countries={countries} />
        </div>
      </div>
    </>
  );
}

export default AutoCompletePage;
