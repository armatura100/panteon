const header = document.querySelector('.header');

document.documentElement.style.setProperty(
	'--scroll-padding',
	header.offsetHeight - 30 + 'px'
);

window.addEventListener('scroll', checkScroll);
window.addEventListener('DOMContentLoaded', checkScroll);

function checkScroll() {
	if (scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
}