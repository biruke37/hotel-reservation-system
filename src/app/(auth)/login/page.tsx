
// "use client";

// import { useState, FormEvent, ChangeEvent } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (error) setError(null);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     if (!formData.email.trim() || !formData.password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const result = await signIn("credentials", {
//         email: formData.email,
//         password: formData.password,
//         redirect: false,
//       });

//       if (result?.error) {
//         setError("Invalid email or password. Please try again.");
//         setIsLoading(false);
//         return;
//       }

//       // 1. Session አምጥተህ Role ን መፈተሽ
//       const sessionRes = await fetch("/api/auth/session");
//       const session = await sessionRes.json();

//       // 2. Admin ከሆነ ወደ Admin Dashboard፣ ካልሆነ ወደ Home መምራት
//       if (session?.user?.role === "admin") {
//         router.push("/admin");
//       } else {
//         router.push("/");
//       }

//       router.refresh();
//     } catch {
//       setError("An unexpected error occurred. Please try again later.");
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-[calc(100vh-64px)] w-full grid grid-cols-1 lg:grid-cols-2 font-sans bg-[#080d1a]">
//       {/* Left Side: Dark Plus Grid Panel */}
//       <div className="relative bg-[#080d1a] p-10 lg:p-16 flex flex-col justify-between overflow-hidden border-r border-white/5">
//         {/* Plus Grid Pattern Background */}
//         <div
//           className="absolute inset-0 opacity-20 pointer-events-none"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 12v8m-4-4h8' stroke='%23ffffff' stroke-width='1' stroke-linecap='round'/%3E%3C/svg%3E")`,
//             backgroundSize: "32px 32px",
//           }}
//         />

//         {/* Brand Header inside panel */}
//         <div className="relative z-10 flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-[#c59a5b]/20 border border-[#c59a5b]/40 flex items-center justify-center text-[#c59a5b]">
//             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//           </div>
//           <div>
//             <h1 className="font-serif text-xl font-bold text-white tracking-wide">HotelHub</h1>
//             <p className="text-[10px] font-semibold text-[#c59a5b] tracking-widest uppercase">LUXURY RESERVATIONS</p>
//           </div>
//         </div>
//         {/* Hero Content */}
//         <div className="relative z-10 max-w-md my-auto py-12">
//           <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-6">
//             Welcome Back to Refined Hotelly
//           </h2>
//           <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
//             Sign in to manage your reservations, view upcoming stays, and enjoy a seamless booking experience.
//           </p>
//         </div>
//         {/* Footer */}
//       </div>
//       {/* Right Side: Off-White Background & Login Card */}
//       <div className="bg-[#f8f7f4] p-6 sm:p-12 flex items-center justify-center">
//         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
//           <div className="text-center mb-6">
//             <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1.5">
//               Welcome
//             </h3>
//           </div>
//           {error && (
//             <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 flex items-center gap-2">
//               <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               <span>{error}</span>
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0
//                  left-0 pl-3.5 
//                 flex items-center 
//                 pointer-events-none 
//                 text-gray-400">
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
//                   </svg>
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="you@example.com"
//                   className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#080d1a] focus:ring-1 focus:ring-[#080d1a] text-gray-900 placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-1.5">
//                 <label className="block text-xs font-medium text-gray-700">
//                   Password
//                 </label>
//                 <Link href="#" className="text-[11px] font-medium text-[#c59a5b] hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#080d1a] focus:ring-1 focus:ring-[#080d1a] text-gray-900 placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-2 pt-1">
//               <input
//                 id="rememberMe"
//                 type="checkbox"
//                 name="rememberMe"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="w-3.5 h-3.5 border-gray-300 rounded text-[#080d1a] focus:ring-[#080d1a] cursor-pointer"
//               />
//               <label htmlFor="rememberMe" className="text-[11px] text-gray-600 cursor-pointer select-none">
//                 Remember me on this device
//               </label>
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-2.5 px-4 bg-[#080d1a] hover:bg-[#121c38] text-white font-semibold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 mt-2"
//             >
//               {isLoading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>
//           <div className="mt-6 pt-4 border-t border-gray-100 text-center">
//             <p className="text-xs text-gray-500">
//               Don&apos;t have an account?{" "}
//               <Link href="/register" className="font-semibold text-[#c59a5b] hover:underline">
//                 Create an account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock, Building2, AlertCircle, X, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim() || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Password validation (uppercase, lowercase, number, special character, min 8 chars)
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!/(?=.*[a-z])/.test(formData.password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/(?=.*[A-Z])/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/(?=.*\d)/.test(formData.password)) {
      setError("Password must contain at least one number.");
      return;
    }
    if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      // 1. Session አምጥተህ Role ን መፈተሽ
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      // 2. Admin ከሆነ ወደ Admin Dashboard፣ ካልሆነ ወደ Home መምራት
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setForgotLoading(true);
    // Simulate API request to company/admin for password reset
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full grid grid-cols-1 lg:grid-cols-2 font-sans bg-[#080d1a] relative">

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotSuccess(false);
                setForgotEmail("");
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#c59a5b]/10 text-[#c59a5b] rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Reset Password</h3>
                <p className="text-xs text-slate-500">HotelHub Corporate Support</p>
              </div>
            </div>

            {forgotSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">Instructions Sent!</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  If an account exists for <span className="font-medium text-slate-900">{forgotEmail}</span>, our company admin has sent recovery instructions or contact details.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSuccess(false);
                    setForgotEmail("");
                  }}
                  className="mt-4 px-4 py-2 bg-[#080d1a] hover:bg-[#121c38] text-white text-xs font-medium rounded-lg transition w-full"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered email address. Our company support system will verify your account and provide password recovery assistance.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#080d1a] focus:ring-1 focus:ring-[#080d1a]"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-2.5 bg-[#080d1a] hover:bg-[#121c38] text-white font-medium text-xs rounded-lg transition shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {forgotLoading ? "Contacting Company Support..." : "Send Reset Instructions"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Left Side: Dark Plus Grid Panel */}
      <div className="relative bg-[#080d1a] p-10 lg:p-16 flex flex-col justify-between overflow-hidden border-r border-white/5">
        {/* Plus Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 12v8m-4-4h8' stroke='%23ffffff' stroke-width='1' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Brand Header inside panel */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c59a5b]/20 border border-[#c59a5b]/40 flex items-center justify-center text-[#c59a5b]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-white tracking-wide">HotelHub</h1>
            <p className="text-[10px] font-semibold text-[#c59a5b] tracking-widest uppercase">LUXURY RESERVATIONS</p>
          </div>
        </div>
        {/* Hero Content */}
        <div className="relative z-10 max-w-md my-auto py-12">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-6">
            Welcome Back to Refined Hotelly
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Sign in to manage your reservations, view upcoming stays, and enjoy a seamless booking experience.
          </p>
        </div>
        {/* Footer */}
      </div>

      {/* Right Side: Off-White Background & Login Card */}
      <div className="bg-[#f8f7f4] p-6 sm:p-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="text-center mb-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1.5">
              Welcome
            </h3>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0
                 left-0 pl-3.5 
                flex items-center 
                pointer-events-none 
                text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#080d1a] focus:ring-1 focus:ring-[#080d1a] text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-medium text-[#c59a5b] hover:underline bg-transparent border-none cursor-pointer p-0"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#080d1a] focus:ring-1 focus:ring-[#080d1a] text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                id="rememberMe"
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-3.5 h-3.5 border-gray-300 rounded text-[#080d1a] focus:ring-[#080d1a] cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-[11px] text-gray-600 cursor-pointer select-none">
                Remember me on this device
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#080d1a] hover:bg-[#121c38] text-white font-semibold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-[#c59a5b] hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}