"use client";

import LinearProgressWithLabel from "@/components/LinearProgressWithLabel";
import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { Subject, Subscription, takeUntil } from "rxjs";

interface Bar {
  value: number;
  isStarted: boolean;
  obs?: Subject<number>;
  sub?: Subscription;
}

function ProgressBarPage() {
  const bgProcess: Bar[] = [
    { value: 0, isStarted: false },
    { value: 0, isStarted: false },
    { value: 0, isStarted: false },
  ];
  const [bars, setBars] = useState<Bar[]>(bgProcess);
  const stop$ = new Subject<void>(); // stop flag

  // simulate background update every second
  useEffect(() => {
    const interval = setInterval(() => {
      bgProcess.forEach((process, i) => {
        if (process.isStarted && process.value < 100) {
          process.value++;

          if (bars[i].obs && bars[i].isStarted) {
            bars[i].obs.next(process.value);
          }
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      handleResetAllSub();
    };
  });

  function handleResetAllSub() {
    stop$.next();
    stop$.complete();

    bgProcess.forEach((_, i) => {
      handleResetSub(i);
    });
  }

  function handleStopAllSub() {
    stop$.next();
    stop$.complete();

    bars.forEach((bar) => {
      bar.isStarted = false;
    });
  }

  function handleStartSub(i: number) {
    bgProcess[i].isStarted = true;

    bars[i].obs = new Subject<number>();
    bars[i].sub = bars[i].obs
      .asObservable()
      .pipe(takeUntil(stop$))
      .subscribe((v) => {
        bars[i].value = v;
        setBars([...bars]);
      });
    bars[i].isStarted = true;
  }

  function handleStopSub(i: number) {
    bars[i].sub?.unsubscribe();
    bars[i].isStarted = false;
  }

  function handleResetSub(i: number) {
    if (!bars[i]) return;

    bgProcess[i].isStarted = false;
    bgProcess[i].value = 0;
    bars[i].isStarted = false;
    bars[i].value = 0;
    bars[i].sub?.unsubscribe();
  }

  function handleStatusSub(i: number) {
    console.log("bar [" + i + "]");
    console.log(bgProcess[i]);
    console.log(bars[i]);
  }

  function handleWhatever() {}

  return (
    <div className="grid grid-cols-1 gap-5">
      <div>This page will test on RxJS observable on progress bars</div>
      <div className="flex flex-row gap-5">
        <Button onClick={handleResetAllSub} variant="contained">
          Reset all subscription
        </Button>
        <Button onClick={handleStopAllSub} variant="contained">
          Stop all subscription
        </Button>
        <Button onClick={handleWhatever}>test</Button>
      </div>
      <div className="flex flex-col gap-5">
        {bars.map((bar, i) => {
          return (
            <div className="flex flex-row" key={"bar[" + i + "]"}>
              <div className="basis-2/3">
                <LinearProgressWithLabel value={bar.value} />
              </div>
              <div className="basis-1/3">
                <ButtonGroup>
                  <Button onClick={() => handleStartSub(i)}>Start</Button>
                  <Button onClick={() => handleStopSub(i)}>Stop</Button>
                  <Button onClick={() => handleResetSub(i)}>Reset</Button>
                  <Button onClick={() => handleStatusSub(i)}>Status</Button>
                </ButtonGroup>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBarPage;
