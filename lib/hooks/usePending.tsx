import { useTransition, useEffect, useState } from "react";

export function usePending(promise: Promise<any>) {
  const [pending, startTransition] = useTransition();
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function fetchData() {
      startTransition(async () => {
        setData(await promise);
      });
    }

    fetchData();
  }, [promise, startTransition]);

  return [pending, data];
}
