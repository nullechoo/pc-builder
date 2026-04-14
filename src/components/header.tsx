import { HeaderNav } from "@/components/header-nav";
import { auth } from "@/lib/auth";

export async function Header() {
  const session = await auth();

  return (
    <header className="container mx-auto max-w-5xl mt-8 ">
      <HeaderNav session={session} />
    </header>
  );
}
