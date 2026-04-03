import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import Link from "next/link";

export default function Home() {
  return (
    <main className="my-auto flex min-h-full w-full flex-col items-center py-32 px-16">
      <TypographyH1>Create your dream build!</TypographyH1>
      <br />
      <Button>
        <Link href="/dashboard">Create</Link>
      </Button>
    </main>
  );
}
