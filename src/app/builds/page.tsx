import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { redirect } from "next/navigation";
import {
  deleteBuildAction,
  getMyBuilds,
  setBuildPublicAction,
} from "./actions";
import { BuildCard } from "./components/build-card";
import { DeleteBuildButton } from "./components/delete-build-button";

export default async function Builds() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const builds = await getMyBuilds(session.user.id);

  return (
    <>
      <div className="flex justify-between mb-8">
        <TypographyH1>My Builds</TypographyH1>
      </div>
      {builds.length > 0 ? (
        <div className="w-full flex flex-col gap-6 md:grid md:grid-cols-2">
          {builds.map((b) => (
            <BuildCard key={b.id} build={b}>
              <DeleteBuildButton
                buildId={b.id}
                deleteAction={deleteBuildAction}
              />
              <form action={setBuildPublicAction} className="contents">
                <input type="hidden" name="buildId" value={b.id} />
                <input
                  type="hidden"
                  name="isPublic"
                  value={b.isPublic ? "false" : "true"}
                />
                <Button
                  type="submit"
                  variant={b.isPublic ? "default" : "ghost"}
                >
                  <Share2
                    className={cn(
                      "h-4 w-4 mr-1",
                      b.isPublic ? "fill-background" : ""
                    )}
                  />
                </Button>
              </form>
            </BuildCard>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground">Builds not yet saved</div>
      )}
    </>
  );
}
