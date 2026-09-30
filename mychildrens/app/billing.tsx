import { formatDay, formatMoney } from "@/src/domain/format";
import { selectActivePatient, selectBalanceCents, selectBills } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Button, Card, FamilyHeader, Pill, Screen, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function BillingScreen() {
  const { state, dispatch } = useChart();
  const patient = selectActivePatient(state);
  if (!patient) return <Screen><T>Sign in to view billing.</T></Screen>;
  const bills = selectBills(state, patient);
  const balance = selectBalanceCents(bills);
  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title="Billing" />
      <Card>
        <T variant="label" color={theme.tealDark}>Balance</T>
        <T variant="display">{formatMoney(balance)}</T>
        <T variant="small">Recording a payment updates this device only. It does not charge a card or pay the health system.</T>
      </Card>
      {bills.length === 0 ? <Card><T>No statements are on file.</T></Card> : bills.map((bill) => (
        <Card key={bill.id}>
          <T variant="label" style={{ fontSize: 17 }}>{bill.description}</T>
          <T>{formatMoney(bill.amountCents)}</T>
          <T variant="small">{formatDay(bill.serviceDate)}</T>
          <Pill label={bill.status === "paid" ? "Paid" : bill.status === "pending" ? "Pending" : "Due"} tone={bill.status === "paid" ? "ok" : "warn"} />
          {bill.status === "due" ? (
            <Button label="Record demo payment" variant="secondary" onPress={() => dispatch({ type: "pay_bill", billId: bill.id })} />
          ) : null}
        </Card>
      ))}
    </Screen>
  );
}
