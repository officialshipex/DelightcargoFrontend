import Bluedart from "../assets/bluedart.png";
import Delehivery from "../assets/delehivery.png";
import EcomExpress from "../assets/ecom-expresss.avif";
import Shadowfax from "../assets/shadowfax.png";
import Xpressbees from "../assets/xpressbees.png";
import Shiprocket from "../assets/shiprocket.webp";
import NimbusPost from "../assets/nimbuspost.webp";
import ShreeMaruti from "../assets/shreemaruti.png";
import Amazon from "../assets/amazon.jpg";
import Smartship from "../assets/bluedart.png";
import DTDC from "../assets/dtdc.png";
import Ekart from "../assets/ekart.png";
import DelightCargo from "../assets/delightcargoNoBG.png";
import ShipexIndia from "../assets/shipexindia.png";

// Generic courier/delivery-truck icon (inline SVG, no brand) — used whenever
// courierServiceName doesn't match a known carrier (e.g. Shiprocket Cargo's
// auto-assigned sub-carriers like "Smart Cargo Advantage", which we don't
// have a brand asset for). An empty string here renders as a broken image
// icon in the browser, so this is a real fallback, not a placeholder.
const GENERIC_COURIER_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' fill='%239ca3af'%3E%3Cpath d='M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z'/%3E%3C/svg%3E";

export const getCarrierLogo = (courierServiceName = "") => {
  const name = courierServiceName?.toLowerCase();

  if (name?.includes("delhivery")) return Delehivery;
  if (name?.includes("bluedart")) return Bluedart;
  if (name?.includes("ecom")) return EcomExpress;
  if (name?.includes("shadowfax")) return Shadowfax;
  if (name?.includes("xpressbees")) return Xpressbees;
  if (name?.includes("nimbus")) return NimbusPost;
  if (name?.includes("shiprocket")) return Shiprocket;
  if (name?.includes("shree")) return ShreeMaruti;
  if (name?.includes("dtdc")) return DTDC;
  if (name?.includes("amazon")) return Amazon;
  if (name?.includes("smartship")) return Smartship;
  if (name?.includes("ekart")) return Ekart;
  if (name?.includes("shipex")) return ShipexIndia;
  if (name?.includes("delightcargo")) return DelightCargo;

  return GENERIC_COURIER_ICON; // no known brand match (e.g. BoxdLogistics, Shiprocket's auto-assigned sub-carriers)
};
