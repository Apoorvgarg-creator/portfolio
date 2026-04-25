import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CRTOverlay from "@/components/effects/CRTOverlay";
import ClientLayout from "@/components/layout/ClientLayout";
import InteractiveShell from "@/components/terminal/InteractiveShell";
import { SITE_CONFIG } from "@/lib/constants";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Apoorv Garg — Software Engineer, Django Software Foundation Member, Open Source Contributor",
    template: "%s — Apoorv Garg",
  },
  description:
    "Apoorv Garg is a software engineer with 3+ years of experience across Wells Fargo, Resilient AI, Deloitte, and Code for GovTech. Django Software Foundation member, JdeRobot GSoC org admin, and builder of developer tools for observability, Loki, and local-first apps.",
  keywords: [
    "Apoorv Garg",
    "Apoorv Garg portfolio",
    "Apoorv Garg software engineer",
    "Apoorv Garg Django",
    "Apoorv Garg Wells Fargo",
    "Apoorv Garg GSoC",
    "Apoorv Garg JdeRobot",
    "Django Software Foundation",
    "Google Summer of Code",
    "open source contributor",
    "observability engineer",
    "Loki LogQL",
    "Flutter engineer",
    "Kafka microservices",
    "developer tools",
  ],
  authors: [{ name: "Apoorv Garg", url: SITE_CONFIG.url }],
  creator: "Apoorv Garg",
  publisher: "Apoorv Garg",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title:
      "Apoorv Garg — Software Engineer, Django Software Foundation Member",
    description:
      "Software engineer, Django Software Foundation member, JdeRobot GSoC org admin, and open source contributor. Building developer tools for observability, Loki, and local-first apps.",
    siteName: "Apoorv Garg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apoorv Garg — Software Engineer & Open Source Contributor",
    description:
      "Software engineer with 3+ years at Wells Fargo, Resilient AI, Deloitte, and Code for GovTech. Django Software Foundation member. JdeRobot GSoC org admin.",
    creator: "@apoorv_garg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Apoorv Garg",
  url: SITE_CONFIG.url,
  jobTitle: "Software Engineer",
  email: "mailto:apoorvgarg.ms@gmail.com",
  image: `${SITE_CONFIG.url}/og-image.png`,
  sameAs: [
    "https://github.com/Apoorvgarg-creator",
    "https://www.linkedin.com/in/apoorv-garg-/",
    "https://apoorvgarg.in",
    "https://topmate.io/apoorv_garg",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Netaji Subhas University of Technology",
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "Wells Fargo",
  },
  memberOf: [
    {
      "@type": "Organization",
      name: "Django Software Foundation",
      url: "https://www.djangoproject.com/foundation/",
    },
    {
      "@type": "Organization",
      name: "JdeRobot",
      url: "https://jderobot.github.io/",
    },
  ],
  knowsAbout: [
    "Python",
    "Django",
    "Golang",
    "Flutter",
    "React",
    "Kafka",
    "Microservices",
    "Observability",
    "Loki",
    "Grafana",
    "Postgres",
    "MongoDB",
    "DuckDB",
    "Docker",
    "AWS",
    "Infrastructure as Code",
    "Open Source",
    "ElectricSQL",
    "Robotics",
  ],
  description:
    "Software engineer with 3+ years of experience across Wells Fargo, Resilient AI, Deloitte, and Code for GovTech. Django Software Foundation member, JdeRobot GSoC org admin, and builder of open-source developer tools for observability and local-first apps.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Apoorv Garg",
  url: SITE_CONFIG.url,
  author: { "@type": "Person", name: "Apoorv Garg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono bg-terminal-black text-terminal-text antialiased">
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(personJsonLd)}
        </Script>
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteJsonLd)}
        </Script>
        <CRTOverlay />
        <ClientLayout>
          <Navbar />
          <main className="pt-12">{children}</main>
          <Footer />
          <InteractiveShell />
        </ClientLayout>
      </body>
    </html>
  );
}
