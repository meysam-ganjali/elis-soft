//TODO: Start Backround Animation
const numCount = 200;
const textCount = 50;
const imageCount = 50;

const numbers = [];
const elements = [];
const imageArray = [];
const color = ["#f2295b", "#ffb535", "#ffb535", "#27e55d", "#9c33f7", "#2ba0ff",];
const texts = ["Console.Log('Hello World')", "Print('Hello, world!')", "echo 'Hy'", "function Hello(){return;}", "try{}charch{throw;}", "if(1===0){alert();}",];

var ViewAnimation = document.querySelector("#ViewAnimation");
if (ViewAnimation) {
    function getRandomNumber() {
        return Math.random() < 0.5 ? 0 : 1;
    }

    function getRandomText() {
        return texts[Math.floor(Math.random() * texts.length)];
    }

    var num = 0;
    const BGText = () => {
        function createText() {
            const textElement = document.createElement("div");
            const textValue = getRandomText();
            textElement.textContent = textValue;
            textElement.style.color = color[num];
            // textElement.className = "text s" + color[num].replace("#", "");
            textElement.className = "text";
            num++;
            if (num === 5) num = 0;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const positionX = Math.random() * (windowWidth - 100);
            const positionY = Math.random() * (windowHeight - 40);

            textElement.style.left = positionX + "px";
            textElement.style.top = positionY + "px";

            ViewAnimation.appendChild(textElement);

            elements.push({
                element: textElement,
            });
        }

        for (let i = 0; i < textCount; i++) {
            createText();
        }
    };
    const BGNumber = () => {
        function createNumber() {
            const numberElement = document.createElement("div");
            const numberValue = getRandomNumber();
            numberElement.textContent = numberValue;
            numberElement.style.color = color[num];
            // numberElement.className = "number s" + color[num].replace("#", "");
            numberElement.className = "number";
            num++;
            if (num === 5) num = 0;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const positionX = Math.random() * (windowWidth - 100);
            const positionY = Math.random() * (windowHeight - 40);

            numberElement.style.left = positionX + "px";
            numberElement.style.top = positionY + "px";

            ViewAnimation.appendChild(numberElement);

            numbers.push({
                element: numberElement,
            });
        }

        for (let i = 0; i < numCount; i++) {
            createNumber();
        }
    };
    const BGImage = () => {
        function createImage() {
            const file = localStorage.getItem("savedImage");
            const imageElement = document.createElement("img");
            imageElement.className = "imageBackgroundAnimation";
            imageElement.src = file;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const positionX = Math.random() * (windowWidth - 100);
            const positionY = Math.random() * (windowHeight - 40);

            imageElement.style.left = positionX + "px";
            imageElement.style.top = positionY + "px";

            ViewAnimation.appendChild(imageElement);
            imageArray.push({
                element: imageElement,
            });
        }

        for (let i = 0; i < imageCount; i++) {
            createImage();
        }
    };

    let DistanceFromMouseInBGNumber = (mouseX, mouseY) => {
        numbers.forEach((number) => {
            const rect = number.element.getBoundingClientRect();
            const numX = rect.left + rect.width / 2;
            const numY = rect.top + rect.height / 2;

            const deltaX = mouseX - numX;
            const deltaY = mouseY - numY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 100) {
                const angle = Math.atan2(deltaY, deltaX);
                const distanceFromMouse = 100;
                const newX = numX - Math.cos(angle) * distanceFromMouse;
                const newY = numY - Math.sin(angle) * distanceFromMouse;

                number.element.style.transition = "transform 0.2s ease-in-out";
                number.element.style.transform = `translate(${newX - numX}px, ${newY - numY}px)`;
            }
        });
    };
    let DistanceFromMouseInBGText = (mouseX, mouseY) => {
        elements.forEach((element) => {
            const rect = element.element.getBoundingClientRect();
            const elementX = rect.left + rect.width / 2;
            const elementY = rect.top + rect.height / 2;

            const deltaX = mouseX - elementX;
            const deltaY = mouseY - elementY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 100) {
                const angle = Math.atan2(deltaY, deltaX);
                const distanceFromMouse = 180;
                const newX = elementX - Math.cos(angle) * distanceFromMouse;
                const newY = elementY - Math.sin(angle) * distanceFromMouse;

                element.element.style.transition = "transform 0.2s ease-in-out";
                element.element.style.transform = `translate(${newX - elementX}px, ${newY - elementY}px)`;
            }
        });
    };
    let DistanceFromMouseInBGImage = (mouseX, mouseY) => {
        imageArray.forEach((element) => {
            const rect = element.element.getBoundingClientRect();
            const elementX = rect.left + rect.width / 2;
            const elementY = rect.top + rect.height / 2;

            const deltaX = mouseX - elementX;
            const deltaY = mouseY - elementY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 100) {
                const angle = Math.atan2(deltaY, deltaX);
                const distanceFromMouse = 180;
                const newX = elementX - Math.cos(angle) * distanceFromMouse;
                const newY = elementY - Math.sin(angle) * distanceFromMouse;

                element.element.style.transition = "transform 0.2s ease-in-out";
                element.element.style.transform = `translate(${newX - elementX}px, ${newY - elementY}px)`;
            }
        });
    };
    //? End Backround Animation
    //TODO: start Setting Background And SetCookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        var setting = getCookie("SettingBackground");
        if (setting != "") {
            //* Create Element for Animation
            switch (setting) {
                case "BGNumber": {
                    BGNumber();
                    break;
                }
                case "BGText": {
                    BGText();
                    break;
                }
                case "BGTN": {
                    BGText();
                    BGNumber();
                    break;
                }
                case "BGImage": {
                    BGImage();
                    break;
                }
            }
            //* Movment Of Page Elements => BG animation
            document.addEventListener("mousemove", (e) => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                switch (setting) {
                    case "BGNumber": {
                        DistanceFromMouseInBGNumber(mouseX, mouseY);
                        break;
                    }
                    case "BGText": {
                        DistanceFromMouseInBGText(mouseX, mouseY);
                        break;
                    }
                    case "BGTN": {
                        DistanceFromMouseInBGNumber(mouseX, mouseY);
                        DistanceFromMouseInBGText(mouseX, mouseY);
                        break;
                    }
                    case "BGImage": {
                        DistanceFromMouseInBGImage(mouseX, mouseY);
                        break;
                    }
                }
            });
        } else {
            setCookie("SettingBackground", "BGTN", 5);
        }
    }

    setCookie("SettingBackground", "BGTN", 5);
    checkCookie();
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

