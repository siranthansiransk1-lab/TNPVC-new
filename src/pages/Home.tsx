import { CheckCircle2 } from "lucide-react";

import { Seo } from "@/components/seo/Seo";
import { SectionIntro } from "@/components/site/PageHero";
import TNMap from "@/components/site/TNMap";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  brandAssets,
  geoCoverage,
  networkFlow,
  seoByPath,
} from "@/data/siteData";
import { cn } from "@/lib/utils";
import { RegisterForm } from "@/components/site/RegisterForm";
import { FloatingGallery } from "@/components/site/FloatingGallery";
import { EditorialHero } from "@/components/site/EditorialHero";

const Home = () => {
  const seo = seoByPath["/"];

  const renderWorkflowCard = (step: (typeof networkFlow)[number]) => {
    const Icon = step.icon;
    return (
      <div className="bg-card p-4 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 z-10 relative flex items-start gap-3 h-full">
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

      {/* ─── Luxury Editorial Hero (Inspired by Concrete) ─── */}
      <EditorialHero />

      {/* ─── Floating Gallery (Estudio Bang Showcase) ─── */}
      <div id="gallery-showcase">
        <FloatingGallery />
      </div>

      {/* ─── How It Works ─── */}
      <section className="section-padding overflow-hidden" aria-labelledby="flow-title">
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
                <div key={step.title} className="bg-card p-5 rounded-2xl shadow-sm border border-border/50 relative">
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
      <section className="section-padding border-y border-border/40 overflow-hidden">
        <div className="container">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
            {/* Map Visual */}
            <div className="relative flex flex-col items-center justify-center w-full">
              <TNMap className="w-full max-w-[450px] h-auto transition-transform duration-500 hover:scale-[1.02]" />
              <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-0 sm:right-0 text-center sm:text-right pointer-events-none">
                <p className="text-xs font-bold tracking-wide text-primary mb-0.5">Statewide coverage</p>
                <p className="text-2xl font-black text-foreground">38 Districts</p>
              </div>
            </div>

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
                      "rounded-lg border border-border/60 bg-card px-4 py-2 text-sm font-bold shadow-sm transition-all hover:border-primary/40 hover:text-primary whitespace-normal break-words",
                      location.includes("38 districts") && "bg-primary/5 border-primary/20 text-primary"
                    )}
                  >
                    {location}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Register / Contact ─── */}
      <section id="register" className="section-padding border-t border-border/40 relative overflow-hidden">
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
