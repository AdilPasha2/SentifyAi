import numpy as np
import pandas as pd 
import re
import string
import warnings
warnings.filterwarnings('ignore')

# NLP tools
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download required NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

# ML libraries
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
import joblib
import pickle

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

def load_and_prepare_data():
    """Load and prepare the dataset"""
    print("Loading data...")
    
    # Load training and test data
    train_data = pd.read_csv('train.csv', encoding='latin-1')
    test_data = pd.read_csv('test.csv', index_col=0, encoding='latin-1')
    
    # Combine datasets
    data = pd.concat([train_data, test_data], axis=0, ignore_index=True)
    
    # Drop unnecessary columns
    columns_to_drop = ['textID', 'Time of Tweet', 'Age of User', 'Country', 
                      'Population -2020', 'Land Area (Km²)', 'Density (P/Km²)']
    
    # Only drop columns that exist
    existing_columns = [col for col in columns_to_drop if col in data.columns]
    if existing_columns:
        data.drop(existing_columns, axis=1, inplace=True)
    
    # Remove null values
    data.dropna(inplace=True)
    
    print(f"Data shape: {data.shape}")
    print(f"Columns: {data.columns.tolist()}")
    
    return data

def train_svm_model():
    """Train and save the SVM model"""
    print("Starting SVM model training...")
    
    # Load and prepare data
    data = load_and_prepare_data()
    
    # Encode labels
    label_encoder = LabelEncoder()
    data['sentiment'] = label_encoder.fit_transform(data['sentiment'])
    
    # Preprocess text
    print("Preprocessing text...")
    data['clean_text'] = data['text'].apply(preprocess_text)
    
    # Prepare features and labels
    X = data['clean_text']
    y = data['sentiment']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Vectorize text using TF-IDF
    print("Vectorizing text...")
    tfidf_vectorizer = TfidfVectorizer(
        max_features=10000,  # Limit features for faster training
        ngram_range=(1, 2),
        stop_words='english'
    )
    
    X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
    X_test_tfidf = tfidf_vectorizer.transform(X_test)
    
    # Grid search for SVM hyperparameters
    print("Performing grid search for SVM...")
    param_grid_svc = {
        'C': [0.1, 1, 10],
        'kernel': ['linear', 'rbf'],
        'gamma': ['scale', 'auto']
    }
    
    svm_grid = GridSearchCV(
        SVC(), 
        param_grid_svc, 
        cv=3,  # Reduced CV folds for speed
        scoring='accuracy',
        n_jobs=-1
    )
    
    svm_grid.fit(X_train_tfidf, y_train)
    
    print(f"Best SVM parameters: {svm_grid.best_params_}")
    print(f"Best cross-validation score: {svm_grid.best_score_:.4f}")
    
    # Train final model with best parameters
    best_svm = svm_grid.best_estimator_
    
    # Evaluate on test set
    svm_pred = best_svm.predict(X_test_tfidf)
    accuracy = accuracy_score(y_test, svm_pred)
    
    print(f"\nSVM Test Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, svm_pred))
    
    # Save the trained model and vectorizer
    print("Saving model and vectorizer...")
    joblib.dump(best_svm, 'svm_sentiment_model.pkl')
    joblib.dump(tfidf_vectorizer, 'tfidf_vectorizer.pkl')
    joblib.dump(label_encoder, 'label_encoder.pkl')
    
    print("Model saved successfully!")
    
    return best_svm, tfidf_vectorizer, label_encoder, accuracy

def predict_sentiment(text, model, vectorizer, label_encoder):
    """Predict sentiment for new text"""
    # Preprocess the text
    clean_text = preprocess_text(text)
    
    # Vectorize
    text_tfidf = vectorizer.transform([clean_text])
    
    # Predict
    prediction = model.predict(text_tfidf)[0]
    
    # Convert back to original label
    sentiment = label_encoder.inverse_transform([prediction])[0]
    
    return sentiment

if __name__ == "__main__":
    try:
        # Train the model
        model, vectorizer, label_encoder, accuracy = train_svm_model()
        
        # Test with sample predictions
        print("\n" + "="*50)
        print("Testing model with sample texts:")
        print("="*50)
        
        test_texts = [
            "I love this movie! It's amazing!",
            "This is terrible, I hate it.",
            "The weather is okay today.",
            "Fantastic work, really impressed!"
        ]
        
        for text in test_texts:
            sentiment = predict_sentiment(text, model, vectorizer, label_encoder)
            print(f"Text: '{text}' -> Sentiment: {sentiment}")
            
    except Exception as e:
        print(f"Error: {e}")
        print("Please make sure the CSV files are in the correct format and location.")
