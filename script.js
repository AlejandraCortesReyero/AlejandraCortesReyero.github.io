// Small interaction: slight parallax on folder cards
// Disable tilt/parallax: keep only the CSS 'pop' hover animation.
document.addEventListener('DOMContentLoaded', () => {
			// If user reloads with a hash like #folders or #feature, remove the hash so the main hero shows
			if (window.location.hash === '#folders' || window.location.hash === '#feature') {
				history.replaceState(null, '', window.location.pathname + window.location.search);
			}
	// Ensure any inline transforms from previous runs are cleared
	const stack = document.querySelector('.folder-stack');
	if (stack) stack.style.transform = '';
	const cards = document.querySelectorAll('.card');
	cards.forEach(c => { c.style.transform = ''; });
	// No mousemove listeners — animation handled purely by CSS on :hover
});

// Click interaction: expand folder and transform cards into folders around it
// (click-to-open feature removed)

// New interaction: on click, launch cards upwards and scroll page down to next section
document.addEventListener('DOMContentLoaded', () => {
	const folderWrap = document.querySelector('.folder-wrap');
	const hero = document.querySelector('.hero');
	if (!folderWrap || !hero) return;

		folderWrap.addEventListener('click', async (e) => {
		// prevent repeated launches
		if (folderWrap.classList.contains('launched')) return;
		folderWrap.classList.add('launched');



		const cards = folderWrap.querySelectorAll('.card');
		cards.forEach((c, i) => {
			// trigger reflow to ensure transition applies
			// eslint-disable-next-line no-unused-expressions
			c.offsetWidth;
			c.classList.add('launch');
		});

				// wait until animations finish, then open the separate feature page
					// Wait for the card animations to finish (listen to animationend on cards)
					const maxWait = 1600; // ms fallback in case events don't fire
					await new Promise((resolve) => {
						let finished = 0;
						const total = cards.length;
						let resolved = false;

						function tryResolve() {
							if (!resolved && finished >= total) {
								resolved = true;
								resolve();
							}
						}

						cards.forEach((c) => {
							function onEnd(e) {
								if (e.animationName && e.animationName.startsWith('launch')) {
									finished += 1;
									c.removeEventListener('animationend', onEnd);
									tryResolve();
								}
							}
							c.addEventListener('animationend', onEnd);
						});

						// fallback timeout
						setTimeout(() => {
							if (!resolved) {
								resolved = true;
								resolve();
							}
						}, maxWait);
					});

						// After animations finished, insert 4 folders around the central folder (inside the hero)
						const heroEl = document.querySelector('.hero');
						const titles = ['Web Design', 'Brand Design', 'Product Design', 'Archviz'];
						const positions = ['tl', 'tr', 'bl', 'br'];
						const grid = document.createElement('section');
						grid.className = 'folders-grid revealed';
						const inner = document.createElement('div');
						inner.className = 'folders-inner';

						// create absolute-positioned folder items with positional classes
						titles.forEach((t, i) => {
							const item = document.createElement('div');
							item.className = `folder-item ${positions[i]}`;
							const img = document.createElement('img');
							img.className = 'folder-icon';
							img.src = 'CONTENT/partedetráscarpeta.png';
							img.alt = t;
							const cap = document.createElement('div');
							cap.className = 'folder-title';
							cap.textContent = t;
							item.appendChild(img);
							item.appendChild(cap);
							inner.appendChild(item);
						});

						// central title near the big folder
						const central = document.createElement('div');
						central.className = 'central-title';
						central.textContent = 'About me';

						grid.appendChild(inner);

						if (heroEl) {
							// insert inside hero so the central folder remains visible
							heroEl.appendChild(grid);
							heroEl.appendChild(central);
							// set a hash so back button can restore state without server routes
							location.hash = '#folders';

							// handle back navigation: remove grid and restore hero when hash changes/popstate
							function restoreFromFolders() {
								if (grid && grid.parentNode) grid.parentNode.removeChild(grid);
								if (central && central.parentNode) central.parentNode.removeChild(central);
								// remove launch markers so cards can be launched again if needed
								folderWrap.classList.remove('launched');
								const cardsAll = folderWrap.querySelectorAll('.card');
								cardsAll.forEach(c => c.classList.remove('launch'));
								// clean up listeners
								window.removeEventListener('hashchange', onHashChange);
								window.removeEventListener('popstate', onPopState);
							}

							function onHashChange() {
								if (location.hash !== '#folders') restoreFromFolders();
							}

							function onPopState(ev) {
								if (location.hash !== '#folders') restoreFromFolders();
							}

							window.addEventListener('hashchange', onHashChange);
							window.addEventListener('popstate', onPopState);
						}
	});
});

