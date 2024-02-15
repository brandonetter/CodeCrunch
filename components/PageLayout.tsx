import React from "react";

const type2 = (children: React.ReactNode) => (
  <section className="flex max-sm:flex-col gap-2">{children}</section>
);

const type1 = (children: React.ReactNode) => (
  <section className="flex flex-col gap-2">{children}</section>
);
export default function PageLayout({
  type,
  children,
}: {
  type: number;
  children: React.ReactNode;
}) {
  return (
    <main className="mt-10 sm:w-5/6 mx-auto max-sm:mx-2 max-w-[1480px]">
      {type === 2 && type2(children)}
      {type === 1 && type1(children)}
    </main>
  );
}
