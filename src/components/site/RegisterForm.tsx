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
    <div className="relative group">
      <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
        {label}
      </label>
      <div className="relative">
        <input
          required
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full h-14 pl-4 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm",
            type === "file" && "pt-3.5 pb-2 text-muted-foreground file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          )}
          value={type !== "file" ? formData[valueKey] || "" : undefined}
          onChange={(e) => setFormData({...formData, [valueKey]: e.target.value})}
        />
      </div>
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
            {/* Name */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-14 pl-11 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full h-14 pl-11 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* State */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
                State
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <select
                  required
                  className="w-full h-14 pl-11 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm appearance-none cursor-pointer"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value, city: ""})}
                >
                  <option value="">Select State</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* City/District */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
                City / District
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                {formData.state === "Tamil Nadu" ? (
                  <select
                    required
                    className="w-full h-14 pl-11 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm appearance-none cursor-pointer"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  >
                    <option value="">Select District</option>
                    {tnDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                ) : (
                  <input
                    required
                    type="text"
                    placeholder="Enter your city"
                    className="w-full h-14 pl-11 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div className="relative group">
            <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
              Full Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                required
                type="text"
                placeholder="Door No, Street, Landmark..."
                className="w-full h-14 pl-11 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="relative group">
            <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
              Mobile Number (WhatsApp Preferred)
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                required
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full h-14 pl-11 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              />
            </div>
          </div>

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
              <div className="relative group">
                 <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
                   Do you drink?
                 </label>
                 <select 
                   required 
                   className="w-full h-14 pl-4 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm appearance-none cursor-pointer"
                   value={formData.drinksOrNot || ""}
                   onChange={(e) => setFormData({...formData, drinksOrNot: e.target.value})}
                 >
                   <option value="">Select Option</option>
                   <option value="No">No</option>
                   <option value="Yes">Yes</option>
                 </select>
              </div>
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
              <div className="relative group">
                 <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
                   What Brand do you Distribute?
                 </label>
                 <select 
                   required 
                   className="w-full h-14 pl-4 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm appearance-none cursor-pointer"
                   value={formData.distributedBrand || ""}
                   onChange={(e) => setFormData({...formData, distributedBrand: e.target.value})}
                 >
                   <option value="">Select Brand</option>
                   <option value="Finolex">Finolex</option>
                   <option value="Supreme">Supreme</option>
                   <option value="Ashirvad">Ashirvad</option>
                   <option value="Astral">Astral</option>
                   <option value="Other">Other</option>
                 </select>
              </div>
            </div>
          )}

          {formData.userType === "Manufacture" && (
            <div className="grid gap-6 sm:grid-cols-2 animate-reveal">
              <div className="relative group">
                 <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground z-10 transition-colors group-focus-within:text-primary">
                   Is the Brand Registered?
                 </label>
                 <select 
                   required 
                   className="w-full h-14 pl-4 pr-4 rounded-2xl bg-transparent border-2 border-muted hover:border-primary/20 focus:border-primary focus:ring-0 transition-all font-bold text-sm appearance-none cursor-pointer"
                   value={formData.brandRegistered || ""}
                   onChange={(e) => setFormData({...formData, brandRegistered: e.target.value})}
                 >
                   <option value="">Select Option</option>
                   <option value="Yes">Yes</option>
                   <option value="No">No</option>
                 </select>
              </div>
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