const CopyLink = (event) => {
    let link = event.attributes[2].value;
    navigator.clipboard.writeText(link);
};

$(document).ready(function () {
    $("#btn_info").submit(function (event) {
        var name = document.getElementById('txt_name').value;
        var phone = document.getElementById('txt_phone').value;
        event.preventDefault();
        $.ajax({
            type: "POST", url: "{% url 'main:index' %}", data: {
                'name': name, 'phone': phone
            }, success: (data) => {
                Swal.fire({
                    position: "top-end", icon: "success", title: data.message, showConfirmButton: false, timer: 1500
                });

            }, error: (data) => {
                Swal.fire({
                    position: "top-end", icon: "error", title: data.message, showConfirmButton: false, timer: 1500
                });

            }
        });
        return false;

    });

});



 CKEDITOR.replace('id_answer', {
        contentsLangDirection: 'rtl',
        language: 'fa',
        toolbar: [
           { name: 'document', items: ['Source'] }, // افزودن دکمه Source به نوار ابزار
                { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
                { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv'] },
                { name: 'links', items: ['Link', 'Unlink'] },
                { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
                { name: 'tools', items: ['Maximize'] } // افزودن دکمه Maximize به تولبار
        ],
    });

    function getEditorContent() {
        var editor = CKEDITOR.instances.editor1;
        var content = editor.getData();
        console.log(content);
    }


    $(document).ready(function () {
    $("#btn_add_ans").submit(function (event) {
        var answer = document.getElementById('answer').value;
        var phone = document.getElementById('txt_phone').value;
        event.preventDefault();
        $.ajax({
            type: "POST", url: "{% url 'forum:answer' %}", data: {
                'answer': answer,
            }, success: (data) => {
                Swal.fire({
                    position: "top-end", icon: "success", title: data.message, showConfirmButton: false, timer: 1500
                });

            }, error: (data) => {
                Swal.fire({
                    position: "top-end", icon: "error", title: data.message, showConfirmButton: false, timer: 1500
                });

            }
        });
        return false;

    });

});