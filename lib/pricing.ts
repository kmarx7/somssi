import type { Experience } from "./catalog";
import type { getExperienceOptions } from "./catalog";

export type ExperienceOption = ReturnType<typeof getExperienceOptions>[number];
export type SelectedOptions = ReadonlySet<string>;

export type PriceBreakdown = {
  guestCount: number;
  baseAmount: number;
  optionsAmount: number;
  totalAmount: number;
  selected: { code: string; amount: number }[];
};

/** Preview calculator only. The server must recalculate from database values at checkout. */
export function calculatePreviewPrice(
  experience: Pick<Experience, "price">,
  options: readonly ExperienceOption[],
  guestCount: number,
  selectedCodes: SelectedOptions,
): PriceBreakdown {
  const safeGuests = Math.max(1, Math.floor(guestCount));
  const baseAmount = experience.price * safeGuests;
  const selected = options
    .filter((option) => selectedCodes.has(option.code))
    .map((option) => ({
      code: option.code,
      amount: option.pricingType === "PER_PERSON" ? option.price * safeGuests : option.price,
    }));
  const optionsAmount = selected.reduce((sum, option) => sum + option.amount, 0);
  return { guestCount: safeGuests, baseAmount, optionsAmount, totalAmount: baseAmount + optionsAmount, selected };
}
