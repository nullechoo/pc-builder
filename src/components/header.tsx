import { HeaderNav } from "@/components/header-nav";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { auth } from "@/lib/auth";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <header className="container mx-auto flex items-center p-4">
      <div className="shrink-0">
        <TypographyH3>
          <Link href={session?.user ? "/dashboard" : "/"}>PC Builder</Link>
        </TypographyH3>
      </div>
      <nav className="min-w-0 flex-1">
        <HeaderNav session={session} />
      </nav>
    </header>
  );
}
