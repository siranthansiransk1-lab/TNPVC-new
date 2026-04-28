import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2, ChevronRight, Building2, Users, Factory,
  Package, Store, Truck, Loader2, AlertCircle, X, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import { SearchableSelect } from "@/components/site/SearchableSelect";

// ─── Data ─────────────────────────────────────────────────────────────────────

const states = [
  "Tamil Nadu","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const tnDistricts = [
  "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri",
  "Dindigul","Erode","Kallakurichi","Kanchipuram","Kanyakumari","Karur",
  "Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris",
  "Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga",
  "Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli",
  "Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore",
  "Viluppuram","Virudhunagar",
];

const userTypes = [
  { id: "Contractor",        icon: Building2 },
  { id: "Labour Contractor", icon: Users     },
  { id: "Distributor",       icon: Truck     },
  { id: "Dealer",            icon: Store     },
  { id: "Manufacture",       icon: Factory   },
  { id: "Hardware Supplier", icon: Package   },
] as const;

type UserTypeId = (typeof userTypes)[number]["id"];

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const baseSchema = z.object({
  name:    z.string().min(2, "Full name must be at least 2 characters"),
  email:   z.string().optional().refine(
    (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    { message: "Please enter a valid email address" }
  ),
  state:   z.string().min(1, "Please select your state"),
  city:    z.string().min(1, "Please enter your city / district"),
  address: z.string().min(5, "Please enter your full address"),
  mobile:  z.string().min(10, "Mobile number must be at least 10 digits")
            .regex(/^[+]?[\d\s\-()]{10,15}$/, "Enter a valid mobile number"),
  userType: z.string().min(1, "Please select a type"),
  // Conditional optional fields
  squareFtPrice: z.string().optional(), drinksOrNot: z.string().optional(),
  shopLocation: z.string().optional(),  shopName: z.string().optional(),
  clientsDelivered: z.string().optional(), approxCharges: z.string().optional(),
  dealershipExperience: z.string().optional(), firstDealership: z.string().optional(),
  dealerBrand: z.string().optional(), becomeDistributor: z.string().optional(),
  distributedBrand: z.string().optional(), brandRegistered: z.string().optional(),
  brandWebsite: z.string().optional(), brandHq: z.string().optional(),
  brandGst: z.string().optional(), agencyName: z.string().optional(),
  hardwareTypes: z.string().optional(), agencyLocation: z.string().optional(),
  agencyWebsite: z.string().optional(), agencyContact: z.string().optional(),
});

type FormValues = z.infer<typeof baseSchema>;

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

const ErrorMsg = ({ message }: { message?: string }) =>
  message ? (
    <p className="flex items-center gap-1.5 text-xs font-medium text-red-500 mt-1 animate-reveal">
      <AlertCircle className="size-3 shrink-0" /> {message}
    </p>
  ) : null;

const fieldContainer = (err: boolean) => cn(
  "flex items-center w-full h-12 px-4 rounded-xl bg-white border shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-primary/30",
  err ? "border-red-400 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10 bg-red-50/40"
      : "border-border/60 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10"
);

const inputBase = "flex-1 h-full bg-transparent text-sm font-normal text-foreground placeholder:text-muted-foreground/60 outline-none min-w-0";

const labelBase = (err: boolean) => cn("text-sm font-medium transition-colors", err ? "text-red-500" : "text-slate-600");

// ─── Main Component ───────────────────────────────────────────────────────────

export const RegisterForm = ({
  title = "Enroll in the Network",
  description = "Fill in your details to join the community.",
}) => {
  const [submitted,   setSubmitted]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, control, reset, setValue, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(baseSchema),
      defaultValues: { name:"", email:"", state:"", city:"", address:"", mobile:"", userType:"Contractor" },
    });

  const selectedState    = watch("state");
  const selectedUserType = watch("userType") as UserTypeId;

  // ── Clearable text input ─────────────────────────────────────────────────
  const renderField = (
    label: string, placeholder: string,
    fieldName: keyof FormValues, type = "text", required = true
  ) => {
    const err = errors[fieldName]?.message as string | undefined;
    const val = watch(fieldName) as string | undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label className={labelBase(!!err)}>
          {label}
          {required
            ? <span className="text-red-400 ml-0.5">*</span>
            : <span className="ml-1.5 text-[10px] font-semibold text-muted-foreground/60">(optional)</span>}
        </label>
        <div className={fieldContainer(!!err)}>
          <input
            type={type}
            placeholder={placeholder}
            className={inputBase}
            {...register(fieldName)}
          />
          {val && (
            <button
              type="button"
              aria-label={`Clear ${label}`}
              onClick={() => setValue(fieldName, "" as any, { shouldValidate: true })}
              className="ml-2 shrink-0 flex items-center justify-center text-muted-foreground/60 hover:text-red-500 transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <ErrorMsg message={err} />
      </div>
    );
  };

  // ── Simple native select (with dropdown arrow + X clear) ─────────────────
  const renderSimpleSelect = (
    label: string, fieldName: keyof FormValues,
    options: string[], placeholder: string, required = true
  ) => {
    const err = errors[fieldName]?.message as string | undefined;
    const val = watch(fieldName) as string | undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label className={labelBase(!!err)}>
          {label}
          {required
            ? <span className="text-red-400 ml-0.5">*</span>
            : <span className="ml-1.5 text-[10px] font-semibold text-muted-foreground/60">(optional)</span>}
        </label>
        <div className={cn(fieldContainer(!!err), "cursor-pointer group")}>
          <select
            className={cn(inputBase, "appearance-none cursor-pointer")}
            {...register(fieldName)}
          >
            <option value="">{placeholder}</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            {val && (
              <button
                type="button"
                aria-label={`Clear ${label}`}
                className="flex items-center justify-center text-muted-foreground/60 hover:text-red-500 transition-colors"
                onMouseDown={(e) => { e.preventDefault(); setValue(fieldName, "" as any, { shouldValidate: true }); }}
                onTouchEnd={(e)  => { e.preventDefault(); setValue(fieldName, "" as any, { shouldValidate: true }); }}
              >
                <X className="size-4" />
              </button>
            )}
            <ChevronDown className="size-4 text-muted-foreground" />
          </div>
        </div>
        <ErrorMsg message={err} />
      </div>
    );
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      let messageDetails = "";
      for (const [key, value] of Object.entries(data)) {
        if (value && typeof value === "string") {
          const k = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
          messageDetails += `${k}: ${value}\n`;
        }
      }
      const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const params = {
        to_email: "Siranthan.siran.sk.1@gmail.com",
        user_name: data.name, user_email: data.email || "Not provided",
        user_type: data.userType, mobile: data.mobile, message: messageDetails,
      };
      if (!SERVICE_ID || SERVICE_ID === "YOUR_SERVICE_ID") {
        console.log("EmailJS Simulation:", params);
        await new Promise((r) => setTimeout(r, 1500));
      } else {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Submission failed. Please check your EmailJS configuration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={cn(
      "float-card relative z-10 border-none shadow-2xl p-8 lg:p-12 transition-all duration-500",
      submitted ? "bg-green-50/90 backdrop-blur-xl" : "bg-white/80 backdrop-blur-2xl"
    )}>
      {submitted ? (
        <div className="py-20 text-center space-y-6 animate-reveal">
          <div className="size-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20">
            <CheckCircle2 className="size-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black tracking-tight">Registration Received!</h3>
            <p className="text-muted-foreground font-medium">Our leadership team will contact you on WhatsApp shortly.</p>
          </div>
          <Button onClick={() => { setSubmitted(false); reset(); }} variant="outline" className="rounded-full px-8">
            Register another profile
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8 animate-reveal">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">{title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{description}</p>
          </div>

          {/* Name + Email */}
          <div className="grid gap-6 sm:grid-cols-2">
            {renderField("Full Name", "Type your name", "name", "text", true)}
            <div className="flex flex-col gap-1.5">
              <label className={labelBase(!!errors.email)}>
                Email
                <span className="ml-1.5 text-[10px] font-semibold text-muted-foreground/60">(optional)</span>
              </label>
              <div className={fieldContainer(!!errors.email)}>
                <input
                  type="email"
                  placeholder="Type your email address"
                  className={inputBase}
                  {...register("email")}
                />
                {watch("email") && (
                  <button
                    type="button"
                    aria-label="Clear email"
                    onClick={() => setValue("email", "", { shouldValidate: true })}
                    className="ml-2 shrink-0 flex items-center justify-center text-muted-foreground/60 hover:text-red-500 transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
              <ErrorMsg message={errors.email?.message} />
            </div>
          </div>

          {/* State — Searchable; City — Searchable (TN) or text */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* State with search */}
            <div className="flex flex-col gap-1.5">
              <label className={labelBase(!!errors.state)}>
                State <span className="text-red-400 ml-0.5">*</span>
              </label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <SearchableSelect
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      // Reset city when state changes
                      setValue("city", "", { shouldValidate: false });
                    }}
                    options={states}
                    placeholder="Select State"
                    hasError={!!errors.state}
                  />
                )}
              />
              <ErrorMsg message={errors.state?.message} />
            </div>

            {/* City — searchable dropdown for TN, text input otherwise */}
            {selectedState === "Tamil Nadu" ? (
              <div className="flex flex-col gap-1.5">
                <label className={labelBase(!!errors.city)}>
                  City / District <span className="text-red-400 ml-0.5">*</span>
                </label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={tnDistricts}
                      placeholder="Select District"
                      hasError={!!errors.city}
                    />
                  )}
                />
                <ErrorMsg message={errors.city?.message} />
              </div>
            ) : (
              renderField("City / District", "Enter your city", "city", "text", true)
            )}
          </div>

          {/* Address + Mobile */}
          {renderField("Full Address", "Door No, Street, Landmark...", "address", "text", true)}
          {renderField("Mobile Number (WhatsApp Preferred)", "+91 00000 00000", "mobile", "tel", true)}

          {/* User Type */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">I am registering as a:</p>
            <Controller
              name="userType"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {userTypes.map((type) => (
                    <label
                      key={type.id}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer group",
                        field.value === type.id
                          ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10"
                          : "border-muted hover:border-primary/20 text-muted-foreground"
                      )}
                    >
                      <input type="radio" name="userType" className="sr-only"
                        value={type.id} checked={field.value === type.id}
                        onChange={() => field.onChange(type.id)}
                      />
                      <type.icon className={cn("size-5 transition-transform group-hover:scale-110",
                        field.value === type.id ? "text-primary" : "text-muted-foreground")} />
                      <span className="text-[10px] font-black uppercase tracking-wider text-center">{type.id}</span>
                      {field.value === type.id && (
                        <div className="absolute top-2 right-2"><CheckCircle2 className="size-3 text-primary" /></div>
                      )}
                    </label>
                  ))}
                </div>
              )}
            />
          </div>

          {/* ── Conditional fields ───────────────────────────────────────────── */}

          {selectedUserType === "Labour Contractor" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("Square Ft Price", "Enter amount", "squareFtPrice", "number", false)}
              {renderSimpleSelect("Do you drink?", "drinksOrNot", ["Yes","No"], "Select Option", false)}
            </div>
          )}

          {selectedUserType === "Contractor" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("Shop Location", "Enter location", "shopLocation", "text", false)}
              {renderField("Shop Name", "Enter shop name", "shopName", "text", false)}
              {renderField("Number of Clients Delivered", "e.g. 50+", "clientsDelivered", "text", false)}
              {renderField("Approx Charges per Sq Ft", "e.g. ₹500", "approxCharges", "text", false)}
            </div>
          )}

          {selectedUserType === "Dealer" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("Total Dealership Experience", "e.g. 5 Years", "dealershipExperience", "text", false)}
              {renderField("How you got your first Dealership", "Describe briefly", "firstDealership", "text", false)}
              {renderField("Dealer For the Brand", "Enter brand name", "dealerBrand", "text", false)}
            </div>
          )}

          {selectedUserType === "Distributor" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("How you became a Distributor", "Describe briefly", "becomeDistributor", "text", false)}
              {renderSimpleSelect("What Brand do you Distribute?", "distributedBrand",
                ["Finolex","Supreme","Ashirvad","Astral","Other"], "Select Brand", false)}
            </div>
          )}

          {selectedUserType === "Manufacture" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderSimpleSelect("Is the Brand Registered?", "brandRegistered", ["Yes","No"], "Select Option", false)}
              {renderField("Brand Website", "https://...", "brandWebsite", "url", false)}
              {renderField("Brand HQ Location", "Enter location", "brandHq", "text", false)}
              {renderField("Registered GST Number", "e.g. 22AAAAA0000A1Z5", "brandGst", "text", false)}
            </div>
          )}

          {selectedUserType === "Hardware Supplier" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("Agency Name", "Enter agency name", "agencyName", "text", false)}
              {renderField("Types of Hardware supply", "e.g. Pipes, Fittings", "hardwareTypes", "text", false)}
              {renderField("Agency Location", "Enter location", "agencyLocation", "text", false)}
              {renderField("Agency Website", "https://...", "agencyWebsite", "url", false)}
              {renderField("Agency Contact Number", "+91 00000 00000", "agencyContact", "tel", false)}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 rounded-[1.5rem] text-base font-black shadow-2xl shadow-primary/30 transition-transform active:scale-95 group overflow-hidden"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2"><Loader2 className="size-5 animate-spin" /> Processing...</span>
            ) : (
              <span className="flex items-center gap-2">
                Enroll Now <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
