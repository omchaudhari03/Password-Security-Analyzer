const commonPasswords = [

    "123456",
    "123456789",
    "12345678",
    "password",
    "password123",
    "qwerty",
    "qwerty123",
    "abc123",
    "welcome",
    "admin",
    "administrator",
    "letmein",
    "iloveyou",
    "football",
    "monkey",
    "dragon",
    "sunshine",
    "master",
    "login",
    "guest",
    "india123",
    "om123",
    "omkale",
    "computer",
    "java123",
    "python123"

];

const keyboardPatterns = [

    "qwerty",
    "asdf",
    "zxcv",
    "1234",
    "12345",
    "123456",
    "abcd",
    "abc123"

];

const weakWords = [

    "admin",
    "password",
    "welcome",
    "india",
    "user",
    "test",
    "guest",
    "login",
    "college",
    "student"

];

function isCommonPassword(password){

    return commonPasswords.includes(
        password.toLowerCase()
    );
}

function containsKeyboardPattern(password){

    password = password.toLowerCase();

    for(let pattern of keyboardPatterns){

        if(password.includes(pattern)){
            return true;
        }
    }

    return false;
}

function containsWeakWord(password){

    password = password.toLowerCase();

    for(let word of weakWords){

        if(password.includes(word)){
            return true;
        }
    }

    return false;
}

function hasUppercase(password){

    return /[A-Z]/.test(password);
}

function hasLowercase(password){

    return /[a-z]/.test(password);
}

function hasNumbers(password){

    return /[0-9]/.test(password);
}

function hasSpecialCharacters(password){

    return /[^A-Za-z0-9]/.test(password);
}