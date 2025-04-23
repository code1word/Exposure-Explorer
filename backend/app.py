from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

quiz_results_storage = []

@app.route("/")
def home():
    return "Hello, world!"

@app.route("/about")
def about():
    return "This is the about page."


@app.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    data = request.json
    quiz_id = f"quiz_{int(time.time())}"  # e.g., quiz_1713647290
    submission = {
        "quizId": quiz_id,
        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
        "data": data
    }
    quiz_results_storage.append(submission)
    print("Received quiz submission:", submission)
    return jsonify({"message": "Quiz submission received", "quizId": quiz_id}), 200

@app.route('/get-results', methods=['GET'])
def get_results():
    return jsonify(quiz_results_storage)

if __name__ == "__main__":
    app.run(debug=True)
