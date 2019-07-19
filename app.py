from flask import Flask, render_template, request, send_from_directory
import requests


app = Flask(__name__)


@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


@app.route('/')
def home():
    return send_static('index.html')


@app.route('/get_url')
def get_content_url():
    url = request.args.get('url', None)
    return requests.get(url).content

@app.route('/get_new')
def get_new():
    url = request.args.get('url', None)
    new = requests.get(url).content
    return new

if __name__ == '__main__':
    app.run(debug=True)