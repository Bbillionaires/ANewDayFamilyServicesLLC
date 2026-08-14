export const siteConfig = {
  name: "A New Day Family Services LLC",
  shortName: "A New Day Family Services",
  tagline: "A safe, neutral new day for every family in Northeast Florida.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.anewdayfamilyservices.com",
  serviceArea: "Northeast Florida",
  serviceAreaCounties: ["Duval", "Clay", "St. Johns", "Nassau", "Baker"],
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "(904) 270-9463",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Info@anewdayfamilyservices.com",
  addressLocality: "Jacksonville, FL",
  developerCredit: {
    name: "De'Aris Henry",
    label: "Powered by web developer De'Aris Henry",
  },
  social: {
    facebook: "",
    instagram: "",
  },
} as const;

export const coreValues = [
  {
    name: "Neutrality",
    description:
      "We provide supervised visitation that is unbiased toward every parent, caregiver, and agency — ensuring no parent has power over the other when it comes to the child's safety and wellbeing.",
  },
  {
    name: "Safety",
    description:
      "We create a structured, secure environment where children and families can interact without fear, conflict, or pressure.",
  },
  {
    name: "Respect",
    description:
      "We treat every family with dignity, listening without judgment and honoring each person's background and culture.",
  },
  {
    name: "Advocacy",
    description:
      "We stand up for families in need by helping them access services, understand systems, and feel supported during difficult times.",
  },
  {
    name: "Professionalism",
    description:
      "With more than 10 years of combined experience in the mental health field, our team follows high ethical standards, clear boundaries, and consistent procedures in every visit.",
  },
  {
    name: "Compassion",
    description:
      "We approach every family with empathy and patience, recognizing that supervised visitation often happens during stressful and emotional times.",
  },
  {
    name: "Collaboration",
    description:
      "We work closely with courts, DCF, therapists, and other community partners so families receive coordinated, consistent support.",
  },
] as const;

export const services = [
  {
    slug: "supervised-visitation",
    name: "Supervised Visitation",
    summary:
      "Court-ordered, DCF-referred, or privately arranged visits monitored by a trained, neutral professional in a structured setting.",
    keywords: ["court-ordered supervised visitation Jacksonville", "DCF supervised visitation Florida"],
  },
  {
    slug: "monitored-exchanges",
    name: "Monitored Child Exchanges",
    summary:
      "A conflict-free handoff between caregivers at a set time and neutral location, so children never witness parental conflict at the transfer.",
    keywords: ["monitored custody exchange Northeast Florida", "safe child exchange Jacksonville"],
  },
  {
    slug: "therapeutic-visitation",
    name: "Therapeutic & Trauma-Informed Visitation",
    summary:
      "Trauma-informed support for families rebuilding trust after crisis, separation, or a period of no contact — grounded in over a decade of combined mental health experience.",
    keywords: ["therapeutic supervised visitation Florida", "trauma-informed family services Jacksonville"],
  },
  {
    slug: "court-documentation",
    name: "Court & DCF Documentation",
    summary:
      "Clear, objective visit notes and reports prepared for family court, DCF case managers, and attorneys on every scheduled visit.",
    keywords: ["supervised visitation court report Florida", "DCF visitation documentation"],
  },
] as const;

export const faqs = [
  {
    question: "What is supervised visitation and who is it for?",
    answer:
      "Supervised visitation is a court-ordered, DCF-referred, or privately arranged service where a trained, neutral professional is present during time between a child and a parent or caregiver. It's used when a court, DCF, or the family itself wants a safe, documented, conflict-free way to maintain or rebuild the parent-child relationship.",
  },
  {
    question: "Do you take sides between parents?",
    answer:
      "No. A New Day Family Services LLC remains completely neutral and unbiased toward every parent, caregiver, and agency involved. We observe, document, and support healthy interaction — we never advocate for one parent over another.",
  },
  {
    question: "What areas of Florida do you serve?",
    answer:
      "We serve families across Northeast Florida, including Duval, Clay, St. Johns, Nassau, and Baker counties.",
  },
  {
    question: "How do I get started with a referral or custody order?",
    answer:
      "Reach out through our contact information with your court order, DCF referral, or private request, and we'll walk you through intake, scheduling, and documentation requirements.",
  },
  {
    question: "What if a family can't afford the full cost of visitation services?",
    answer:
      "Our Family Visitation Sponsorship Fund, supported by community donations, helps cover fees for families who qualify. Visit the Donate page to contribute or to ask about sponsorship eligibility.",
  },
] as const;
