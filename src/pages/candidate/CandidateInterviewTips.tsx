import React from 'react';
import { 
  Lightbulb, 
  BookOpen, 
  Code, 
  MessageCircle, 
  CheckCircle,
  Video,
  Headphones,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function CandidateInterviewTips() {
  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-800 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
            <Lightbulb className="w-6 h-6 text-amber-500" />
          </div>
          Interview Resources & Tips
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Master your interviews with our comprehensive guide and expert connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Tips Section */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Section 1: Preparation */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#0085F7]" />
              Before the Interview
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-blue-50 text-blue-500 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Research the Company</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Understand the company's mission, values, recent news, and product offerings. Mentioning these naturally during your interview shows genuine interest and initiative.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-blue-50 text-blue-500 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Test Your Tech</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Always log in 10 minutes early to test your microphone, camera, and internet connection. Ensure your background is clean and well-lit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Skills */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-[#0085F7]" />
              Technical Interviews
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-emerald-50 text-emerald-500 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Think Out Loud</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Interviewers care more about your problem-solving process than the final answer. Explain your assumptions, trade-offs, and logic as you write code.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-emerald-50 text-emerald-500 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Start Simple, Then Optimize</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Don't immediately try to write the most optimal solution. Get a working brute-force solution first, then discuss and implement optimizations (Big O).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Behavioral */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-[#0085F7]" />
              Behavioral & Cultural Fit
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-purple-50 text-purple-500 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Master the STAR Method</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    When answering situational questions, structure your response: <br/>
                    <span className="font-semibold text-slate-700">Situation:</span> Set the scene. <br/>
                    <span className="font-semibold text-slate-700">Task:</span> What was your responsibility? <br/>
                    <span className="font-semibold text-slate-700">Action:</span> What specific steps did you take? <br/>
                    <span className="font-semibold text-slate-700">Result:</span> What was the measurable outcome?
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-purple-50 text-purple-500 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Ask Thoughtful Questions</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Always have 2-3 questions prepared for the interviewer about the team's tech stack, culture, or current challenges. It shows you are evaluating them just as they are evaluating you.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Connect with Expert */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0085F7] to-blue-700 rounded-3xl p-8 shadow-lg relative overflow-hidden flex flex-col text-white h-fit sticky top-24">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/30 blur-3xl rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-blue-50">
                <Sparkles className="w-3.5 h-3.5" />
                Premium Service
              </div>
              
              <h2 className="text-3xl font-bold font-heading mb-4 leading-tight">Need personalized help?</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Connect 1-on-1 with an industry expert. We offer mock interviews, resume reviews, and tailored career guidance to help you land your dream job.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-blue-200" />
                  <span className="text-sm font-semibold">1-Hour Live Mock Interview</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-200" />
                  <span className="text-sm font-semibold">Detailed Written Feedback</span>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 text-blue-200" />
                  <span className="text-sm font-semibold">Live Career Consultation</span>
                </div>
              </div>

              <button className="w-full py-4 bg-white hover:bg-blue-50 text-[#0085F7] rounded-xl text-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20">
                <Calendar className="w-5 h-5" />
                Schedule a Session
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
