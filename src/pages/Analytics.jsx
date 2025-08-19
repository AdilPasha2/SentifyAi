import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Target, PieChart, Activity, Award } from 'lucide-react'

const Analytics = () => {
  const [modelStats, setModelStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load model statistics
    const loadModelStats = async () => {
      try {
        const response = await fetch('/model_stats.json')
        const data = await response.json()
        setModelStats(data)
      } catch (error) {
        console.error('Error loading model stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadModelStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatPercentage = (num) => {
    return `${(num * 100).toFixed(1)}%`
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Model Analytics</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive deep into the performance metrics and accuracy visualizations of our 
            SVM-based sentiment analysis model
          </p>
        </motion.div>

        {/* Key Metrics Cards */}
        {modelStats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {/* Overall Accuracy */}
            <div className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Target className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                {formatPercentage(modelStats.overall_accuracy)}
              </h3>
              <p className="text-gray-400">Overall Accuracy</p>
            </div>

            {/* Total Samples */}
            <div className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                {formatNumber(modelStats.total_samples)}
              </h3>
              <p className="text-gray-400">Total Samples</p>
            </div>

            {/* Best F1-Score */}
            <div className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-full">
                  <Award className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                {formatPercentage(Math.max(...Object.values(modelStats.performance_metrics.f1_score)))}
              </h3>
              <p className="text-gray-400">Best F1-Score</p>
            </div>

            {/* Model Type */}
            <div className="glass-card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-purple-400 mb-2">
                SVM
              </h3>
              <p className="text-gray-400">Algorithm</p>
            </div>
          </motion.div>
        )}

        {/* Performance Metrics Table */}
        {modelStats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-8 mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <BarChart3 className="w-8 h-8 text-cyan-400 mr-3" />
              <span className="gradient-text">Performance Metrics</span>
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-4 px-6 text-gray-300 font-semibold">Sentiment</th>
                    <th className="py-4 px-6 text-gray-300 font-semibold">Precision</th>
                    <th className="py-4 px-6 text-gray-300 font-semibold">Recall</th>
                    <th className="py-4 px-6 text-gray-300 font-semibold">F1-Score</th>
                    <th className="py-4 px-6 text-gray-300 font-semibold">Samples</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(modelStats.sentiment_distribution).map(([sentiment, count]) => (
                    <tr key={sentiment} className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6">
                        <span className={`capitalize font-semibold ${
                          sentiment === 'positive' ? 'text-green-400' : 
                          sentiment === 'negative' ? 'text-red-400' : 
                          'text-yellow-400'
                        }`}>
                          {sentiment}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white">
                        {formatPercentage(modelStats.performance_metrics.precision[sentiment])}
                      </td>
                      <td className="py-4 px-6 text-white">
                        {formatPercentage(modelStats.performance_metrics.recall[sentiment])}
                      </td>
                      <td className="py-4 px-6 text-white">
                        {formatPercentage(modelStats.performance_metrics.f1_score[sentiment])}
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {formatNumber(count)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Visualizations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Confusion Matrix */}
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Target className="w-6 h-6 text-cyan-400 mr-3" />
              Confusion Matrix
            </h3>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <img
                src="/confusion_matrix.png"
                alt="Confusion Matrix"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Visualizes the accuracy of predictions across different sentiment classes
            </p>
          </div>

          {/* Performance Metrics Chart */}
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 text-green-400 mr-3" />
              Performance Metrics
            </h3>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <img
                src="/performance_metrics.png"
                alt="Performance Metrics"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Precision, Recall, and F1-Score comparison across sentiment classes
            </p>
          </div>

          {/* Sentiment Distribution */}
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <PieChart className="w-6 h-6 text-purple-400 mr-3" />
              Sentiment Distribution
            </h3>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <img
                src="/sentiment_distribution.png"
                alt="Sentiment Distribution"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Distribution of sentiment classes in the training dataset
            </p>
          </div>

          {/* Accuracy vs Samples */}
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
              Accuracy vs Sample Size
            </h3>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <img
                src="/accuracy_vs_samples.png"
                alt="Accuracy vs Samples"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Model accuracy performance across different sample sizes
            </p>
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card p-8"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Activity className="w-8 h-8 text-purple-400 mr-3" />
            <span className="gradient-text">Technical Details</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-4">Model Architecture</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Algorithm:</strong> Support Vector Machine (SVM)</li>
                <li>• <strong>Kernel:</strong> Linear</li>
                <li>• <strong>Regularization (C):</strong> 1.0</li>
                <li>• <strong>Gamma:</strong> Scale</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-400 mb-4">Feature Engineering</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Vectorization:</strong> TF-IDF</li>
                <li>• <strong>Max Features:</strong> 10,000</li>
                <li>• <strong>N-gram Range:</strong> (1, 2)</li>
                <li>• <strong>Stop Words:</strong> English</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-4">Training Process</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Optimization:</strong> Grid Search</li>
                <li>• <strong>Cross-Validation:</strong> 3-fold</li>
                <li>• <strong>Test Split:</strong> 20%</li>
                <li>• <strong>Stratified:</strong> Yes</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Data Processing</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Text Cleaning:</strong> HTML/URL removal</li>
                <li>• <strong>Normalization:</strong> Lowercase</li>
                <li>• <strong>Special Chars:</strong> Removed</li>
                <li>• <strong>Encoding:</strong> UTF-8</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics
