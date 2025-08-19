import joblib
import re
import sys

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

def load_model():
    """Load the trained model and vectorizer"""
    try:
        model = joblib.load('svm_sentiment_model.pkl')
        vectorizer = joblib.load('tfidf_vectorizer.pkl')
        label_encoder = joblib.load('label_encoder.pkl')
        return model, vectorizer, label_encoder
    except Exception as e:
        print(f"Error loading model: {e}")
        return None, None, None

def predict_sentiment(text):
    """Predict sentiment for given text"""
    # Load model
    model, vectorizer, label_encoder = load_model()
    
    if model is None:
        return "Error: Model not found. Please train the model first."
    
    try:
        # Preprocess text
        clean_text = preprocess_text(text)
        
        # Vectorize
        text_tfidf = vectorizer.transform([clean_text])
        
        # Predict
        prediction = model.predict(text_tfidf)[0]
        
        # Convert back to original label
        sentiment = label_encoder.inverse_transform([prediction])[0]
        
        return sentiment
        
    except Exception as e:
        return f"Error predicting sentiment: {e}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:])
        result = predict_sentiment(text)
        print(result)
    else:
        print("Usage: python predict_sentiment.py 'Your text here'")
        
        # Interactive mode
        while True:
            text = input("\nEnter text to analyze (or 'quit' to exit): ")
            if text.lower() == 'quit':
                break
            result = predict_sentiment(text)
            print(f"Sentiment: {result}")
