import { TypographyH1 } from "@/components/ui/typography-h1";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getMyBuilds } from "./actions";
import { BuildCard } from "./components/build-card";

export default async function Builds() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const builds = await getMyBuilds(session.user.id);

  return (
    <div className="">
      <div className="flex justify-between mb-8">
        <TypographyH1>My Builds</TypographyH1>
      </div>
      {builds.length > 0 ? (
        <div className="w-full flex flex-col gap-6 ">
          {builds.map((b) => (
            <BuildCard key={b.id} build={b}>
              ...
            </BuildCard>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground">Builds not yet saved</div>
      )}
    </div>
  );
}
