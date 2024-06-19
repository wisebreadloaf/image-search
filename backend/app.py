# server code for connecting with the frontend
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from perception import get_image_vector
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
from qdrant_client.models import Distance, VectorParams
from qdrant_client import QdrantClient
import json

client = QdrantClient(host="localhost", port=6333)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret1'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@app.route('/process_image', methods=['POST'])
def process_image():
 image_path = request.json['image_path']
 print(image_path)
 query_vector = get_image_vector(image_path)
 hits = client.search(
    collection_name="image_search",
    query_vector=query_vector,
    limit=65
 )
 print(hits)
 for hit in hits:
  socketio.emit('similiar', hit.payload.get("url"))
 return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
 socketio.run(app, port=5000)
