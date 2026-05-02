import { ArrowRight, CheckCircle2, ChevronRight, LayoutDashboard, MapPin, MessageCircleMore, PhoneCall, Search, UserCheck, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Seo } from "@/components/seo/Seo";
import { PageHero, SectionIntro } from "@/components/site/PageHero";
import TNMap from "@/components/site/TNMap";
import { SiteLayout, SocialLinks } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  audienceBenefits,
  brandAssets,
  contactCards,
  founders,
  geoCoverage,
  networkFlow,
  platformBenefits,
  quickStats,
  seoByPath,
  siteDescription,
} from "@/data/siteData";
import { cn } from "@/lib/utils";
import { RegisterForm } from "@/components/site/RegisterForm";
import { PromoSection } from "@/components/site/PromoSection";

const Home = () => {
  const seo = seoByPath["/"];

  const renderWorkflowCard = (step: any) => {
    const Icon = step.icon;
    return (
      <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 z-10 relative flex items-start gap-3 h-full">
        <div className="size-9 rounded-xl bg-primary/5 flex shrink-0 items-center justify-center">
          <Icon className="size-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-black text-foreground mb-1 tracking-tight">{step.title}</h3>
          <p className="text-xs font-medium text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
      </div>
    );
  };

  return (
    <SiteLayout>
      <Seo
        {...seo}
        path="/"
        image={brandAssets.tnPvcLogo}
      />

      {/* ─── Hero ─── */}
      <PageHero
        centered
        eyebrow="The future of PVC interiors is here"
        titleClassName="lg:leading-[1.4]"
        title={
          <>
            A Stronger Digital Network for <span className="text-primary">PVC Interiors</span> Across Tamil Nadu.
          </>
        }
        description="Leverage a connected digital ecosystem and community-first coordination to streamline your projects, reduce delays, and drive consistent growth across Tamil Nadu."
        actions={[
          { label: "Explore Network", to: "/network" },
          { label: "Register Profile", to: "/#register", secondary: true, icon: UserCheck }
        ]}
        bentoItems={[
          {
            image: brandAssets.heroInterior,
            title: "Modular Kitchens",
            description: "High-gloss PVC cabinetry designed for modern homes.",
            className: "md:col-span-2 md:row-span-2"
          },
          {
            image: brandAssets.bentoPvcWall,
            title: "Wall Paneling",
            description: "Sophisticated textures and durable finishes.",
            className: "md:col-span-2 md:row-span-1"
          },
          {
            image: brandAssets.bentoUpvcWindow,
            title: "UPVC Windows",
            description: "Precision-engineered architectural solutions.",
            className: "md:col-span-1 md:row-span-1"
          },
          {
            image: brandAssets.bentoInstallation,
            title: "Trade Execution",
            description: "Professional site coordination and installation.",
            className: "md:col-span-1 md:row-span-1"
          }
        ]}
      />

      {/* ─── Featured Trade Partners ─── */}
      <section className="bg-white py-10 lg:py-12 border-b border-border/40">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Featured Trade Partners</h2>
            </div>
            <Link to="/#register" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Partner with us</Link>
          </div>
          <PromoSection />
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative z-20 py-8 lg:py-10 bg-surface/50">
        <div className="container">
          <div className="bg-white/80 backdrop-blur-3xl border border-white/30 rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] p-1.5">
            <div className="grid divide-y md:divide-y-0 md:divide-x divide-border/20 md:grid-cols-3">
              {[
                { label: "Client Satisfaction", value: "250+", icon: MessageCircleMore, color: "text-blue-600" },
                { label: "Community Members", value: "2k+", icon: Users2, color: "text-primary" },
                { label: "Districts Covered", value: "38", icon: MapPin, color: "text-indigo-600" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="group flex items-center gap-4 px-6 py-5 lg:px-8 lg:py-6 transition-colors hover:bg-primary/5 rounded-xl">
                    <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-md transition-transform group-hover:scale-105", stat.color)}>
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <p className="text-3xl font-black tracking-tight text-foreground leading-none">{stat.value}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Platform Benefits ─── */}
      <section className="section-padding overflow-hidden" aria-labelledby="benefits-title">
        <div className="container space-y-8 lg:space-y-10">
          <SectionIntro
            eyebrow="Powerful features"
            title="Built to solve trust, coordination, and growth gaps."
            description="The TN-PVC model makes worker identity visible, ensures payment fairness, and gives customers a smoother path to quality interiors."
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {platformBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="float-card group">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-base font-black tracking-tight">{benefit.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Ecosystem Bento Grid ─── */}
      <section className="section-padding overflow-hidden bg-mesh relative">
        <div className="container space-y-8 lg:space-y-10">
          <SectionIntro
            eyebrow="Digital identity"
            title="Your entire PVC business, visualized in one place."
            description="We are building the digital infrastructure for the PVC trade. Every contractor, manufacturer, and worker becomes part of a searchable, trusted network."
            align="center"
          />

          <div className="grid w-full gap-4 grid-cols-1 md:grid-cols-4 md:grid-rows-2">
            {/* Main Feature */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/40 shadow-xl md:col-span-2 md:row-span-2">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src={brandAssets.bentoShowroom}
                alt="Premium PVC Showroom"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 backdrop-blur-md self-start">
                  <UserCheck className="size-3.5 text-primary" />
                  <span className="text-xs font-bold tracking-wide text-white">Verified identity</span>
                </div>
                <h3 className="text-xl font-black text-white sm:text-2xl">Professional ecosystem</h3>
                <p className="mt-2 max-w-md text-sm font-medium text-white/70">A professional profile for every member, showcasing skills, location, and project history across Tamil Nadu.</p>
              </div>
            </div>

            {/* Sub Feature 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/40 shadow-xl md:col-span-2 md:row-span-1">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src={brandAssets.bentoInstallation}
                alt="Site Level Accountability"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-1">
                  <LayoutDashboard className="size-4 text-primary" />
                  <h3 className="text-lg font-black text-white">Site-level accountability</h3>
                </div>
                <p className="text-sm font-medium text-white/70">Digital tools to track site progress, material delivery, and team allocation in real-time.</p>
              </div>
            </div>

            {/* Sub Feature 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/40 shadow-xl md:col-span-2 md:row-span-1">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src={brandAssets.heroInterior}
                alt="Growth Visibility"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Search className="size-4 text-primary" />
                  <h3 className="text-lg font-black text-white">Growth-first visibility</h3>
                </div>
                <p className="text-sm font-medium text-white/70">Get discovered by clients across Tamil Nadu through the TN-PVC searchable directory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="section-padding overflow-hidden bg-surface/30" aria-labelledby="flow-title">
        <div className="container space-y-8 lg:space-y-10">
          <SectionIntro
            eyebrow="The workflow"
            title="From factories to finished interiors."
            description="TN-PVC Interiors reflects the real field journey of a project and makes each layer more visible and collaborative."
            align="center"
          />

          {/* Desktop */}
          <div className="hidden md:grid grid-cols-3 max-w-4xl mx-auto gap-0 relative">
            <div /><div className="relative p-2 pb-6">{renderWorkflowCard(networkFlow[0])}<div className="absolute bottom-0 left-1/2 w-px h-6 bg-primary/20" /></div><div />
            <div className="relative p-2 pb-6 pt-0"><div className="absolute top-0 right-0 w-1/2 h-px bg-primary/20" /><div className="absolute top-0 left-1/2 w-px h-2 bg-primary/20" />{renderWorkflowCard(networkFlow[1])}<div className="absolute bottom-0 left-1/2 w-px h-6 bg-primary/20" /></div><div className="relative"><div className="absolute top-0 left-0 w-1/2 h-px bg-primary/20" /></div><div />
            <div className="relative"><div className="absolute top-0 right-0 w-1/2 h-px bg-primary/20" /></div><div className="relative"><div className="absolute top-0 left-0 w-full h-px bg-primary/20" /></div><div className="relative p-2 pb-6 pt-0"><div className="absolute top-0 left-0 w-1/2 h-px bg-primary/20" /><div className="absolute top-0 left-1/2 w-px h-2 bg-primary/20" />{renderWorkflowCard(networkFlow[2])}<div className="absolute bottom-0 left-1/2 w-px h-6 bg-primary/20" /></div>
            <div /><div className="relative p-2 pb-6 pt-0"><div className="absolute top-0 right-0 w-1/2 h-px bg-primary/20" /><div className="absolute top-0 left-1/2 w-px h-2 bg-primary/20" />{renderWorkflowCard(networkFlow[3])}<div className="absolute bottom-0 left-1/2 w-px h-6 bg-primary/20" /></div><div className="relative"><div className="absolute top-0 left-0 w-1/2 h-px bg-primary/20" /></div>
            <div className="relative p-2 pt-0"><div className="absolute top-0 right-0 w-1/2 h-px bg-primary/20" /><div className="absolute top-0 left-1/2 w-px h-2 bg-primary/20" />{renderWorkflowCard(networkFlow[4])}</div><div className="relative"><div className="absolute top-0 left-0 w-1/2 h-px bg-primary/20" /></div><div />
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-4 relative border-l-2 border-primary/10 ml-5 pl-6">
            {networkFlow.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="bg-white p-5 rounded-2xl shadow-sm border border-border/50 relative">
                  <div className="absolute top-7 -left-[33px] size-4 rounded-full bg-surface border-4 border-primary/20" />
                  <div className="size-9 rounded-xl bg-primary/5 flex items-center justify-center mb-3">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-black mb-1.5 tracking-tight">{step.title}</h3>
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Regional Presence ─── */}
      <section className="section-padding border-y border-border/40 bg-surface/30 overflow-hidden">
        <div className="container">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <SectionIntro
                eyebrow="Regional presence"
                title="Visible across Tamil Nadu and ready for growth."
                description="Our network is growing as a searchable, shareable identity across web, WhatsApp, and leadership channels, covering every major hub and all 38 districts."
              />
              <div className="flex flex-wrap gap-2">
                {geoCoverage.map((location) => (
                  <div
                    key={location}
                    className={cn(
                      "rounded-lg border border-border/60 bg-white px-4 py-2 text-sm font-bold shadow-sm transition-all hover:border-primary/40 hover:text-primary whitespace-normal break-words",
                      location.includes("38 districts") && "bg-primary/5 border-primary/20 text-primary"
                    )}
                  >
                    {location}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Visual */}
            <div className="relative group overflow-hidden md:overflow-visible">
              <div className="float-card aspect-square flex items-center justify-center bg-mesh/50 overflow-hidden p-6 border-none shadow-xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10 pointer-events-none" />
                <TNMap className="w-full h-full relative z-20 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_50px_rgba(var(--primary-rgb),0.2)]" />
                <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-[60px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-[60px] animate-pulse delay-700" />
                <div className="absolute bottom-4 right-4 z-30 text-right pointer-events-none">
                  <p className="text-xs font-bold tracking-wide text-primary mb-0.5">Statewide coverage</p>
                  <p className="text-2xl font-black text-foreground drop-shadow-sm">38 Districts</p>
                </div>
              </div>
              <div className="absolute -z-10 -top-8 -right-8 size-48 bg-primary/5 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Audience Benefits ─── */}
      <section className="section-padding bg-surface border-y border-border/40">
        <div className="container space-y-8 lg:space-y-10">
          <SectionIntro
            eyebrow="Target audience"
            title="Specific benefits for contractors, clients, and labour."
            description="Each side of the PVC ecosystem needs different kinds of support, and the platform has been designed to serve those needs clearly."
            align="center"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: "For Contractors", points: audienceBenefits.contractors, to: "/contractors" },
              { title: "For Clients", points: audienceBenefits.clients, to: "/clients", highlight: true },
              { title: "For Labour", points: audienceBenefits.labour, to: "/labour" },
            ].map((group) => (
              <div
                key={group.title}
                className={cn(
                  "float-card flex flex-col group",
                  group.highlight && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              >
                {group.highlight && (
                  <span className="mb-4 inline-flex self-start items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-black">{group.title}</h3>
                <div className="mt-5 flex-1 space-y-3">
                  {group.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <p className="text-sm font-medium text-muted-foreground leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to={group.to}
                  className={cn(
                    "mt-8 h-10 inline-flex items-center justify-center font-bold text-sm rounded-full transition-all",
                    group.highlight ? "primary-btn" : "secondary-btn"
                  )}
                >
                  Learn More
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Founders ─── */}
      <section className="section-padding">
        <div className="container grid gap-10 lg:gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <SectionIntro
              eyebrow="The Team"
              title="A field-driven community backed by builders and creators."
              description="TN-PVC Interiors is powered by strong experience from the trade and digital execution built for long-term growth."
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {founders.map((founder) => (
                <Link
                  key={founder.slug}
                  to={`/${founder.slug}`}
                  className="group flex flex-col"
                >
                  <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-primary/20">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="aspect-[4/5] w-full object-cover transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 text-center sm:text-left px-2">
                    <h3 className="text-base font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold tracking-wide text-primary uppercase">
                      {founder.role.split(',')[0]}
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-muted-foreground line-clamp-2 leading-relaxed">
                      {founder.intro}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="float-card p-2 hidden lg:block overflow-hidden rounded-2xl">
            <img
              src={brandAssets.dexazReference}
              alt="Founders overview visual"
              className="h-full max-h-[560px] w-full object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ─── Register / Contact ─── */}
      <section id="register" className="section-padding bg-mesh relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="space-y-6">
              <SectionIntro
                eyebrow="Growth & Trade"
                title={
                  <>
                    How can We <span className="text-primary">Help?</span>
                  </>
                }
                description="Get in touch with our community leads for network onboarding, project coordination, or trade support. Join the fastest growing PVC network today."
              />
              <div className="space-y-4">
                {[
                  "Request a business lead",
                  "Learn which tier is right for you",
                  "Get onboarding help for labour teams"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 group">
                    <div className="flex size-6 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white shrink-0">
                      <CheckCircle2 className="size-3" />
                    </div>
                    <span className="text-sm font-bold text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-16 -right-16 size-48 bg-primary/10 rounded-full blur-3xl opacity-50" />
              <RegisterForm
                title="Enroll in the Network"
                description="Join thousands of professionals building a better PVC interior ecosystem."
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Home;
