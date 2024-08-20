import os

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
socketio = SocketIO(app, cors_allowed_origins="*")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    socketio.send(f"Echo: {file_path}")
    return jsonify({"url": f"/images/{file.filename}"}), 200


if __name__ == "__main__":
    app.run(debug=True)
