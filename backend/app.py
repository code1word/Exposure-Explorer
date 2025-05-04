from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
# Initialize or clear log file when server starts
LOG_FILE = "page_time_log.log"
with open(LOG_FILE, "w") as f:
    f.write("=== Exposure Explorer Log Initialized ===\n")

quiz_results_storage = []

quiz_questions = {
    "1": {
        "format": "multiple_choice",
        "question_number": "1",
        "question": "Which setting controls how much of the scene is in focus?",
        "options": ["   ISO", 
                  "   Shutter Speed", 
                  "   Aperture", 
                  "   None of the above"],
        "answer": "   Aperture",
        "hint": "Think about the property that controls the blurriness of the background, and the setting that affects it."
      },
    "2": {
      "format": "multiple_choice",
      "question_number": "2",
      "question": "What does increasing ISO do to a photo?",
      "options": ["   Makes it brighter but adds noise",
                "   Make it darker and sharper", 
                "   Increases motion blur", 
                "   Changes the depth of field"],
      "answer": "   Makes it brighter but adds noise",
      "hint": "Think about the two key properties of the camera affected by ISO."
    },
    "3": {
      "format": "table_fill_blanks",
      "question_number": "3",
      "question": "Fill in the table for aperture below using the word bank.",
      "wordBank": [
        "Large f-stop", 
        "Shallower",
        "More light",
        "Darker",
        "Less light",
        "Small f-stop",
        "Brighter",
        "Deeper"
      ],
      "rows": ["Wider Aperture", "Narrower Aperture"],
      "columns": ["Light Entering Camera", "Image Brightness", "Depth of Field", "F-stop"],
      "correctAnswers": {
        "Wider Aperture-Light Entering Camera": "More light",
        "Wider Aperture-Image Brightness": "Brighter",
        "Wider Aperture-Depth of Field": "Shallower",
        "Wider Aperture-F-stop": "Small f-stop",
        "Narrower Aperture-Light Entering Camera": "Less light",
        "Narrower Aperture-Image Brightness": "Darker",
        "Narrower Aperture-Depth of Field": "Deeper",
        "Narrower Aperture-F-stop": "Large f-stop",
      },
      "hint": "A larger aperture increases exposure and focuses on a smaller part of the image. Think about what this suggests about the properties specified in the table."
    },
    "4": {
      "format": "order_images",
      "question_number": "4",
      "question": "Different types of photos require different settings. Drag and drop the following types of pictures to order them from lowest to highest shutter speed.",
      "images": [
        "http://localhost:3000/static/images_q4/orderLandscape.jpg",
        "http://localhost:3000/static/images_q4/orderActionShot.jpg",
        "http://localhost:3000/static/images_q4/orderNightPhotography.jpg",
        "http://localhost:3000/static/images_q4/orderPortrait.jpg"
      ],
      "correctOrder": [
        "http://localhost:3000/static/images_q4/orderNightPhotography.jpg",
        "http://localhost:3000/static/images_q4/orderLandscape.jpg",
        "http://localhost:3000/static/images_q4/orderPortrait.jpg",
        "http://localhost:3000/static/images_q4/orderActionShot.jpg"
      ],
      "hint": "Categorize each of these images according to what you learned from the Settings Cheat Sheet, then recall the recommended shutter speed for each type of photo."
    },
    "5": {
      "format": "match_image",
      "question_number": "5",
      "question": "Adjust the image using the slider until it matches the reference image.",
      "referenceImage": "http://localhost:3000/static/images_q5/cat_f5.6.jpg",
      "correctSetting": "f/5.6",
      "imageMap": {
        "0": "http://localhost:3000/static/images_q5/cat_f1.4.jpg",
        "1": "http://localhost:3000/static/images_q5/cat_f2.0.jpg",
        "2": "http://localhost:3000/static/images_q5/cat_f4.0.jpg",
        "3": "http://localhost:3000/static/images_q5/cat_f5.6.jpg",
        "4": "http://localhost:3000/static/images_q5/cat_f8.0.jpg",
        "5": "http://localhost:3000/static/images_q5/cat_f9.0.jpg",
        "6": "http://localhost:3000/static/images_q5/cat_f11.0.jpg",
        "7": "http://localhost:3000/static/images_q5/cat_f14.0.jpg",
        "8": "http://localhost:3000/static/images_q5/cat_f16.0.jpg",
      },
      "initialImage": "http://localhost:3000/static/images_q5/cat_f4.0.jpg",
      "hint": "Think about how aperture affects exposure and/or depth of field. Try to identify differences in these properties between the two images.",
    },
    "6": {
      "format": "two_sliders",
      "question_number": "6",
      "question": "Adjust the image using the slider until it matches the reference image.",
      "referenceImage": "http://localhost:3000/static/images_q6/Aperture0.0_ISO150.jpg",
      "correctSetting": "Aperture: f/0.30, ISO: 250",
      "imageGrid": [
        ["http://localhost:3000/static/images_q6/Aperture1.0_ISO50.jpg",
        "http://localhost:3000/static/images_q6/Aperture1.0_ISO100.jpg",
        "http://localhost:3000/static/images_q6/Aperture1.0_ISO150.jpg",
        "http://localhost:3000/static/images_q6/Aperture1.0_ISO200.jpg",
        "http://localhost:3000/static/images_q6/Aperture1.0_ISO250.jpg",
        "http://localhost:3000/static/images_q6/Aperture1.0_ISO300.jpg"],
        ["http://localhost:3000/static/images_q6/Aperture0.8_ISO50.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.8_ISO100.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.8_ISO150.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.8_ISO200.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.8_ISO250.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.8_ISO300.jpg"],
        ["http://localhost:3000/static/images_q6/Aperture0.6_ISO50.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.6_ISO100.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.6_ISO150.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.6_ISO200.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.6_ISO250.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.6_ISO300.jpg"],
        ["http://localhost:3000/static/images_q6/Aperture0.4_ISO50.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.4_ISO100.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.4_ISO150.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.4_ISO200.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.4_ISO250.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.4_ISO300.jpg"],
        ["http://localhost:3000/static/images_q6/Aperture0.2_ISO50.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.2_ISO100.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.2_ISO150.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.2_ISO200.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.2_ISO250.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.2_ISO300.jpg"],
        ["http://localhost:3000/static/images_q6/Aperture0.0_ISO50.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.0_ISO100.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.0_ISO150.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.0_ISO200.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.0_ISO250.jpg",
        "http://localhost:3000/static/images_q6/Aperture0.0_ISO300.jpg"]
      ],
      "hint": "Recall that a wider aperture causes increased exposure and deeper depth of field. A faster shutter speed decreases exposure and captures motion freeze.",
    },
}

@app.route('/get-quiz-questions', methods=['GET', 'OPTIONS'])
def get_quiz_questions():
    return jsonify(quiz_questions)

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




# Receive and store time logs
@app.route("/api/log-time", methods=["POST"])
def log_time():
    data = request.get_json(force=True)

    page = data.get("page")
    start = data.get("startTime")
    end = data.get("endTime")
    duration = data.get("duration")

    # Format log entry
    log_entry = (
        f"[TIME] Page: {page}\n"
        f"  Start: {start}\n"
        f"  End:   {end}\n"
        f"  Duration: {duration} seconds\n\n"
    )

    # Append to log file
    with open(LOG_FILE, "a") as f:
        f.write(log_entry)

    print(log_entry.strip())  # Optional: also log to terminal
    return jsonify({"status": "logged"}), 200

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=3000)
