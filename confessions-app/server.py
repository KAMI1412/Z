#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

os.chdir('/Users/mac/Documents/confessions-app')

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"✓ Server running at http://localhost:{PORT}")
    print(f"✓ Press Ctrl+C to stop")
    httpd.serve_forever()
