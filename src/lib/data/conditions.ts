import { contentApi } from "@/lib/content";

export type Condition = NonNullable<
  ReturnType<typeof contentApi.getConditionLegacy>
>;

export const conditions: Condition[] = contentApi.conditionsLegacy();

export function getCondition(slug: string) {
  return contentApi.getConditionLegacy(slug);
}
