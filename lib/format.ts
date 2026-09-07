// Intl handles lakh/crore notation and Indian digit grouping natively under
// en-IN. Formatters are hoisted because constructing them is expensive.
const compact = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const full = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** e.g. ₹56.9L, ₹1.3Cr */
export const formatCompactINR = (value: number) => compact.format(value);

/** e.g. ₹56,91,234 */
export const formatINR = (value: number) => full.format(value);

/** Future value of a monthly SIP, contributions made at period start. */
export function sipFutureValue(
  monthly: number,
  years: number,
  annualRatePct: number
) {
  const rate = annualRatePct / 100 / 12;
  const months = years * 12;
  return monthly * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
}
