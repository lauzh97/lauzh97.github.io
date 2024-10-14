"use client";

import { useEffect, useState } from "react";
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

    function processData(data: any) {
      const tempCountries = data.map((country: any, index: any) => ({
        id: index + 1,
        name: country.name.common,
        capital: country.capital,
        region: country.region,
        population: country.population,
        independent: country.independent ? "Yes" : "No",
      }));

      setCountries(countries.concat(tempCountries));
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

  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        <div>
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
