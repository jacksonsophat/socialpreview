import Faqs from "@/_components/Faqs";
import LinkInput from "@/_components/LinkInput";
import { ScanEye } from "lucide-react";


export default async function Home() {
  return (
    <main className="container my-20">
      <h1 className="mb-8 text-3xl text-center flex items-center justify-center font-bold">
        <ScanEye className="mr-2" size={28} /> Social Preview
      </h1>
      <LinkInput />
      <Faqs />
    </main>
  );
}
