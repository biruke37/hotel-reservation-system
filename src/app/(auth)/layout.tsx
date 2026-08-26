export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center">
      {children}
    </div>
  );
}