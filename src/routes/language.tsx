import { Outlet, createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/language")({
  component: LanguageLayout,
});

function LanguageLayout() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
