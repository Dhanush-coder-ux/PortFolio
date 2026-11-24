import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080909] text-[#F5F2E9] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl font-bold font-display text-[#E8B95C] mb-2">404</h2>
      <p className="text-lg text-[#A5A7A2] mb-6 font-mono-tech">Station Not Found</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-full bg-[#E8B95C] text-[#080909] font-bold text-sm tracking-wider uppercase transition-transform hover:scale-105"
      >
        Return to Origin
      </Link>
    </div>
  );
}
