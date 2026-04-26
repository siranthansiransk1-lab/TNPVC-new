import { CheckCircle2, ChevronRight, Mail, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/seo/Seo";
import { RegisterForm } from "@/components/site/RegisterForm";

const Register = () => {
  return (
    <SiteLayout>
      <Seo 
        title="Register | Join TN-PVC Interiors Network"
        description="Join the leading PVC trade community in Tamil Nadu."
        path="/register" keywords={[]}      />
      
      <PageHero
        compact
        eyebrow="Community Enrollment"
        title="Join the TN-PVC Ecosystem"
        description="Whether you're a client seeking quality work, a contractor looking for leads, or a labour team ready for projects—register today to grow with us."
      />

      <section className="section-padding bg-mesh overflow-hidden relative">
        <div className="container relative z-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            
            {/* ─── Left Side: Content ─── */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-black tracking-tight text-foreground lg:text-5xl">
                  How can We <span className="text-primary">Help?</span>
                </h2>
                <p className="text-lg font-medium text-muted-foreground leading-relaxed max-w-md">
                  Get in touch with our community leads for network onboarding, project coordination, or trade support.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  "Request a business lead",
                  "Learn which tier is right for you",
                  "Get onboarding help for labour teams"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 group">
                    <div className="flex size-6 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <span className="font-bold text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 sm:grid-cols-2 pt-8">
                <div className="float-card p-6 space-y-4 border-none shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-primary uppercase">General communication</p>
                    <a href="mailto:hello@tnpvc.co.in" className="text-sm font-bold hover:text-primary transition-colors">hello@tnpvc.co.in</a>
                  </div>
                </div>
                <div className="float-card p-6 space-y-4 border-none shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-widest text-primary uppercase">Community Docs</p>
                    <a href="#" className="inline-flex items-center text-sm font-bold hover:text-primary transition-colors">
                      See Docs <ChevronRight className="ml-1 size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right Side: Form ─── */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 size-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 size-64 bg-secondary/10 rounded-full blur-3xl" />

              <RegisterForm />
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Register;
