/**
 * Renders the website's demo app screens.
 *
 *   npm run demo-screens
 *
 * These are recreations of real, built Invisiko screens in the app's own design system, filled with
 * fictional data for a made-up restaurant ("The Clay Oven"). They replace captures that held real
 * prices, names and test entries, and cover screens that had no capture. The site says so: see the
 * footer's demo-data line.
 *
 * Rules:
 * - Only show what PRODUCT_BLUEPRINT.md §2 marks Implemented. No shift reminders, missed-check
 *   alerts, failed checklist items, corrective actions or equipment.
 * - Pay screens never show rates, the rate split, or how staff are paid (§7).
 * - All data is fictional, and the sums add up.
 *
 * Each screen is drawn at 360×800 and captured at 3× (1080×2400), using the installed Microsoft
 * Edge. Roboto is loaded from Google Fonts, so this script needs a connection.
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as Io from "react-icons/io5";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/screenshots");

const VENUE = "The Clay Oven";

const icon = (name, size = 20, color = "currentColor") =>
  renderToStaticMarkup(createElement(Io[name], { size, color }));

/** Tokens from the app (mobile/src/theme/index.ts). */
const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 360px; height: 800px; overflow: hidden; background: #0B0B0D; }
  body { font-family: Roboto, sans-serif; color: #fff; font-size: 14px; line-height: 1.35; -webkit-font-smoothing: antialiased; position: relative; }
  svg { display: block; }
  .bar { height: 88px; background: #1A1A1D; position: relative; }
  .bar .back { position: absolute; left: 16px; top: 54px; }
  .bar .t { position: absolute; left: 54px; top: 51px; font-size: 19px; font-weight: 500; }
  .gear { position: absolute; right: 14px; top: 56px; width: 40px; height: 40px; border-radius: 50%; background: #3A3A3D; display: grid; place-items: center; color: #A6A6AC; z-index: 3; }
  .top { position: absolute; left: 14px; top: 56px; font-size: 19px; font-weight: 500; }
  .body { position: absolute; left: 0; right: 0; bottom: 0; padding: 0 16px; overflow: hidden; }
  .sub .body { top: 100px; }
  .tab .body { top: 100px; bottom: 76px; }
  h2 { font-size: 17px; font-weight: 600; margin: 14px 0 10px; }
  .card { background: #1A1A1D; border: 1px solid #333336; border-radius: 16px; padding: 14px; margin-bottom: 10px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .tile { background: #1A1A1D; border: 1px solid #333336; border-radius: 16px; padding: 14px; min-height: 112px; }
  .ic { width: 38px; height: 38px; border-radius: 50%; background: #242427; display: grid; place-items: center; color: #FE9A02; margin-bottom: 8px; }
  .tile b { display: block; font-size: 14.5px; font-weight: 600; }
  .m { color: #A6A6AC; }
  .s { font-size: 12.5px; }
  .xs { font-size: 11px; }
  .amber { color: #FE9A02; }
  .green { color: #3DD68C; }
  .red { color: #FF6B6B; }
  .yellow { color: #FBBF24; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .btn { height: 46px; border-radius: 23px; display: grid; place-items: center; font-weight: 600; font-size: 15px; }
  .btn.p { background: #FE9A02; color: #0B0B0D; }
  .btn.o { background: #1A1A1D; border: 1px solid #333336; color: #fff; }
  .btn.d { background: #7F4D01; color: #3B2400; }
  .seg { display: flex; background: #1A1A1D; border: 1px solid #333336; border-radius: 20px; padding: 3px; margin-bottom: 10px; }
  .seg span { flex: 1; text-align: center; padding: 6px 0; border-radius: 16px; font-size: 13px; font-weight: 500; color: #A6A6AC; }
  .seg .on { background: #FE9A02; color: #0B0B0D; }
  .lab { font-size: 10.5px; letter-spacing: 0.08em; color: #A6A6AC; font-weight: 500; }
  .input { background: #1A1A1D; border: 1px solid #333336; border-radius: 10px; padding: 11px 12px; font-size: 14px; margin: 5px 0 10px; }
  .chip { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 10px; font-size: 11.5px; font-weight: 500; }
  .tabbar { position: absolute; left: 14px; right: 14px; bottom: 14px; height: 54px; border-radius: 27px; background: #1A1A1D; border: 1px solid #333336; display: flex; align-items: center; justify-content: space-around; color: #A6A6AC; z-index: 4; }
  .tabbar .on { width: 42px; height: 42px; border-radius: 50%; background: #FE9A02; color: #0B0B0D; display: grid; place-items: center; }
  .hl { border-color: #FE9A02; }
  .big { font-size: 26px; font-weight: 700; }
  .line { height: 1px; background: #333336; margin: 9px 0; }
`;

const gear = `<div class="gear">${icon("IoSettingsSharp", 20)}</div>`;

const managerTabs = [
  ["IoStatsChartOutline", "IoStatsChart"],
  ["IoPeopleOutline", "IoPeople"],
  ["IoCheckboxOutline", "IoCheckbox"],
  ["IoRestaurantOutline", "IoRestaurant"],
  ["IoPersonCircleOutline", "IoPersonCircle"],
];
const staffTabs = [
  ["IoStatsChartOutline", "IoStatsChart"],
  ["IoScanOutline", "IoScan"],
  ["IoCheckboxOutline", "IoCheckbox"],
  ["IoTimeOutline", "IoTime"],
  ["IoPersonCircleOutline", "IoPersonCircle"],
];

const tabbar = (tabs, active) =>
  `<div class="tabbar">${tabs
    .map(([line, solid], i) => (i === active ? `<span class="on">${icon(solid, 21)}</span>` : `<span>${icon(line, 22)}</span>`))
    .join("")}</div>`;

/** A sub-screen: dark app bar, back arrow. */
const sub = (title, body) =>
  `<main class="sub"><div class="bar"><span class="back">${icon("IoArrowBack", 23)}</span><span class="t">${title}</span></div>${gear}<div class="body">${body}</div></main>`;

/** A tab screen: title on the page, floating tab bar. */
const tab = (title, tabs, active, body) =>
  `<main class="tab"><span class="top">${title}</span>${gear}<div class="body">${body}</div>${tabbar(tabs, active)}</main>`;

const tile = (ic, title, note) => `<div class="tile"><div class="ic">${icon(ic, 19)}</div><b>${title}</b><span class="m s">${note}</span></div>`;

const invoiceHead = `
  <div class="card">
    <div class="row"><b>Greenway Catering Supplies</b><span class="amber s">Change</span></div>
    <div class="m s" style="margin-top:3px">Invoice INV-20418 · 4 Nov 2026</div>
    <div class="row m s" style="margin-top:6px"><span>${icon("IoLocationOutline", 14, "#3DD68C")}</span><span style="flex:1">Delivered to: Main store</span></div>
  </div>`;

const reviewLine = (name, size, sum, match) => `
  <div class="card ${match ? "" : "hl"}" style="padding:11px 13px;margin-bottom:7px">
    <div class="row"><b style="font-weight:600">${name}</b><span class="s" style="white-space:nowrap">${sum.split(" = ")[1]}</span></div>
    <div class="m xs" style="margin-top:2px">${size} · ${sum.split(" = ")[0]}</div>
    ${
      match
        ? `<div class="green xs row" style="justify-content:flex-start;gap:4px;margin-top:5px">${icon("IoCheckmarkCircle", 14)}<span>${match}</span></div>`
        : `<div class="amber s row" style="margin-top:6px"><span>Match to a stock item</span>${icon("IoChevronForward", 15)}</div>`
    }
  </div>`;

const totals = `
  <div class="card" style="padding:10px 13px">
    <div class="row s m"><span>Goods</span><span>£284.60</span></div>
    <div class="row s m" style="margin-top:3px"><span>VAT</span><span>£4.94</span></div>
    <div class="row" style="margin-top:3px"><b>Total</b><b class="amber">£289.54</b></div>
  </div>`;

const stockCard = `
  <div class="card" id="stock-card" style="margin-bottom:0">
    <div class="row"><b style="font-size:15px;font-weight:600">CHICKEN BREAST FILLET</b>${icon("IoChevronUp", 17, "#A6A6AC")}</div>
    <div class="m s">14.00 5KG</div>
    <div class="grid" style="margin-top:10px;row-gap:9px">
      <div><div class="lab">IN STOCK</div><b>14.00 5KG</b></div><div><div class="lab">PAR LEVEL</div><b>6.00 5KG</b></div>
      <div><div class="lab">UNIT COST</div><b>£31.50</b></div><div><div class="lab">STOCK VALUE</div><b>£441.00</b></div>
    </div>
    <div class="lab" style="margin-top:11px">RECENT MOVEMENTS</div>
    <div class="row" style="margin-top:6px;justify-content:flex-start;gap:18px">
      <b class="green">+4 5KG</b>
      <div><div>Delivery received</div><div class="m xs">4 Nov 2026, 09:41 · Priya · From invoice scan</div></div>
    </div>
    <div class="line"></div>
  </div>`;

const screens = {
  "manager-checks-dashboard": tab(
    "Checks",
    managerTabs,
    2,
    `<h2 style="margin-top:6px">Today's checks</h2><div class="grid">
      ${tile("IoSunnyOutline", "Opening Routine", "Done · 09:12")}
      ${tile("IoMoonOutline", "Closing Routine", "Not started")}
      ${tile("IoListOutline", "Other Checklists", "1 of 2 done today")}
      ${tile("IoTimeOutline", "Temperature History", "Past opening & closing")}
    </div>
    <h2>Manage</h2><div class="grid">
      ${tile("IoSnowOutline", "Fridges & freezers", "4 registered")}
      ${tile("IoListOutline", "Opening checklist", "7 items")}
      ${tile("IoDocumentTextOutline", "Documents", `<span class="red">1 expired</span>`)}
      ${tile("IoCalendarOutline", "Daily checklists", "e.g. Toilet cleaning")}
    </div>`,
  ),

  "staff-opening-routine": sub(
    "",
    `<h2 style="margin-top:0">Opening routine</h2><div class="grid">
      ${tile("IoThermometerOutline", "Fridge/Freezer Temperatures", "4 of 4 recorded")}
      ${tile("IoCheckboxOutline", "Opening Checklist", "7 of 7 done")}
    </div>`,
  ),

  "staff-checklist": sub(
    "Toilet cleaning",
    `<p class="m s" style="margin-bottom:10px">Daily · 3 of 5 done today</p>
    ${[
      ["Clean and disinfect toilets", "Aisha · 10:14", true],
      ["Refill soap and paper towels", "Aisha · 10:16", true],
      ["Mop the floor", "Tom · 11:02", true],
      ["Empty the bins", "", false],
      ["Wipe down door handles", "", false],
    ]
      .map(
        ([task, who, done]) => `<div class="card row" style="justify-content:flex-start;padding:12px 13px;margin-bottom:8px">
        ${icon(done ? "IoCheckmarkCircle" : "IoEllipseOutline", 23, done ? "#FE9A02" : "#6E6E76")}
        <div><div style="font-weight:500">${task}</div>${who ? `<div class="m xs">${who}</div>` : ""}</div></div>`,
      )
      .join("")}`,
  ),

  "staff-fridge-temperatures": sub(
    "Fridge temperatures",
    `${[
      ["Walk-in fridge", "5.0°C or lower", "3.5", false],
      ["Prep fridge", "5.0°C or lower", "4.0", false],
      ["Drinks fridge", "8.0°C or lower", "9.5", true],
      ["Chest freezer", "-18.0°C or lower", "-19.0", false],
    ]
      .map(
        ([name, max, value, over]) => `<div class="card ${over ? "" : ""}" style="${over ? "border-color:#FF6B6B" : ""}">
        <div class="row"><div><b style="font-weight:600">${name}</b><div class="m xs">${max}</div></div>
        <div class="row" style="gap:10px">
          <span class="ic" style="margin:0;width:34px;height:34px;color:#fff">${icon("IoRemove", 18)}</span>
          <b class="${over ? "red" : ""}" style="font-size:18px;min-width:58px;text-align:center">${value}°C</b>
          <span class="ic" style="margin:0;width:34px;height:34px;color:#fff">${icon("IoAdd", 18)}</span>
        </div></div>
        ${over ? `<div class="red s" style="margin-top:8px">Above the 8.0°C maximum</div><div class="input m s" style="margin:6px 0 0;padding:8px 10px">Add a note (optional)</div>` : ""}
      </div>`,
      )
      .join("")}
    <div class="btn p" style="margin-top:6px">Save readings</div>`,
  ),

  "manager-temperature-history": sub(
    "Temperature history",
    `<div class="seg"><span class="on">7 days</span><span>14 days</span><span>30 days</span></div>
    <div class="seg"><span class="on">All</span><span>Opening</span><span>Closing</span></div>
    ${[
      ["Sat 7 Nov · Opening", [["Walk-in fridge", "3.5°C", "Priya · 09:02"], ["Prep fridge", "4.0°C", "Priya · 09:03"], ["Drinks fridge", "9.5°C", "Priya · 09:03", true], ["Chest freezer", "-19.0°C", "Priya · 09:04"]]],
      ["Fri 6 Nov · Closing", [["Walk-in fridge", "4.0°C", "Tom · 23:10"], ["Prep fridge", "4.5°C", "Tom · 23:11"]]],
    ]
      .map(
        ([day, rows]) => `<h2 style="font-size:14px;margin:12px 0 7px">${day}</h2><div class="card" style="padding:4px 13px">${rows
          .map(
            ([unit, temp, who, over], i) => `${i ? `<div class="line" style="margin:0"></div>` : ""}<div class="row" style="padding:9px 0"><div><div style="font-weight:500">${unit}</div><div class="m xs">${who}</div></div><b class="${over ? "red" : "green"}">${temp}</b></div>`,
          )
          .join("")}</div>`,
      )
      .join("")}`,
  ),

  "manager-fridges-freezers": sub(
    "Fridges &amp; freezers",
    `${[
      ["Walk-in fridge", "5.0°C or lower"],
      ["Prep fridge", "5.0°C or lower"],
      ["Drinks fridge", "8.0°C or lower"],
      ["Chest freezer", "-18.0°C or lower"],
    ]
      .map(
        ([name, max]) => `<div class="card row" style="justify-content:flex-start;gap:12px"><span class="ic" style="margin:0">${icon("IoSnowOutline", 19)}</span><div><b style="font-weight:600">${name}</b><div class="m s">${max}</div></div></div>`,
      )
      .join("")}
    <div class="btn o" style="margin-top:4px">+ Add fridge or freezer</div>`,
  ),

  "manager-documents": sub(
    "Documents",
    `<p class="m s" style="margin-bottom:10px">Licences, certificates and insurance - whatever has to be produced on request. Only you can see these.</p>
    <div class="card row" style="padding:11px 13px"><div class="row" style="gap:10px">${icon("IoPricetagOutline", 19, "#3DD68C")}<div><b style="font-weight:600">All categories</b><div class="m xs">Showing everything you have filed</div></div></div><span class="amber s">Filter ›</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-bottom:10px">
      ${[["IoCameraOutline", "Take photo"], ["IoImagesOutline", "From gallery"], ["IoDocumentTextOutline", "Upload a PDF"]]
        .map(([i, l]) => `<div class="card" style="margin:0;padding:11px 4px;text-align:center"><div class="amber" style="display:grid;place-items:center;margin-bottom:4px">${icon(i, 19)}</div><span class="xs" style="font-weight:600">${l}</span></div>`)
        .join("")}
    </div>
    ${[
      ["Premises licence", "Licences", "Expires 12 Mar 2027", "green"],
      ["Public liability insurance", "Insurance", "Expires in 21 days", "yellow"],
      ["Food hygiene certificate", "Certificates", "Expired 2 Oct 2026", "red"],
      ["Gas safety certificate", "Certificates", "Does not expire", "m"],
    ]
      .map(
        ([name, cat, note, tone]) => `<div class="card row" style="justify-content:flex-start;gap:12px;padding:11px 13px;margin-bottom:8px"><span class="ic" style="margin:0">${icon("IoDocumentTextOutline", 19)}</span><div><b style="font-weight:600">${name}</b><div class="m xs">${cat}</div><div class="${tone} xs" style="margin-top:1px">${note}</div></div></div>`,
      )
      .join("")}`,
  ),

  "food-invoice-capture-stock": tab(
    "Food",
    managerTabs,
    3,
    `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin:0 0 10px">
      ${[["IoTrendingUpOutline", "Purchases"], ["IoBusinessOutline", "Suppliers"], ["IoCubeOutline", "Items"]]
        .map(([i, l]) => `<div class="card" style="margin:0;padding:10px 4px;text-align:center"><div class="amber" style="display:grid;place-items:center;margin-bottom:3px">${icon(i, 18)}</div><span class="s" style="font-weight:600">${l}</span></div>`)
        .join("")}
    </div>
    <div class="card"><p class="m xs" style="margin-bottom:8px">Photograph a delivery invoice, or pick a PDF a supplier sent you - the app reads off the items, quantities and prices for you to check before they're added to stock.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px">
      ${[["IoCameraOutline", "Take photo"], ["IoImagesOutline", "From gallery"], ["IoDocumentTextOutline", "Upload a PDF"]]
        .map(([i, l]) => `<div style="background:#242427;border:1px solid #333336;border-radius:12px;padding:10px 2px;text-align:center"><div class="amber" style="display:grid;place-items:center;margin-bottom:3px">${icon(i, 18)}</div><span class="xs" style="font-weight:600">${l}</span></div>`)
        .join("")}
    </div></div>
    <h2>Stock</h2>${stockCard}`,
  ),

  "invoice-review": sub(
    "Review invoice",
    `${invoiceHead}
    ${reviewLine("CHICKEN BREAST FILLET", "5KG", "4 × £31.50 = £126.00", "Chicken breast fillet")}
    ${reviewLine("VEGETABLE OIL", "20LT", "2 × £26.90 = £53.80", "Vegetable oil")}
    ${reviewLine("BASMATI RICE", "10KG", "3 × £14.20 = £42.60", "Basmati rice")}
    ${reviewLine("BURGER BUNS", "48 PACK", "5 × £7.50 = £37.50", "Burger buns")}
    ${totals}
    <div class="btn p">Confirm</div>`,
  ),

  "invoice-review-unmatched": sub(
    "Review invoice",
    `${invoiceHead}
    ${reviewLine("CHICKEN BREAST FILLET", "5KG", "4 × £31.50 = £126.00", "Chicken breast fillet")}
    ${reviewLine("VEGETABLE OIL", "20LT", "2 × £26.90 = £53.80", "Vegetable oil")}
    ${reviewLine("LONG GRAIN RICE XTRA", "10KG", "3 × £14.20 = £42.60", null)}
    ${reviewLine("BURGER BUNS", "48 PACK", "5 × £7.50 = £37.50", "Burger buns")}
    ${totals}
    <p class="amber s" style="text-align:center;margin-bottom:7px">1 line still to match</p>
    <div class="btn d">Confirm</div>`,
  ),

  "manager-purchase-history": sub(
    "Purchase history",
    `<p class="m s" style="margin-bottom:9px">Confirmed invoices from the last 6 months.</p>
    <div class="card row" style="padding:10px 13px;margin-bottom:7px"><div class="row" style="gap:9px">${icon("IoBusinessOutline", 18, "#3DD68C")}<div><b style="font-weight:600">All suppliers</b><div class="m xs">Supplier</div></div></div><span class="amber s">Filter ›</span></div>
    <div class="card"><div class="row" style="align-items:flex-start"><div><div class="amber big" style="font-size:21px">£3,412.60</div><span class="m xs">Goods</span></div><div><div class="amber big" style="font-size:21px">14</div><span class="m xs">Invoices</span></div><div><div class="amber big" style="font-size:21px">38</div><span class="m xs">Products</span></div></div>
    <div class="row s m" style="margin-top:8px"><span>VAT on 9 of 14 invoices</span><span style="color:#fff">£186.40</span></div>
    <div class="row" style="margin-top:4px"><b>Paid out</b><b class="amber">£3,599.00</b></div></div>
    <div class="seg"><span>Weekly</span><span class="on">Monthly</span></div>
    <div class="card" style="padding:12px 13px"><span class="m xs">Tap a bar for its value</span>
      <div style="display:flex;align-items:flex-end;gap:12px;height:82px;margin-top:8px">${[34, 52, 46, 61, 74, 88].map((h, i) => `<span style="flex:1;height:${h}%;border-radius:4px 4px 0 0;background:${i === 5 ? "#FE9A02" : "#7F4D01"}"></span>`).join("")}</div>
    </div>
    ${[
      ["CHICKEN BREAST FILLET", "£1,008.00", "32 5KG across 8 invoices · last 4 Nov 2026"],
      ["VEGETABLE OIL", "£430.40", "16 20LT across 8 invoices · last 4 Nov 2026"],
    ]
      .map(([n, v, d]) => `<div class="card" style="padding:10px 13px;margin-bottom:7px"><div class="row"><b style="font-weight:600">${n}</b><b class="amber">${v}</b></div><div class="m xs">${d}</div></div>`)
      .join("")}`,
  ),

  "staff-scan": tab(
    "Scan",
    staffTabs,
    1,
    `<div style="position:absolute;inset:0 0 70px;background:radial-gradient(70% 45% at 50% 42%,#2A1C10,#0B0B0D)"></div>
    <div style="position:relative;text-align:center;margin-top:52px"><b style="font-size:17px;font-weight:600">Scan to clock in / out</b><div class="m s" style="margin-top:3px">Line up the code inside the frame</div></div>
    <div style="position:relative;width:236px;height:236px;margin:24px auto 0">
      ${[["top:0;left:0", "border-top:3px solid #FE9A02;border-left:3px solid #FE9A02"], ["top:0;right:0", "border-top:3px solid #FE9A02;border-right:3px solid #FE9A02"], ["bottom:0;left:0", "border-bottom:3px solid #FE9A02;border-left:3px solid #FE9A02"], ["bottom:0;right:0", "border-bottom:3px solid #FE9A02;border-right:3px solid #FE9A02"]]
        .map(([p, b]) => `<span style="position:absolute;${p};width:28px;height:28px;${b}"></span>`)
        .join("")}
      <span style="position:absolute;left:6px;right:6px;top:66%;height:2px;background:#FE9A02"></span>
    </div>
    <div class="card row" style="position:absolute;left:16px;right:16px;bottom:8px;margin:0;padding:9px 12px;border-radius:20px;justify-content:flex-start"><span class="amber">${icon("IoQrCodeOutline", 18)}</span><span class="m s">Point the camera at ${VENUE}'s check-in code</span></div>`,
  ),

  "staff-scan-refused": tab(
    "Scan",
    staffTabs,
    1,
    `<div style="text-align:center;padding-top:96px">
      <div style="display:grid;place-items:center;color:#FF6B6B">${icon("IoCloseCircle", 76)}</div>
      <b style="display:block;font-size:21px;font-weight:600;margin-top:14px">Not checked in</b>
      <p class="m" style="font-size:15px;margin:10px 12px 0">You are 340m from ${VENUE}, outside the 100m check-in radius.</p>
      <div class="btn p" style="margin:28px 8px 0">Try again</div>
    </div>`,
  ),

  "staff-analytics": tab(
    "Analytics",
    staffTabs,
    0,
    `<h2 style="margin-top:0">November 2026</h2>
    <div class="card hl" style="text-align:center"><div class="lab amber">LATE THIS MONTH</div><div class="big">12 min</div><span class="m s">2 late check-ins so far.</span></div>
    <div class="card"><b style="font-weight:600">On time vs late</b><div style="height:9px;border-radius:5px;background:#242427;margin:9px 0;overflow:hidden"><div style="width:90%;height:100%;background:#3DD68C"></div></div><div class="row xs m"><span><span class="green">●</span> On time: 18 (90%)</span><span><span class="yellow">●</span> Late: 2</span></div></div>
    <div class="card"><b style="font-weight:600">Minutes late by check-in</b><div class="m xs" style="margin-top:2px">Each bar is one check-in - its height is how late it was against your scheduled start.</div>
    <div style="display:flex;align-items:flex-end;gap:5px;height:60px;margin-top:10px">${[0, 0, 3, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0].map((h) => `<span style="flex:1;height:${h ? h * 6 : 3}px;border-radius:2px;background:${h ? "#FBBF24" : "#333336"}"></span>`).join("")}</div></div>
    <div class="card"><b style="font-weight:600">Hours worked per month</b><div style="display:flex;align-items:flex-end;gap:14px;height:66px;margin-top:10px">${[62, 71, 58, 80, 76, 44].map((h) => `<span style="flex:1;height:${h}%;border-radius:4px 4px 0 0;background:#FE9A02"></span>`).join("")}</div></div>`,
  ),

  "manager-weekly-rota": sub(
    "Weekly rota",
    `<div class="row" style="margin-bottom:9px">${icon("IoChevronBack", 19)}<b style="font-weight:600">9 Nov - 15 Nov 2026</b>${icon("IoChevronForward", 19)}</div>
    <div class="card hl" style="text-align:center"><div class="lab amber">ESTIMATED STAFF COST THIS WEEK</div><div class="big">£1,312.50</div></div>
    ${[
      ["Monday 9 Nov", "£187.50", [["Priya Shah", "Chef", "16:00 - 23:00"], ["Tom Hughes", "Till", "17:00 - 23:00"]]],
      ["Tuesday 10 Nov", "£175.00", [["Aisha Khan", "Chef", "16:00 - 23:00"], ["Dan Reid", "Driver", "17:00 - 23:00"]]],
      ["Wednesday 11 Nov", "£187.50", [["Priya Shah", "Chef", "16:00 - 23:00"], ["Marek Nowak", "Driver", "17:00 - 23:00"]]],
    ]
      .map(
        ([day, cost, shifts]) => `<div class="card" style="padding:11px 13px"><div class="row"><b style="font-weight:600">${day}</b><b class="amber">${cost}</b></div>${shifts
          .map(([n, j, t]) => `<div class="row s" style="margin-top:6px"><span>${n} <span class="m">· ${j}</span></span><span class="m">${t}</span></div>`)
          .join("")}<div class="btn o" style="height:36px;font-size:13px;margin-top:9px">+ Add staff</div></div>`,
      )
      .join("")}`,
  ),

  "manager-on-shift": sub(
    "On shift now",
    `<div class="card hl" style="text-align:center"><div class="big amber">3</div><span class="m s">On shift now</span></div>
    ${[
      ["Priya Shah", "Chef", "In at 15:58", "3h 12m"],
      ["Tom Hughes", "Till operator", "In at 16:59", "2h 11m"],
      ["Dan Reid", "Driver", "In at 17:02", "2h 8m"],
    ]
      .map(
        ([n, j, t, d]) => `<div class="card row"><div class="row" style="gap:11px"><span class="ic" style="margin:0;color:#fff;font-weight:600">${n.split(" ").map((p) => p[0]).join("")}</span><div><b style="font-weight:600">${n}</b><div class="m xs">${j} · ${t}</div></div></div><b class="green">${d}</b></div>`,
      )
      .join("")}`,
  ),

  "manager-swap-requests": sub(
    "Swap requests",
    `<h2 style="margin-top:0">Pending</h2>
    <div class="card"><b style="font-weight:600">Tom Hughes → Aisha Khan</b><div class="m s" style="margin-top:2px">Fri 13 Nov · 17:00 - 23:00 · Till</div><div class="s" style="margin-top:6px">"Family commitment that evening."</div>
    <div class="grid" style="margin-top:10px"><div class="btn p" style="height:40px">Approve</div><div class="btn o" style="height:40px">Decline</div></div></div>
    <h2>Past decisions</h2>
    ${[
      ["Dan Reid → Marek Nowak", "Sat 7 Nov · 17:00 - 23:00", "Approved", "green"],
      ["Aisha Khan → Priya Shah", "Thu 5 Nov · 16:00 - 23:00", "Declined", "red"],
    ]
      .map(([n, d, s, t]) => `<div class="card row"><div><b style="font-weight:600">${n}</b><div class="m xs">${d}</div></div><span class="${t} s">${s}</span></div>`)
      .join("")}`,
  ),

  "manager-payroll": sub(
    "Payroll",
    `<h2 style="margin-top:0">Pay periods</h2>
    <div class="card"><div class="row"><b style="font-weight:600">30 Oct - 12 Nov</b><span class="chip" style="background:#3A2A0C;color:#FE9A02">Open</span></div>
    <div class="m s" style="margin-top:3px">5 staff · 188.5 hours so far</div>
    <div class="btn p" style="height:40px;margin-top:10px">Finish period</div></div>
    <div class="card"><div class="row"><b style="font-weight:600">16 Oct - 29 Oct</b><span class="chip" style="background:#3A2A0C;color:#FBBF24">Finished</span></div>
    <div class="m s" style="margin-top:3px">5 staff · 312.0 hours</div>
    <div class="row" style="margin-top:6px"><span class="m s">Total</span><b class="amber">£3,900.00</b></div>
    <div class="btn o" style="height:40px;margin-top:10px">Mark as paid</div></div>
    <div class="card"><div class="row"><b style="font-weight:600">2 Oct - 15 Oct</b><span class="chip" style="background:#12352A;color:#3DD68C">Paid</span></div>
    <div class="row" style="margin-top:6px"><span class="m s">5 staff · 298.5 hours</span><b class="amber">£3,731.25</b></div></div>
    <h2>Monthly cost report</h2>
    <div class="card"><p class="m s">What all your staff cost you, month by month.</p><div class="row" style="margin-top:6px"><span>October 2026</span><b>£7,631.25</b></div></div>`,
  ),

  "manager-invite-team": sub(
    "",
    `<h2 style="margin-top:0;font-size:19px">Invite your team</h2>
    <p class="m s" style="margin-bottom:12px">Share this code with everyone you want to join. They choose Staff when they open the app and enter it to create their own account - it keeps working for the whole team until you generate a new one below.</p>
    <div class="card hl" style="text-align:center;padding:20px"><div class="lab">INVITE CODE</div><div class="amber" style="font-size:25px;font-weight:700;letter-spacing:0.14em;margin-top:6px">K7MPQ2XR</div></div>
    <div class="row" style="justify-content:flex-start;gap:8px;margin-bottom:10px"><div class="btn o" style="padding:0 22px">Share</div><div class="btn p" style="padding:0 22px">Copy code</div></div>
    <div class="btn o">Generate new code</div>`,
  ),

  "staff-join": sub(
    "",
    `<h2 style="margin-top:0;font-size:21px">Enter your invite code</h2>
    <p class="m s" style="margin-bottom:16px">Your manager sends you a code. You need one to set up your account.</p>
    <div class="lab">INVITE CODE</div>
    <div class="input amber" style="font-size:21px;font-weight:700;letter-spacing:0.14em;text-align:center;padding:14px">K7MPQ2XR</div>
    <div class="card row" style="justify-content:flex-start;gap:10px;margin-top:6px"><span class="green">${icon("IoCheckmarkCircle", 22)}</span><div><span class="m xs">You're joining</span><b style="display:block;font-weight:600">${VENUE}</b></div></div>
    <div class="btn p" style="margin-top:14px">Continue</div>`,
  ),

  "manager-check-in-setup": sub(
    "Check-in code",
    `<b style="font-size:17px;font-weight:600">Set your check-in code</b>
    <p class="m s" style="margin:6px 0 12px">Set the venue's position - staff must be within this radius to check in.</p>
    <div class="btn o" style="margin-bottom:12px">Use my current location</div>
    <div class="m s">Latitude</div><div class="input">51.5074</div>
    <div class="m s">Longitude</div><div class="input">-0.1278</div>
    <div class="m s">Radius (meters)</div><div class="input">100</div>
    <div class="btn p" style="margin-top:6px">Create check-in code</div>`,
  ),
};

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
const context = await browser.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 3 });
const page = await context.newPage();

const render = (body) =>
  page.setContent(
    `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=block" rel="stylesheet"><style>${css}</style></head><body>${body}</body></html>`,
    { waitUntil: "networkidle" },
  );

console.log("Rendering demo screens");
for (const [name, body] of Object.entries(screens)) {
  await render(body);
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: "png" });
  await sharp(png).webp({ quality: 90, smartSubsample: true }).toFile(join(outDir, `${name}.webp`));
  console.log(`  ${name}.webp`);

  if (name === "food-invoice-capture-stock") {
    const card = await page.locator("#stock-card").screenshot({ type: "png" });
    await sharp(card).webp({ quality: 92 }).toFile(join(outDir, "stock-item-detail.webp"));
    console.log("  stock-item-detail.webp");
  }
  if (name === "manager-checks-dashboard") {
    await sharp(png).resize({ width: 400 }).png({ compressionLevel: 9 }).toFile(join(root, "assets/brand/share-screen.png"));
    console.log("  assets/brand/share-screen.png");
  }
}
await browser.close();
