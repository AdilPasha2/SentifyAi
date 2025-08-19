#!/usr/bin/env python3
"""
Quick test script to demonstrate the sentiment analysis system
"""

import sys
import time
from predict_sentiment import predict_sentiment

def test_predictions():
    """Test the prediction system with various examples"""
    
    test_cases = [
        ("I absolutely love this product! It's fantastic!", "positive"),
        ("This is the worst experience I've ever had. Terrible!", "negative"),
        ("The weather is okay today, nothing special.", "neutral"),
        ("Amazing work! Really impressed with the quality.", "positive"),
        ("I hate this so much, it's completely useless.", "negative"),
        ("The service was fine, not great but acceptable.", "neutral"),
        ("Brilliant! This exceeded all my expectations!", "positive"),
        ("Disappointing results, very unsatisfied.", "negative"),
    ]
    
    print("🚀 SENTIMENT ANALYSIS SYSTEM TEST")
    print("=" * 50)
    
    correct_predictions = 0
    total_predictions = len(test_cases)
    
    for i, (text, expected) in enumerate(test_cases, 1):
        print(f"\nTest {i}/{total_predictions}")
        print(f"Text: '{text}'")
        print(f"Expected: {expected}")
        
        # Get prediction
        predicted = predict_sentiment(text)
        print(f"Predicted: {predicted}")
        
        # Check if correct
        is_correct = predicted.lower() == expected.lower()
        if is_correct:
            correct_predictions += 1
            print("✅ CORRECT")
        else:
            print("❌ INCORRECT")
        
        time.sleep(0.5)  # Small delay for readability
    
    print("\n" + "=" * 50)
    print("📊 FINAL RESULTS")
    print(f"Correct Predictions: {correct_predictions}/{total_predictions}")
    print(f"Accuracy: {(correct_predictions/total_predictions)*100:.1f}%")
    
    if correct_predictions/total_predictions >= 0.7:
        print("🎉 Great performance! System is working well.")
    elif correct_predictions/total_predictions >= 0.5:
        print("👍 Decent performance, might need some tuning.")
    else:
        print("⚠️ Performance needs improvement.")

def test_api_format():
    """Test the expected API response format"""
    print("\n" + "🔗 API INTEGRATION EXAMPLE")
    print("=" * 50)
    
    sample_text = "I love this application!"
    sentiment = predict_sentiment(sample_text)
    
    # Simulate API response format
    api_response = {
        "text": sample_text,
        "sentiment": sentiment,
        "confidence": 0.85,  # This would come from actual model
        "success": True
    }
    
    print("Sample API Request:")
    print("POST http://localhost:5000/predict")
    print('{"text": "' + sample_text + '"}')
    
    print("\nExpected API Response:")
    import json
    print(json.dumps(api_response, indent=2))

if __name__ == "__main__":
    try:
        # Test predictions
        test_predictions()
        
        # Test API format
        test_api_format()
        
        print("\n🚀 NEXT STEPS:")
        print("1. Start the Flask API server: python app.py")
        print("2. Test the API endpoints with your frontend")
        print("3. Replace the placeholder in your React app with actual API calls")
        print("4. Your sentiment analysis system is ready!")
        
    except Exception as e:
        print(f"❌ Error running tests: {e}")
        print("Make sure the model files are present and properly trained.")
        sys.exit(1)
