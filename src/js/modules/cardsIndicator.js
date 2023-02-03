if (window.matchMedia('(min-width: 1355px)').matches) {
	const cardsList = document.querySelector('.about__cards-list');
	const cardsIndicator = document.querySelector('.about__cards-active');
	const card = document.querySelector('.about__card:last-child');

	window.addEventListener('load', () => {
		cardsIndicator.style.width = `${card.offsetWidth}px`;
		cardsIndicator.style.left = `${card.offsetLeft}px`;
	});

	if (window.matchMedia('(any-hover: hover)').matches) {
		cardsList.addEventListener('mouseover', e => {
			const targetItem = e.target.closest('.about__card');
			if (!targetItem) return;
			cardsIndicator.style.width = `${targetItem.offsetWidth}px`;
			cardsIndicator.style.left = `${targetItem.offsetLeft}px`;
		});
	}
}
