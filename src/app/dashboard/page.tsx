import { CurrentBuild } from "./components/current-build";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="min-w-0 flex-1 ">
        <CurrentBuild />
      </div>
      <div className="shrink-0 lg:sticky lg:top-6 lg:w-64">Popular</div>
    </div>
  );
}
