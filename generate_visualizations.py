import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.model_selection import learning_curve
import joblib
import json
import os

# Set style for better-looking plots
plt.style.use('dark_background')
sns.set_palette("husl")

def create_output_directory():
    """Create directory for storing visualizations"""
    viz_dir = "src/assets/visualizations"
    if not os.path.exists(viz_dir):
        os.makedirs(viz_dir)
    return viz_dir

def load_model_and_data():
    """Load the trained model and test data"""
    try:
        model = joblib.load('svm_sentiment_model.pkl')
        vectorizer = joblib.load('tfidf_vectorizer.pkl')
        label_encoder = joblib.load('label_encoder.pkl')
        
        # Load test data for visualization
        test_data = pd.read_csv('test.csv', index_col=0, encoding='latin-1')
        
        # Drop unnecessary columns
        columns_to_drop = ['Time of Tweet', 'Age of User', 'Country', 
                          'Population -2020', 'Land Area (Km²)', 'Density (P/Km²)']
        existing_columns = [col for col in columns_to_drop if col in test_data.columns]
        if existing_columns:
            test_data.drop(existing_columns, axis=1, inplace=True)
        
        test_data.dropna(inplace=True)
        
        return model, vectorizer, label_encoder, test_data
    except Exception as e:
        print(f"Error loading model or data: {e}")
        return None, None, None, None

def preprocess_text(text):
    """Clean and preprocess text data"""
    import re
    text = re.sub(r'<.*?>', '', str(text))
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.lower()
    return text

def generate_confusion_matrix(model, vectorizer, label_encoder, test_data, viz_dir):
    """Generate confusion matrix heatmap"""
    # Prepare test data
    test_data['clean_text'] = test_data['text'].apply(preprocess_text)
    X_test = vectorizer.transform(test_data['clean_text'])
    y_test = label_encoder.transform(test_data['sentiment'])
    
    # Get predictions
    y_pred = model.predict(X_test)
    
    # Create confusion matrix
    cm = confusion_matrix(y_test, y_pred)
    
    # Plot confusion matrix
    plt.figure(figsize=(10, 8))
    labels = label_encoder.classes_
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=labels, yticklabels=labels,
                cbar_kws={'label': 'Count'})
    plt.title('Confusion Matrix - SVM Sentiment Analysis', fontsize=16, pad=20)
    plt.xlabel('Predicted Sentiment', fontsize=12)
    plt.ylabel('True Sentiment', fontsize=12)
    plt.tight_layout()
    plt.savefig(f'{viz_dir}/confusion_matrix.png', dpi=300, bbox_inches='tight', 
                facecolor='#1a1a1a', edgecolor='none')
    plt.close()
    
    return cm, y_test, y_pred

def generate_accuracy_metrics(y_test, y_pred, label_encoder, viz_dir):
    """Generate accuracy metrics visualization"""
    # Get classification report
    report = classification_report(y_test, y_pred, target_names=label_encoder.classes_, output_dict=True)
    
    # Extract metrics
    metrics_df = pd.DataFrame(report).transpose()
    metrics_df = metrics_df.drop(['accuracy', 'macro avg', 'weighted avg'])
    
    # Plot metrics
    fig, axes = plt.subplots(1, 3, figsize=(18, 6))
    
    # Precision
    axes[0].bar(metrics_df.index, metrics_df['precision'], color='#00ffff', alpha=0.8)
    axes[0].set_title('Precision by Sentiment', fontsize=14)
    axes[0].set_ylabel('Score')
    axes[0].set_ylim(0, 1)
    
    # Recall
    axes[1].bar(metrics_df.index, metrics_df['recall'], color='#00ff00', alpha=0.8)
    axes[1].set_title('Recall by Sentiment', fontsize=14)
    axes[1].set_ylabel('Score')
    axes[1].set_ylim(0, 1)
    
    # F1-Score
    axes[2].bar(metrics_df.index, metrics_df['f1-score'], color='#0080ff', alpha=0.8)
    axes[2].set_title('F1-Score by Sentiment', fontsize=14)
    axes[2].set_ylabel('Score')
    axes[2].set_ylim(0, 1)
    
    plt.suptitle('Model Performance Metrics', fontsize=16)
    plt.tight_layout()
    plt.savefig(f'{viz_dir}/performance_metrics.png', dpi=300, bbox_inches='tight',
                facecolor='#1a1a1a', edgecolor='none')
    plt.close()
    
    return report

