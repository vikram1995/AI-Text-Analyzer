import TextAnalyzer from '@/components/TextAnalyzer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
            🤖 AI Text Analyzer
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Powered by <span className="font-semibold text-blue-600">Google Gemini</span> and{' '}
            <span className="font-semibold text-purple-600">LangChain</span> •
            Get instant sentiment analysis, topic extraction, and AI-powered summaries
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200">
              ✨ Real-time Analysis
            </span>
            <span className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200">
              🎯 Sentiment Detection
            </span>
            <span className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200">
              🏷️ Topic Extraction
            </span>
            <span className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200">
              📄 AI Summaries
            </span>
          </div>
        </div>

        {/* Main Application */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <TextAnalyzer />
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
            Perfect for Business & Personal Use
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Customer Feedback */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Customer Feedback</h3>
              <p className="text-slate-600 text-sm">
                Analyze customer reviews, support tickets, and feedback to understand satisfaction levels and key issues.
              </p>
            </div>

            {/* Social Media */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Social Media</h3>
              <p className="text-slate-600 text-sm">
                Monitor brand mentions, analyze post engagement, and understand audience sentiment across platforms.
              </p>
            </div>

            {/* Content Strategy */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Content Strategy</h3>
              <p className="text-slate-600 text-sm">
                Optimize your content by understanding tone, extracting key topics, and getting AI-powered insights.
              </p>
            </div>

            {/* Email Analysis */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Email Analysis</h3>
              <p className="text-slate-600 text-sm">
                Analyze email campaigns, customer inquiries, and internal communications for better insights.
              </p>
            </div>

            {/* Survey Data */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Survey Data</h3>
              <p className="text-slate-600 text-sm">
                Process survey responses and feedback forms to extract meaningful patterns and sentiment trends.
              </p>
            </div>

            {/* Research & Analysis */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Research & Analysis</h3>
              <p className="text-slate-600 text-sm">
                Analyze research papers, articles, and documents to quickly extract key topics and summaries.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Powered by Modern AI Technology</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              Next.js 15
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              LangChain
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Google Gemini
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              TypeScript
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
