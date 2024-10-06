"use client";

import LinearProgressWithLabel from "@/components/LinearProgressWithLabel";
import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { BehaviorSubject, map, Observable } from "rxjs";

function ProgressBarPage() {
  const [progress, setProgress] = useState(0);
  const [progressBarValue, setProgressBarValue] = useState(0);

  const progress$ = new BehaviorSubject<number>(0);
  const roundedProgress$ = progress$.pipe(
    map((value) => {
      return Math.floor(value / 10) * 10;
    }),
  );
  progress$.next(progress);

  // simulate progress
  useEffect(() => {
    setTimeout(() => {
      setProgress((p) => {
        if (p < 100) return p + 1;
        return p;
      });
    }, 100);
  });

  useEffect(() => {
    const sub = roundedProgress$.subscribe(setProgressBarValue);

    return () => {
      sub.unsubscribe();
      console.log("subscription closed? " + sub.closed);
    };
  });

  function handleReset() {
    setProgress(0);
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="col-span-2 mb-5">
          <>This page will test on Material UI Progress Bar with RxJS</>
        </div>
        <div>
          <LinearProgressWithLabel value={progressBarValue} />
        </div>
        <div className="ml-5">
          <ButtonGroup>
            <Button onClick={handleReset}>Reset</Button>
          </ButtonGroup>
        </div>
        <div>background progress value: {progress}</div>
      </div>
    </>
  );
}

export default ProgressBarPage;
