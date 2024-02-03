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
    <section className="flex justify-end gap-2">
      <Button
        className="w-24 h-8 transition-all duration-500"
        disabled={currentPage == 1 || pending}
        onClick={() => setPageUrl(Number(currentPage) - 1)}
      >
        Previous
      </Button>
      <Button
        className="w-24 h-8 transition-all duration-500"
        disabled={!nextPage || pending}
        onClick={() => setPageUrl(Number(currentPage) + 1)}
      >
        Next
      </Button>
    </section>
  );
}
