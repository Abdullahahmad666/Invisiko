/**
 * Questions and answers, in the product's own words.
 *
 * Rules (PRODUCT_BLUEPRINT.md §9.9, §12 AEO):
 * - Every answer opens with a direct sentence that stands alone when quoted.
 * - Every answer is traceable to the blueprint (§2 status, §7 objections, §9.10 privacy commitments).
 * - Honest negative answers stay. They are deliberate.
 * - The same text renders on the page and in FAQPage structured data, so nothing is marked up
 *   that a visitor cannot read.
 */

export type FaqLink = { href: string; label: string };

export type FaqItem = {
  id: string;
  question: string;
  /** Paragraphs. The first must answer the question on its own. */
  answer: string[];
  link?: FaqLink;
};

export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "basics",
    title: "The basics",
    items: [
      {
        id: "till",
        question: "Is Invisiko a till or ordering system?",
        answer: [
          "No. Invisiko is not a till, point-of-sale or ordering system.",
          "There are no menus, customer orders or card payments in it. It runs the back of house: staff hours, food-safety records, pay and delivery invoices.",
        ],
      },
      {
        id: "offline",
        question: "Does it work offline?",
        answer: [
          "Not today. Invisiko needs an internet connection to check someone in, record a check or read an invoice.",
          "If the connection drops, the app says so plainly and offers to try again.",
        ],
      },
      {
        id: "multi-site",
        question: "Can I use it across more than one restaurant?",
        answer: [
          "Not today — one account, one restaurant.",
          "Invisiko is built for a single independent takeaway or small restaurant. There is no multi-site or head-office view.",
        ],
      },
      {
        id: "phones",
        // Verify against the final store listings before launch (§9.9).
        question: "Which phones does it work on?",
        answer: [
          "Android phones and iPhones. iPad is not supported.",
          "Invisiko is a mobile app; your team uses the phones they already have.",
        ],
      },
      {
        id: "web-dashboard",
        question: "Is there a web dashboard?",
        answer: [
          "No. Everything, including the manager's side, happens in the mobile app.",
          "The rota, pay periods, purchase history and documents are all on the manager's phone.",
        ],
        link: { href: "/how-it-works", label: "See what setting it up involves" },
      },
      {
        id: "cost",
        // [[PRICE]] — replace once pricing exists (§14 Q8). Never invent a figure.
        question: "What does it cost?",
        answer: [
          "Pricing has not been published yet.",
          "Request access and ask us — we will answer directly.",
        ],
        link: { href: "/contact", label: "Request access" },
      },
    ],
  },
  {
    id: "staff",
    title: "Staff and attendance",
    items: [
      {
        id: "check-in",
        question: "How does the check-in know someone is actually there?",
        answer: [
          "It checks where the phone says it is. Staff scan a QR code printed at your door, and the phone sends its position with the scan.",
          "Invisiko works out the distance from your venue. Outside the radius you set — 100 metres unless you change it — the check-in is refused, and the message says how far away the phone is.",
          "It relies on the position the phone reports, so it is a check rather than a guarantee. Location is read once, at check-in or check-out, and never tracked continuously.",
        ],
        link: { href: "/features/attendance", label: "How attendance works" },
      },
      {
        id: "staff-accounts",
        question: "How do staff join?",
        answer: [
          "With one invite code you share. Staff install the app, choose to join a team, and enter the eight-character code.",
          "A staff code works for the whole team until you regenerate it, and expires after 14 days. Each person then sets their own name, email and password.",
        ],
      },
      {
        id: "corrections",
        question: "Can a manager change someone's hours?",
        answer: [
          "Yes, and the change stays visible. A manager can correct an attendance record, and it is kept marked as a manual override rather than silently rewritten.",
          "Staff can also add their own note to their own check-in.",
        ],
        link: { href: "/features/attendance", label: "Attendance & rota" },
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance records",
    items: [
      {
        id: "documents",
        question: "Who can see our licences and certificates?",
        answer: [
          "Managers only. Staff have no access to the document vault — there is no route to it from a staff account.",
          "Permissions are enforced on Invisiko's server, not just hidden in the app.",
        ],
        link: { href: "/features/compliance", label: "Compliance records" },
      },
      {
        id: "missed-checks",
        question: "Will it tell me if a check is missed?",
        answer: [
          "No, not today. Invisiko records the checks that were done — who did each one, when, and any note — and you can open the history at any time.",
          "It does not send an alert when a check is missed or overdue, and a checklist item has no \"failed\" state. A fridge reading above its recommended maximum is recorded and shown clearly.",
        ],
        link: { href: "/features/compliance", label: "What the compliance records cover" },
      },
    ],
  },
  {
    id: "invoices",
    title: "Invoice scanning",
    items: [
      {
        id: "misread",
        question: "What happens if the invoice scanning misreads something?",
        answer: [
          "You correct it before it counts. Every scanned invoice is a draft until a person reviews it.",
          "Each line has to be matched to one of your stock items, and nothing reaches your stock or spend until someone presses Confirm. Lines whose price could not be read are counted separately rather than treated as zero.",
          "If an invoice cannot be read at all, the upload is kept so the lines can be entered by hand.",
        ],
        link: { href: "/features/invoice-scanning", label: "How the scanning works" },
      },
      {
        id: "pdf",
        question: "Can it read PDF invoices from suppliers?",
        answer: [
          "Yes. Upload the PDF, or photograph a paper delivery note, or pick a photo from the gallery.",
          "PDF pages that carry their own text are read as text rather than as pictures.",
        ],
        link: { href: "/features/invoice-scanning", label: "Invoice scanning" },
      },
      {
        id: "credit-notes",
        question: "What about credit notes?",
        answer: [
          "Credit notes are recognised and applied as returns, not deliveries.",
          "Stock goes down rather than up, and the spend figures reflect the credit.",
        ],
      },
      {
        id: "duplicates",
        question: "What if the same invoice is scanned twice?",
        answer: [
          "An identical file is caught before it is read. It is marked as a duplicate and not read again.",
          "A different file carrying an invoice number already seen for that supplier is still read, but flagged so you can compare the two.",
        ],
      },
    ],
  },
  {
    id: "data",
    title: "Data and privacy",
    items: [
      {
        id: "storage",
        question: "Where is our data stored?",
        answer: [
          "Records are kept in a PostgreSQL database, and uploaded files are kept in private Amazon S3 storage that is opened only through links that expire.",
          "The app is hosted on Render and the database on Neon. Invoice images are sent to OpenAI to be read.",
          "Your restaurant controls its account and its data. Personal data is not sold and not used for advertising.",
        ],
        link: { href: "/privacy", label: "Privacy" },
      },
    ],
  },
];

export const allFaqs: FaqItem[] = faqGroups.flatMap((group) => group.items);

export function faqsById(ids: string[]): FaqItem[] {
  return ids.map((id) => {
    const item = allFaqs.find((faq) => faq.id === id);
    if (!item) throw new Error(`Unknown FAQ id: ${id}`);
    return item;
  });
}
