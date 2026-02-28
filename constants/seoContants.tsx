import { Metadata } from "next";

// 1. Core Configuration Constants
export const SITE_NAME = "Condacton Technologies Limited";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://Condacton. Technologiesl"; // Update with actual URL
export const TWITTER_HANDLE = "@Condacton Technologiesl";

interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  url?: string;
  ogImage?: string;
  noIndex?: boolean;
}
// 2. The SEO Database
export const SEODATA: Record<string, SEOConfig> = {
  default: {
    title: `${SITE_NAME} | Empowering Businesses Through Technology`,
    description:
      "Condacton Technologies Limited Ltd provides cutting-edge software development, AI integration, and  Technologiesl transformation strategies to scale modern enterprises.",
    keywords: [
      "Condacton  Technologiesl",
      "Software Development Nigeria",
      " Technologiesl Transformation",
      "AI Solutions for Business",
      "Tech Consulting Africa",
      "Custom Web Applications",
    ],
    url: SITE_URL,
    ogImage: `${SITE_URL}/og-main.png`, // Recommended: 1200x630px image
  },
  home: {
    title: `${SITE_NAME} | Leading  Technologiesl Solutions & Tech Excellence`,
    description:
      "Innovate and grow with Condacton. We build high-performance  Technologiesl products, from mobile apps to enterprise AI systems, tailored to your business needs.",
    keywords: [
      "Mobile App Development",
      "Enterprise Software",
      "Cloud Computing Solutions",
      "UI/UX Design Agency",
      "Product Engineering",
      " Technologiesl Innovation Hub",
    ],
    url: SITE_URL,
  },
  services: {
    title: `Our  Technologiesl Services | Custom Tech Solutions at ${SITE_NAME}`,
    description:
      "From custom software engineering to data analytics and cybersecurity, explore our comprehensive suite of  Technologiesl innovation services.",
    keywords: [
      "Fullstack Development",
      "Machine Learning Services",
      "Cybersecurity Consulting",
      "SaaS Development",
      " Technologiesl Marketing Strategy",
    ],
  },
  portfolio: {
    title: `Our Projects | Success Stories by ${SITE_NAME}`,
    description:
      "Explore our portfolio of successful  Technologiesl transformations. See how we help brands achieve tech-driven growth.",
    keywords: [
      "Tech Case Studies",
      "Software Portfolio",
      "Client Success Stories",
      " Technologiesl Impact Projects",
    ],
  },
  consultation: {
    title: `Book a Strategy Session | Tech Consulting at ${SITE_NAME}`,
    description:
      "Ready to transform your business? Schedule a consultation with our  Technologiesl experts today to map out your innovation roadmap.",
    keywords: [
      "Tech Consultation",
      "Business Strategy",
      " Technologiesl Audit",
      "Hire Developers",
    ],
  },
  login: {
    title: `Client Portal Login | ${SITE_NAME}`,
    description:
      "Access your Condacton client dashboard to track project progress, manage subscriptions, and collaborate with your dev team.",
    keywords: [
      "Client login",
      "Project tracking portal",
      "Condacton dashboard access",
    ],
  },
  register: {
    title: `Partner with Us | Join ${SITE_NAME}`,
    description:
      "Create an account to start your project journey with Condacton Technologies Limited and access premium tech resources.",
    keywords: [
      "Get started with Condacton",
      "Project onboarding",
      " Technologiesl partnership",
    ],
  },
  user_dashboard: {
    title: `Client Dashboard | ${SITE_NAME}`,
    description:
      "Real-time overview of project milestones, technical support tickets, and innovation metrics.",
    keywords: [
      "Milestone tracking",
      "Tech support dashboard",
      "Project management",
    ],
    noIndex: true,
  },
};

/**
 * Helper to generate Next.js Metadata objects
 */
export function constructMetadata(
  pageKey: keyof typeof SEODATA = "default",
): Metadata {
  const config = SEODATA[pageKey] || SEODATA.default;

  // Merge page-specific keywords with default brand keywords
  const allKeywords = Array.from(
    new Set([...config.keywords, ...SEODATA.default.keywords]),
  );

  return {
    title: config.title,
    description: config.description,
    keywords: allKeywords.join(", "),
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url || SITE_URL,
      siteName: SITE_NAME,
      images: [{ url: config.ogImage || SEODATA.default.ogImage! }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      creator: TWITTER_HANDLE,
      images: [config.ogImage || SEODATA.default.ogImage!],
    },
    robots: config.noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: config.url || SITE_URL,
    },
  };
}
