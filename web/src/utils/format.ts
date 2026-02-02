export function formatPriceINR(price: number) {
    // assume price is INR (not paise). If backend sends paise, fix at source.
    if (!Number.isFinite(price) || price <= 0) return "Price on request";

    const lakh = price / 100000;
    const cr = price / 10000000;

    if (price >= 10000000) {
        return `₹${cr.toFixed(2)} Cr`;
    }
    return `₹${lakh.toFixed(1)} Lakh`;
}

export function safeString(v?: string, fallback = "") {
    const s = (v ?? "").trim();
    return s.length ? s : fallback;
}
