"use client";

import CountryList from "./CountryList";
import { useEffect, useState } from "react";

function AutoCompletePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data = await res.json();
      setCountries(
        data.map(
          (country: { name: { common: string } }) => country.name.common,
        ),
      );
    }
    fetchCountries();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="mb-5">
          This page will test on Material UI Autocomplete/Combo box
        </div>
        <div>
          <CountryList countries={countries} />
        </div>
      </div>
    </>
  );
}

export default AutoCompletePage;
