import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Target, 
  Zap, 
  Users, 
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms trained on vast datasets to understand emotional context and sentiment nuances.'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Get instant sentiment analysis results with lightning-fast processing capabilities for any text input.'
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'State-of-the-art natural language processing delivers precise sentiment classification with confidence scores.'
    },
    {
      icon: BarChart3,
      title: 'Detailed Insights',
      description: 'Comprehensive analysis beyond basic positive/negative, including emotion intensity and contextual understanding.'
    }
  ]

  const useCases = [
    {
      icon: MessageSquare,
      title: 'Social Media Monitoring',
      description: 'Track brand sentiment across social platforms and understand customer opinions in real-time.'
    },
    {
      icon: Users,
      title: 'Customer Feedback',
      description: 'Analyze customer reviews, surveys, and support tickets to improve products and services.'
    },
    {
      icon: TrendingUp,
      title: 'Market Research',
      description: 'Understand market trends and consumer sentiment to make data-driven business decisions.'
    }
  ]

  const benefits = [
    'Instant text analysis with real-time results',
    'Support for multiple languages and contexts',
    'Scalable solution for any volume of data',
    'Easy integration with existing systems',
    'Detailed emotion and sentiment breakdowns',
    'Historical trend analysis and reporting'
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-20"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Sentiment Analysis</span>
              <br />
              <span className="text-white">Powered by AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Unlock the emotional intelligence of text with our advanced AI sentiment analysis platform. 
              Understand what your audience really thinks and feels.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/model" className="btn-primary flex items-center space-x-2 text-lg">
              <Sparkles className="w-5 h-5" />
              <span>Try Our Model</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="btn-secondary flex items-center space-x-2 text-lg">
              <Brain className="w-5 h-5" />
              <span>Learn More</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* What is Sentiment Analysis Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-dark-800/30 to-dark-700/30"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                What is Sentiment Analysis?
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Sentiment analysis is the computational study of emotions, opinions, and attitudes expressed in text. 
                It uses natural language processing and machine learning to automatically determine whether text 
                expresses positive, negative, or neutral sentiment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
                  How It Works
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Text Preprocessing</h4>
                      <p className="text-gray-400">Clean and prepare text data for analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Feature Extraction</h4>
                      <p className="text-gray-400">Extract meaningful patterns and linguistic features</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">AI Classification</h4>
                      <p className="text-gray-400">Apply machine learning models to classify sentiment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Results & Insights</h4>
                      <p className="text-gray-400">Generate sentiment scores and detailed analysis</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <div className="card-dark p-8 text-center">
                  <Brain className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Advanced AI Technology
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our sentiment analysis leverages cutting-edge transformer models, 
                    deep learning architectures, and contextual understanding to provide 
                    the most accurate sentiment classification available.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of sentiment analysis with our comprehensive feature set
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-dark card-hover-effect group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Applications Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-dark-800/30 to-dark-700/30"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how sentiment analysis can transform your business and decision-making processes
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card-dark card-hover-effect text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <useCase.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                  Why Choose Our Platform?
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Our sentiment analysis platform offers unmatched accuracy, speed, and insights 
                  to help you understand and act on emotional data like never before.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="card-dark p-8">
                  <div className="text-center mb-8">
                    <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Industry Leading Accuracy
                    </h3>
                    <p className="text-gray-300">
                      Achieve up to 95% accuracy in sentiment classification
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Positive Sentiment</span>
                      <span className="text-green-400 font-semibold">94.8%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{width: '94.8%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Negative Sentiment</span>
                      <span className="text-red-400 font-semibold">93.2%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full" style={{width: '93.2%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Neutral Sentiment</span>
                      <span className="text-blue-400 font-semibold">91.7%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{width: '91.7%'}}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience the power of AI-driven sentiment analysis. Try our model now and see 
              how it can transform your understanding of text emotions.
            </p>
            <Link to="/model" className="btn-primary inline-flex items-center space-x-2 text-lg">
              <Sparkles className="w-5 h-5" />
              <span>Analyze Your Text Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
