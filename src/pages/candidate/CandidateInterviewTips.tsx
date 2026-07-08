import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  BookOpen, 
  Code, 
  MessageCircle, 
  CheckCircle,
  Video,
  Headphones,
  Calendar,
  Sparkles,
  ChevronLeft,
  FileText,
  ExternalLink,
  Target,
  Cpu,
  Users,
  Award,
  ArrowRight,
  Library
} from 'lucide-react';

export default function CandidateInterviewTips() {
  return (
    <div className="w-full space-y-12 pb-12 animate-in fade-in duration-500">
      
      {/* Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
        <Link to="/dashboard/candidate" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#0085F7] transition-colors group">
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
      </div>

      {/* Fluid Clean Hero Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold uppercase tracking-wider mb-4 text-[#0085F7]">
          <Sparkles className="w-4 h-4" />
          Comprehensive Guide
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-900 tracking-tight">
          Master Your Interviews.
        </h1>
        <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl">
          A definitive, in-depth guide to conquering every stage of the hiring pipeline. We've compiled expert advice, proven frameworks, and actionable strategies to help you secure offers from top-tier companies.
        </p>
      </div>

      {/* Main Content Area - Fluid */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Detailed Content Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 items-start">
          
          {/* Left Main Content (Takes up 3/4 on large screens) */}
          <div className="xl:col-span-3 space-y-16">
            
            {/* Section 1 */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0085F7] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-heading">1. The "Tell Me About Yourself" Formula</h2>
              </div>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                <p>
                  This is almost always the first question you will face, and it sets the tone for the entire interview. Do not recite your resume chronologically. Instead, use the <strong>Present-Past-Future</strong> framework.
                </p>
                <ul className="space-y-4 mt-4 list-disc pl-6">
                  <li><strong>Present:</strong> Start with what you are currently doing. <em>"Currently, I'm a Senior Frontend Engineer at TechCorp, where I lead a team of 4 rebuilding our core dashboard in React."</em></li>
                  <li><strong>Past:</strong> Briefly mention past experiences that are relevant to the role you're applying for. <em>"Before that, I spent 3 years at StartupX optimizing performance and scaling their architecture."</em></li>
                  <li><strong>Future:</strong> Conclude with why you are looking for a new opportunity and why this specific company excites you. <em>"I'm now looking to bring my expertise in scalable UI to a company like yours that is pushing the boundaries of AI-driven interfaces."</em></li>
                </ul>
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mt-6">
                  <h4 className="font-bold text-slate-900 mb-2">Pro Tip:</h4>
                  <p className="text-sm">Keep your answer between 60 to 90 seconds. Anything longer risks losing the interviewer's attention. Practice this pitch until it sounds completely natural and conversational.</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-heading">2. Conquering the Technical Screen</h2>
              </div>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                <p>
                  Technical interviews (often involving Data Structures and Algorithms) are highly structured. Interviewers are evaluating your problem-solving process, not just whether you can write compiling code. Follow this exact sequence when presented with a problem:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> 1. Clarify & Constrain</h4>
                    <p className="text-sm">Never start coding immediately. Repeat the question back. Ask about edge cases: "Can the array be empty?", "Are there negative numbers?", "Does it fit in memory?"</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> 2. Brute Force First</h4>
                    <p className="text-sm">State the most obvious, naive solution. "The brute force approach would be O(n^2) by using nested loops." This guarantees you have a baseline solution.</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> 3. Optimize (Big O)</h4>
                    <p className="text-sm">Before writing code, discuss how you can improve the time or space complexity. Can you use a HashMap? Two pointers? Explain the trade-offs.</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> 4. Dry Run</h4>
                    <p className="text-sm">After writing your code, manually trace through it with a small example input. This catches 90% of off-by-one errors and shows meticulousness.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-heading">3. Mastering Behavioral Questions</h2>
              </div>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                <p>
                  Companies use behavioral interviews to assess your soft skills, leadership, and conflict resolution abilities. You must use the <strong>STAR Method</strong> (Situation, Task, Action, Result) to structure your stories.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mt-6">
                  <h4 className="font-bold text-slate-900 text-xl mb-6">Common Questions to Prepare For:</h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0085F7] mt-2.5 shrink-0" />
                      <span><strong>"Tell me about a time you had a conflict with a coworker."</strong><br/>Focus on your empathy and communication. Show how you reached a compromise without escalating unnecessarily.</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0085F7] mt-2.5 shrink-0" />
                      <span><strong>"Describe a time you failed or made a major mistake."</strong><br/>Take extreme ownership. Do not blame others. The crucial part of this answer is what you learned and how you changed your processes afterward.</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0085F7] mt-2.5 shrink-0" />
                      <span><strong>"Give an example of a time you had to work under a tight deadline."</strong><br/>Highlight your prioritization skills, how you managed stakeholder expectations, and how you delivered the MVP on time.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* Right Sidebar - Sticky Navigation & Resources */}
          <div className="xl:col-span-1 space-y-8 sticky top-6">
            
            {/* Quick Links Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                <Library className="w-5 h-5 text-[#0085F7]" /> Essential Platforms
              </h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center"><Code className="w-4 h-4"/></div>
                    <span className="font-medium text-slate-700">LeetCode</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0085F7]" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><FileText className="w-4 h-4"/></div>
                    <span className="font-medium text-slate-700">ByteByteGo</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0085F7]" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center"><Video className="w-4 h-4"/></div>
                    <span className="font-medium text-slate-700">Pramp (Mock)</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0085F7]" />
                </a>
              </div>
            </div>

            {/* Need Help Banner (Moved to Sidebar to keep fluid layout clean) */}
            <div className="bg-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-2xl rounded-full pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2">Need Expert Help?</h3>
                <p className="text-slate-300 text-sm mb-6">
                  Book a 1-on-1 session with an industry professional for mock interviews and resume reviews.
                </p>
                <button className="w-full py-3 bg-[#0085F7] hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-900/20">
                  Schedule a Session
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
