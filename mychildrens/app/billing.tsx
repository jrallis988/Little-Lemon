import { useState } from "react";
import { Switch, View } from "react-native";
import { formatDay, formatMoney } from "@/src/domain/format";
import { selectActivePatient, selectBalanceCents, selectBills } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Card, FamilyHeader, Pill, Screen, T, TextField } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function BillingScreen() {
  const { state, dispatch } = useChart();
  const { t } = useI18n();
  const patient = selectActivePatient(state);
  const [statement, setStatement] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  if (!patient || !state.chart) return <Screen><T>Sign in to view billing.</T></Screen>;
  const bills = selectBills(state, patient);
  const balance = selectBalanceCents(bills);
  const monthly = Math.ceil(balance / 3);

  function payStatement(number: string) {
    const needle = number.trim().toUpperCase();
    const match = state.chart?.children
      .flatMap((child) => child.bills)
      .find((bill) => bill.statementNumber.toUpperCase() === needle);
    if (!match) {
      setNotice(t("statementMissing"));
      return;
    }
    if (state.paidBillIds.includes(match.id) || match.status === "paid") {
      setNotice(t("alreadyPaid"));
      return;
    }
    dispatch({ type: "pay_bill", billId: match.id });
    setNotice(t("paymentRecorded"));
    setStatement("");
  }

  return (
    <Screen>
      <FamilyHeader back kicker={patient.child.preferredName} title={t("billing")} />
      <Card>
        <T variant="label" color={theme.ocean}>{t("balance")}</T>
        <T variant="display">{formatMoney(balance)}</T>
        <T variant="small">{t("devicePayment")}</T>
      </Card>
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <T style={{ flex: 1 }}>{t("paperless")}</T>
          <Switch
            accessibilityLabel={t("paperless")}
            value={state.paperless}
            onValueChange={(enabled) => dispatch({ type: "set_paperless", enabled })}
            trackColor={{ true: theme.ocean, false: theme.line }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Button label={t("planFull")} variant={state.paymentPlan === "full" ? "primary" : "secondary"} onPress={() => dispatch({ type: "set_payment_plan", plan: "full" })} />
          </View>
          <View style={{ flex: 1 }}>
            <Button label={t("planMonthly")} variant={state.paymentPlan === "monthly" ? "primary" : "secondary"} onPress={() => dispatch({ type: "set_payment_plan", plan: "monthly" })} />
          </View>
        </View>
        {state.paymentPlan === "monthly" && balance > 0 ? (
          <T>{t("monthlyShare")} {formatMoney(monthly)}</T>
        ) : null}
      </Card>
      {bills.length === 0 ? <Card><T>{t("billing")}</T></Card> : bills.map((bill) => (
        <Card key={bill.id}>
          <T variant="label" style={{ fontSize: 17 }}>{bill.description}</T>
          <T>{formatMoney(bill.amountCents)}</T>
          <T variant="small">{t("statementNumber")} {bill.statementNumber}</T>
          <T variant="small">{formatDay(bill.serviceDate)}</T>
          <Pill label={bill.status === "paid" ? "Paid" : bill.status === "pending" ? "Pending" : "Due"} tone={bill.status === "paid" ? "ok" : bill.status === "pending" ? "tag" : "danger"} />
          {bill.status === "due" ? (
            <Button label={t("payAccount")} variant="secondary" onPress={() => payStatement(bill.statementNumber)} />
          ) : null}
        </Card>
      ))}
      <Card>
        <T variant="label" style={{ fontSize: 16 }}>{t("payGuest")}</T>
        <TextField label={t("statementNumber")} value={statement} onChangeText={setStatement} autoCapitalize="characters" placeholder="MC-0912" />
        <Button label={t("payGuest")} variant="secondary" onPress={() => payStatement(statement)} />
      </Card>
      {notice ? <Banner tone={notice === t("paymentRecorded") ? "ok" : "warn"} text={notice} /> : null}
    </Screen>
  );
}
