const animatableItems = document.querySelectorAll('[data-animatable]');
const animateObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) return;
		entry.target.classList.add('animated');
		animateObserver.unobserve(entry.target);
	});
}, { rootMargin: '0px 0px -100px 0px' });

animatableItems.forEach(item => animateObserver.observe(item));