def generate_sentiment_distribution(test_data, viz_dir):
    """Generate sentiment distribution pie chart"""
    sentiment_counts = test_data['sentiment'].value_counts()
    
    plt.figure(figsize=(10, 8))
    colors = ['#00ffff', '#00ff00', '#ff6b6b']
    plt.pie(sentiment_counts.values, labels=sentiment_counts.index, autopct='%1.1f%%',
            colors=colors, startangle=90, textprops={'fontsize': 12})
    plt.title('Distribution of Sentiments in Dataset', fontsize=16, pad=20)
    plt.axis('equal')
    plt.savefig(f'{viz_dir}/sentiment_distribution.png', dpi=300, bbox_inches='tight',
                facecolor='#1a1a1a', edgecolor='none')
    plt.close()
    
    return sentiment_counts

def generate_accuracy_over_samples(model, vectorizer, test_data, viz_dir):
    """Generate accuracy over different sample sizes"""
    # Prepare data
    test_data['clean_text'] = test_data['text'].apply(preprocess_text)
    X_test = vectorizer.transform(test_data['clean_text'])
    y_test = test_data['sentiment'].map({'positive': 2, 'neutral': 1, 'negative': 0})
    
    # Calculate accuracy over different sample sizes
    sample_sizes = np.linspace(100, X_test.shape[0], 10, dtype=int)
    accuracies = []
    
    for size in sample_sizes:
        X_sample = X_test[:size]
        y_sample = y_test[:size]
        y_pred = model.predict(X_sample)
        accuracy = (y_pred == y_sample).mean()
        accuracies.append(accuracy)
    
    plt.figure(figsize=(12, 6))
    plt.plot(sample_sizes, accuracies, marker='o', linewidth=3, markersize=8, color='#00ffff')
    plt.title('Model Accuracy vs Sample Size', fontsize=16, pad=20)
    plt.xlabel('Number of Samples', fontsize=12)
    plt.ylabel('Accuracy', fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.ylim(0.5, 1.0)
    plt.savefig(f'{viz_dir}/accuracy_vs_samples.png', dpi=300, bbox_inches='tight',
                facecolor='#1a1a1a', edgecolor='none')
    plt.close()
    
    return sample_sizes, accuracies

def save_model_stats(report, cm, sentiment_counts, viz_dir):
    """Save model statistics as JSON for frontend"""
    stats = {
        "overall_accuracy": float(report['accuracy']),
        "total_samples": int(cm.sum()),
        "sentiment_distribution": {
            sentiment: int(count) for sentiment, count in sentiment_counts.items()
        },
        "performance_metrics": {
            "precision": {
                sentiment: float(metrics['precision']) 
                for sentiment, metrics in report.items() 
                if sentiment not in ['accuracy', 'macro avg', 'weighted avg']
            },
            "recall": {
                sentiment: float(metrics['recall']) 
                for sentiment, metrics in report.items() 
                if sentiment not in ['accuracy', 'macro avg', 'weighted avg']
            },
            "f1_score": {
                sentiment: float(metrics['f1-score']) 
                for sentiment, metrics in report.items() 
                if sentiment not in ['accuracy', 'macro avg', 'weighted avg']
            }
        }
    }
    
    with open(f'{viz_dir}/model_stats.json', 'w') as f:
        json.dump(stats, f, indent=2)
    
    return stats

def main():
    """Main function to generate all visualizations"""
    print("🎨 Generating visualizations for Sentify...")
    
    # Create output directory
    viz_dir = create_output_directory()
    
    # Load model and data
    model, vectorizer, label_encoder, test_data = load_model_and_data()
    
    if model is None:
        print("❌ Could not load model or data. Make sure the model is trained.")
        return
    
    print("📊 Generating confusion matrix...")
    cm, y_test, y_pred = generate_confusion_matrix(model, vectorizer, label_encoder, test_data, viz_dir)
    
    print("📈 Generating performance metrics...")
    report = generate_accuracy_metrics(y_test, y_pred, label_encoder, viz_dir)
    
    print("🥧 Generating sentiment distribution...")
    sentiment_counts = generate_sentiment_distribution(test_data, viz_dir)
    
    print("📉 Generating accuracy vs samples...")
    sample_sizes, accuracies = generate_accuracy_over_samples(model, vectorizer, test_data, viz_dir)
    
    print("💾 Saving model statistics...")
    stats = save_model_stats(report, cm, sentiment_counts, viz_dir)
    
    print("✅ All visualizations generated successfully!")
    print(f"📁 Files saved in: {viz_dir}/")
    print(f"📊 Overall Accuracy: {stats['overall_accuracy']:.1%}")
    print(f"🔢 Total Samples: {stats['total_samples']:,}")
    
    return viz_dir

if __name__ == "__main__":
    main()
