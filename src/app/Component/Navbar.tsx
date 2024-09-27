"use client";

import styled from "@emotion/styled";
import { Button } from "@mui/material";

function Navbar() {
  const tabs: { name: string; link: string }[] = [
    { name: "Home", link: "/" },
    { name: "AutoCompletePage", link: "AutoCompletePage" },
    { name: "DatePickerPage", link: "DatePickerPage" },
    { name: "RxJSPage", link: "RxJSPage" },
  ];

  return (
    <>
      <div className="container bg-white max-w-full p-2">
        {tabs.map((tab, index) => {
          return (
            <Button
              variant="text"
              key={index}
              href={tab.link}
              disableRipple
              sx={{ background: "transparent", marginRight: "12px" }}
            >
              {tab.name}
            </Button>
          );
        })}
      </div>
    </>
  );
}

export default Navbar;
