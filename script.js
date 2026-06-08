const passwordInput =
    document.getElementById("passwordInput");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const strengthBar =
    document.getElementById("strengthBar");

const scoreElement =
    document.getElementById("score");

const strengthElement =
    document.getElementById("strength");

const entropyElement =
    document.getElementById("entropy");

const crackTimeElement =
    document.getElementById("crackTime");

const suggestionsList =
    document.getElementById("suggestionsList");

const historyList =
    document.getElementById("historyList");

loadHistory();

analyzeBtn.addEventListener("click", analyzePassword);

function analyzePassword() {

    const password = passwordInput.value;

    if(password.length === 0){

        alert("Enter a password first.");

        return;
    }

    let score = 0;

    let suggestions = [];

    // Length

    if(password.length >= 12){

        score += 25;

    }else if(password.length >= 8){

        score += 15;

    }else{

        suggestions.push(
            "Use at least 12 characters."
        );
    }

    // Uppercase

    if(hasUppercase(password)){

        score += 15;

    }else{

        suggestions.push(
            "Add uppercase letters."
        );
    }

    // Lowercase

    if(hasLowercase(password)){

        score += 15;

    }else{

        suggestions.push(
            "Add lowercase letters."
        );
    }

    // Numbers

    if(hasNumbers(password)){

        score += 15;

    }else{

        suggestions.push(
            "Add numbers."
        );
    }

    // Special Characters

    if(hasSpecialCharacters(password)){

        score += 20;

    }else{

        suggestions.push(
            "Add special characters."
        );
    }

    // Common Password Check

    if(isCommonPassword(password)){

        score -= 40;

        suggestions.push(
            "This password appears in common password databases."
        );
    }

    // Pattern Detection

    if(containsKeyboardPattern(password)){

        score -= 15;

        suggestions.push(
            "Avoid predictable keyboard patterns."
        );
    }

    // Weak Words

    if(containsWeakWord(password)){

        score -= 10;

        suggestions.push(
            "Avoid common words."
        );
    }

    // Prevent negative score

    if(score < 0){

        score = 0;
    }

    if(score > 100){

        score = 100;
    }

    updateDashboard(
        score,
        password,
        suggestions
    );

    saveHistory(password, score);
}

function updateDashboard(
    score,
    password,
    suggestions
){

    scoreElement.textContent =
        score + " / 100";

    let strength = "";

    if(score >= 80){

        strength = "Very Strong";

        strengthBar.style.background =
            "#22c55e";

    }else if(score >= 60){

        strength = "Strong";

        strengthBar.style.background =
            "#3b82f6";

    }else if(score >= 40){

        strength = "Moderate";

        strengthBar.style.background =
            "#f59e0b";

    }else{

        strength = "Weak";

        strengthBar.style.background =
            "#ef4444";
    }

    strengthElement.textContent =
        strength;

    strengthBar.style.width =
        score + "%";

    const entropy =
        calculateEntropy(password);

    entropyElement.textContent =
        entropy + " bits";

    crackTimeElement.textContent =
        estimateCrackTime(score);

    suggestionsList.innerHTML = "";

    if(suggestions.length === 0){

        const li =
            document.createElement("li");

        li.textContent =
            "Excellent password security.";

        suggestionsList.appendChild(li);

    }else{

        suggestions.forEach(item => {

            const li =
                document.createElement("li");

            li.textContent = item;

            suggestionsList.appendChild(li);
        });
    }
}

function calculateEntropy(password){

    const charset = 94;

    const entropy =
        Math.round(
            password.length *
            Math.log2(charset)
        );

    return entropy;
}

function estimateCrackTime(score){

    if(score >= 90){

        return "500+ Years";

    }else if(score >= 75){

        return "50 Years";

    }else if(score >= 60){

        return "5 Years";

    }else if(score >= 40){

        return "6 Months";

    }else{

        return "Few Minutes";
    }
}

function saveHistory(password, score){

    let history =
        JSON.parse(
            localStorage.getItem("passwordHistory")
        ) || [];

    history.unshift({

        password:
            password.substring(0,3) + "***",

        score: score
    });

    history = history.slice(0,5);

    localStorage.setItem(
        "passwordHistory",
        JSON.stringify(history)
    );

    loadHistory();
}

function loadHistory(){

    let history =
        JSON.parse(
            localStorage.getItem("passwordHistory")
        ) || [];

    historyList.innerHTML = "";

    history.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent =
            `${item.password} - ${item.score}/100`;

        historyList.appendChild(li);
    });
}