import json
import re
import os
from http.server import BaseHTTPRequestHandler
import urllib.parse

# Since we can't use joblib/scikit-learn directly in Vercel serverless functions
# We'll implement a lightweight sentiment analysis for now
# In production, you might want to use cloud ML services or simpler models

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

def analyze_sentiment_simple(text):
    """Simple rule-based sentiment analysis"""
    # Enhanced word lists for better accuracy
    positive_words = [
        'good', 'great', 'excellent', 'amazing', 'wonderful', 'love', 'fantastic', 
        'awesome', 'happy', 'perfect', 'beautiful', 'brilliant', 'outstanding', 
        'superb', 'marvelous', 'delighted', 'thrilled', 'excited', 'pleased', 
        'satisfied', 'joy', 'cheerful', 'optimistic', 'grateful', 'blessed',
        'incredible', 'magnificent', 'spectacular', 'phenomenal', 'exceptional',
        'best', 'better', 'positive', 'nice', 'lovely'
    ]
    
    negative_words = [
        'bad', 'terrible', 'awful', 'hate', 'horrible', 'disappointed', 'worst', 
        'sad', 'angry', 'frustrated', 'disgusting', 'annoying', 'boring', 
        'stupid', 'ugly', 'nasty', 'rude', 'mean', 'cruel', 'harsh', 'bitter',
        'depressed', 'miserable', 'unhappy', 'upset', 'worried', 'concerned',
        'terrible', 'dreadful', 'appalling', 'shocking', 'outrageous',
        'worse', 'negative', 'poor', 'lacking'
    ]
    
    neutral_indicators = [
        'okay', 'fine', 'alright', 'normal', 'average', 'standard', 'typical',
        'usual', 'regular', 'moderate', 'fair', 'adequate', 'acceptable'
    ]
    
    words = text.lower().split()
    
    positive_score = sum(1 for word in words if any(pos in word for pos in positive_words))
    negative_score = sum(1 for word in words if any(neg in word for neg in negative_words))
    neutral_score = sum(1 for word in words if any(neu in word for neu in neutral_indicators))
    
    total_words = len(words)
    total_sentiment_words = positive_score + negative_score + neutral_score
    
    # Calculate confidence based on sentiment word density
    if total_words > 0:
        sentiment_density = total_sentiment_words / total_words
        base_confidence = min(0.6 + (sentiment_density * 0.3), 0.95)
    else:
        base_confidence = 0.5
    
    # Determine sentiment
    if positive_score > negative_score and positive_score > neutral_score:
        sentiment = 'Positive'
        confidence = base_confidence + (positive_score - max(negative_score, neutral_score)) * 0.05
        emotions = ['joy', 'satisfaction', 'optimism', 'happiness']
    elif negative_score > positive_score and negative_score > neutral_score:
        sentiment = 'Negative'
        confidence = base_confidence + (negative_score - max(positive_score, neutral_score)) * 0.05
        emotions = ['disappointment', 'frustration', 'concern', 'dissatisfaction']
    else:
        sentiment = 'Neutral'
        confidence = base_confidence
        emotions = ['calm', 'balanced', 'informative', 'objective']
    
    # Ensure confidence is within bounds
    confidence = min(max(confidence, 0.5), 0.98)
    
    return {
        'sentiment': sentiment,
        'confidence': round(confidence, 3),
        'emotions': emotions[:3],  # Return top 3 emotions
        'word_analysis': {
            'positive_words': positive_score,
            'negative_words': negative_score,
            'neutral_words': neutral_score,
            'total_words': total_words
        }
    }

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_POST(self):
        try:
            # Read the request body
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            # Parse JSON data
            data = json.loads(post_data.decode('utf-8'))
            
            if 'text' not in data:
                self.send_error_response({'error': 'No text provided'}, 400)
                return
            
            text = data['text']
            
            if not text or text.strip() == '':
                self.send_error_response({'error': 'Empty text provided'}, 400)
                return
            
            # Preprocess and analyze
            clean_text = preprocess_text(text)
            result = analyze_sentiment_simple(clean_text)
            
            # Send successful response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                'text': text,
                'sentiment': result['sentiment'],
                'confidence': result['confidence'],
                'emotions': result['emotions'],
                'word_analysis': result['word_analysis'],
                'success': True
            }
            
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        except json.JSONDecodeError:
            self.send_error_response({'error': 'Invalid JSON data'}, 400)
        except Exception as e:
            self.send_error_response({'error': str(e)}, 500)
    
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            'message': 'Sentiment Analysis API',
            'endpoint': '/api/predict',
            'method': 'POST',
            'body': {'text': 'Your text to analyze'},
            'status': 'active'
        }
        
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def send_error_response(self, error_data, status_code):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        error_response = {
            **error_data,
            'success': False
        }
        
        self.wfile.write(json.dumps(error_response).encode('utf-8'))
