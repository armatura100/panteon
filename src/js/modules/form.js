import IMask from 'imask';
import { openPopup } from './popup.js';

const form = document.querySelector('#questions-form');
const nameEl = form.querySelector('#name');
const phoneEl = form.querySelector('#phone');

// phone mask
const mask = new IMask(phoneEl, {
	mask: '+{38}(000)000-00-00',
});

form.addEventListener('submit', e => {
	e.preventDefault();
	validateName();
	validatePhone();
	if (validateName() && validatePhone()) {
		// show popup
		openPopup(document.querySelector('#popup-success'));
	}

	nameEl.addEventListener('blur', validateName);
	phoneEl.addEventListener('blur', validatePhone);
});

function validateName() {
	const userInput = nameEl.value.trim();
	if (userInput) {
		setSuccessFor(nameEl);
		return true;
	} else {
		setErrorFor(nameEl, `Имя не может быть пустым`);
	}
}

function validatePhone() {
	const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

	if (mask.value) {
		if (mask.unmaskedValue.match(regex)) {
			setSuccessFor(phoneEl);
			return true;
		} else {
			setErrorFor(phoneEl, `Телефон некорректный`);
		}
	} else {
		setErrorFor(phoneEl, `Телефон не может быть пустым`);
	}
}

function setErrorFor(input, message) {
	const item = input.closest('.questions__form-item');
	const errorText = item.querySelector('.error-text');
	errorText.innerText = message;
	item.classList.add('error');

	if (item.classList.contains('success')) {
		item.classList.remove('success');
	}
}

function setSuccessFor(input) {
	const item = input.closest('.questions__form-item');
	const errorText = item.querySelector('.error-text');
	errorText.innerText = '';
	item.classList.add('success');

	if (item.classList.contains('error')) {
		item.classList.remove('error');
	}
}