from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Simple memory in server.
messages = [
    { 'key': '1', 'text': "Hello, nice to meet you.", 'sender': 'gosbhs12', 'receiver': 'jisung' },
    { 'key': '2', 'text': "Hello! How are you?", 'sender': 'jisung', 'receiver': 'gosbhs12' },
    { 'key': '3', 'text': "Have you done the assignment?", 'sender': 'gosbhs12', 'receiver': 'jisung' },
    { 'key': '4', 'text': "dasnfl;snd?", 'sender': 'gosbhs12', 'receiver': 'myung1' },
    { 'key': '5', 'text': "cvxvx,m,", 'sender': 'myung1', 'receiver': 'gosbhs12' },
    { 'key': '6', 'text': "Wdym?", 'sender': 'gosbhs12', 'receiver': 'myung1' },
    { 'key': '7', 'text': "I was joking man", 'sender': 'myung1', 'receiver': 'gosbhs12' },
    { 'key': '8', 'text': "I did.", 'sender': 'gosbhs12', 'receiver': 'jisung' },
    { 'key': '9', 'text': "Could you give me answer?", 'sender': 'jisung', 'receiver': 'gosbhs12' }]

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    messages.append(data)
    return jsonify({"status": "success", "message": "Message stored successfully!"}), 200

@app.route('/get_messages', methods=['GET'])
def get_messages():
    print(messages)
    my_id = request.args.get('myId')
    user_id = request.args.get('userId')
    filtered_messages = [msg for msg in messages if (msg['sender'] == my_id and msg['receiver'] == user_id) or (msg['sender'] == user_id and msg['receiver'] == my_id)]
    return jsonify({"status": "success", "messages": filtered_messages}), 200

if __name__ == '__main__':
    app.run(debug=True)