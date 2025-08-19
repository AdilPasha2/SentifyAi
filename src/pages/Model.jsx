import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  MessageSquare, 
  Trash2, 
  Plus, 
  Smile, 
  Frown, 
  Meh,
  Brain,
  Sparkles,
  Copy,
  Clock,
  BarChart3
} from 'lucide-react'

// Real sentiment analysis using our API
const analyzeSentiment = async (text) => {
  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.error || 'Analysis failed')
    }
    
    // Transform API response to match the UI expectations
    return {
      sentiment: data.sentiment,
      confidence: data.confidence,
      emotions: data.emotions,
      wordAnalysis: data.word_analysis,
      // Create scores object for compatibility
      scores: {
        positive: data.sentiment === 'Positive' ? data.confidence : (1 - data.confidence) * 0.4,
        negative: data.sentiment === 'Negative' ? data.confidence : (1 - data.confidence) * 0.4,
        neutral: data.sentiment === 'Neutral' ? data.confidence : (1 - data.confidence) * 0.2
      }
    }
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    throw new Error(`Failed to analyze sentiment: ${error.message}`)
  }
}

const Model = () => {
  const [input, setInput] = useState('')
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Analysis',
      messages: [],
      createdAt: new Date()
    }
    setChats([newChat, ...chats])
    setCurrentChat(newChat)
  }

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId)
    setChats(updatedChats)
    if (currentChat?.id === chatId) {
      setCurrentChat(updatedChats.length > 0 ? updatedChats[0] : null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    let chatToUpdate = currentChat

    // Create new chat if none exists
    if (!chatToUpdate) {
      chatToUpdate = {
        id: Date.now(),
        title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date()
      }
      setChats([chatToUpdate, ...chats])
      setCurrentChat(chatToUpdate)
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    const updatedMessages = [...chatToUpdate.messages, userMessage]
    const updatedChat = { ...chatToUpdate, messages: updatedMessages }
    
    setCurrentChat(updatedChat)
    setChats(chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat))
    setInput('')
    setIsLoading(true)

    try {
      // Analyze sentiment
      const result = await analyzeSentiment(input)
      
      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: result,
        timestamp: new Date()
      }

      const finalMessages = [...updatedMessages, aiMessage]
      const finalChat = { ...updatedChat, messages: finalMessages }

      setCurrentChat(finalChat)
      setChats(chats.map(chat => chat.id === finalChat.id ? finalChat : chat))
    } catch (error) {
      console.error('Error analyzing sentiment:', error)
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: {
          sentiment: 'Error',
          confidence: 0,
          emotions: ['error'],
          scores: { positive: 0, neutral: 0, negative: 0 },
          error: error.message || 'Failed to analyze sentiment. Please try again.'
        },
        timestamp: new Date()
      }

      const finalMessages = [...updatedMessages, errorMessage]
      const finalChat = { ...updatedChat, messages: finalMessages }

      setCurrentChat(finalChat)
      setChats(chats.map(chat => chat.id === finalChat.id ? finalChat : chat))
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getSentimentIcon = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-400" />
      case 'negative':
        return <Frown className="w-5 h-5 text-red-400" />
      default:
        return <Meh className="w-5 h-5 text-blue-400" />
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-green-400 bg-green-500/10 border-green-500/20'
      case 'negative':
        return 'text-red-400 bg-red-500/10 border-red-500/20'
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    }
  }

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-80 bg-dark-800/50 backdrop-blur-sm border-r border-dark-600/50 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-dark-600/50">
          <button
            onClick={createNewChat}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Analysis</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
            Recent Analyses
          </h3>
          <div className="space-y-2">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  currentChat?.id === chat.id
                    ? 'bg-cyan-500/10 border border-cyan-500/30'
                    : 'hover:bg-dark-700/50 border border-transparent'
                }`}
                onClick={() => setCurrentChat(chat)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">
                      {chat.title}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1">
                      {chat.messages.length} {chat.messages.length === 1 ? 'message' : 'messages'}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteChat(chat.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 border-b border-dark-600/50 bg-dark-800/30 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Sentiment Analysis Chat</h1>
              <p className="text-gray-400 text-sm">
                Powered by advanced AI • Analyze emotions in real-time
              </p>
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
          <AnimatePresence>
            {!currentChat || currentChat.messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Welcome to Sentiment Analysis
                </h2>
                <p className="text-gray-400 max-w-md mb-8">
                  Type any text below and I'll analyze its emotional sentiment, providing detailed insights about the feelings and attitudes expressed.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                  <div className="card-dark p-4 text-center">
                    <MessageSquare className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white mb-2">Social Media</h3>
                    <p className="text-gray-400 text-sm">Analyze tweets, posts, and comments</p>
                  </div>
                  <div className="card-dark p-4 text-center">
                    <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white mb-2">Reviews</h3>
                    <p className="text-gray-400 text-sm">Understand customer feedback</p>
                  </div>
                  <div className="card-dark p-4 text-center">
                    <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white mb-2">Any Text</h3>
                    <p className="text-gray-400 text-sm">Articles, messages, documents</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {currentChat.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-2xl ${message.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                      {message.type === 'user' ? (
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-2xl rounded-br-none">
                          <p className="text-white">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-300">
                            <span>You</span>
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-dark-800/50 p-6 rounded-2xl rounded-bl-none border border-dark-600/50">
                          <div className="flex items-center space-x-2 mb-4">
                            <Brain className="w-5 h-5 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold">AI Analysis</span>
                            <button
                              onClick={() => copyToClipboard(JSON.stringify(message.content, null, 2))}
                              className="ml-auto p-1 hover:bg-dark-700/50 rounded transition-colors"
                            >
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                          
                          {/* Sentiment Result */}
                          <div className="space-y-4">
                            {/* Error Display */}
                            {message.content.error ? (
                              <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/10">
                                <div className="flex items-center space-x-3">
                                  <div className="w-5 h-5 text-red-400">⚠</div>
                                  <div>
                                    <h3 className="font-semibold text-lg text-red-400">Analysis Failed</h3>
                                    <p className="text-sm text-red-300">{message.content.error}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Main Sentiment */
                              <div className={`p-4 rounded-lg border ${getSentimentColor(message.content.sentiment)}`}>
                                <div className="flex items-center space-x-3">
                                  {getSentimentIcon(message.content.sentiment)}
                                  <div>
                                    <h3 className="font-semibold text-lg">{message.content.sentiment}</h3>
                                    <p className="text-sm opacity-80">
                                      Confidence: {(message.content.confidence * 100).toFixed(1)}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Detailed Scores */}
                            <div className="grid grid-cols-3 gap-3">
                              <div className="card-dark p-3 text-center">
                                <div className="text-green-400 font-semibold">
                                  {(message.content.scores.positive * 100).toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-400 mt-1">Positive</div>
                              </div>
                              <div className="card-dark p-3 text-center">
                                <div className="text-blue-400 font-semibold">
                                  {(message.content.scores.neutral * 100).toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-400 mt-1">Neutral</div>
                              </div>
                              <div className="card-dark p-3 text-center">
                                <div className="text-red-400 font-semibold">
                                  {(message.content.scores.negative * 100).toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-400 mt-1">Negative</div>
                              </div>
                            </div>

                            {/* Emotions */}
                            <div>
                              <h4 className="text-white font-semibold mb-2">Detected Emotions:</h4>
                              <div className="flex flex-wrap gap-2">
                                {message.content.emotions.map((emotion, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-dark-700/50 text-cyan-400 rounded-full text-sm border border-dark-600/50"
                                  >
                                    {emotion}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-dark-600/50 text-xs text-gray-400">
                            <span>AI Assistant</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{message.timestamp.toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-2xl mr-12">
                      <div className="bg-dark-800/50 p-6 rounded-2xl rounded-bl-none border border-dark-600/50">
                        <div className="flex items-center space-x-3">
                          <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
                          <span className="text-cyan-400">Analyzing sentiment...</span>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="h-2 bg-dark-700 rounded animate-pulse"></div>
                          <div className="h-2 bg-dark-700 rounded animate-pulse w-3/4"></div>
                          <div className="h-2 bg-dark-700 rounded animate-pulse w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 border-t border-dark-600/50 bg-dark-800/30 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="flex space-x-4 items-end">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to analyze sentiment... (e.g., 'I love this product!', 'This movie was disappointing', etc.)"
                className="input-dark w-full resize-none min-h-[60px] max-h-40"
                rows={2}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to analyze • Shift + Enter for new line • 
            <span className="text-cyan-400 ml-1">
              {/* TODO: This will be replaced with actual model info */}
              Powered by advanced NLP models
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Model
