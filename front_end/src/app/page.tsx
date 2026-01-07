import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-coffee-50">
      <div className="flex flex-col items-center gap-6 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="p-4 rounded-full bg-coffee-100">
          <Coffee className="w-12 h-12 text-coffee-600" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-coffee-900">
          Wellness Coffee
        </h1>
        
        <p className="text-lg text-coffee-700 leading-relaxed">
          The AI-powered functional "boost" for your financial wellness. 
          Stop compulsive spending and build your future.
        </p>

        <Link 
          href="/onboarding"
          className="mt-8 px-8 py-3 bg-coffee-600 text-white rounded-full font-semibold transition-all hover:bg-coffee-700 hover:scale-105 active:scale-95 shadow-lg shadow-coffee-200"
        >
          Begin Journey
        </Link>

        <div className="mt-12 pt-8 border-t border-coffee-200 w-full flex justify-center gap-8 text-coffee-400 text-sm">
          <span>Organic & Tech</span>
          <span>•</span>
          <span>SaaS Prototype</span>
        </div>
      </div>
    </div>
  );
}
