document.getElementById("calorieForm").addEventListener("submit", function(event){
    event.preventDefault();

    const clientName = document.getElementById("name").value;
    const clientPhone = document.getElementById("phone").value;
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    const activityLevel = parseFloat(document.getElementById("activity").value);
    const dietGoal = document.getElementById("dietGoal").value;
    const allergiesDislikes = document.getElementById("allergiesDislikes").value;

    let bmr, tdee;
    if (gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    tdee = bmr * activityLevel;
    tdee += {
        'gradualLoss': -500,
        'moderateLoss': -800,
        'rapidLoss': -1000,
        'gradualGain': 500,
        'moderateGain': 800,
        'rapidGain': 1000,
        'maintain': 0
    }[dietGoal] || 0;

    const idealWeight = gender === "male" 
                        ? 50 + (0.91 * (height - 152.4))
                        : 45.5 + (0.91 * (height - 152.4));

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiReference = "BMI Reference: Underweight (<18.5), Normal weight (18.5–24.9), Overweight (25–29.9), Obesity (BMI of 30 or greater)";

    const carbsGrams = (tdee * 0.50) / 4;
    const proteinGrams = (tdee * 0.30) / 4;
    const fatGrams = (tdee * 0.20) / 9;

    const breakfastCalories = tdee * 0.20;
    const morningSnackCalories = tdee * 0.05;
    const lunchCalories = tdee * 0.35;
    const sideDishCalories = tdee * 0.05;
    const afternoonSnackCalories = tdee * 0.10;
    const dinnerCalories = tdee * 0.25;

    let resultText = `Hi ${clientName}\nPhone: ${clientPhone}\n\n`;
    resultText += `Your daily calorie intake: ${tdee.toFixed(2)} kcal\n`;
    resultText += `Ideal body weight: ${idealWeight.toFixed(2)} kg\n`;
    resultText += `Your BMI: ${bmi.toFixed(2)}\n${bmiReference}\n\n`;
    resultText += `Macronutrients:\nCarbohydrates: ${carbsGrams.toFixed(2)} g/day\n`;
    resultText += `Protein: ${proteinGrams.toFixed(2)} g/day\nFat: ${fatGrams.toFixed(2)} g/day\n\n`;
    resultText += `Meal Guidelines:\nBreakfast: ${breakfastCalories.toFixed(2)} kcal\n`;
    resultText += `Snack (Morning): ${morningSnackCalories.toFixed(2)} kcal\n`;
    resultText += `Lunch: ${lunchCalories.toFixed(2)} kcal\nSide Dish: ${sideDishCalories.toFixed(2)} kcal\n`;
    resultText += `Snack (Afternoon): ${afternoonSnackCalories.toFixed(2)} kcal\n`;
    resultText += `Dinner: ${dinnerCalories.toFixed(2)} kcal\n\n`;
    resultText += `Allergies and Dislikes: ${allergiesDislikes}`;

    document.getElementById("result").innerText = resultText;
});

function formatPDFText(text) {
    return text.split('\n');
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const resultText = document.getElementById("result").innerText;

    doc.setFontSize(10);
    doc.text(formatPDFText(resultText), 10, 10);
    doc.save('HealthReport.pdf');
}

function printPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const resultText = document.getElementById("result").innerText;

    doc.setFontSize(10);
    doc.text(formatPDFText(resultText), 10, 10);
    doc.autoPrint();
    doc.output('dataurlnewwindow');
}

document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
document.getElementById('printBtn').addEventListener('click', printPDF);
document.getElementById('homeBtn').addEventListener('click', function() {
    window.location.href = 'https://www.youtube.com/results?search_query=smart+bite+cal';
});
