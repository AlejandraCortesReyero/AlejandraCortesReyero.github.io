// Small interaction: slight parallax on folder cards
// Disable tilt/parallax: keep only the CSS 'pop' hover animation.
// Utility: create the central title + folders grid and insert after the folderWrap
function createFoldersGrid(folderWrap) {
	if (!folderWrap) return;
	// avoid creating duplicate grids
	if (document.querySelector('.folders-grid')) return;
	// mark folder as showing the external grid so internal cards can be hidden via CSS
	folderWrap.classList.add('grid-open');
	const heroEl = document.querySelector('.hero .hero-inner') || document.querySelector('.hero');
	const titles = ['Web Design', 'Brand Design', 'Product Design', '3D Stuff'];
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

		// map folder titles to target pages
		const pageMap = {
			'Web Design': 'web-design.html',
			'Brand Design': 'brand-design.html',
			'Product Design': 'product-design.html',
			'3D Stuff': '3d-stuff.html'
		};

		// navigate to the appropriate page when clicking a small folder
		item.addEventListener('click', (ev) => {
			const target = pageMap[t] || 'index.html';
			window.location.href = target;
		});

		inner.appendChild(item);
	});

	// central title near the big folder
	const central = document.createElement('div');
	central.className = 'central-title';
	central.textContent = 'About me';

	grid.appendChild(inner);

	if (heroEl) {
		const insertAfter = (refNode, newNode) => {
			if (refNode && refNode.parentNode) {
				if (refNode.nextSibling) refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
				else refNode.parentNode.appendChild(newNode);
			} else {
				refNode.parentNode && refNode.parentNode.appendChild(newNode);
			}
		};

		insertAfter(folderWrap, central);
		insertAfter(central, grid);
		// set a hash so back button can restore state without server routes
		location.hash = '#folders';

		// handle back navigation: remove grid and restore hero when hash changes/popstate
		function restoreFromFolders() {
			if (grid && grid.parentNode) grid.parentNode.removeChild(grid);
			if (central && central.parentNode) central.parentNode.removeChild(central);
			// remove launch markers so cards can be launched again if needed
			folderWrap.classList.remove('launched');
			// remove the grid-open marker so internal cards become visible again
			folderWrap.classList.remove('grid-open');
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
}

document.addEventListener('DOMContentLoaded', () => {
			// If user lands with #folders, decide whether to reveal the grid.
			// If the navigation was a full page reload, prefer the default hero
			// (only the big folder) — in that case remove the hash so the page
			// shows the initial state. If the navigation is not a reload (e.g.
			// coming back from a project page via a link), reveal the grid.
			if (window.location.hash === '#folders') {
				// detect navigation type (Navigation Timing API)
				let navType = '';
				try {
					const entries = performance.getEntriesByType && performance.getEntriesByType('navigation');
					if (entries && entries.length) navType = entries[0].type;
					else if (performance.navigation) navType = performance.navigation.type === 1 ? 'reload' : 'navigate';
				} catch (e) {
					navType = '';
				}

				if (navType === 'reload') {
					// user refreshed — remove the hash and show the default hero
					history.replaceState(null, '', window.location.pathname + window.location.search);
				} else {
					// not a reload: show the expanded folders grid
					setTimeout(() => {
						const folderWrap = document.querySelector('.folder-wrap');
						if (folderWrap) createFoldersGrid(folderWrap);
					}, 60);
				}
			} else if (window.location.hash === '#feature') {
				// preserve previous behavior for other hashes
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

	// Add hover/touch helpers so the big folder shows the same 'pop' on pointer
	// interactions. This ensures touch devices can get a visual pop as well.
	(function enableFolderPopInteraction(el){
		// mouseenter / mouseleave for desktop
		el.addEventListener('mouseenter', () => {
			if (!el.classList.contains('launched')) el.classList.add('pop');
		});
		el.addEventListener('mouseleave', () => {
			el.classList.remove('pop');
		});

		// touchstart: add class briefly (remove after animation duration)
		el.addEventListener('touchstart', () => {
			if (el.classList.contains('launched')) return;
			el.classList.add('pop');
			if (el._popTimeout) clearTimeout(el._popTimeout);
			el._popTimeout = setTimeout(() => el.classList.remove('pop'), 380);
		}, {passive: true});
	})(folderWrap);

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

							// After animations finished, re-enable interactions on the big folder so
							// hover/pop works (we previously added the 'launched' class to block
							// interactions during the animation). Removing it here preserves the
							// launch state visually but allows hover effects on the folder images.
							folderWrap.classList.remove('launched');

							// Ensure taps on mobile after the launch trigger the same pop visual.
							// Attach a touchstart listener that only shows the pop and does not
							// re-trigger the launch sequence.
							function showPopOnTapOnce(ev) {
								if (folderWrap.classList.contains('launched')) return;
								folderWrap.classList.add('pop');
								if (folderWrap._popTimeout) clearTimeout(folderWrap._popTimeout);
								folderWrap._popTimeout = setTimeout(() => folderWrap.classList.remove('pop'), 420);
							}

							// Use passive listener so it doesn't block scrolling.
							folderWrap.addEventListener('touchstart', showPopOnTapOnce, {passive: true});

							// Reveal grid & central title (reused function)
							createFoldersGrid(folderWrap);
	});
});

