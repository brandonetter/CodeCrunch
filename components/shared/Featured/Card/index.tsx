import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "next/image";
import Image from "next/image";
export default function FeaturedCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="select-none shadow-md rounded-lg w-full ">
      <div className="w-full h-[190px] relative bg-indigo-400 rounded-lg"></div>
    </article>
  );
}
