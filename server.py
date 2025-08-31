from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    # Simple echo logic — you can replace this with your own logic later
    reply = f"You said: {message}"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
