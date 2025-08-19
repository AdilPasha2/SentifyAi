import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Zap, 
  Target, 
  Users, 
  Code, 
  Database, 
  GitBranch,
  Award,
  ArrowRight,
  BookOpen,
  Lightbulb,
  TrendingUp
} from 'lucide-react'

const About = () => {
  const technologies = [
    {
      icon: Brain,
      name: 'Transformer Models',
      description: 'BERT, RoBERTa, and custom fine-tuned models'
    },
    {
      icon: Code,
      name: 'Natural Language Processing',
      description: 'Advanced text preprocessing and feature extraction'
    },
    {
      icon: Database,
      name: 'Large-Scale Training',
      description: 'Trained on millions of labeled text samples'
    },
    {
      icon: Zap,
      name: 'Real-Time Processing',
      description: 'Optimized for low-latency inference'
    }
  ]

  const features = [
    {
      icon: Target,
      title: 'Multi-Label Classification',
      description: 'Beyond simple positive/negative, our model detects nuanced emotions like joy, anger, surprise, and more.'
    },
    {
      icon: Users,
      title: 'Context Understanding',
      description: 'Considers context, sarcasm, and cultural nuances for more accurate sentiment analysis.'
    },
    {
      icon: TrendingUp,
      title: 'Confidence Scoring',
      description: 'Provides confidence levels for each prediction, helping you understand model certainty.'
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Model continuously improves with new data and feedback loops.'
    }
  ]

  const stats = [
    { value: '95.2%', label: 'Accuracy Rate' },
    { value: '10M+', label: 'Training Samples' },
    { value: '<100ms', label: 'Response Time' },
    { value: '50+', label: 'Languages Supported' }
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">About Our</span>
              <br />
              <span className="text-white">AI Technology</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Discover the cutting-edge technology and methodologies behind our sentiment analysis platform. 
              Built with state-of-the-art machine learning and years of research.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Technology Stack */}
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
              Technology Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our sentiment analysis leverages the latest advances in artificial intelligence and machine learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-dark card-hover-effect group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <tech.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Model Architecture */}
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
                  Model Architecture
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Our sentiment analysis model is built on transformer architecture, 
                  specifically fine-tuned versions of BERT and RoBERTa, optimized for 
                  understanding emotional context in text.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Input Processing</h4>
                      <p className="text-gray-400">Tokenization and embedding generation using WordPiece tokenization</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Attention Mechanism</h4>
                      <p className="text-gray-400">Multi-head self-attention to capture contextual relationships</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Classification Head</h4>
                      <p className="text-gray-400">Dense layers for multi-class sentiment and emotion prediction</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="card-dark p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                    Model Performance
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold gradient-text mb-2">
                          {stat.value}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <p className="text-gray-300 text-sm">
                      Benchmarked against industry standards and academic datasets
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Advanced Features */}
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
              Advanced Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Go beyond basic sentiment analysis with our comprehensive emotion detection and context understanding
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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

      {/* Research & Development */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Research & Development
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Our commitment to advancing the field of sentiment analysis through continuous research and innovation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="card-dark text-center group card-hover-effect"
              >
                <GitBranch className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  Open Source
                </h3>
                <p className="text-gray-300 text-sm">
                  Contributing to the community with open-source tools and research papers
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card-dark text-center group card-hover-effect"
              >
                <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  Innovation
                </h3>
                <p className="text-gray-300 text-sm">
                  Pioneering new techniques in emotion AI and contextual understanding
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card-dark text-center group card-hover-effect"
              >
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  Collaboration
                </h3>
                <p className="text-gray-300 text-sm">
                  Working with academic institutions and industry partners
                </p>
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
              Experience the Technology
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Ready to see our advanced sentiment analysis in action? 
              Try our interactive model and discover the emotions in your text.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/model" className="btn-primary inline-flex items-center space-x-2 text-lg">
                <Brain className="w-5 h-5" />
                <span>Try the Model</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center space-x-2 text-lg">
                <Users className="w-5 h-5" />
                <span>Get in Touch</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default About
