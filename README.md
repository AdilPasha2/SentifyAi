# Sentiment Analysis System

This project contains a complete sentiment analysis system with SVM machine learning model and Flask API.

## Files Overview

- `train_svm_model.py` - Trains the SVM model using your dataset
- `predict_sentiment.py` - Standalone prediction script
- `app.py` - Flask API for sentiment prediction
- `svm_sentiment_model.pkl` - Trained SVM model
- `tfidf_vectorizer.pkl` - TF-IDF vectorizer
- `label_encoder.pkl` - Label encoder for sentiment classes

## Model Performance

✅ **SVM Model Trained Successfully!**
- **Accuracy: 69.8%**
- **Best Parameters:** C=1, kernel=linear, gamma=scale
- **Classes:** positive, negative, neutral

## Quick Start

### 1. Test the Prediction Script
```bash
python predict_sentiment.py "I love this product!"
# Output: positive

python predict_sentiment.py "This is terrible"
# Output: negative

python predict_sentiment.py "The weather is okay"
# Output: neutral
```

### 2. Start the Flask API Server
```bash
python app.py
```
The API will start on `http://localhost:5000`

### 3. API Endpoints

#### Health Check
```bash
GET http://localhost:5000/health
```

#### Predict Sentiment
```bash
POST http://localhost:5000/predict
Content-Type: application/json

{
    "text": "Your text here"
}
```

**Response:**
```json
{
    "text": "Your text here",
    "sentiment": "positive",
    "confidence": 0.85,
    "success": true
}
```

### 4. Frontend Integration

Your frontend can make POST requests to `http://localhost:5000/predict`:

```javascript
// Example JavaScript code for your frontend
async function predictSentiment(text) {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('Sentiment:', result.sentiment);
            console.log('Confidence:', result.confidence);
            return result;
        } else {
            console.error('Error:', result.error);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}

// Usage
predictSentiment("I love this application!");
```

## Model Details

### Data Preprocessing
- Removes HTML tags and URLs
- Removes punctuation and special characters  
- Converts to lowercase
- Removes extra whitespace

### Feature Extraction
- TF-IDF Vectorization
- Max features: 10,000
- N-gram range: (1, 2)
- English stop words removed

### Model Training
- Algorithm: Support Vector Machine (SVM)
- Grid search hyperparameter tuning
- 3-fold cross-validation
- Best parameters: C=1, kernel=linear

### Performance Metrics
```
              precision    recall  f1-score   support
negative          0.73      0.60      0.66      1556
neutral           0.63      0.76      0.69      2223  
positive          0.79      0.70      0.74      1717

accuracy                           0.70      5496
macro avg         0.72      0.69      0.70      5496
weighted avg      0.71      0.70      0.70      5496
```

## Troubleshooting

### Model Not Found Error
If you get "Model not found" error, retrain the model:
```bash
python train_svm_model.py
```

### CORS Issues
The Flask API includes CORS support for frontend integration.

### Port Issues
If port 5000 is busy, change the port in `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Change to any available port
```

## Next Steps

1. **Start the API server:** `python app.py`
2. **Test with your frontend** by making POST requests to `/predict`
3. **Monitor performance** and retrain if needed with more data

Your sentiment analysis system is ready to use! 🚀

# Sentiment Analysis AI Website

A modern, responsive sentiment analysis website built with React, Vite, and Three.js. Features a ChatGPT-like interface for real-time text sentiment analysis with beautiful WebGL animations.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Dark theme with neon cyan/blue accents and smooth animations
- **ChatGPT-like Interface**: Interactive chat interface for sentiment analysis
- **WebGL Animations**: Beautiful Three.js background with floating particles and geometric shapes
- **Sticky Navigation**: Professional navigation bar with smooth scrolling
- **Real-time Analysis**: Instant sentiment analysis with confidence scores
- **Detailed Insights**: Beyond basic positive/negative - includes emotion detection
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🛠 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
sentiment-analysis-website/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   └── WebGLBackground.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   └── Model.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd sentiment-analysis-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
The built files will be in the `dist/` directory, ready for deployment.

## 🤖 Sentiment Analysis Integration

The website currently includes a **placeholder sentiment analysis function** in `src/pages/Model.jsx`. To integrate your trained model:

### Current Placeholder Location
```javascript
// File: src/pages/Model.jsx
// Line: ~18-50

const analyzeSentiment = async (text) => {
  // TODO: Replace this with actual trained model integration
  // Current implementation is a simple placeholder
  
  // Replace this section with your model API call:
  // const response = await fetch('your-api-endpoint', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ text })
  // });
  // const result = await response.json();
  // return result;
}
```

### Integration Options

1. **REST API Integration**
   ```javascript
   const analyzeSentiment = async (text) => {
     const response = await fetch('/api/analyze-sentiment', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ text })
     });
     return await response.json();
   };
   ```

2. **External API Service**
   ```javascript
   const analyzeSentiment = async (text) => {
     const response = await fetch('https://your-sentiment-api.com/analyze', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ text })
     });
     return await response.json();
   };
   ```

3. **Python Backend Integration**
   ```javascript
   const analyzeSentiment = async (text) => {
     const response = await fetch('http://localhost:8000/predict', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ text })
     });
     return await response.json();
   };
   ```

### Expected Response Format

Your sentiment analysis API should return data in this format:

```javascript
{
  sentiment: "Positive" | "Negative" | "Neutral",
  confidence: 0.85, // Float between 0 and 1
  scores: {
    positive: 0.75,
    neutral: 0.15,
    negative: 0.10
  },
  emotions: ["joy", "satisfaction", "optimism"] // Array of detected emotions
}
```

## 🎨 Customization

### Colors and Themes
Colors are defined in `tailwind.config.js`:
```javascript
colors: {
  primary: { /* ... */ },
  accent: {
    cyan: '#00ffff',
    green: '#00ff00',
    blue: '#0080ff',
  },
  dark: { /* ... */ }
}
```

### WebGL Animations
Modify WebGL components in `src/components/WebGLBackground.jsx`:
- Particle count and behavior
- Geometric shapes and animations  
- Colors and opacity
- Camera position and movement

### Content Updates
- **Contact Information**: Update in `src/pages/Contact.jsx`
- **Social Links**: Update in `src/components/Footer.jsx`
- **Brand Name**: Update "Sentify" throughout components
- **Meta Tags**: Update in `index.html`

## 📝 Environment Variables

Create a `.env` file for sensitive data:

```env
REACT_APP_API_KEY=your_sentiment_api_key
REACT_APP_API_BASE_URL=https://your-api-url.com
REACT_APP_CONTACT_EMAIL=your.email@example.com
```

## 🐛 Known Issues & TODOs

- [ ] Replace placeholder sentiment analysis with actual model
- [ ] Implement actual contact form backend
- [ ] Add proper error boundaries
- [ ] Implement user authentication (if needed)
- [ ] Add analytics tracking
- [ ] Optimize WebGL performance for mobile
- [ ] Add loading states for better UX
- [ ] Implement proper caching for API calls

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: your.email@example.com
- GitHub: [Your GitHub Profile](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for 3D graphics
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Vite](https://vitejs.dev/) for build tooling

---

**Built with ❤️ and modern web technologies**
