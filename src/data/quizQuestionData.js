//src/data/quizQuestionData.js
//question numbers are unique and ordered - if we want to do random questions from a larger collection need to change this
import orderLandscape from "./quiz_images/orderLandscape.png";
import orderActionShot from "./quiz_images/orderActionShot.png";
import orderNightPhotography from "./quiz_images/orderNightPhotography.png";
import orderPortrait from "./quiz_images/orderPortrait.png";

import orderPortrait40 from "./quiz_images/orderActionShot.png";


/*
 * All types of questions have the following fields:
 *    format, question_number (unique and ordered), and hint 
 */

export const quizQuestionData = {
    q1: {
        format: "multiple_choice",
        question_number: "1",
        question: "Which setting controls how much of the scene is in focus?",
        options: ["   ISO", 
                  "   Shutter Speed", 
                  "   Aperture", 
                  "   None of the above"],
        answer: "   Aperture",
        hint: "hint for q1"
      },
    q2: {
      format: "multiple_choice",
      question_number: "2",
      question: "What does increasing ISO do to a photo?",
      options: ["   Make it darker and sharper", 
                "   Increases motion blur", 
                "   Makes it brighter but adds noise", 
                "   Changes the depth of field"],
      answer: "   Makes it brighter but adds noise",
      hint: "hint for q2"
    },
    q3: {
      format: "table_fill_blanks",
      question_number: "3",
      question: "Fill in the table for aperture below using the word bank.",
      wordBank: [
        "Large f-stop", 
        "Shallower",
        "More light",
        "Darker",
        "Less light",
        "Small f-stop",
        "Brighter",
        "Deeper"
      ],
      rows: ["Wider Aperture", "Narrower Aperture"],
      columns: ["Light Entering Camera", "Image Brightness", "Depth of Field", "F-stop"],
      correctAnswers: {
        "Wider-Light Entering Camera": "More light",
        "Wider-Image Brightness": "Brighter",
        "Wider-Depth of Field": "Shallower",
        "Wider-F-stop": "Small f-stop",
        "Narrower-Light Entering Camera": "Less light",
        "Narrower-Image Brightness": "Darker",
        "Narrower-Depth of Field": "Deeper",
        "Narrower-F-stop": "Large f-stop",
      },
      hint: "hint for q3"
    },
    q4: {
      format: "order_images",
      question_number: "4",
      question: "Different types of pictures require different settings. Drag and drop the following types of pictures to order them from lowest to highest shutter speed.",
      images: [
        orderLandscape,
        orderActionShot,
        orderNightPhotography,
        orderPortrait
      ],
      correctOrder: [
        orderNightPhotography,  // lowest shutter speed
        orderLandscape,
        orderPortrait,
        orderActionShot   // highest shutter speed
      ],
      hint: "hint for q4"
    },
    q5: {
      format: "match_image",
      question_number: "5",
      question: "Adjust the image using the slider until it matches the reference image.",
      referenceImage: orderPortrait40,
      correctSetting: "f/0.40",
      hint: "hint for q5",
    },
    
      

};