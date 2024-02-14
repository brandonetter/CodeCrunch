"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateURL } from "@/lib/utils";
import { usePending } from "@/lib/hooks/usePending";

export default function PaginationComponent({
  promise,
}: {
  promise: Promise<any>;
}) {
  const [pending, data] = usePending(promise);
  const nextPage = data?.nextPage;
  const router = useRouter();
  const params = useSearchParams();
  const currentPage = params.get("page") || 1;

  const setPageUrl = (page: number) =>
    updateURL(params, { page: page.toString() }, router);

  return (
    <section className="absolute top-0 translate-y-1/4 h-fit right-0 flex justify-end gap-2">
      <Button
        className="w-24 h-8  hover:text-black rounded-xl transition-all bg-transparent border-2 border-green-300 text-green-300 duration-500"
        disabled={currentPage == 1 || pending}
        onClick={() => setPageUrl(Number(currentPage) - 1)}
      >
        Previous
      </Button>
      <Button
        className="w-24 h-8 hover:text-black rounded-xl transition-all duration-500  bg-transparent border-2 border-green-300 text-green-300 "
        disabled={!nextPage || pending}
        onClick={() => setPageUrl(Number(currentPage) + 1)}
      >
        Next
      </Button>
    </section>
  );
}
