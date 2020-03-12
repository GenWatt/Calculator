//calculator

let numberFromInput = "";
let valueForUser = "";
let currentText = "";
let checkDots = true;
const viewValue = $(".view");
let dubleAction = true;
let sinusOn = true;
let cosinusOn = true;
let nextZero = false;
let textarray = [];
const letterArray = [];

//animation text function
const animationTextFunc = className => {
    if (!sinusOn || !cosinusOn) return;

    $(viewValue).html("");

    letterArray.forEach((letter, index) => {
        let name;
        if (letterArray.length - 1 !== index) name = "is-show";

        $(viewValue).append(`<p style="float:left"class="${name}">${letter}</p>`);
    });

    const animatedText = $(".view p");
    setTimeout(() => {
        $(animatedText[animatedText.length - 1]).addClass(className);
    }, 70);
};
//show numbers function
$(".numbers").click(function () {
    const text = $(this).text();
    //check if dot is reapting in current text
    if (text === "." && checkDots) return;
    if (text === "." && currentText === "") return;
    if (text === "." && dubleAction) return;
    if (currentText.charAt(0) === "0") nextZero = true;
    if (text === ".") nextZero = false;
    if (
        currentText.charAt(0) === "0" &&
        nextZero === true &&
        currentText.length <= 1
    )
        return;
    if (text === "00" && currentText.length <= 1) return;

    currentText = currentText + text;
    nextZero = false;
    checkDots = false;
    dubleAction = false;
    checkDotsFunc();
    valueForUser = valueForUser + text;
    if (valueForUser.charAt(valueForUser.length - 1) === ".") dubleAction = true;

    letterArray.push(text);
    animationTextFunc("show");
    if (!cosinusOn || !sinusOn) resultCount(valueForUser, valueForUser);
    else resultCount(valueForUser);
});
//choose operation
$(".operation").click(function () {
    if (dubleAction) return;
    dubleAction = true;
    textarray.push(currentText);
    currentText = "";
    checkDotsFunc();

    const text = $(this).text();
    if (text !== "CE" && text !== "C" && text !== "=") {
        valueForUser = valueForUser + text;
        letterArray.push(text);
        textarray.push("");
        resultCount(currentText, valueForUser);
    }
});
//equal function
$(".equal").click(() => {
    if (dubleAction === false) {
        valueForUser = eval(valueForUser).toString();
        currentText = valueForUser;
        checkDotsFunc();
        letterArray.length = 0;
        letterArray.push(valueForUser);
        animationTextFunc("show");
        resultCount(valueForUser, valueForUser);
    }
});
//check if dot is  in current string
const checkDotsFunc = () => {
    currentText.split("").forEach(current => {
        if (current === ".") {
            checkDots = true;
        }
    });
};
//show negative sign
$(".minus").click(() => {
    if (valueForUser.length !== 0) return;
    const text = $(".minus").text();
    valueForUser += text;
    letterArray.push(valueForUser);
    resultCount("0", valueForUser);
});
//sinus function
function sinusMode() {
    sinusOn = !sinusOn;
    // if sinus is on and click sinus btn turn off mode
    if (sinusOn === true) {
        $(".sinus").removeClass("disabled");
        valueForUser = "";
        letterArray.length = 0;
        resultCount("0", "0");
        return;
    }
    // if sinus is off and click cosinus btn turn on mode
    cosinusOn = false;
    cosinusMode();
    valueForUser = "";
    $(".sinus").addClass("disabled");
    valueForUser += $(this).text();
    resultCount("0", valueForUser);
}

$(".sinus").click(sinusMode);
//cosinus function
function cosinusMode() {
    cosinusOn = !cosinusOn;
    // if cosinus is on and click cosinus btn turn off mode
    if (cosinusOn === true) {
        $(".cosinus").removeClass("disabled");
        valueForUser = "";
        letterArray.length = 0;
        resultCount("0", "0");
        return;
    }
    // if cosinus is off and click cosinus btn turn on mode
    sinusOn = false;
    sinusMode();
    valueForUser = "";
    $(".cosinus").addClass("disabled");
    valueForUser += $(this).text();
    resultCount("0", valueForUser);
}

$(".cosinus").click(cosinusMode);
//clear all func
$(".delete").click(() => {
    dubleAction = true;
    checkDots = false;
    valueForUser = "";
    currentText = "";
    letterArray.length = 0;
    animationTextFunc();
    sinusOn === false ? sinusMode() : null;
    cosinusOn === false ? cosinusMode() : null;

    resultCount("0", "0");
});
// delete last char func
$(".delete-last-char").click(() => {
    dubleAction = false;
    nextZero = false;
    letterArray.pop();
    if (
        currentText.charAt(currentText.length - 1) === "." &&
        currentText.length !== 0
    )
        checkDots = false;
    let cutedValue = valueForUser.slice(0, valueForUser.length - 1);
    currentText = currentText.slice(0, currentText.length - 1);
    checkDotsFunc();
    if (currentText.length === 0) {
        currentText = textarray[textarray.length - 1];
        textarray.pop();
    }
    //delete "sin("or "cos(" if cuted value length < 4
    if (cutedValue.length < 4 && !sinusOn) return sinusMode();
    if (cutedValue.length < 4 && !cosinusOn) return cosinusMode();
    valueForUser = cutedValue;

    //if all text cuted
    if (cutedValue.length === 0) {
        dubleAction = true;

        currentText = "";
        resultCount("0");
        cutedValue = "0";
    }
    //if operation cuted
    if (
        valueForUser.charAt(valueForUser.length - 1) === "." ||
        valueForUser.charAt(valueForUser.length - 1) === "+" ||
        valueForUser.charAt(valueForUser.length - 1) === "-" ||
        valueForUser.charAt(valueForUser.length - 1) === "*" ||
        valueForUser.charAt(valueForUser.length - 1) === "/"
    ) {
        dubleAction = true;
    } else resultCount(cutedValue, cutedValue);

    $(viewValue).text(cutedValue);
});
//result function (counting)
const resultCount = (result, value) => {
    $(viewValue).text(value);
    //sinus&& cosinus counting finction
    if (!sinusOn || !cosinusOn) {
        dubleAction = true;
        value = value.toString().substring(4);

        result = value;
        parseFloat(value);
        if (!cosinusOn) result = Math.cos(value);
        else result = Math.sin(value);
    }

    $(".result").text(eval(result));
};