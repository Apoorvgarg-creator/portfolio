"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import GlitchText from "@/components/effects/GlitchText";
import ScrollReveal from "@/components/effects/ScrollReveal";

type Highlight = { action: string; detail: string };
type Metric = { value: string; label: string; tone?: "green" | "amber" };

type Role = {
  company: string;
  title: string;
  dates: string;
  tagline: string;
  metrics: Metric[];
  highlights: Highlight[];
  stack: string[];
};

const ROLES: Role[] = [
  {
    company: "Observal",
    title: "Community Manager · Open Source Contributor",
    dates: "2025 – Present",
    tagline:
      "Run the contributor community and ship platform features for Observal — the observability platform & marketplace for MCP servers. Built the install paths, diagnostics, and the no-lock-in migration story.",
    metrics: [
      { value: "pip + brew", label: "install paths", tone: "amber" },
      { value: "0", label: "cloud vendor lock-in", tone: "green" },
      { value: "Playground", label: "try before install", tone: "amber" },
      { value: "GitBooks", label: "discoverable docs", tone: "green" },
    ],
    highlights: [
      {
        action: "Run the contributor community",
        detail:
          "triage GitHub Discussions, shepherd first-time contributors, drive release cadence, and keep the project responsive to its users — turning a fresh repo into a working community.",
      },
      {
        action: "Shipped pip + brew install paths",
        detail:
          "frictionless onboarding across Python and macOS ecosystems — go from zero to running observability with one command instead of a README full of steps.",
      },
      {
        action: "Built diagnostic support",
        detail:
          "surfaces health, configuration, and connectivity signals so users self-diagnose before opening an issue — cuts triage time and lifts first-run success rate.",
      },
      {
        action: "Added a playground feature",
        detail:
          "try-before-install workflow that lets users explore Observal interactively without committing to a local setup — turned the docs into a hands-on demo.",
      },
      {
        action: "Designed import/export for cloud-vendor migration",
        detail:
          "users can move state across providers without lock-in — switch vendors without losing telemetry, dashboards, or config. Direct counter to the standard observability lock-in story.",
      },
      {
        action: "Authored GitBooks documentation",
        detail:
          "navigable, searchable docs that lowered the bar for new users and contributors — shipped alongside the product, not as an afterthought.",
      },
    ],
    stack: [
      "MCP",
      "Observability",
      "Python",
      "Homebrew",
      "pip",
      "GitBook",
      "Diagnostics",
      "Open Source",
      "Community",
    ],
  },
  {
    company: "Wells Fargo",
    title: "Software Engineer",
    dates: "Aug 2023 – Aug 2025",
    tagline:
      "Hardened a tier-1 banking microservices platform — async + Kafka with idempotent replay, cooperative-sticky rebalance, bank-grade audit, and a no-data-loss guarantee.",
    metrics: [
      { value: "0", label: "data-loss events", tone: "green" },
      { value: "Tier-1", label: "banking platform", tone: "amber" },
      { value: "Bank-grade", label: "audit + dual-control", tone: "amber" },
      { value: "Live", label: "config without redeploy", tone: "green" },
    ],
    highlights: [
      {
        action: "Solved at-least-once delivery the right way",
        detail:
          "manual offset commits gated on the DB transaction commit, business-key-based dedup so retries collapse to a single effect, and explicit poison-message detection so a bad payload couldn't stall a partition.",
      },
      {
        action: "Killed stop-the-world rebalance pauses",
        detail:
          "moved the consumer group to cooperative-sticky assignment, kept per-partition concurrency bounded, and removed the long-tail latency spikes during scale events and rolling deploys.",
      },
      {
        action: "Designed bounded backpressure across the handler",
        detail:
          "per-partition worker pools with bounded queues so a slow downstream couldn't blow up memory or starve healthy partitions — a well-behaved tail under load.",
      },
      {
        action: "Built DLQ + a replay path engineers actually trusted",
        detail:
          "tagged messages with reproducible idempotency keys, separated retryable vs poison failures, and exposed an operator-driven replay so safe re-runs never double-wrote.",
      },
      {
        action: "Operated to bank-grade controls",
        detail:
          "data-classification on every payload, dual-control deploys, immutable audit hooks across the pipeline, and regulator-aligned SLAs baked into the handler contract.",
      },
      {
        action: "Shipped a Redis + DB driven configurable frontend",
        detail:
          "let business + product teams change UI flows live without redeploys — collapsed the change-request loop from days to hours.",
      },
      {
        action: "Built a real-time jobs & schedulers dashboard",
        detail:
          "surfaced retry state, consumer lag, and SLAs in one pane so on-call could find the bad partition in seconds, not minutes.",
      },
      {
        action: "Shipped an AI assistant for support queries",
        detail:
          "deflected common questions away from engineers and lifted self-serve resolution.",
      },
    ],
    stack: [
      "Microservices",
      "Kafka",
      "Async/Concurrency",
      "Cooperative-Sticky",
      "Idempotency",
      "DLQ + Replay",
      "Redis",
      "Bank-grade Audit",
      "Observability",
    ],
  },
  {
    company: "Resilient AI",
    title: "Founding Engineer · 4th employee, 1st engineer",
    dates: "Nov 2021 – Aug 2023",
    tagline:
      "First engineer at a credit-risk startup — designed the 100+ branch decisioning engine, built the Django backend, and rebuilt mobile in Flutter on a local-first Postgres + custom sync stack.",
    metrics: [
      { value: "−20%", label: "infra cost", tone: "green" },
      { value: "+35%", label: "app functionality", tone: "green" },
      { value: "100+", label: "rule-engine branches", tone: "amber" },
      { value: "0→1", label: "engineering org", tone: "amber" },
      { value: "Offline-first", label: "mobile", tone: "green" },
    ],
    highlights: [
      {
        action: "Designed a 100+ branch credit-risk decisioning engine",
        detail:
          "modular logic graph with hot-loadable policies — no redeploy per rule change, deterministic replay against a decision log, and a clean seam between policy authors and engineers. Became the core decisioning brain of the product.",
      },
      {
        action: "Rebuilt mobile in Flutter on a local-first Postgres + custom sync engine",
        detail:
          "rejected Hive/Drift/Isar — credit applications need transactional integrity offline. Wrote a delta-based sync protocol with per-row vector clocks, server-canonical conflict resolution for decisioning fields, last-writer-wins for user-editable form state, and on-device schema migrations that survived stale clients across releases.",
      },
      {
        action: "Made auth survive the offline boundary",
        detail:
          "refresh-token rotation that buffered offline and reconciled cleanly on reconnect without locking users out mid-application — paired with SSL pinning, masked alternate numbers, and privacy APIs to clear compliance.",
      },
      {
        action: "Cut infrastructure spend by 20%",
        detail:
          "auto-scaling tuned against a capacity-reservation ratio so we paid for steady-state and burst, not peak — re-shaped instance lifecycle to match real traffic curves.",
      },
      {
        action: "Lifted app functionality by 35% with a Firebase + network-service wrapper",
        detail:
          "centralized retries, exponential backoff with jitter, structured logging, request signing, and JSON contract enforcement — became the standard transport for every new feature.",
      },
      {
        action: "Shipped Account Aggregator, Hinglish, customer verification, processing fees",
        detail:
          "owned scoping, design, and delivery in tight collaboration with UI/UX — directly drove activation and conversion.",
      },
      {
        action: "Founded the engineering org",
        detail:
          "built the Django + Python backend from scratch, owned infra-as-code, led KTs and onboarding for every engineer who joined after me.",
      },
    ],
    stack: [
      "Django",
      "Python",
      "Flutter",
      "Local-first Postgres",
      "Custom Sync Engine",
      "Vector Clocks",
      "MongoDB",
      "Firebase",
      "AWS",
      "Infra-as-Code",
    ],
  },
  {
    company: "Code for GovTech (C4GT)",
    title: "Open Source Intern · ELEVATE",
    dates: "Jun 2023 – Aug 2023",
    tagline:
      "Multi-tenant template portal for government programs — versioned, RBAC-gated, and backward-compatible across schema migrations.",
    metrics: [
      { value: "Multi-tenant", label: "many programs, one portal", tone: "amber" },
      { value: "0", label: "data-breakage on migration", tone: "green" },
      { value: "RBAC", label: "non-tech program owners", tone: "amber" },
    ],
    highlights: [
      {
        action: "Built a multi-tenant Configurable Template Creation Portal",
        detail:
          "single portal, many government programs — tenant isolation at the data layer, per-tenant template namespacing, and clean upgrade paths so one program's release couldn't poison another's.",
      },
      {
        action: "Versioned the entire frontend template",
        detail:
          "every form definition was a versioned artifact — program owners could publish changes dynamically without a redeploy and roll back safely if a release misbehaved.",
      },
      {
        action: "Maintained backward compatibility for in-flight forms",
        detail:
          "old submissions stayed valid as schemas evolved; designed an old → new migration path with explicit per-field transformation rules and minimum data breakage for active applicants.",
      },
      {
        action: "Modeled the form lifecycle as a state machine",
        detail:
          "draft → review → publish → deprecate with auditable transitions and tenant-scoped permissions across each step.",
      },
      {
        action: "Shipped role-based access for non-technical owners",
        detail:
          "program owners got authoring + publishing rights without engineering approvals; engineers retained schema-level control and audit access.",
      },
    ],
    stack: [
      "Angular",
      "Flask",
      "MongoDB",
      "Multi-tenant",
      "RBAC",
      "Schema Versioning",
      "Public-Tech",
    ],
  },
  {
    company: "Google Summer of Code · JdeRobot",
    title: "Student → Mentor → Org Admin",
    dates: "May 2022 – Present",
    tagline:
      "Promoted student → Org Admin. Patched the WebRTC/WebGL bridge, ROS-over-WebSockets, M1/M2 Docker, and the React + Django + RADI integration to unlock 26 modern exercises.",
    metrics: [
      { value: "+50%", label: "learner retention", tone: "green" },
      { value: "26", label: "exercises migrated", tone: "amber" },
      { value: "Org", label: "Admin (current)", tone: "green" },
      { value: "M1/M2", label: "first compatible image", tone: "amber" },
    ],
    highlights: [
      {
        action: "Patched the WebRTC/WebGL bridge",
        detail:
          "browser ↔ simulator video stream with frame-accurate input wiring — the seam most exercises broke at, especially under bursty user input and tab visibility changes.",
      },
      {
        action: "Shipped Gazebo/ROS over WebSockets",
        detail:
          "kept robot state, sim time, and topic streams in sync between the browser and a containerized ROS world — without dropping events or letting the sim clock drift from wall clock.",
      },
      {
        action: "Solved Docker on Apple Silicon (M1/M2)",
        detail:
          "cross-arch image builds, ROS toolchain compatibility, and the graphical stack inside the container — the first M1/M2-compatible Robotics Academy image, unblocking learners on modern Macs.",
      },
      {
        action: "Integrated React with Django + the RADI backend",
        detail:
          "unified the exercise runtime — single React shell against a Django + RADI control plane, replacing 26 hand-coded vanilla-JS exercise apps with shared primitives.",
      },
      {
        action: "Migrated 26 exercises (vanilla JS → React)",
        detail:
          "lifted learner retention by 50% via faster, consistent UX, lazy-loaded simulators, and recovered state across navigations.",
      },
      {
        action: "Now Org Admin for JdeRobot",
        detail:
          "shepherding GSoC + Google Season of Docs cohorts, mentoring contributors, reviewing proposals, and shipping platform patches across the org.",
      },
    ],
    stack: [
      "React",
      "Django",
      "WebRTC",
      "WebGL",
      "WebSockets",
      "Docker (M1/M2)",
      "ROS",
      "Gazebo",
      "Open Source",
    ],
  },
  {
    company: "Deloitte",
    title: "Summer Intern",
    dates: "May 2022 – Jul 2022",
    tagline:
      "Document-intelligence app on Azure — picked the model after benchmarking, built a pre-processing pipeline that lifted accuracy, and halved both processing and deploy time.",
    metrics: [
      { value: "−50%", label: "doc processing time", tone: "green" },
      { value: "−50%", label: "deployment time", tone: "green" },
      { value: "Benchmarked", label: "model selection", tone: "amber" },
    ],
    highlights: [
      {
        action: "Picked Azure Form Recognizer after benchmarking",
        detail:
          "evaluated competing OCR + layout-extraction models against the firm's real document corpus — measured accuracy, latency, and cost per page before committing, so the choice survived a real production load.",
      },
      {
        action: "Built a pre-processing pipeline that lifted accuracy",
        detail:
          "deskew, denoise, and layout segmentation upstream of the model — turned noisy scanned PDFs into clean inputs and cut downstream re-runs.",
      },
      {
        action: "Cut document processing time by 50%",
        detail:
          "Form Recognizer + the pre-processing pipeline + parallel page handling — fewer round-trips, fewer reruns, faster end-to-end.",
      },
      {
        action: "Cut deployment time by 50% with full CI/CD",
        detail:
          "environment promotion gates, automated infra provisioning, and deterministic builds — release cadence stopped being a bottleneck.",
      },
      {
        action: "Shipped the document-intelligence app end-to-end",
        detail:
          "ASP.NET / MVC / React / Azure Cognitive Services / MongoDB — owned everything from data plumbing to UI.",
      },
    ],
    stack: [
      "ASP.NET",
      "React",
      "Azure Cognitive Services",
      "Form Recognizer",
      "OCR",
      "MongoDB",
      "CI/CD",
    ],
  },
];

