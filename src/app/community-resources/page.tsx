import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Community Resources for Northeast Florida Families",
  description:
    "A curated directory of family court, DCF, legal aid, domestic violence, and co-parenting resources for families across Northeast Florida.",
  alternates: { canonical: "/community-resources" },
};

type Resource = { name: string; detail: string; phone?: string; url: string };
type Category = { title: string; resources: Resource[] };

const categories: Category[] = [
  {
    title: "Family Court & Legal Self-Help",
    resources: [
      {
        name: "Duval County Family Court Services",
        detail: "Walk-in family court help, 501 W Adams St, 2nd Floor, Jacksonville, FL 32202.",
        url: "https://www.duvalclerk.com/departments/civil-court-services/family-law",
      },
      {
        name: "Florida Courts Family Law Self-Help Forms",
        detail: "Free state forms for custody, visitation, child support, and domestic violence — usable without an attorney.",
        url: "https://www.flcourts.gov/Services/Family-Courts/self-help-information",
      },
      {
        name: "Jacksonville Area Legal Aid",
        detail: "Free civil legal help for qualifying families, including family law matters.",
        phone: "(904) 356-8371",
        url: "https://www.jaxlegalaid.org/",
      },
    ],
  },
  {
    title: "DCF & Child Welfare",
    resources: [
      {
        name: "Florida Department of Children and Families (DCF)",
        detail: "Child welfare, dependency case information, foster care, and family support services statewide.",
        url: "https://www.myflfamilies.com/",
      },
      {
        name: "Florida Abuse Hotline",
        detail: "Report suspected child abuse, neglect, or abandonment — available 24/7.",
        phone: "1-800-96-ABUSE (1-800-962-2873)",
        url: "https://www.myflfamilies.com/abuse-hotline",
      },
    ],
  },
  {
    title: "Domestic Violence & Safety",
    resources: [
      {
        name: "Hubbard House",
        detail: "Domestic violence shelter, safety planning, and advocacy serving Northeast Florida.",
        phone: "(904) 354-3114",
        url: "https://www.hubbardhouse.org/",
      },
      {
        name: "National Domestic Violence Hotline",
        detail: "24/7 confidential support for anyone experiencing domestic violence.",
        phone: "1-800-799-7233",
        url: "https://www.thehotline.org/",
      },
    ],
  },
  {
    title: "Counseling, Co-Parenting & Basic Needs",
    resources: [
      {
        name: "211 Northeast Florida",
        detail: "Free, confidential referral line for housing, food, counseling, and other family support services.",
        phone: "211",
        url: "https://www.211unitedway.org/",
      },
      {
        name: "Jewish Family & Community Services (JFCS) Jacksonville",
        detail: "Counseling and additional supervised visitation and family support programs in Jacksonville.",
        url: "https://jfcsjax.org/",
      },
    ],
  },
];

export default function CommunityResourcesPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      <p className="section-label">Community Resources</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-harbor-900">
        Additional support for {siteConfig.serviceArea} families
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-harbor-700">
        Supervised visitation is one part of a bigger support system. Here are trusted,
        independent organizations that can help with legal questions, DCF matters, safety
        concerns, counseling, and everyday needs. {siteConfig.name} is not affiliated with these
        organizations — links are provided as a community service and open to each
        organization's own website.
      </p>

      <div className="mt-12 space-y-12">
        {categories.map((category) => (
          <div key={category.title}>
            <h2 className="font-display text-2xl font-bold text-harbor-900">{category.title}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {category.resources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-harbor-100 p-6 transition hover:border-dawn-300 hover:shadow-md"
                >
                  <h3 className="font-semibold text-harbor-900">{resource.name}</h3>
                  <p className="mt-2 text-sm text-harbor-600">{resource.detail}</p>
                  {resource.phone && (
                    <p className="mt-2 text-sm font-medium text-dawn-600">{resource.phone}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-harbor-50 p-8">
        <p className="text-sm text-harbor-600">
          If you or a child is in immediate danger, call 911. This directory is for general
          information only and is not legal advice.
        </p>
      </div>
    </div>
  );
}
