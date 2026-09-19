import React from "react";

// Shape produced by getAuthoritativeB2BRate on the backend (order.rateBreakup
// for B2B orders). Mixed units: weights are KG, `rate` is ₹ per KG, everything
// else is a ₹ charge — so a blanket "₹ value" format (what this used to do)
// puts a rupee sign on the weights.
const CHARGE_KEYS = [
  "actual_chargeable_weight",
  "billable_weight",
  "rate",
  "freight",
  "docket_charges",
  "pickup_charge",
  "handling_charge",
  "appointment_charge",
  "cod_charges",
  "rov",
  "fsc",
  "oda",
  "green_tax",
];
const TAIL_KEYS = ["subtotal", "gst"];

const LABELS = {
  actual_chargeable_weight: "Actual Weight",
  billable_weight: "Billable Weight",
  rate: "Rate",
  docket_charges: "Docket Charges",
  pickup_charge: "Pickup Charge",
  handling_charge: "Handling Charge",
  appointment_charge: "Appointment Charge",
  cod_charges: "COD Charges",
  rov: "ROV",
  fsc: "FSC",
  oda: "ODA",
  gst: "GST",
};

const humanize = (key) =>
  LABELS[key] ||
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatValue = (key, val) => {
  if (typeof val !== "number") return String(val);
  if (/weight/i.test(key)) return `${Number(val.toFixed(2))} KG`;
  if (key === "rate") return `₹ ${val.toFixed(2)} / KG`;
  return `₹ ${val.toFixed(2)}`;
};

// Scrolling rows with the Total pinned underneath, so a long breakup never
// pushes the total out of view. Must sit inside a flex-column container with
// a max-height (see the popups/modals that render it).
const B2BRateBreakup = ({ rateBreakup, total, padX = "px-3" }) => {
  const breakup = rateBreakup && typeof rateBreakup === "object" ? rateBreakup : {};
  const keys = Object.keys(breakup);

  // grand_total is shown once, as the pinned Total below, not as a row too.
  const rowKeys = [
    ...CHARGE_KEYS.filter((k) => k in breakup),
    ...keys.filter((k) => !CHARGE_KEYS.includes(k) && !TAIL_KEYS.includes(k) && k !== "grand_total"),
    ...TAIL_KEYS.filter((k) => k in breakup),
  ];

  const totalValue = Number(total ?? breakup.grand_total ?? 0);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className={`${padX} pb-2 overflow-y-auto min-h-0 custom-scrollbar space-y-1`}>
        {rowKeys.length > 0 ? (
          rowKeys.map((key) => (
            <div key={key} className="flex justify-between gap-2">
              <span className="text-gray-500">{humanize(key)}</span>
              <span className="font-[600] text-right whitespace-nowrap">{formatValue(key, breakup[key])}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic text-center py-2">No breakup available</p>
        )}
      </div>
      <div className={`${padX} py-2 shrink-0 border-t flex justify-between`}>
        <span className="font-[700] text-gray-800">Total</span>
        <span className="font-[700] text-[#0192ED]">₹ {totalValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default B2BRateBreakup;