const OSS_ITEMS = [
  {
    title: "Django Software Foundation",
    role: "Individual Member",
    detail: "Member of the foundation that stewards Django.",
  },
  {
    title: "JdeRobot",
    role: "Maintainer · GSoC Org Admin · GSoD",
    detail:
      "M1/M2 Docker images for Robotics Academy. Web → desktop migration. Mentor & admin.",
  },
  {
    title: "Grafana Friends & Meetup",
    role: "Organizer",
    detail: "Local meetups on observability, Loki, and the Grafana stack.",
  },
  {
    title: "Amazon ML Summer School",
    role: "Selected Cohort",
    detail:
      "Amazon's applied-ML program — probabilistic models, deep learning, large-scale ML systems.",
  },
];

function MetricChip({ value, label, tone = "green" }: Metric) {
  const toneCls =
    tone === "amber"
      ? "border-terminal-amber/40 text-terminal-amber"
      : "border-terminal-green/40 text-terminal-green";
  return (
    <div
      className={`inline-flex items-baseline gap-2 px-2.5 py-1 border ${toneCls} bg-terminal-black`}
    >
      <span className="text-glow font-bold tabular-nums">{value}</span>
      <span className="text-[10px] text-terminal-text/70 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function StackPill({ name }: { name: string }) {
  return (
    <span className="px-2 py-0.5 border border-terminal-border text-[10px] text-terminal-text/70">
      {name}
    </span>
  );
}

function RoleCard({ role }: { role: Role }) {
  return (
    <div className="border border-terminal-border bg-terminal-black/60 p-5 hover:border-terminal-green/40 transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-terminal-green text-glow font-bold text-base">
          {role.company}
        </h3>
        <span className="text-terminal-text/90 text-xs">{role.title}</span>
        <span className="text-terminal-dim text-xs ml-auto whitespace-nowrap">
          {role.dates}
        </span>
      </div>

      {/* Tagline */}
      <p className="mt-2 text-terminal-amber/90 text-sm italic leading-relaxed">
        {role.tagline}
      </p>

      {/* Metrics row */}
      <div className="mt-3 flex flex-wrap gap-2">
        {role.metrics.map((m) => (
          <MetricChip key={m.label} {...m} />
        ))}
      </div>

      {/* Highlights */}
      <ul className="mt-4 space-y-2">
        {role.highlights.map((h) => (
          <li key={h.action} className="flex gap-2 text-xs leading-relaxed">
            <span className="text-terminal-green shrink-0 mt-0.5">▸</span>
            <span className="text-terminal-text/85">
              <span className="text-terminal-text font-bold">{h.action}</span>
              <span className="text-terminal-text/70"> — {h.detail}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {role.stack.map((t) => (
          <StackPill key={t} name={t} />
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <ScrollReveal>
        <GlitchText
          text="// experience"
          as="h2"
          className="text-2xl text-terminal-green text-glow mb-2"
        />
        <p className="text-terminal-dim text-sm mb-8">
          visitor@apoorv:~$ cat ~/experience.log{" "}
          <span className="text-terminal-green">|</span> grep -i impact
        </p>
      </ScrollReveal>

      {/* Stat strip */}
      <ScrollReveal delay={0.05}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { v: "3+", l: "yrs shipping prod" },
            { v: "0→1", l: "founding engineer" },
            { v: "GSoC", l: "Org Admin · JdeRobot" },
            { v: "DSF", l: "Django Foundation member" },
          ].map((s) => (
            <div
              key={s.l}
              className="border border-terminal-border bg-terminal-black p-3 text-center"
            >
              <div className="text-terminal-green text-glow text-xl font-bold tabular-nums">
                {s.v}
              </div>
              <div className="text-[10px] text-terminal-text/60 uppercase tracking-wider mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Roles */}
      <div className="space-y-4">
        {ROLES.map((role, i) => (
          <ScrollReveal key={role.company} delay={0.05 + i * 0.05}>
            <RoleCard role={role} />
          </ScrollReveal>
        ))}
      </div>

      {/* OSS + Education side-by-side */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <ScrollReveal delay={0.1}>
          <TerminalWindow title="opensource.log">
            <div className="space-y-4 mt-1">
              {OSS_ITEMS.map((item) => (
                <div key={item.title}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-terminal-green text-glow font-bold text-sm">
                      {item.title}
                    </span>
                    <span className="text-terminal-amber text-[10px]">
                      [{item.role}]
                    </span>
                  </div>
                  <p className="text-terminal-text/70 text-xs mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <TerminalWindow title="education.log">
            <div className="mt-1">
              <p className="text-terminal-green text-glow font-bold text-sm">
                Bachelor of Technology
              </p>
              <p className="text-terminal-text/80 text-xs mt-1">
                Netaji Subhas University of Technology
              </p>
              <p className="text-terminal-dim text-xs mt-1">
                2019 – 2023
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <MetricChip value="8.57" label="CGPA / 10" tone="green" />
                <MetricChip
                  value="Distinction"
                  label="First Division"
                  tone="amber"
                />
              </div>
            </div>
          </TerminalWindow>

          <div className="mt-4">
            <TerminalWindow title="interests">
              <div className="text-xs text-terminal-text/80 grid grid-cols-2 gap-1 mt-1">
                {[
                  "open-source",
                  "django",
                  "observability",
                  "developer-tools",
                  "mobile",
                  "infrastructure",
                  "badminton",
                  "bouldering",
                  "lego",
                ].map((i) => (
                  <span key={i}>
                    <span className="text-terminal-green">drwxr-xr-x</span>{" "}
                    <span className="text-terminal-amber">{i}/</span>
                  </span>
                ))}
              </div>
            </TerminalWindow>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
