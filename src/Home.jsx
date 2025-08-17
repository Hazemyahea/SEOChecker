import { useState } from 'react';
import { Search, Globe, FileText, Gauge, Image, Link, ExternalLink, Code, CheckCircle, TrendingUp, Eye, Zap, Shield, BarChart3, Target, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
export default function SEOCheckerHomepage() {
      const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const handleClick = () => {
    navigate("/seo");
  };
  const features = [
    {
      icon: <Gauge className="w-8 h-8 text-blue-600" />,
      title: "Performance Scoring",
      description: "Get instant SEO performance scores with detailed breakdowns of your website's optimization level."
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Meta Analysis",
      description: "Comprehensive analysis of titles, meta descriptions, and heading structures for optimal search visibility."
    },
    {
      icon: <Image className="w-8 h-8 text-purple-600" />,
      title: "Image Optimization",
      description: "Detailed audit of image alt attributes and accessibility compliance with visual feedback."
    },
    {
      icon: <Link className="w-8 h-8 text-pink-600" />,
      title: "Link Architecture",
      description: "Analysis of internal linking structure and external link attributes (dofollow/nofollow balance)."
    },
    {
      icon: <Code className="w-8 h-8 text-indigo-600" />,
      title: "Schema Markup Detection",
      description: "Identify structured data implementation for enhanced search result appearances."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Actionable Insights",
      description: "Clear recommendations with prioritized issues and strengths to guide your optimization efforts."
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      text: "Improve search rankings with data-driven optimization"
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      text: "Enhanced visibility in search engine results"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      text: "Instant analysis - no waiting for reports"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      text: "Accessibility compliance checking built-in"
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      text: "Targeted recommendations for maximum impact"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-30 scale-110"></div>
                <div className="relative p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-2xl">
                  <Search className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professional
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> SEO Analysis</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Comprehensive website analysis that delivers actionable SEO insights. 
              Optimize your search performance with detailed technical audits and data-driven recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button       onClick={handleClick} className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2">
                Start Free Analysis
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-gray-500">No signup required • Instant results</p>
            </div>
          </div>
        </div>
      </div>

      {/* What It Does Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Complete SEO Health Check in
            <span className="text-blue-600"> Seconds</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced analysis engine examines critical SEO factors that impact your search rankings. 
            Get professional-grade insights without the complexity or cost of enterprise tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Your URL</h3>
                <p className="text-gray-600">Simply paste your website URL and let our crawler analyze your page structure, content, and technical elements.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
                <p className="text-gray-600">Our engine evaluates 50+ SEO factors including meta tags, schema markup, link architecture, and accessibility compliance.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Actionable Recommendations</h3>
                <p className="text-gray-600">Receive prioritized improvement suggestions with clear explanations and impact assessments for each optimization opportunity.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-indigo-200/50 rounded-2xl transform rotate-1"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-800 font-medium">Meta tags optimized</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Gauge className="w-6 h-6 text-blue-600" />
                  <span className="text-blue-800 font-medium">SEO Score: 87/100</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Code className="w-6 h-6 text-purple-600" />
                  <span className="text-purple-800 font-medium">Schema markup detected</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Image className="w-6 h-6 text-yellow-600" />
                  <span className="text-yellow-800 font-medium">3 images need alt text</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="text-indigo-600"> SEO Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for developers, marketers, and SEO professionals who need reliable, 
              comprehensive analysis without the enterprise complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our
              <span className="text-blue-600"> SEO Checker</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of developers and marketers who trust our platform for reliable SEO analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                {benefit.icon}
                <span className="text-gray-700 font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">SEO Factors</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">&lt;10s</div>
                <div className="text-gray-600">Analysis Time</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600">Free to Use</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Website?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get started with our free SEO analysis. No registration required, instant results, professional insights.
          </p>
          
          <button  onClick={handleClick} className="group px-10 py-5 bg-white text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto mb-8">
            <Search className="w-6 h-6" />
            Start Your Free SEO Analysis
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-blue-200 text-sm">
            Trusted by developers and marketers worldwide • No limits • No hidden fees
          </p>
        </div>
      </div>
    </div>
  );
}