# Module 7: Analyzing Your Portfolio's Performance
**Year:** 5 (Age 17)
**Month:** 7
**Reading Time:** ~10 minutes

## Learning Objectives
- Learn how to read and interpret mutual fund performance data
- Understand key metrics like CAGR, XIRR, and absolute returns
- Compare your portfolio against benchmarks
- Identify which funds are performing well and which need attention

## Key Concepts

### Absolute Returns vs Annualized Returns
When you see that your trust fund has grown from ₹1,20,000 to ₹1,41,600, the simple calculation is: (₹1,41,600 - ₹1,20,000) / ₹1,20,000 × 100 = 18%. This is called the **absolute return** — the total percentage gain without considering time.

But 18% over 2 years isn't the same as 18% over 6 months. To compare investments across different time periods, you need **annualized returns.** The most common measure is **CAGR (Compound Annual Growth Rate)** — it tells you the average yearly return that would take your investment from its starting value to its ending value.

CAGR formula: ((Ending Value / Beginning Value) ^ (1/Number of Years)) - 1

For your trust: ((₹1,41,600 / ₹1,20,000) ^ (1/2)) - 1 = approximately 8.63% CAGR. This means your money has been growing at an effective rate of about 8.63% per year.

However, since you're adding ₹5,000 every month (not investing one lump sum), CAGR doesn't capture the full picture. That's where **XIRR** comes in.

### XIRR: The True Measure of SIP Returns
XIRR (Extended Internal Rate of Return) calculates your actual return when you make multiple investments at different times — which is exactly what an SIP does. Each month's ₹5,000 has been invested for a different duration. The first SIP (January 2025) has been growing for 2 years. The most recent SIP (December 2026) has been growing for just 1 month.

XIRR accounts for the timing and amount of each cash flow. For your trust fund's 2-year SIP with a final value of ₹1,41,600, the XIRR would be approximately 16-18% annualized — much higher than the simple CAGR because your money has been working for varying lengths of time.

You can calculate XIRR easily using Google Sheets or Excel. Just list each SIP date and amount (as negative, since it's money going out) and the final value (as positive, since it's money coming in). The XIRR function does the rest.

### Benchmarking: Are You Beating the Market?
Your individual fund returns mean nothing without context. A 21.9% return on HDFC Mid-Cap sounds great, but what if the mid-cap index itself returned 25%? You'd actually be underperforming. Conversely, if the index returned only 15%, you're outperforming by 6.9%.

**Benchmarks** are standard market indices against which funds are compared:
- **Nifty 50:** The 50 largest Indian companies. The baseline for large-cap performance.
- **Nifty Midcap 150:** Mid-sized companies. Relevant for your HDFC Mid-Cap fund.
- **Nifty Smallcap 250:** Smaller companies. Relevant for your SBI Small Cap fund.
- **Nifty 500:** Broad market covering 500 companies. Relevant for flexi-cap funds.

A good fund manager consistently beats their benchmark. If a fund underperforms its benchmark for 2-3 years, it might be time to consider switching (we'll cover this in Module 8).

### Reading Your Portfolio: A Health Check
Let's analyze Kabir's trust fund like a doctor checking a patient:

**HDFC Mid-Cap Opportunities (+21.9%):** Excellent. Beating most mid-cap peers. Growing steadily. No concerns.

**SBI Small Cap Fund (+15.0%):** Good. Small-cap funds are more volatile, so 15% over 2 years is solid. May see bigger swings ahead.

**Parag Parikh Flexi Cap (+28.0%):** Outstanding. This fund invests in Indian and international stocks (including US tech), providing diversification. Best performer in the portfolio.

**ICICI Corp Bond Fund (-2.8%):** Underperforming, but context matters. Bond funds suffer when interest rates rise (which they did in 2025-26). This fund provides stability — when equity falls, bonds often rise. It's the shock absorber of your portfolio.

**Overall portfolio (+18%):** Strong. The diversification across equity and debt is working. Three out of four funds are in the green. The one negative fund is performing its intended role.

## Real-World Example (From Your Trust)
Let's calculate the XIRR for Kabir's trust. Assuming ₹5,000 SIP on the 5th of each month from January 2025 to December 2026 (24 installments):

Using XIRR with these cash flows and a final value of ₹1,41,600, the approximate XIRR is **17.2%** annualized. This means Kabir's trust has effectively earned 17.2% per year on the money invested — a strong result that beats most fixed deposits (6-7%) and inflation (5-6%) comfortably.

The Parag Parikh Flexi Cap with 28% return is the clear winner. The ICICI Corp Bond at -2.8% is dragging returns slightly, but it's only 12.3% of the portfolio, so its impact is limited.

## Quiz
1. What does CAGR stand for? — A) Compound Annual Growth Rate B) Cumulative Average Gain Ratio C) Calculated Annual Growth Return D) Capital Applied Growth Rate (Answer: A)
2. Why is XIRR better than CAGR for measuring SIP returns? — A) It's simpler to calculate B) It accounts for multiple investments at different times C) It ignores time periods D) It only works for equity funds (Answer: B)
3. What is the approximate XIRR of Kabir's trust over 2 years? — A) 8.63% B) 12.5% C) 17.2% D) 28% (Answer: C)
4. What benchmark would you use to evaluate HDFC Mid-Cap Opportunities? — A) Nifty 50 B) Nifty Midcap 150 C) Nifty Smallcap 250 D) S&P 500 (Answer: B)
5. Why is the ICICI Corp Bond Fund's -2.8% return not necessarily bad? — A) Bonds always lose money B) It provides portfolio stability when equity falls C) It has the highest fees D) It's a new fund (Answer: B)

## Image Prompts
1. **Portfolio Health Dashboard:** Flat illustration of a medical-style health check for a portfolio. Four fund "patients" on examination tables with vital signs — heart rate lines, percentage returns, and status indicators (green for healthy, yellow for watch, red for concern). Indian doctor character reviewing the dashboard. Clean, fun, infographic style.
2. **CAGR vs XIRR Explained:** Flat illustration of two runners on a track. "CAGR" runner takes one straight path. "XIRR" runner takes a winding path with multiple starting points (representing SIP dates) but finishes at the same endpoint. Track shows dates from Jan 2025 to Dec 2026. Athletic, dynamic, teen-friendly.
3. **Benchmark Comparison:** Flat illustration of a race podium with three levels. Your fund stands on the middle level. The benchmark index stands on one side, and a bank FD stands on the other. Medal-style percentage badges on each. Indian tricolour podium, celebratory style.
