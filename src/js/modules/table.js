const tables = document.querySelectorAll('.memberships__table');

tables.forEach(table => {
	const tbody = table.querySelector('tbody');
	tbody.addEventListener('mouseover', e => {
		const targetItem = e.target.closest('td');
		if (!targetItem) return;
		const targetRow = targetItem.parentElement;
		const targetRowTitle = targetRow.firstElementChild;

		// nth-child in the row
		const ItemIndex = Array.from(targetRow.children).indexOf(targetItem);

		// find a th with the same index (nth-child)
		const targetColTitle = table.querySelector(`thead th:nth-child(${ItemIndex + 1})`);

		targetRowTitle.classList.add('highlighted');
		targetColTitle.classList.add('highlighted');

		targetItem.addEventListener('mouseleave', () => {
			targetRowTitle.classList.remove('highlighted');
			targetColTitle.classList.remove('highlighted');
		});
	});
});