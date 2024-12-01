
function sendMsg(){
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('msg').value.trim();
    const formMessage = document.getElementById('formMessage');

    if (!name || !email || !message) {
        formMessage.textContent = "Proszę wypełnić wszystkie pola.";
        formMessage.style.color = "red";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        formMessage.textContent = "Proszę wprowadzić poprawny adres e-mail.";
        formMessage.style.color = "red";
    } else {
        formMessage.textContent = "Dziękujemy za wiadomość!";
        formMessage.style.color = "green";
        document.getElementById('name').innerHTML = "";
        document.getElementById('email').innerHTML = "";
        document.getElementById('msg').innerHTML = "";
    }
}

if(document.getElementById("leaves-container")) {

    const leavesContainer = document.getElementById("leaves-container");

    const numberOfLeaves = 60;
    const leafImages = [
        "./img/leaf1.png",
        "./img/leaf2.png",
        "./img/leaf3.png",
        "./img/leaf4.png"
    ];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createLeaf() {
        const leaf = document.createElement("div");
        leaf.classList.add("leaf");

        const randomImage = leafImages[Math.floor(Math.random() * leafImages.length)];
        leaf.style.backgroundImage = `url(${randomImage})`;

        const size = random(20, 50);
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;

        leaf.style.left = `${random(0, 100)}%`;
        leaf.style.top = `-50px`;

        const fallDuration = random(8, 15);
        const delay = random(1, 10);

        leaf.style.animation = `
            fall ${fallDuration}s linear ${delay}s
        `;

        leavesContainer.appendChild(leaf);

        setTimeout(() => {
            leaf.remove();
        }, (fallDuration + delay) * 1000);
    }

    function generateLeaves() {
        for (let i = 0; i < numberOfLeaves; i++) {
            createLeaf();
        }
    }

    generateLeaves();

    setInterval(() => {
        createLeaf();
    }, 1000);

}