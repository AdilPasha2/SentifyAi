import json
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            'status': 'healthy',
            'message': 'Sentiment Analysis API is running',
            'api_version': '1.0.0',
            'endpoints': {
                '/api/predict': 'POST - Analyze sentiment for text',
                '/api/health': 'GET - Health check'
            }
        }
        
        self.wfile.write(json.dumps(response).encode('utf-8'))
