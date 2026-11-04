import { useState } from "react";
import { AuditDetail } from "../AuditDetail";
import { ProjectResearchTarget } from "@/client/components/ProjectResearchTarget";
import { ConfirmDialog } from "@/client/components/ConfirmDialog";
import { PageHeader } from "@/client/components/PageHeader";
import { AuditHistorySection } from "@/client/features/audit/launch/AuditHistorySection";
import { LaunchFormCard } from "@/client/features/audit/launch/LaunchFormCard";
import { useLaunchController } from "@/client/features/audit/launch/useLaunchController";
import { useHostedPlanGate } from "@/client/features/billing/HostedPlanGate";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import {
  RENDERING_COST_NOTE,
  renderingCostText,
} from "@/shared/audit-rendering";

type LaunchViewProps = {
  projectId: string;
  initialUrl: string;
  showHistory: boolean;
  onShowHistory: () => void;
  onAuditStarted: (auditId: string) => void;
};

export function LaunchView({
  projectId,
  initialUrl,
  showHistory,
  onShowHistory,
  onAuditStarted,
}: LaunchViewProps) {
  // The plan only sets the page limit, so the form stays usable while the
  // plan loads. The server enforces the limit regardless.
  const isFreePlan = useHostedPlanGate() === "free";
  const controller = useLaunchController({
    projectId,
    initialUrl,
    isFreePlan,
    onAuditStarted,
  });

  const [tab, setTab] = useState<"issues" | "pages" | "performance">("issues");
  const latest = controller.historyQuery.data?.find(
    (audit) => audit.status === "completed",
  );
  if (latest && !initialUrl && !showHistory) {
    return (
      <AuditDetail
        projectId={projectId}
        auditId={latest.id}
        tab={tab}
        onTabChange={setTab}
        onBack={onShowHistory}
      />
    );
  }

  return (
    <div className="page-pad overflow-auto">
      <div className="mx-auto max-w-7xl space-y-4">
        <PageHeader title="Site Audit" />

        <AuditHistorySection
          projectId={projectId}
          historyQuery={controller.historyQuery}
          onDelete={controller.deleteAudit}
        />
        <details
          key={controller.historyQuery.data?.length ? "returning" : "new"}
          open={
            controller.historyQuery.isSuccess &&
            controller.historyQuery.data.length === 0
          }
          className="rounded-xl border p-4"
        >
          <summary className="cursor-pointer font-medium">
            Start a new audit
          </summary>
          <div className="mt-4 space-y-4">
            <ProjectResearchTarget
              projectId={projectId}
              onSelect={(domain) =>
                controller.launchForm.setFieldValue(
                  "url",
                  domain ? `https://${domain}` : "",
                )
              }
            />
            <LaunchFormCard
              launchForm={controller.launchForm}
              commitMaxPagesInput={controller.commitMaxPagesInput}
              maxPagesLimit={controller.maxPagesLimit}
              canRenderJavaScript={controller.canRenderJavaScript}
              outOfCredits={controller.outOfCredits}
            />
          </div>
        </details>

        {controller.largeCrawlPages != null ? (
          <LargeCrawlDialog
            pages={controller.largeCrawlPages}
            renderJavaScript={controller.renderJavaScript}
            onConfirm={controller.confirmLargeCrawl}
            onClose={controller.cancelLargeCrawl}
          />
        ) : null}
      </div>
    </div>
  );
}

function LargeCrawlDialog({
  pages,
  renderJavaScript,
  onConfirm,
  onClose,
}: {
  pages: number;
  renderJavaScript: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const pageCount = pages.toLocaleString();
  // Only hosted plans pay for rendering, so only they see a price.
  const priced = renderJavaScript && isHostedClientAuthMode();
  return (
    <ConfirmDialog
      title={
        priced ? `Render up to ${pageCount} pages?` : "Start a large audit?"
      }
      confirmLabel={priced ? "Start audit" : "Continue"}
      onConfirm={onConfirm}
      onClose={onClose}
    >
      {priced ? (
        <>
          {RENDERING_COST_NOTE} Rendered audits can take longer than regular
          audits.
          <span className="mt-3 block font-semibold text-foreground">
            {renderingCostText(pages)}
          </span>
        </>
      ) : (
        `You are about to crawl ${pageCount} pages. This is okay, but it may take a while. Continue?`
      )}
    </ConfirmDialog>
  );
}
