// Intl handles lakh/crore notation and Indian digit grouping natively under
// en-IN. Formatters are hoisted because constructing them is expensive.
const full = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * e.g. ₹36,912, ₹56.9L, ₹1.3Cr. Hand-rolled because browsers' ICU data
 * differs: Chrome's en-IN compact notation prints "₹36.9T" for thousands,
 * which reads as trillions, and differs from the server render.
 */
export function formatCompactINR(value: number) {
  const sign = value < 0 ? "-" : "";
  const v = Math.abs(value);
  const one = (n: number) => (Math.round(n * 10) / 10).toLocaleString("en-IN", { maximumFractionDigits: 1 });
  if (v >= 1e7) return `${sign}₹${one(v / 1e7)}Cr`;
  if (v >= 1e5) return `${sign}₹${one(v / 1e5)}L`;
  return `${sign}${full.format(v)}`;
}

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
