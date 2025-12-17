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

							// After animations finished, insert 4 folders around the central folder (inside the hero)
						// append grid inside the hero's inner container so items appear directly
						// after the folder-wrap (this keeps the small folders immediately
						// below the big folder in the flow, especially on mobile)
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
							inner.appendChild(item);
						});

						// central title near the big folder
						const central = document.createElement('div');
						central.className = 'central-title';
						central.textContent = 'About me';

						grid.appendChild(inner);

						if (heroEl) {
							// insert central title and grid just after the folderWrap so
							// the title appears directly below the big folder and the
							// small folders are just below the title (works well on mobile)
							const insertAfter = (refNode, newNode) => {
								if (refNode && refNode.parentNode) {
									if (refNode.nextSibling) refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
									else refNode.parentNode.appendChild(newNode);
								} else {
									refNode.parentNode && refNode.parentNode.appendChild(newNode);
								}
							};

							// place central title immediately after the folderWrap
							insertAfter(folderWrap, central);
							// then place the grid (small folders) right after the title
							insertAfter(central, grid);
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

