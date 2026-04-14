import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import { notFound } from "next/navigation";
import { getPublicBuilds, toggleLikeAction } from "../actions";
import { BuildCard } from "../components/build-card";

export default async function Explore() {
  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  const builds = await getPublicBuilds(session.user.id);

  return (
    <>
      <div className="flex justify-between mb-8">
        <TypographyH1>Public Builds</TypographyH1>
      </div>
      {builds.length > 0 ? (
        <div className="w-full flex flex-col gap-6 md:grid md:grid-cols-2">
          {builds.map((b) => {
            const isLiked = Array.isArray(b.likes) && b.likes.length > 0;

            return (
              <BuildCard key={b.id} build={b}>
                <form action={toggleLikeAction} className="contents">
                  <input type="hidden" name="buildId" value={b.id} />
                  <Button
                    type="submit"
                    variant={isLiked ? "outline" : "secondary"}
                    size="sm"
                  >
                    <ThumbsUp
                      className={cn(
                        "h-4 w-4 mr-1",
                        isLiked ? "fill-current" : ""
                      )}
                    />
                    {b._count.likes}
                  </Button>
                </form>
              </BuildCard>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground">There are no public builds</p>
      )}
    </>
  );
}
