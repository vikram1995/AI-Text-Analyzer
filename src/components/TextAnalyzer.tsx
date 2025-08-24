'use client';

import { useState, useTransition } from 'react';
import { analyzeTextAction } from '@/app/actions';

type Analysis = {
    wordCount: number;
    charCount: number;
    sentiment: string;
    topics: string;
    summary: string;
    timestamp: string;
};

export default function TextAnalyzer() {
    const [text, setText] = useState('');
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [error, setError] = useState<string>('');
    const [isPending, startTransition] = useTransition();

    const handleAnalyze = () => {
        setError('');
        if (!text.trim()) return;

        startTransition(async () => {
            try {
                const result = await analyzeTextAction(text.trim());
                setAnalysis(result);
            } catch (e: unknown) {
                const errorMessage = e instanceof Error ? e.message : 'Failed to analyze text. Please try again.';
                setError(errorMessage);
            }
        });
    };

    const handleClear = () => {
        setText('');
        setAnalysis(null);
        setError('');
    };

    // Calculate words for live feedback
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

    // Get sentiment color
    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'Positive':
                return 'text-emerald-600 bg-emerald-50 border-emerald-200';
            case 'Negative':
                return 'text-rose-600 bg-rose-50 border-rose-200';
            case 'Neutral':
                return 'text-amber-600 bg-amber-50 border-amber-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            {/* Input Section */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    📝 Enter text to analyze:
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste any text here... (customer feedback, social media posts, emails, reviews, etc.)"
                    rows={6}
                    className="w-full rounded-lg border-2 border-gray-300 p-4 text-sm leading-relaxed 
                   placeholder-gray-400 outline-none transition-colors duration-200 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   resize-vertical min-h-[150px] text-gray-700"
                />

                {/* Character/Word Counter */}
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>{text.length} characters • {wordCount} words</span>
                    <span className={text.length > 5000 ? 'text-red-500 font-medium' : ''}>
                        {text.length > 5000 ? 'Text too long!' : 'Max 5000 characters'}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={handleAnalyze}
                    disabled={isPending || !text.trim() || text.length > 5000}
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 
                     flex items-center gap-2 ${isPending || !text.trim() || text.length > 5000
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:transform active:scale-95'
                        }`}
                >
                    {isPending ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <span>✨</span>
                            Analyze with AI
                        </>
                    )}
                </button>

                {(analysis || text) && (
                    <button
                        onClick={handleClear}
                        disabled={isPending}
                        className="px-6 py-3 rounded-lg font-semibold text-white bg-red-600 
                     hover:bg-red-700 transition-all duration-200 hover:shadow-lg 
                     active:transform active:scale-95 disabled:opacity-50"
                    >
                        🗑️ Clear
                    </button>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">❌</span>
                        <span className="font-medium">{error}</span>
                    </div>
                </div>
            )}

            {/* Results Display */}
            {analysis && (
                <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-blue-900 mb-6">
                        <span>📊</span>
                        Analysis Results
                    </h3>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Sentiment */}
                        <div className={`rounded-lg border-2 p-4 ${getSentimentColor(analysis.sentiment)}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">
                                    {analysis.sentiment === 'Positive' ? '😊' :
                                        analysis.sentiment === 'Negative' ? '😞' : '😐'}
                                </span>
                                <span className="font-semibold">Sentiment</span>
                            </div>
                            <div className="text-2xl font-bold">
                                {analysis.sentiment || 'Unknown'}
                            </div>
                        </div>

                        {/* Word Count */}
                        <div className="rounded-lg border-2 border-gray-200 bg-white p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">📝</span>
                                <span className="font-semibold text-gray-700">Word Count</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                {analysis.wordCount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {analysis.charCount.toLocaleString()} characters
                            </div>
                        </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-4 rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">🏷️</span>
                            <span className="font-semibold text-purple-700">Key Topics</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {analysis.topics ?
                                analysis.topics.split(',').map((topic, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full bg-purple-100 border border-purple-300 
                             text-purple-800 text-sm font-medium"
                                    >
                                        {topic.trim()}
                                    </span>
                                )) :
                                <span className="text-purple-600 italic">No specific topics identified</span>
                            }
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">📄</span>
                            <span className="font-semibold text-green-700">AI Summary</span>
                        </div>
                        <div className="text-green-800 leading-relaxed">
                            {analysis.summary || 'Summary not available'}
                        </div>
                    </div>

                    {/* Timestamp */}
                    <div className="mt-4 pt-4 border-t border-blue-200 text-center text-sm text-blue-600">
                        <span className="inline-flex items-center gap-1">
                            <span>🕐</span>
                            Analysis completed at {new Date(analysis.timestamp).toLocaleString()}
                        </span>
                    </div>
                </div>
            )}

            {/* Sample Texts for Testing */}
            {!analysis && !isPending && (
                <div className="mt-8 p-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-700">
                    <h4 className="font-semibold text-gray-700 mb-3">🧪 Try these sample texts:</h4>
                    <div className="space-y-2">
                        <button
                            onClick={() => setText("I absolutely love this product! It exceeded my expectations and the customer service was amazing. Highly recommend to everyone!")}
                            className="block w-full text-left p-2 rounded text-sm bg-white border border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                            📝 Positive Review Sample
                        </button>
                        <button
                            onClick={() => setText("This service was terrible and completely disappointing. The quality was poor and the support team was unhelpful. Would not recommend.")}
                            className="block w-full text-left p-2 rounded text-sm bg-white border border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                            📝 Negative Feedback Sample
                        </button>
                        <button
                            onClick={() => setText("The quarterly meeting will be held tomorrow at 3 PM in the main conference room. Please bring your project reports and budget proposals.")}
                            className="block w-full text-left p-2 rounded text-sm bg-white border border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                            📝 Neutral Business Text Sample
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
