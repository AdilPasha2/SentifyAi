from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and vectorizer once when the app starts
model = None
vectorizer = None
label_encoder = None

def load_models():
    """Load the trained models"""
    global model, vectorizer, label_encoder
    try:
        model = joblib.load('svm_sentiment_model.pkl')
        vectorizer = joblib.load('tfidf_vectorizer.pkl')
        label_encoder = joblib.load('label_encoder.pkl')
        print("Models loaded successfully!")
        return True
    except Exception as e:
        print(f"Error loading models: {e}")
        return False

def preprocess_text(text):
    """Clean and preprocess text data"""
    # Remove HTML tags
    text = re.sub(r'<.*?>', '', str(text))
    # Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    # Remove punctuation and special characters
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    # Convert to lowercase
    text = text.lower()
    return text

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint to predict sentiment"""
    try:
        # Get text from request
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        text = data['text']
        
        if not text or text.strip() == '':
            return jsonify({'error': 'Empty text provided'}), 400
        
        # Preprocess text
        clean_text = preprocess_text(text)
        
        # Vectorize
        text_tfidf = vectorizer.transform([clean_text])
        
        # Predict
        prediction = model.predict(text_tfidf)[0]
        
        # Convert back to original label
        sentiment = label_encoder.inverse_transform([prediction])[0]
        
        # Get prediction probability (confidence)
        probabilities = model.decision_function(text_tfidf)[0]
        
        return jsonify({
            'text': text,
            'sentiment': sentiment,
            'confidence': float(max(probabilities) if hasattr(probabilities, '__iter__') else probabilities),
            'success': True
        })
        
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'message': 'Sentiment Analysis API is running'
    })

@app.route('/', methods=['GET'])
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'Sentiment Analysis API',
        'endpoints': {
            '/predict': 'POST - Predict sentiment for text',
            '/health': 'GET - Health check'
        }
    })

if __name__ == '__main__':
    print("Starting Sentiment Analysis API...")
    
    # Load models
    if load_models():
        print("Starting Flask server...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Failed to load models. Please train the model first.")
