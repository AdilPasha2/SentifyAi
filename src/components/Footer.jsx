import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, Code, Sparkles } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/http://adilpasha2/',
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/adilpasharazvi',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: Mail,
      href: 'adilpasharazvi2@gmail.com',
      label: 'Email',
      color: 'hover:text-cyan-400'
    }
  ]

  return (
    <footer className="relative mt-20 border-t border-dark-700/50">
      {/* Animated glow border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particles"></div>
      </div>

      <div className="relative z-10 bg-dark-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="relative">
                  <Code className="w-8 h-8 text-cyan-400" />
                  <Sparkles className="w-4 h-4 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="text-xl font-bold gradient-text">Sentify</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advanced sentiment analysis powered by AI technology. 
                Making text emotion understanding accessible and intuitive.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Home
                </a>
                <a href="/model" className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Try Model
                </a>
                <a href="/analytics" className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Analytics
                </a>
                <a href="/about" className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  About
                </a>
                <a href="/contact" className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Contact
                </a>
              </div>
            </motion.div>

            {/* Contact section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-right"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <div className="flex justify-center md:justify-end space-x-4 mb-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-dark-800/50 rounded-full border border-dark-600/50 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:border-current`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Let's build something amazing together
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-dark-700/50 pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            >
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>© {currentYear} Built by Adil and Abhinav</span>
                <span>using React & Three.js</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />

              </div>

              {/* Tech stack */}
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="px-2 py-1 bg-dark-800/50 rounded border border-dark-600/50">
                  React
                </span>
                <span className="px-2 py-1 bg-dark-800/50 rounded border border-dark-600/50">
                  Three.js
                </span>
                <span className="px-2 py-1 bg-dark-800/50 rounded border border-dark-600/50">
                  Tailwind CSS
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
