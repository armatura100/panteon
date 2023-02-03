const body = document.body;
const popupOpenButtons = document.querySelectorAll('[data-popup-target]');
const popupCloseButtons = document.querySelectorAll('[data-popup-close]');
const lockPaddingElements = document.querySelectorAll('[data-lock-padding]');

const popupEl = document.querySelector('.popup');
const timeout = parseFloat(window.getComputedStyle(popupEl).transitionDuration) * 1000;
let unlocked = true;

popupOpenButtons.forEach(btn => {
	btn.addEventListener('click', e => {
		const popupId = btn.dataset.popupTarget;
		const currentPopup = document.querySelector(popupId);
		openPopup(currentPopup);
		e.preventDefault();
	});
});

popupCloseButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		closePopup(btn.closest('.popup'));
	});
});

export function openPopup(popup) {
	if (popup && unlocked) {
		const activePopup = document.querySelector('.popup.open');
		if (activePopup) {
			closePopup(activePopup, false);
		} else {
			bodyLock();
		}
		popup.classList.add('open');
	}
}

function closePopup(popup, unlock = true) {
	if (unlocked) {
		popup.classList.remove('open');
		if (unlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth + 'px';

	if (lockPaddingElements.length > 0) {
		lockPaddingElements.forEach(el => {
			el.style.paddingRight = scrollbarWidth;
		});
	}

	body.classList.add('lock');

	unlocked = false;
	setTimeout(() => {
		unlocked = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(() => {
		if (lockPaddingElements.length > 0) {
			lockPaddingElements.forEach(el => {
				el.style.paddingRight = 0;
			});
		}

		body.classList.remove('lock');
	}, timeout);

	unlocked = false;
	setTimeout(() => {
		unlocked = true;
	}, timeout);
}

// click outside of a popup zone
document.addEventListener('click', e => {
	const activePopup = document.querySelector('.popup.open');
	if (e.target !== activePopup) return;
	closePopup(activePopup);
});

// close when escape key is pressed
document.addEventListener('keydown', e => {
	if (e.code !== 'Escape') return;
	const activePopup = document.querySelector('.popup.open');
	if (activePopup) {
		closePopup(activePopup);
	}
});