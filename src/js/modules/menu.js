const menuButton = document.querySelector('#menu-button');
const menuList = document.querySelector('#menu-list');
const menuLinks = document.querySelectorAll('.menu__link');
const body = document.body;

menuButton.addEventListener('click', () => {
	menuButton.classList.toggle('active');
	menuList.classList.toggle('active');
	body.classList.toggle('lock');
});

menuLinks.forEach(link => {
	link.addEventListener('click', () => {
		menuButton.classList.remove('active');
		menuList.classList.remove('active');
		body.classList.remove('lock');
	});
});

// highlight active link on scroll
const sectionsToObserve = document.querySelectorAll('#intro, #about, #gallery, #memberships, #coaches, #contacts');
const linksObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) return;
		menuLinks.forEach(link => {
			link.classList.remove('active');
			if (entry.target.id === link.dataset.nav) {
				link.classList.add('active');
			}
		});
	});
}, { rootMargin: '-50% 0px' });

sectionsToObserve.forEach(section => linksObserver.observe(section));