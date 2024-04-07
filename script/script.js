// let ans = square(5);
// console.log(ans);

// function square(x) {
//     return x * x;
// };
function displayMessage(msgText, msgType) {
    const body = document.body;

    const panel = document.createElement("div");
    panel.setAttribute("class", "msgBox");
    body.appendChild(panel);

    const msg = document.createElement("p");
    msg.textContent = msgText;
    panel.appendChild(msg);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "x";
    panel.appendChild(closeBtn);

    closeBtn.addEventListener("click", () =>
        panel.parentNode.removeChild(panel),
    );
    if (msgType === "warning") {
        msg.style.backgroundImage = "url(icons/warning.png)";
        panel.style.backgroundColor = "red";
    } else if (msgType === "chat") {
        msg.style.backgroundImage = "url(icons/chat.png)";
        panel.style.backgroundColor = "aqua";
    } else {
        msg.style.paddingLeft = "20px";
    }

}
// displayMessage();
const btn = document.querySelector("button");
btn.addEventListener("click", () =>
    // displayMessage("Your inbox is almost full — delete some mails", "warning")
displayMessage("Brian: Hi there, how are you today?", "chat")

);

  // const input = document.querySelector('.numberInput');
        // const para = document.querySelector('p');

        // function squared(num) {
        //     return num * num;
        // }

        // function cubed(num) {
        //     return num * num * num;
        // }

        // function factorial(num) {
        //     if (num < 0) return undefined;
        //     if (num === 0) return 1;
        //     let x = num - 1;
        //     while (x > 1) {
        //         num *= x;
        //         x--;
        //     }
        //     return num;
        // }
        // input.addEventListener("change", () => {
        //     const num = parseFloat(input.value);
        //     if (isNaN(num)) {
        //         para.textContent = "You need to enter a number!";
        //     } else {
        //         para.textContent = `${num} squared is ${squared(num)}. `;
        //         para.textContent += `${num} cubed is ${cubed(num)}. `;
        //         para.textContent += `${num} factorial is ${factorial(num)}. `;
        //     }
        // });