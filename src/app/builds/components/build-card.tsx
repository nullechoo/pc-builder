import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { Pencil } from "lucide-react";
import Link from "next/link";

type BuildCard = {
  user: {
    email: string;
  };
  id: string;
  name: string;
  totalPrice: number;
  createdAt: Date | null;
  components: Array<{
    id: string;
    component: {
      name: string;
    };
  }>;
};

type Props = {
  build: BuildCard;
  children?: React.ReactNode;
};

export function BuildCard({ build, children }: Props) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div className="min-w-0 flex flex-col gap-2 items-start">
          <CardTitle>
            <TypographyH3>{build.name}</TypographyH3>
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Created by: {build?.user?.email?.trim()}
          </p>
        </div>
        <div className="shrink-0">
          <Button>
            <Link href={`/builds/${build.id}`}>
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      {build?.components?.length > 0 && (
        <CardContent className="flex-1 pt-0 space-y-1 gap-2">
          <p className="text-sm font-medium mt-2">Components: </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
            {build.components.map((c) => (
              <li key={c.id}>{c.component.name}</li>
            ))}
          </ul>
        </CardContent>
      )}
      <CardFooter className="flex flex-row justify-between pt-4 border-t">
        <CardDescription className="text-sm font-medium tabular-nums flex gap-2 flex-col justify-between">
          <span className="text-sky-500 text-lg font-bold">
            {new Intl.NumberFormat("ru-RU").format(build.totalPrice)}
          </span>
          {build.createdAt && (
            <p className="text-xs text-muted-foreground">
              {new Intl.DateTimeFormat("ru-RU").format(build.createdAt)}
            </p>
          )}
          <div className="flex flex-row gap-2">{children}</div>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
