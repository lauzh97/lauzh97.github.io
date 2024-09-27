"use client";

import { useEffect, useState } from "react";
import { catchError, of, switchMap, take, tap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?field=name,capital,region,population,independent",
      );
      const data = await res.json();
      processData(data);
    }
    fetchCountries();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "capital", headerName: "Capital", width: 200 },
    { field: "region", headerName: "Region", width: 200 },
    { field: "population", headerName: "Population", type: "number" },
    { field: "independent", headerName: "Independent" },
  ];

  function processData(data) {
    const tempCountries = data.map((country, index) => ({
      id: index + 1,
      name: country.name.common,
      capital: country.capital,
      region: country.region,
      population: country.population,
      independent: country.independent ? "Yes" : "No",
    }));

    setCountries(countries.concat(tempCountries));
  }

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="mb-5">
          <>This page will test on Material UI table</>
        </div>
        <div>
          <DataGrid rows={countries} columns={columns}></DataGrid>
        </div>
      </div>
    </>
  );
}

export default Home;
