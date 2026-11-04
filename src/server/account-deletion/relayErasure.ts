import { eq } from "drizzle-orm";
import type { runBatch } from "@/db/runBatch";
import {
  accessibilityFixChecks,
  agencyClientLinks,
  auditEvents,
  ciCheckIgnores,
  ciPreviewHosts,
  ciTokens,
  contentBriefs,
  crawlerCredentials,
  docsSettings,
  experimentDeploymentSignals,
  githubAppInstallations,
  growthEmailPreferences,
  growthExperiments,
  growthNotificationReads,
  growthSchedules,
  measurementRuns,
  monitoredPages,
  opportunities,
  opportunityDecisions,
  opportunityInvestigations,
  opportunityProposals,
  opportunityRuns,
  opportunityTickets,
  organizationBranding,
  performanceLabChecks,
  projectConversionEvents,
  projectPublishingApprovers,
  proposalApprovals,
  proposalDrafts,
  protectionEnrollments,
  protectionScopeChanges,
  publishingConnections,
  revenueConnections,
  spendLedger,
  spendLimits,
  splitTests,
  supportSources,
  verification,
  workSettings,
} from "@/db/schema";
import { expiredAppStates } from "@/server/features/publishing/githubAppState";

type BatchExecutor = Parameters<Parameters<typeof runBatch>[0]>[0];

/**
 * Relay's statements in upstream's erase batch
 * (AccountDeletionRepository.eraseUser). These Relay columns name a user
 * without a foreign key, so nothing cascades to them: in a workspace that
 * stays, they name `to` instead. Rows that only describe the user go.
 */
