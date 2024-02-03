import FeaturedCard from "./Card";

export default function Featured() {
  return (
    <section className="flex flex-wrap w-full max-sm:items-center max-sm:flex-col justify-start h-fit gap-2 sm:w-2/3">
      <FeaturedCard title="text" description="a" />
      <FeaturedCard title="text" description="a" />
      <FeaturedCard title="text" description="a" />
    </section>
  );
}
