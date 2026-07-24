"use client";

import * as React from "react";
import Link from "next/link";
import { Ban, BellOff, Flag, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { MessageThread } from "@/components/messaging/MessageThread";
import { ReportDialog } from "@/components/safety/ReportDialog";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import { profileByUserId, profilesByUserId, useMockStore } from "@/lib/mock/social";
import type { Message, Profile, ReportTargetType } from "@/lib/types";

type ReportTarget = {
  targetType: ReportTargetType;
  targetId: string;
};

export default function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = React.use(params);
  return (
    <RequireAuth>
      <AuthenticatedShell>
        <ConversationContent conversationId={conversationId} />
      </AuthenticatedShell>
    </RequireAuth>
  );
}

function ConversationContent({ conversationId }: { conversationId: string }) {
  const { user, profile } = useAuth();
  const state = useMockStore();
  const router = useRouter();
  const [notice, setNotice] = React.useState<string | null>(null);
  const [reportTarget, setReportTarget] = React.useState<ReportTarget | null>(null);

  const conversation = state.conversations.find((item) => item.id === conversationId);

  React.useEffect(() => {
    if (!user) return;
    const unreadIds = state.notifications
      .filter(
        (notification) =>
          notification.userId === user.id &&
          !notification.read &&
          notification.href === `/messages/${conversationId}`
      )
      .map((notification) => notification.id);
    if (unreadIds.length) {
      mockApi.markNotificationsRead(user.id, unreadIds);
    }
  }, [conversationId, state.notifications, user]);

  if (!user || !profile) return null;

  if (!conversation || !conversation.memberIds.includes(user.id)) {
    return (
      <ErrorState
        title="Conversation unavailable"
        message="This message thread does not exist or you are not a member."
      />
    );
  }

  const messages = state.messages.filter(
    (message) => message.conversationId === conversation.id
  );
  const participants = profilesByUserId(state.profiles);
  const others = conversation.memberIds
    .filter((id) => id !== user.id)
    .map((id) => profileByUserId(state.profiles, id))
    .filter((item): item is Profile => Boolean(item));
  const primaryOther = others[0];

  const openReport = (targetType: ReportTargetType, targetId: string) => {
    setReportTarget({ targetType, targetId });
  };

  const blockOther = () => {
    if (!primaryOther) return;
    mockApi.blockUser(user.id, primaryOther.userId);
    setNotice(`${primaryOther.displayName} was blocked.`);
    router.push("/messages");
  };

  const muteOther = () => {
    if (!primaryOther) return;
    mockApi.muteUser(primaryOther.userId);
    setNotice(`${primaryOther.displayName} was muted.`);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        <Link href="/messages" className="inline-flex items-center gap-2 text-sm font-bold">
          <Inbox className="h-4 w-4" aria-hidden />
          Back to inbox
        </Link>
        {notice ? (
          <div className="rounded-card border border-brand/30 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark">
            {notice}
          </div>
        ) : null}
        <MessageThread
          conversation={conversation}
          messages={messages}
          participants={participants}
          currentUser={profile}
          onSendMessage={(body) => {
            mockApi.sendMessage(conversation.id, user.id, body);
          }}
          onReportMessage={(message) => openReport("message", message.id)}
          onDeleteMessage={(message: Message) =>
            mockApi.deleteMessage(message.id, user.id)
          }
        />
      </div>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Thread members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(others.length ? others : [profile]).map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar
                  name={member.displayName}
                  src={member.avatarUrl}
                  size="sm"
                  online={member.onlineStatus === "online"}
                  showOnlineIndicator={member.showOnlineStatus}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy-900">
                    {member.displayName}
                  </p>
                  <p className="truncate text-xs text-navy-500">@{member.username}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {primaryOther ? (
              <>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={muteOther}
                  disabled={state.mutedIds.includes(primaryOther.userId)}
                >
                  <BellOff className="h-4 w-4" aria-hidden />
                  {state.mutedIds.includes(primaryOther.userId) ? "Muted" : "Mute"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => openReport("profile", primaryOther.id)}
                >
                  <Flag className="h-4 w-4" aria-hidden />
                  Report member
                </Button>
                <Button variant="danger" className="w-full" onClick={blockOther}>
                  <Ban className="h-4 w-4" aria-hidden />
                  Block member
                </Button>
              </>
            ) : (
              <Badge>Saved notes</Badge>
            )}
          </CardContent>
        </Card>
      </aside>

      <ReportDialog
        open={Boolean(reportTarget)}
        targetType={reportTarget?.targetType ?? "message"}
        targetId={reportTarget?.targetId ?? conversation.id}
        onClose={() => setReportTarget(null)}
        onSubmit={(payload) => {
          mockApi.reportContent({ reporterId: user.id, ...payload });
          setNotice("Thanks. Your report was submitted for review.");
        }}
      />
    </div>
  );
}