export function relayErasureStatements(
  tx: BatchExecutor,
  userId: string,
  to: string,
) {
  return [
    tx
      .update(accessibilityFixChecks)
      .set({ checkedBy: to })
      .where(eq(accessibilityFixChecks.checkedBy, userId)),
    tx
      .update(agencyClientLinks)
      .set({ requestedByUserId: to })
      .where(eq(agencyClientLinks.requestedByUserId, userId)),
    tx
      .update(agencyClientLinks)
      .set({ acceptedByUserId: to })
      .where(eq(agencyClientLinks.acceptedByUserId, userId)),
    tx
      .update(agencyClientLinks)
      .set({ endedByUserId: to })
      .where(eq(agencyClientLinks.endedByUserId, userId)),
    tx
      .update(auditEvents)
      .set({ actorId: to })
      .where(eq(auditEvents.actorId, userId)),
    tx
      .update(ciCheckIgnores)
      .set({ createdBy: to })
      .where(eq(ciCheckIgnores.createdBy, userId)),
    tx
      .update(ciPreviewHosts)
      .set({ createdBy: to })
      .where(eq(ciPreviewHosts.createdBy, userId)),
    tx
      .update(ciTokens)
      .set({ createdBy: to })
      .where(eq(ciTokens.createdBy, userId)),
    tx
      .update(contentBriefs)
      .set({ createdBy: to })
      .where(eq(contentBriefs.createdBy, userId)),
    tx
      .update(crawlerCredentials)
      .set({ createdByUserId: to })
      .where(eq(crawlerCredentials.createdByUserId, userId)),
    tx
      .update(docsSettings)
      .set({ updatedBy: to })
      .where(eq(docsSettings.updatedBy, userId)),
    tx
      .update(experimentDeploymentSignals)
      .set({ createdBy: to })
      .where(eq(experimentDeploymentSignals.createdBy, userId)),
    tx
      .update(githubAppInstallations)
      .set({ createdBy: to })
      .where(eq(githubAppInstallations.createdBy, userId)),
    tx
      .update(growthExperiments)
      .set({ createdBy: to })
      .where(eq(growthExperiments.createdBy, userId)),
    tx
      .update(growthExperiments)
      .set({ deploymentConfirmedBy: to })
      .where(eq(growthExperiments.deploymentConfirmedBy, userId)),
    tx
      .update(growthSchedules)
      .set({ ownerUserId: to })
      .where(eq(growthSchedules.ownerUserId, userId)),
    tx
      .update(growthSchedules)
      .set({ updatedBy: to })
      .where(eq(growthSchedules.updatedBy, userId)),
    tx
      .update(measurementRuns)
      .set({ requestedBy: to })
      .where(eq(measurementRuns.requestedBy, userId)),
    tx
      .update(monitoredPages)
      .set({ addedBy: to })
      .where(eq(monitoredPages.addedBy, userId)),
    tx
      .update(monitoredPages)
      .set({ removedBy: to })
      .where(eq(monitoredPages.removedBy, userId)),
    tx
      .update(opportunities)
      .set({ ownerUserId: to })
      .where(eq(opportunities.ownerUserId, userId)),
    tx
      .update(opportunityDecisions)
      .set({ actorUserId: to })
      .where(eq(opportunityDecisions.actorUserId, userId)),
    tx
      .update(opportunityInvestigations)
      .set({ createdBy: to })
      .where(eq(opportunityInvestigations.createdBy, userId)),
    tx
      .update(opportunityProposals)
      .set({ createdBy: to })
      .where(eq(opportunityProposals.createdBy, userId)),
    tx
      .update(opportunityRuns)
      .set({ requestedBy: to })
      .where(eq(opportunityRuns.requestedBy, userId)),
    tx
      .update(opportunityTickets)
      .set({ createdBy: to })
      .where(eq(opportunityTickets.createdBy, userId)),
    tx
      .update(organizationBranding)
      .set({ updatedByUserId: to })
      .where(eq(organizationBranding.updatedByUserId, userId)),
    tx
      .update(performanceLabChecks)
      .set({ ranBy: to })
      .where(eq(performanceLabChecks.ranBy, userId)),
    tx
      .update(projectConversionEvents)
      .set({ createdBy: to })
      .where(eq(projectConversionEvents.createdBy, userId)),
    tx
      .update(projectPublishingApprovers)
      .set({ grantedByUserId: to })
      .where(eq(projectPublishingApprovers.grantedByUserId, userId)),
    tx
      .update(proposalApprovals)
      .set({ actorUserId: to })
      .where(eq(proposalApprovals.actorUserId, userId)),
    tx
      .update(proposalDrafts)
      .set({ createdBy: to })
      .where(eq(proposalDrafts.createdBy, userId)),
    tx
      .update(protectionEnrollments)
      .set({ reviewerUserId: to })
      .where(eq(protectionEnrollments.reviewerUserId, userId)),
    tx
      .update(protectionEnrollments)
      .set({ createdBy: to })
      .where(eq(protectionEnrollments.createdBy, userId)),
    tx
      .update(protectionEnrollments)
      .set({ updatedBy: to })
      .where(eq(protectionEnrollments.updatedBy, userId)),
    tx
      .update(protectionScopeChanges)
      .set({ changedBy: to })
      .where(eq(protectionScopeChanges.changedBy, userId)),
    tx
      .update(publishingConnections)
      .set({ createdBy: to })
      .where(eq(publishingConnections.createdBy, userId)),
    tx
      .update(revenueConnections)
      .set({ createdBy: to })
      .where(eq(revenueConnections.createdBy, userId)),
    tx
      .update(spendLedger)
      .set({ actor: to })
      .where(eq(spendLedger.actor, userId)),
    tx
      .update(spendLimits)
      .set({ updatedBy: to })
      .where(eq(spendLimits.updatedBy, userId)),
    tx
      .update(splitTests)
      .set({ createdBy: to })
      .where(eq(splitTests.createdBy, userId)),
    tx
      .update(supportSources)
      .set({ createdBy: to })
      .where(eq(supportSources.createdBy, userId)),
    tx
      .update(workSettings)
      .set({ updatedBy: to })
      .where(eq(workSettings.updatedBy, userId)),
    tx
      .delete(growthEmailPreferences)
      .where(eq(growthEmailPreferences.userId, userId)),
    tx
      .delete(growthNotificationReads)
      .where(eq(growthNotificationReads.userId, userId)),
    // A GitHub App install state names the user in its value. States last 10
    // minutes and erasure comes 14 days after the request, so theirs expired.
    tx.delete(verification).where(expiredAppStates()),
  ];
}
