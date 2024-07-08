const userInput = document.querySelector(".form_input");
const answerPanel = document.querySelector(".painel_resposta");

const buttonEncrypt = document.querySelector(".botao_area_criptografar");
const buttonDecrypt = document.querySelector(".botao_area_descriptografar");

const cursor = document.querySelector(".cursor");

const positionElement = (e) => {
	const mouseY = e.clientY;
	const mouseX = e.clientX;

	cursor.style.transform = `translate3d(${mouseX + 10}px, ${
		mouseY + 10
	}px, 0)`;
};

const showCursor = () => {
	cursor.classList.add("cursor-visivel");
	document.addEventListener("mousemove", positionElement);
};

const hideCursor = () => {
	cursor.classList.remove("cursor-visivel");
};


answerPanel.addEventListener("click", copyToClipboard);

buttonEncrypt.addEventListener("click", () => {
	let value = userInput.value;
	let encryptedText = encrypt(value);

	clearUserInput();
	updateAnswerPanel(encryptedText);
});

buttonDecrypt.addEventListener("click", () => {
	let value = userInput.value;
	let decryptedText = decrypt(value);

	clearUserInput();
	updateAnswerPanel(decryptedText);
});

function updateAnswerPanel(answer) {
	answerPanel.classList.remove("alinhamento_painel_resposta");

	answerPanel.addEventListener("mouseover", showCursor);
	answerPanel.addEventListener("mouseout", hideCursor);

	answerPanel.innerHTML = `<p class="texto_resposta">${answer}</p>`;
}

function copyToClipboard() {
	const text = answerPanel.innerText;
	navigator.clipboard.writeText(text);
}

function clearUserInput() {
	userInput.value = "";
}

function encrypt(text) {
	const replacements = { a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat" };
	return text.replace(/[aeiou]/g, char => replacements[char]);
}

function decrypt(text) {
	const replacements = { ai: "a", enter: "e", imes: "i", ober: "o", ufat: "u" };
	return text.replace(/ai|enter|imes|ober|ufat/g, char => replacements[char]);
}
