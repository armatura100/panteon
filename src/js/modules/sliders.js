import Swiper, { Scrollbar, Navigation } from 'swiper';

const employeesSlider = new Swiper('.employees-slider', {
	modules: [Navigation, Scrollbar],
	spaceBetween: 30,
	slidesPerView: 'auto',
	navigation: {
		nextEl: '.employees-slider-next',
		prevEl: '.employees-slider-prev',
	},
	scrollbar: {
		el: '.employees-slider .swiper-scrollbar',
		draggable: true,
		dragSize: 102,
	},
	breakpoints: {
		1000: {
			slidesPerView: 3,
			scrollbar: {
				dragSize: 202,
			},
		},
		1200: {
			scrollbar: {
				dragSize: 202,
			},
			slidesPerView: 4,
		}
	}
});

const gymsSlider = new Swiper('.gyms-slider', {
	modules: [Navigation, Scrollbar],
	spaceBetween: 30,
	slidesPerView: 'auto',
	navigation: {
		nextEl: '.gyms-slider-next',
		prevEl: '.gyms-slider-prev',
	},
	scrollbar: {
		el: '.gyms-slider .swiper-scrollbar',
		draggable: true,
		dragSize: 102,
	},
	breakpoints: {
		1000: {
			slidesPerView: 3,
			scrollbar: {
				dragSize: 202,
			},
		}
	}
});

const coachesSlider = new Swiper('.coaches__slider', {
	modules: [Navigation, Scrollbar],
	slidesPerView: 'auto',
	spaceBetween: 30,
	scrollbar: {
		el: '.coaches__slider .swiper-scrollbar',
		draggable: true,
		dragSize: 102,
	},
	navigation: {
		prevEl: '.coaches .swiper-button-prev',
		nextEl: '.coaches .swiper-button-next',
	},
	breakpoints: {
		1000: {
			scrollbar: {
				enabled: false,
			},
		},
	},
});