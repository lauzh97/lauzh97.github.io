import { Button, Stack } from "@mui/material";

function Navbar() {
  const tabs: { name: string; link: string }[] = [
    { name: "Home", link: "/" },
    { name: "Page A", link: "PageA" },
    { name: "Page B", link: "PageB" },
    { name: "Page C", link: "PageC" },
  ];

  return (
    <>
      <Stack direction="row" spacing={5}>
        {tabs.map((tab, index) => {
          return (
            <Button variant="text" key={index} href={tab.link}>
              {tab.name}
            </Button>
          );
        })}
      </Stack>
    </>
  );
}

export default Navbar;
