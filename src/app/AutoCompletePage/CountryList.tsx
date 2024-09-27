"use client";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

function CountryList({ countries }) {
  const [selectedCountry, setSelectedCountry] = useState([]);

  function handleChange(event: any, value: any) {
    setSelectedCountry(value);
  }

  return (
    <>
      <div className="grid grid-cols-2 items-center">
        <div>
          <Autocomplete
            multiple
            onChange={handleChange}
            options={countries}
            renderInput={(params) => (
              <TextField {...params} label="Countries" />
            )}
          />
        </div>
        {selectedCountry.length == 0 ? (
          <div className="ml-5">No chosen country</div>
        ) : (
          <div className="ml-5">Chosen value: {selectedCountry.join(", ")}</div>
        )}
      </div>
    </>
  );
}

export default CountryList;
