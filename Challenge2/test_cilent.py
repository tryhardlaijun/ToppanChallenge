# client.py
import socketio

# Create a Socket.IO client instance
sio = socketio.Client()


# Define event handlers
@sio.event
def connect():
    print("Connected to the server")
    sio.send("Disconnecting from server")
    sio.send("Hello from the Python client!")


@sio.event
def message(data):
    print(f"Received from server: {data}")


@sio.event
def disconnect():
    print("Disconnected from server")


# Connect to the Flask-SocketIO server
sio.connect("http://localhost:5000")

# Wait for the connection to end (this line keeps the script running)
sio.wait()
