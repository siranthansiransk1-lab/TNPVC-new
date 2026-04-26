import { ArrowRight, Briefcase, Factory, Handshake, Network, ShieldCheck, Store, TrendingUp, Users, Zap } from "lucide-react";

import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { brandAssets, seoByPath } from "@/data/siteData";

const AiPvcGroups = () => {
  const seo = seoByPath["/ai-pvc-groups"];

  return (
    <SiteLayout>
      <Seo {...seo} path="/ai-pvc-groups" title="Partnership Transparency | TN-PVC Interiors" />
      
      {/* Hero (Uses the Conclusion text as the main premise) */}
      <PageHero
        centered
        eyebrow="Partnership Transparency"
        title="Building a Structured Ecosystem for the PVC Industry"
        description="TNPVC is more than a platform — it is a growing ecosystem where work, skills, and opportunities are continuously connected. It ensures that talent is utilized, quality is maintained, and every member grows together."
      />

      <section className="section-padding bg-surface/30 border-y border-border/40">
        <div className="container max-w-5xl space-y-16 lg:space-y-24">
          
          {/* 1. What is TNPVC Interiors? */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Network className="mr-2 size-4" />
                The Core Platform
              </div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight">What is TNPVC Interiors?</h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed text-[17px]">
                <p>TNPVC Interiors is a powerful connection-based platform built specifically for the PVC interiors industry. In today’s market, there is no shortage of work or skilled professionals — the real challenge is the lack of proper connection between them.</p>
                <p>Many carpenters struggle to find consistent work, while contractors often face difficulty finding reliable workers. TNPVC solves this gap by creating a structured ecosystem where contractors, carpenters, dealers, and manufacturers are all connected in one network.</p>
              </div>
              
              <div className="bg-white p-8 mt-8 rounded-[32px] border border-border/50 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                {/* Decorative Shape */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/5 rounded-full pointer-events-none" />
                
                <h3 className="font-bold text-foreground text-lg mb-5 relative z-10">The system is simple yet effective:</h3>
                
                <div className="flex flex-wrap items-center gap-3 text-primary font-black text-[15px] relative z-10 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary/10 px-4 py-2 rounded-xl">One Contact</span>
                    <ArrowRight className="size-5 text-muted-foreground" />
                    <span className="bg-primary/10 px-4 py-2 rounded-xl">One Work</span>
                    <ArrowRight className="size-5 text-muted-foreground" />
                  </div>
                  <span className="bg-primary/10 px-4 py-2 rounded-xl">Continuous Opportunities</span>
                </div>
                
                <p className="text-sm text-muted-foreground relative z-10 leading-relaxed">
                  Contractors bring real-time projects into the network, and skilled workers can quickly access and execute them. This ensures that no work goes unused and no talent remains idle. As a result, everyone benefits — carpenters get steady work, contractors get reliable teams, and dealers see increased business flow.
                </p>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[600px] rounded-[32px] overflow-hidden p-6 lg:p-10 shadow-2xl group flex items-center justify-center">
              {/* Background Image & Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/40 to-transparent z-10 mix-blend-multiply" />
              <img src={brandAssets.heroInterior} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="TNPVC Interior Ecosystem" />
              
              {/* Staggered Cards Container */}
              <div className="relative z-20 grid grid-cols-2 gap-4 lg:gap-6 w-full max-w-sm mx-auto">
                
                {/* Column 1 */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="bg-white/95 backdrop-blur-xl p-5 lg:p-6 rounded-3xl shadow-xl transform transition-transform hover:-translate-y-1">
                    <Briefcase className="size-8 text-primary mb-4" strokeWidth={1.5} />
                    <h4 className="font-black text-foreground text-lg">Contractors</h4>
                    <p className="text-xs font-medium text-muted-foreground">Reliable teams</p>
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-xl p-5 lg:p-6 rounded-3xl shadow-xl transform transition-transform hover:-translate-y-1">
                    <Store className="size-8 text-primary mb-4" strokeWidth={1.5} />
                    <h4 className="font-black text-foreground text-lg">Dealers</h4>
                    <p className="text-xs font-medium text-muted-foreground">Business flow</p>
                  </div>
                </div>

                {/* Column 2 (Staggered down) */}
                <div className="space-y-4 lg:space-y-6 mt-12 lg:mt-16">
                  <div className="bg-white/95 backdrop-blur-xl p-5 lg:p-6 rounded-3xl shadow-xl transform transition-transform hover:-translate-y-1">
                    <Users className="size-8 text-primary mb-4" strokeWidth={1.5} />
                    <h4 className="font-black text-foreground text-lg">Carpenters</h4>
                    <p className="text-xs font-medium text-muted-foreground">Steady work</p>
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-xl p-5 lg:p-6 rounded-3xl shadow-xl transform transition-transform hover:-translate-y-1">
                    <Factory className="size-8 text-primary mb-4" strokeWidth={1.5} />
                    <h4 className="font-black text-foreground text-lg">Manufacturers</h4>
                    <p className="text-xs font-medium text-muted-foreground">Direct reach</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* 2 & 3. Project Flow & Why Freelancers */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="float-card space-y-6 p-8 lg:p-10 border border-border/60 hover:border-primary/30 transition-colors shadow-sm">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="size-7 text-primary" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Project Flow & Technical Team</h2>
              <p className="text-muted-foreground leading-relaxed">TNPVC collects projects from multiple sources such as contractors, dealers, manufacturers, referrals, and direct clients. These projects are verified, assigned, and monitored to ensure smooth execution.</p>
              <div className="bg-surface rounded-2xl p-6 border border-border/50">
                <p className="font-bold text-foreground mb-2">Technical Team Role:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">To maintain quality and efficiency, TNPVC has introduced a Technical Team. Your role includes project evaluation, technical guidance, quality control, and coordination between all parties. You are not just employees — you are partners responsible for maintaining the standards and trust of the platform.</p>
              </div>
            </div>

            <div className="float-card space-y-6 p-8 lg:p-10 border border-border/60 hover:border-primary/30 transition-colors shadow-sm">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Zap className="size-7 text-primary" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Why We Hire Freelancers</h2>
              <p className="text-muted-foreground leading-relaxed">Today’s freelance market is highly competitive due to AI tools, low-cost services, and inconsistent project availability. Even skilled freelancers face challenges like unstable income, price undercutting, and lack of trust from clients.</p>
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <p className="font-bold text-primary mb-2">The Structured Solution:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">TNPVC addresses these issues by creating a structured freelance ecosystem. Instead of searching for clients, freelancers get direct access to verified projects, fair opportunities, and a team-based working environment. This ensures stability, growth, and long-term collaboration.</p>
              </div>
            </div>
          </div>

          {/* 4. Digital Streaming Partnership Opportunity */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10 grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3 space-y-6">
                <div className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1.5 text-sm font-bold text-blue-400">
                  <Handshake className="mr-2 size-4" />
                  Partnership Model
                </div>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Digital Streaming Partnership Opportunity</h2>
                <p className="text-slate-300 leading-relaxed text-lg font-medium">
                  TNPVC offers a unique Digital Streaming Partnership model. As a partner, you will support digital services, bring in projects, and grow within the platform.
                </p>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mt-4">
                  <p className="text-sm font-medium text-slate-300 flex items-start gap-2">
                    <ShieldCheck className="size-5 text-blue-400 shrink-0" />
                    This partnership is backed by a legal agreement to ensure transparency, trust, and security for all parties involved.
                  </p>
                </div>
              </div>
              <div className="md:col-span-2 space-y-3">
                {[
                  "20% monthly revenue share from digital operations",
                  "70% earnings from freelance projects (30% shared with platform)",
                  "Access to a strong, ready-made network",
                  "Long-term growth and stability"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/80 rounded-xl p-4 border border-slate-700 backdrop-blur-md transition-transform hover:scale-[1.02]">
                    <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                      <TrendingUp className="size-5 text-blue-400" />
                    </div>
                    <span className="font-bold text-slate-200 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </SiteLayout>
  );
};

export default AiPvcGroups;
