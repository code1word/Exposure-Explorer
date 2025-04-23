//src/data/quizQuestionData.js
//question numbers are unique and ordered - if we want to do random questions from a larger collection need to change this
import orderLandscape from "./quiz_images/orderLandscape.png";
import orderActionShot from "./quiz_images/orderActionShot.png";
import orderNightPhotography from "./quiz_images/orderNightPhotography.png";
import orderPortrait from "./quiz_images/orderPortrait.png";

import orderPortrait40 from "./quiz_images/orderActionShot.png";
import img_02 from "./quiz_images/orderActionShot.png"; //The reference image



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
        hint: "Think about the property that controls the blurriness of the background, and the setting that affects it."
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
      hint: "Think about the two key properties of the camera affected by ISO."
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
        "Wider Aperture-Light Entering Camera": "More light",
        "Wider Aperture-Image Brightness": "Brighter",
        "Wider Aperture-Depth of Field": "Shallower",
        "Wider Aperture-F-stop": "Small f-stop",
        "Narrower Aperture-Light Entering Camera": "Less light",
        "Narrower Aperture-Image Brightness": "Darker",
        "Narrower Aperture-Depth of Field": "Deeper",
        "Narrower Aperture-F-stop": "Large f-stop",
      },
      hint: "A larger aperture increases exposure and focuses on a smaller part of the image. Think about what this suggests about the properties specified in the table."
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
      hint: "Categorize each of these images according to what you learned from the Settings Cheat Sheet, then recall the recommended shutter speed for each type of photo."
    },
    q5: {
      format: "match_image",
      question_number: "5",
      question: "Adjust the image using the slider until it matches the reference image.",
      referenceImage: orderPortrait40,
      correctSetting: "f/0.40",
      hint: "Think about how aperture affects exposure and/or depth of field, and how changes in these properties are reflected in the photo.",
    },
    q6: {
      format: "two_sliders",
      question_number: "6",
      question: "Adjust the image using the slider until it matches the reference image.",
      referenceImage: img_02,
      correctSetting: "Aperture: f/0.30, Shutter: 0.90s",
      hint: "Think about how aperture affects exposure and/or depth of field, and how changes in these properties are reflected in the photo.",
    },
    
      

};
