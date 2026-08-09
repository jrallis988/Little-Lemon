"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { REWARDS } from "@/lib/data/catalog";
import { formatPoints } from "@/lib/pharmacy";
import { DEMO_ACCOUNT, useAuth } from "@/lib/store/auth";
import { useOrders } from "@/lib/store/orders";
import { useSelectedStore } from "@/lib/store/store-selection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  const { user, signIn, signOut, register } = useAuth();
  const { orders } = useOrders();
  const { store } = useSelectedStore();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState(DEMO_ACCOUNT.email);
  const [password, setPassword] = useState(DEMO_ACCOUNT.password);
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSignIn(event: FormEvent) {
    event.preventDefault();
    const result = signIn(email, password);
    setError(result.ok ? null : result.error);
  }

  function handleRegister(event: FormEvent) {
    event.preventDefault();
    const result = register(displayName, email, password);
    setError(result.ok ? null : result.error);
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to view orders, rewards, and saved pickup store.
        </p>

        <Tabs
          value={mode}
          onValueChange={(value) => {
            setMode(value as "signin" | "register");
            setError(null);
          }}
          className="mt-8"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="register">Create account</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-6">
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Demo: {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}
              </p>
              {error ? (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}
              <Button
                type="submit"
                className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                Sign in
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register" className="mt-6">
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input
                  id="reg-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </div>
              {error ? (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}
              <Button
                type="submit"
                className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                Create account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Hi, {user.displayName}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Member {user.memberId} · {user.email}
          </p>
        </div>
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5">
          <h2 className="font-display text-lg font-semibold">myWalgreens</h2>
          <p className="mt-2 text-2xl font-semibold text-brand">
            {formatPoints(REWARDS.pointsBalance)} pts
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {REWARDS.pointsToNextReward} points to your next reward
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-surface-elevated/90 p-5">
          <h2 className="font-display text-lg font-semibold">Pickup store</h2>
          <p className="mt-2 text-sm font-medium">{store.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {store.hoursSummary}
          </p>
          <Button
            className="mt-4"
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href="/stores" />}
          >
            Change store
          </Button>
        </div>
      </section>

      <section aria-labelledby="recent-orders-heading">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="recent-orders-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            Recent orders
          </h2>
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/account/orders" />}>
            View all
          </Button>
        </div>
        {orders.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            No orders yet.{" "}
            <Link href="/shop" className="text-brand underline-offset-2 hover:underline">
              Start shopping
            </Link>
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {orders.slice(0, 3).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 py-4 text-sm">
                <div>
                  <p className="font-medium">#{order.id}</p>
                  <p className="text-muted-foreground">
                    {new Date(order.placedAt).toLocaleDateString()} ·{" "}
                    {order.itemCount} items
                  </p>
                </div>
                <p className="font-semibold">
                  ${order.total.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          nativeButton={false}
          render={<Link href="/pharmacy" />}
        >
          Pharmacy dashboard
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/help" />}>
          Help center
        </Button>
      </div>
    </div>
  );
}
