import { useState } from "react";
import { CheckCircle2, ChevronRight, MapPin, Mail, Phone, User, Building2, Wrench, Users, Factory, Package, Store, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const states = [
  "Tamil Nadu", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const tnDistricts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
  "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", 
  "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", 
  "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", 
  "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", 
  "Viluppuram", "Virudhunagar"
];

export const RegisterForm = ({ title = "Enroll in the Network", description = "Fill in your details to join the community." }) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    name: "",
    email: "",
    state: "",
    city: "",
    address: "",
    mobile: "",
    userType: "Contractor"
  });

  const renderField = (label: string, placeholder: string, type = "text", valueKey: string) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-600">
        {label}*
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full h-12 px-4 rounded-xl bg-white border border-border/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-normal text-foreground placeholder:text-muted-foreground/60 outline-none",
          type === "file" && "pt-2.5 pb-2 text-muted-foreground file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
        )}
        value={type !== "file" ? formData[valueKey] || "" : undefined}
        onChange={(e) => setFormData({...formData, [valueKey]: e.target.value})}
      />
    </div>
  );

  const renderSelect = (label: string, valueKey: string, options: string[], placeholder: string) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-600">
        {label}*
      </label>
      <select
        required
        className="w-full h-12 px-4 rounded-xl bg-white border border-border/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-normal appearance-none cursor-pointer outline-none"
        value={formData[valueKey] || ""}
        onChange={(e) => {
          if (valueKey === 'state') {
            setFormData({...formData, state: e.target.value, city: ""});
          } else {
            setFormData({...formData, [valueKey]: e.target.value});
          }
        }}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full px-8">
            Register another profile
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 animate-reveal">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">{title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{description}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {renderField("Full Name", "Type your name", "text", "name")}
            {renderField("Email", "Type your email address", "email", "email")}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {renderSelect("State", "state", states, "Select State")}
            {formData.state === "Tamil Nadu" ? (
              renderSelect("City / District", "city", tnDistricts, "Select District")
            ) : (
              renderField("City / District", "Enter your city", "text", "city")
            )}
          </div>

          {renderField("Full Address", "Door No, Street, Landmark...", "text", "address")}
          {renderField("Mobile Number (WhatsApp Preferred)", "+91 00000 00000", "tel", "mobile")}

          {/* User Type */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">I am registering as a:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { id: "Contractor", icon: Building2 },
                { id: "Labour Contractor", icon: Users },
                { id: "Distributor", icon: Truck },
                { id: "Dealer", icon: Store },
                { id: "Manufacture", icon: Factory },
                { id: "Hardware Supplier", icon: Package }
              ].map((type) => (
                <label
                  key={type.id}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer group",
                    formData.userType === type.id 
                      ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" 
                      : "border-muted hover:border-primary/20 text-muted-foreground"
                  )}
                >
                  <input
                    type="radio"
                    name="userType"
                    className="sr-only"
                    checked={formData.userType === type.id}
                    onChange={() => setFormData({...formData, userType: type.id})}
                  />
                  <type.icon className={cn(
                    "size-5 transition-transform group-hover:scale-110",
                    formData.userType === type.id ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className="text-[10px] font-black uppercase tracking-wider">{type.id}</span>
                  {formData.userType === type.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="size-3 text-primary" />
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Fields Based on User Type */}
          {formData.userType === "Labour Contractor" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("Square Ft Price", "Enter amount", "number", "squareFtPrice")}
              {renderSelect("Do you drink?", "drinksOrNot", ["Yes", "No"], "Select Option")}
            </div>
          )}

          {formData.userType === "Contractor" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("Shop Location", "Enter location", "text", "shopLocation")}
              {renderField("Shop Name", "Enter shop name", "text", "shopName")}
              {renderField("Number of Clients Delivered", "e.g. 50+", "text", "clientsDelivered")}
              {renderField("Approx Charges per Sq Ft", "e.g. ₹500", "text", "approxCharges")}
            </div>
          )}

          {formData.userType === "Dealer" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("Total Dealership Experience", "e.g. 5 Years", "text", "dealershipExperience")}
              {renderField("How you got your first Dealership", "Describe briefly", "text", "firstDealership")}
              {renderField("Dealer For the Brand", "Enter brand name", "text", "dealerBrand")}
            </div>
          )}

          {formData.userType === "Distributor" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("How you became a Distributor", "Describe briefly", "text", "becomeDistributor")}
              {renderSelect("What Brand do you Distribute?", "distributedBrand", ["Finolex", "Supreme", "Ashirvad", "Astral", "Other"], "Select Brand")}
            </div>
          )}

          {formData.userType === "Manufacture" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderSelect("Is the Brand Registered?", "brandRegistered", ["Yes", "No"], "Select Option")}
              {renderField("Brand Logo", "Upload Image", "file", "brandLogo")}
              {renderField("Brand Website", "https://...", "url", "brandWebsite")}
              {renderField("Brand HQ Location", "Enter location", "text", "brandHq")}
              {renderField("Registered GST Number", "e.g. 22AAAAA0000A1Z5", "text", "brandGst")}
            </div>
          )}

          {formData.userType === "Hardware Supplier" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              {renderField("Agency Name", "Enter agency name", "text", "agencyName")}
              {renderField("Types of Hardware supply", "e.g. Pipes, Fittings", "text", "hardwareTypes")}
              {renderField("Agency Location", "Enter location", "text", "agencyLocation")}
              {renderField("Agency Website", "https://...", "url", "agencyWebsite")}
              {renderField("Agency Contact Number", "+91 00000 00000", "tel", "agencyContact")}
            </div>
          )}


          <Button type="submit" className="w-full h-16 rounded-[1.5rem] text-base font-black shadow-2xl shadow-primary/30 transition-transform active:scale-95 group">
            Enroll Now
            <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>
      )}
    </div>
  );
};
