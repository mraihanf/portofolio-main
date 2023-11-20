const currentDate = new Date();
const formattedDate =
    currentDate.toDateString().split(" ").slice(0, 3).join(" ") +
    " " +
    currentDate.toTimeString().split(" ")[0].split(":").slice(0, 3).join(":");
document.getElementById("dateTime").innerHTML = formattedDate;
const typingElement = document.querySelector(".typing");
let index = 0;
let currentText = "";
let isDeleting = false;
let currentMenu = "main";

const menus = {
    main: `Select a menu:<br><span onclick="handleMenuClick('1')">[1] Who is Raihan?</span><br><span onclick="handleMenuClick('2')">[2] Contact me</span><br><span onclick="handleMenuClick('3')">[3] My works</span>`,
    1: `Who is Raihan?<br><br>I am a Back-End Developer who can learn quickly with less than 1 year of experience in building and maintaining websites in the IT industry. Proficient in Java Spring Boot integration, PostgreSQL, and APIs. Always striving to become a better person in terms of skills and character. Someone who is eager for experience and capable of adapting quickly in any situation.<br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    2: `Contact:<br>- Email: <a href="mailto:fadhlullah24@gmail.com">fadhlullah24@gmail.com</a><br>- whatsapp: <a href="https://wa.me/+6282298906591">082298906591</a><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    3: `Some of my Projects:<br><br>
- <strong>AMS</strong>: Asset Management System for BTV.<a href="http://ams.raihanf.my.id" target="_blank">[Demo]</a><br>
- <strong>VCard</strong>: A web virtual Bussiness Card for BTV employee. <a href="http://onebasket.b-universe.id:8110/Person/Raihan.fadhlullah" target="_blank">[Visit]</a><br>
- <strong>Daily Reporting</strong>: An Apps for daily reporting IT BTV. <a href="" target="_blank"></a><br>
- <strong>One Basket</strong>: An Platform with transcoder using for contributor upload the news. <a href="" target="_blank">[Coming]</a><br>
- <strong>Project Management</strong>: An Platform for manager up using for making projects are monitored. <a href="" target="_blank">[Coming]</a><br>
- <strong>Information Systems</strong>: A page for hardware information on studio. <a href="" target="_blank">[Coming]</a><br>
- <strong>Schedule Information</strong>: A page for schedule information what's is on air. <a href="" target="_blank">[Coming]</a><br><br>
<span onclick="handleMenuClick('B')">[B] Back</span>`
};

function handleMenuClick(menuKey) {
    if (menuKey in menus && currentMenu !== menuKey) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = menuKey;
            currentText = menus[menuKey];
            index = 0;
            typeDeleteAnimation();
        });
    } else if ((menuKey === "B" || menuKey === "b") && currentMenu !== "main") {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = "main";
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}
function typeDeleteAnimation(callback) {
    let speed = 7; // default typing speed
    let deleteSpeed = 3; // default deletion speed

    if (currentMenu === "1" || currentMenu === "3") {
        speed = 1; // Makes the typing faster for "Who is glizzy".
        deleteSpeed = 1; // Makes the deletion faster for "Who is glizzy". Adjust as needed.
    }

    if (isDeleting && typingElement.innerHTML !== "") {
        if (currentText.charAt(index - 1) === ">") {
            const openTagIndex = currentText.lastIndexOf("<", index);
            const tagName = currentText.substring(
                openTagIndex + 1,
                currentText.indexOf(" ", openTagIndex)
            );
            const startTagIndex = currentText.lastIndexOf(
                `</${tagName}>`,
                index
            );
            index = startTagIndex;
        } else {
            index--;
        }
        currentText = currentText.slice(0, index);
        typingElement.innerHTML = currentText;

        setTimeout(() => typeDeleteAnimation(callback), deleteSpeed);
    } else if (isDeleting) {
        isDeleting = false;
        if (callback) callback();
    } else if (!isDeleting && index < currentText.length) {
        if (currentText.charAt(index) === "<") {
            if (currentText.substr(index, 4) === "<br>") {
                const br = document.createElement("br");
                typingElement.appendChild(br);
                index += 4;
            } else {
                const closingTagIndex = currentText.indexOf(">", index);
                const tagName = currentText
                    .substring(index + 1, closingTagIndex)
                    .split(" ")[0];
                const endTagIndex =
                    currentText.indexOf(`</${tagName}>`, index) +
                    `</${tagName}>`.length;
                const outerHTML = currentText.substring(index, endTagIndex);
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = outerHTML;
                const childElement = tempDiv.firstChild;

                if (tagName === "a") {
                    childElement.target = "_blank";
                    speed = 1; // Faster typing for <a> tag
                } else if (tagName === "span") {
                    childElement.onclick = function () {
                        const menuKey = childElement
                            .getAttribute("onclick")
                            .replace("handleMenuClick('", "")
                            .replace("')", "");
                        handleMenuClick(menuKey);
                    };
                    speed = 1; // Faster typing for <span> tag
                }

                typingElement.appendChild(childElement);
                index = endTagIndex;
            }
        } else {
            typingElement.innerHTML += currentText.charAt(index);
            index++;
        }

        setTimeout(typeDeleteAnimation, speed);
    }
}

function handleUserInput(event) {
    const key = event.key;
    if (key in menus && currentMenu !== key) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = key;
            currentText = menus[key];
            index = 0;
            typeDeleteAnimation();
        });
    } else if ((key === "B" || key === "b") && currentMenu !== "main") {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = "main";
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}

document.addEventListener("keydown", handleUserInput);

// Initialize the typing animation with the main menu on page load
currentText = menus.main;
typeDeleteAnimation();