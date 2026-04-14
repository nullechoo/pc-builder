"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTabValue } from "@/lib/utils";
import { LayoutList, Plus, Users } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TypographyH3 } from "./ui/typography-h3";

type Props = {
  session: Session | null;
};

export function HeaderNav({ session }: Props) {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);

  if (!session?.user) {
    return (
      <div className="flex justify-end">
        <Button variant="secondary">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <nav className="flex md:items-center py-4 md:flex-row flex-col items-start justify-between gap-4">
      <TypographyH3>
        <Link href={session?.user ? "/dashboard" : "/"}>PC Builder</Link>
      </TypographyH3>
      <div className="flex justify-center">
        <Tabs value={tabValue} className="w-fit">
          <TabsList>
            <TabsTrigger value="dashboard" asChild>
              <Link href="/dashboard">
                <Plus className="w-4 h-4" />
                Create build
              </Link>
            </TabsTrigger>
            <TabsTrigger value="builds" asChild>
              <Link href="/builds">
                <LayoutList className="w-4 h-4" />
                My builds
              </Link>
            </TabsTrigger>
            <TabsTrigger value="explore" asChild>
              <Link href="/builds/explore">
                <Users className="w-4 h-4" />
                Public builds
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => signOut({ redirectTo: "/" })}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
