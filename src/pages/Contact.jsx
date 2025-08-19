import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { 
  Mail, 
  MessageSquare, 
  Github, 
  Linkedin, 
  MapPin, 
  Phone, 
  Clock,
  Send,
  User,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const Contact = () => {
  const form = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'

  // Initialize EmailJS (only needs to be done once)
  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    })
  }, [])

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sentify1.ai@gmail.com',
      href: 'mailto:sentify1.ai@gmail.com',
      color: 'text-cyan-400'
    },
    {
      icon: Github,
      label: 'GitHub - Adil',
      value: 'github.com/adilpasha2',
      href: 'https://github.com/adilpasha2',
      color: 'text-gray-400'
    },
    {
      icon: Github,
      label: 'GitHub - Abhinav',
      value: 'github.com/Abhinav0064',
      href: 'https://github.com/Abhinav0064',
      color: 'text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn - Adil',
      value: 'www.linkedin.com/in/adilpasharazvi',
      href: 'https://linkedin.com/in/adilpasharazvi',
      color: 'text-blue-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn - Abhinav',
      value: 'www.linkedin.com/in/abhinavsatish64',
      href: 'https://linkedin.com/in/abhinavsatish64',
      color: 'text-blue-400'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Debug: Log environment variables with exact values
      console.log('EmailJS Config:', {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      })
      
      console.log('Template ID being used:', `"${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}"`)
      console.log('Template ID length:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.length)

      console.log('Form data being sent:', {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })

      // Check if environment variables are loaded
      if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS environment variables not loaded properly')
      }

      // Send email using EmailJS with alternative method
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Website Owner', // Add recipient name
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Simplified public key parameter
      )
      
      console.log('EmailJS Success:', result)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error Details:', {
        error: error,
        message: error.message,
        status: error.status,
        text: error.text,
        stack: error.stack
      })
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

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
              <span className="gradient-text">Get in Touch</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Have questions about our sentiment analysis platform? Want to collaborate or integrate our technology? 
              I'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-4">
                    Let's Connect
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Whether you're interested in using our sentiment analysis technology, 
                    have feedback, or want to discuss potential collaborations, 
                    I'm always excited to connect with fellow developers, researchers, and businesses.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="card-dark card-hover-effect group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-dark-700/50 rounded-lg flex items-center justify-center group-hover:bg-dark-600/50 transition-colors`}>
                          <contact.icon className={`w-6 h-6 ${contact.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">
                            {contact.label}
                          </h3>
                          {contact.href ? (
                            <a
                              href={contact.href}
                              target={contact.href.startsWith('http') ? '_blank' : undefined}
                              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className={`${contact.color} hover:text-cyan-300 transition-colors`}
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <span className="text-gray-400">{contact.value}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Availability */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="card-dark border-l-4 border-l-green-400"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold text-white">Availability</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    I typically respond to messages within 24-48 hours during weekdays. 
                    For urgent inquiries, please mention it in your subject line.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="card-dark">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">Failed to send message. Please try again or use email directly.</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="input-dark pl-11 w-full"
                          placeholder="Enter your name"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="input-dark pl-11 w-full"
                          placeholder="Enter your email"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-dark w-full"
                      placeholder="What's this about?"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="input-dark pl-11 w-full resize-none"
                        placeholder="Tell me about your project, questions, or how I can help..."
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Quick answers to common questions about our sentiment analysis platform
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How accurate is the sentiment analysis model?",
                answer: "Our model achieves over 95% accuracy on standard benchmarks, with continuous improvements through regular updates and fine-tuning."
              },
              {
                question: "Can I integrate this into my application?",
                answer: "Yes! We're developing APIs and SDKs for easy integration. Contact me to discuss your specific requirements and use cases."
              },
              {
                question: "What languages are supported?",
                answer: "Currently focused on English, but we're expanding to support 50+ languages including Spanish, French, German, and more."
              },
              {
                question: "Is there a commercial license available?",
                answer: "We offer flexible licensing options for commercial use. Please reach out to discuss pricing and terms based on your needs."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-dark card-hover-effect"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Contact
