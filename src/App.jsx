import { useState } from 'react';
import { Search, Globe, FileText, Gauge, Loader2, AlertCircle, Image as ImageIcon, Link, ExternalLink, Code } from 'lucide-react'; // Removed Lightbulb icon

export default function SEOChecker() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Fetch data from the backend API
      const response = await fetch(`https://seo-analyzer-backend.vercel.app/analyze?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.error) {
        // Handle error responses from the backend
        setError(data.error);
        setResults(null);
      } else {
        // Set the results state with the received data
        setResults({
          url: data.url, // Ensure URL is passed for display
          title: data.title || "No title",
          metaDescription: data.metaDescription || "No description",
          performanceScore: data.performanceScore || 0, // Your custom score
          status: data.status || 'bad',
          strengths: data.strengths || [],
          issues: data.issues || [],
          h1Tags: data.h1Tags || [],
          // Image alt data
          totalImages: data.totalImages !== undefined ? data.totalImages : 0,
          imagesWithAlt: data.imagesWithAlt !== undefined ? data.imagesWithAlt : 0,
          imagesWithoutAlt: data.imagesWithoutAlt !== undefined ? data.imagesWithoutAlt : 0,
          imageData: data.imageData || [],
          internalLinks: data.internalLinks || [],
          externalDofollowLinks: data.externalDofollowLinks || [],
          externalNofollowLinks: data.externalNofollowLinks || [],
          schemaData: data.schemaData || [],         // Schema Markup
          // Removed keywordSuggestions from here
        });
      }
    } catch (err) {
      // Handle network or other unexpected errors
      console.error('Fetch error:', err);
      setError('Failed to analyze website. Please ensure the backend is running and the URL is accessible.');
    } finally {
      // Always stop loading, regardless of success or failure
      setLoading(false);
    }
  };

  // Determines the color of the score based on its value
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Determines the border and background color of a card based on its status (good, average, bad)
  const getCardColor = (status) => {
    switch (status) {
      case 'good': return 'border-green-200 bg-green-50';
      case 'average': return 'border-yellow-200 bg-yellow-50';
      case 'bad': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  // Generates Tailwind CSS classes for status badges
  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'good': return `${baseClasses} bg-green-100 text-green-800`;
      case 'average': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'bad': return `${baseClasses} bg-red-100 text-red-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Helper function to determine alt attribute coverage status (good, average, bad)
  const getAltCoverageStatus = (total, withAlt) => {
    if (total === 0) return 'good'; // No images means no alt issues
    const percentage = (withAlt / total) * 100;
    if (percentage >= 80) return 'good';
    if (percentage >= 50) return 'average';
    return 'bad';
  };

  // Helper function to determine external link status (e.g., if there's a healthy mix)
  const getExternalLinkStatus = (dofollowCount, nofollowCount) => {
      if (dofollowCount > 0 && nofollowCount > 0) return 'good';
      if (dofollowCount > 0 && nofollowCount === 0) return 'average'; // Only dofollow might be less natural
      if (dofollowCount === 0 && nofollowCount > 0) return 'average'; // Only nofollow, less benefit for linked sites
      return 'bad'; // No external links
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SEO Checker</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze your website's SEO performance and get insights to improve your search rankings
          </p>
        </div>

        {/* Input Section for URL */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 shadow-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
            </div>
            <div className="sm:self-end">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 animate-fade-in">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {/* Analysis Results Section */}
        {results && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Results</h2>
              <p className="text-gray-600">Here's what we found about your website</p>
            </div>

            {/* Main Score Cards (Title, Meta, Custom Performance) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Website Title Card */}
              <div className={`bg-white border-2 rounded-xl p-6 shadow-lg ${getCardColor(results.status)}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Website Title</h3>
                </div>
                <p className="text-gray-700 font-medium mb-2 break-words">{results.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{results.title.length} characters</span>
                  <span className={getStatusBadge(results.status)}>
                    {results.status === 'good' ? 'Good' : results.status === 'average' ? 'Average' : 'Needs Work'}
                  </span>
                </div>
              </div>

              {/* Meta Description Card */}
              <div className={`bg-white border-2 rounded-xl p-6 shadow-lg ${getCardColor(results.status)}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Meta Description</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2 line-clamp-3 break-words">{results.metaDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{results.metaDescription.length} characters</span>
                  <span className={getStatusBadge(results.status)}>
                    {results.status === 'good' ? 'Good' : results.status === 'average' ? 'Average' : 'Needs Work'}
                  </span>
                </div>
              </div>

              {/* Custom Performance Score Card */}
              <div className={`bg-white border-2 rounded-xl p-6 shadow-lg ${getCardColor(results.status)} md:col-span-2 lg:col-span-1`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Gauge className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Custom SEO Score</h3>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(results.performanceScore)} mb-2`}>
                    {results.performanceScore}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        results.performanceScore >= 80 ? 'bg-green-500' :
                        results.performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${results.performanceScore}%` }}
                    ></div>
                  </div>
                  <span className={getStatusBadge(results.status)}>
                    {results.status === 'good' ? 'Excellent' : results.status === 'average' ? 'Good' : 'Poor'}
                  </span>
                </div>
              </div>
            </div>

            {/* Internal Links Section */}
            <div className="bg-white border-2 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Link className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Internal Links ({results.internalLinks.length})</h3>
              </div>
              {results.internalLinks.length > 0 ? (
                <div className="max-h-60 overflow-y-auto pr-2">
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {results.internalLinks.map((link, i) => (
                      <li key={i} className="text-sm break-words">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500">No internal links found on this page. Consider adding some for better navigation and SEO.</p>
              )}
              <p className="text-sm text-gray-600 mt-4">
                Internal links help users and search engines navigate your site, distributing "link equity" and improving SEO.
              </p>
            </div>

            {/* Outgoing Link Attributes Section */}
            <div className={`bg-white border-2 rounded-xl p-6 shadow-lg ${getCardColor(getExternalLinkStatus(results.externalDofollowLinks.length, results.externalNofollowLinks.length))}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <ExternalLink className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Outgoing Link Attributes</h3>
                </div>
                <div className="text-gray-700 mb-4">
                    <p className="mb-2">
                        Dofollow Links: <span className="font-bold text-green-700">{results.externalDofollowLinks.length}</span>
                    </p>
                    <p className="mb-2">
                        Nofollow Links: <span className="font-bold text-yellow-700">{results.externalNofollowLinks.length}</span>
                    </p>
                </div>

                {results.externalDofollowLinks.length > 0 && (
                    <div className="max-h-40 overflow-y-auto pr-2 mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Sample Dofollow Links:</h4>
                        <ul className="list-disc list-inside text-green-700 space-y-1">
                            {results.externalDofollowLinks.slice(0, 5).map((link, i) => ( // Show first 5
                                <li key={`dofollow-${i}`} className="text-sm break-words">
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {results.externalNofollowLinks.length > 0 && (
                    <div className="max-h-40 overflow-y-auto pr-2 mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Sample Nofollow Links:</h4>
                        <ul className="list-disc list-inside text-yellow-700 space-y-1">
                            {results.externalNofollowLinks.slice(0, 5).map((link, i) => ( // Show first 5
                                <li key={`nofollow-${i}`} className="text-sm break-words">
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {results.externalDofollowLinks.length === 0 && results.externalNofollowLinks.length === 0 && (
                     <p className="text-gray-500">No external links found on this page. Consider linking out to relevant authority sites.</p>
                )}
                <p className="text-sm text-gray-600 mt-4">
                    Dofollow links pass "link equity" (PageRank) to the linked page, while nofollow links do not. Use a healthy mix for a natural link profile.
                </p>
            </div>

            {/* Schema Markup Section */}
            <div className={`bg-white border-2 rounded-xl p-6 shadow-lg ${results.schemaData.length > 0 ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Code className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Schema Markup ({results.schemaData.length})</h3>
                </div>
                {results.schemaData.length > 0 ? (
                    <div className="max-h-40 overflow-y-auto pr-2">
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {results.schemaData.map((type, i) => (
                                <li key={i} className="text-sm break-words">{type}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-500">No Schema Markup found. Consider adding it for rich results. ⚠️</p>
                )}
                <p className="text-sm text-gray-600 mt-4">
                    Schema Markup helps search engines understand your content better, potentially leading to rich snippets in search results.
                </p>
            </div>

            {/* Image Alt Attributes Summary Section */}
            <div className={`bg-white border-2 rounded-xl p-6 shadow-lg ${getCardColor(getAltCoverageStatus(results.totalImages, results.imagesWithAlt))}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Image Alt Attributes Summary</h3>
              </div>
              <div className="text-gray-700">
                <p className="mb-2">
                  Total Images: <span className="font-bold">{results.totalImages}</span>
                </p>
                <p className="mb-2">
                  Images with Alt: <span className="font-bold text-green-700">{results.imagesWithAlt}</span>
                </p>
                <p className="mb-2">
                  Images without Alt: <span className="font-bold text-red-700">{results.imagesWithoutAlt}</span>
                </p>
                {results.totalImages > 0 && (
                  <p className="text-sm text-gray-600 mt-3">
                    Alt attributes are crucial for accessibility and help search engines understand image content.
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">Alt Coverage</span>
                <span className={getStatusBadge(getAltCoverageStatus(results.totalImages, results.imagesWithAlt))}>
                  {getAltCoverageStatus(results.totalImages, results.imagesWithAlt) === 'good' ? 'Excellent' :
                   getAltCoverageStatus(results.totalImages, results.imagesWithAlt) === 'average' ? 'Partial' : 'Poor'}
                </span>
              </div>
            </div>

            {/* Detailed Image Alt Status Section */}
            {results.imageData && results.imageData.length > 0 && (
              <div className="bg-white border-2 rounded-xl p-6 shadow-lg mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <ImageIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Detailed Image Alt Status</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
                  {results.imageData.map((img, index) => (
                    <div key={index} className="flex flex-col items-center p-2 border border-gray-200 rounded-lg shadow-sm">
                      <img
                        src={img.src}
                        alt={img.alt || 'No alt text provided'}
                        className="w-full h-24 object-contain rounded-md mb-2 bg-gray-100"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent looping
                          e.target.src = `https://placehold.co/100x100/CCCCCC/FFFFFF?text=Image+Error`; // Fallback image
                        }}
                      />
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${img.hasAlt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {img.hasAlt ? 'Alt Exists' : 'No Alt'}
                      </div>
                      {img.alt && img.hasAlt && (
                        <p className="text-xs text-gray-600 mt-1 truncate w-full text-center" title={img.alt}>
                          Alt: "{img.alt}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Review images to ensure all have descriptive alt attributes for better SEO and accessibility.
                </p>
              </div>
            )}


            {/* Strengths & Issues Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow">
                <h3 className="font-semibold text-green-800 mb-3">✅ Strengths</h3>
                <ul className="list-disc list-inside text-green-700 space-y-2">
                  {results.strengths.length > 0 ? results.strengths.map((s,i) => <li key={i}>{s}</li>) : <li>No strengths found</li>}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow">
                <h3 className="font-semibold text-red-800 mb-3">❌ Issues</h3>
                <ul className="list-disc list-inside text-red-700 space-y-2">
                  {results.issues.length > 0 ? results.issues.map((s,i) => <li key={i}>{s}</li>) : <li>No issues found</li>}
                </ul>
              </div>
            </div>

            {/* H1 Tags Section */}
            <div className="bg-white border-2 rounded-xl p-6 shadow-lg mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900">H1 Tags</h3>
                </div>
                {results.h1Tags.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {results.h1Tags.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              ) : (
                <p className="text-gray-500">No H1 tags found</p>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
