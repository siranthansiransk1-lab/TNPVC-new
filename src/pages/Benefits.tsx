import { ArrowRight, CheckCircle2, Fingerprint, Headphones, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Seo } from "@/components/seo/Seo";
import { PageHero, SectionIntro } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { audienceBenefits, platformBenefits, seoByPath, brandAssets } from "@/data/siteData";
import { cn } from "@/lib/utils";

const focusAreas = [
  {
    title: "Digital identity cards",
    description: "Professional identity systems can help create recognition, reduce confusion on sites, and strengthen verification.",
    icon: Fingerprint,
  },
  {
    title: "Field communication",
    description: "A voice-first coordination layer can help field teams stay aligned without delay during active installation work.",
    icon: Headphones,
  },
  {
    title: "Search visibility",
    description: "Well-structured content helps customers discover verified TN-PVC Interiors teams through Google and AI surfaces.",
    icon: Search,
  },
  {
    title: "Safer work culture",
    description: "The platform supports better discipline, accountability, and stronger expectations for professional conduct.",
    icon: ShieldCheck,
  },
];

const Benefits = () => {
  const seo = seoByPath["/benefits"];

  return (
    <SiteLayout>
      <Seo {...seo} path="/benefits" />
      <PageHero
        eyebrow="Benefits"
        title="Designed for business growth and field trust."
        description="TN-PVC Interiors helps the PVC and UPVC trade move beyond informal coordination into an accountable ecosystem."
        bentoItems={[
          { image: brandAssets.heroInterior, title: "Quality Spaces", description: "Long-lasting value." },
          { image: brandAssets.bentoShowroom, title: "Visibility", description: "Searchable network." },
          { image: brandAssets.bentoInstallation, title: "Field Trust", description: "Accountable execution." },
          { image: brandAssets.bentoUpvcWindow, title: "Growth", description: "Business expansion." }
        ]}
      />

      {/* ─── Powerful Features (Transferred from Home) ─── */}
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
                <article key={benefit.title} className="float-card group">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-base font-black tracking-tight">{benefit.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Core Focus Areas ─── */}
      <section className="section-padding border-y border-border/40 bg-surface/50">
        <div className="container space-y-8">
          <SectionIntro
            eyebrow="Core focus"
            title="A foundation built for real-world execution."
            description="The community is structured around daily business pain points—lead flow, worker visibility, and professional trust."
            align="center"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {focusAreas.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="float-card group">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-base font-black tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Target Audience (Transferred from Home) ─── */}
      <section className="section-padding">
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
    </SiteLayout>
  );
};

export default Benefits;
