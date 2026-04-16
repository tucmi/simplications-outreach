const PHASES = [
	{
		id: 'before-purchase',
		title: 'Phase 1: Vor dem Kauf'
	},
	{
		id: 'setup',
		title: 'Phase 2: Set-Up'
	},
	{
		id: 'use',
		title: 'Phase 3: Nutzung'
	},
	{
		id: 'disposal',
		title: 'Phase 4: Entsorgung'
	}
];

const AUDIENCE_CATALOG = [
	{
		targetId: 'consumerCatalog',
		titleId: 'consumerTitle',
		tag: 'Für Verbraucher:innen',
		title: 'Maßnahmen im Haushalt und in der gemeinsamen Nutzung',
		intro: 'Diese Perspektive bündelt Maßnahmen für Menschen, die Smart-Home-Technik kaufen, einrichten, gemeinsam nutzen und wieder aus dem Haushalt entfernen.',
		phases: {
			'before-purchase': {
				social: [
					'Eigene Rechte gegenüber Vermieter:innen oder anderen Entscheidungsträger:innen kennen.',
					{
						text: 'Ein Konsens-Protokoll schon vor dem Kauf ansprechen und Mitbetroffene früh einbeziehen.',
						linkText: 'Zum Konsens-Protokoll',
						href: 'konsens-protokoll.html'
					},
					'Erwartungen an Transparenz und Mitsprache im Haushalt vorab klären.'
				],
				technical: [
					'Prüfen, ob ein Gerät überhaupt smart sein muss oder eine weniger vernetzte Alternative ausreicht.',
					'Vorab vergleichen, welche Daten das Produkt erhebt, welche App benötigt wird und wer auf Einstellungen zugreifen kann.'
				]
			},
			setup: {
				social: [
					'Beim Einrichten transparent kommunizieren, welche Funktionen aktiviert werden und welche Folgen das für Mitbewohnende hat.',
					{
						text: 'Ein einfaches Konsens-Protokoll festhalten: Wer darf was einstellen, wer wird informiert, wie werden Konflikte gelöst?',
						linkText: 'Protokoll-Vorlage öffnen',
						href: 'konsens-protokoll.html'
					}
				],
				technical: [
					'Zusätzliche Admin-Zugänge oder getrennte Rollen nutzen, damit Verantwortung nicht an einer Person hängt.',
					'Datenschutzfreundliche Grundeinstellungen direkt im Set-Up wählen und unnötige Funktionen deaktivieren.',
					'Smart-Home-Geräte möglichst in ein separates IoT-WLAN einbinden.'
				]
			},
			use: {
				social: [
					'Mit Checklisten regelmäßig prüfen, welche Geräte aktiv sind, welche Apps genutzt werden und wer weiterhin Zugriff hat.',
					{
						text: 'Eine Beispiel-Checkliste nutzen, um pro Raum Geräte, Datenerhebung, Speicherung und Weitergabe systematisch zu prüfen.',
						linkText: 'Zur Beispiel-Checkliste',
						href: 'checkliste-smart-home.html'
					},
					'Veränderungen an Routinen, Automationen oder Freigaben im Haushalt sichtbar kommunizieren.'
				],
				technical: [
					'Datenminimierung laufend umsetzen: nur nötige Sensoren, Dienste und Verknüpfungen aktiv lassen.',
					'Alte Daten regelmäßig automatisch oder manuell löschen.',
					'Einstellungen nachjustieren, wenn sich Nutzung, Mitbewohnende oder Risiken ändern.',
					'Nicht jedes Gerät mit jedem anderen koppeln; weniger Vernetzung reduziert Angriffs- und Datenflächen.'
				]
			},
			disposal: {
				social: [
					'Vor Weitergabe oder Entsorgung gemeinsam klären, welche Konten, Freigaben und Routinen beendet werden müssen.',
					{
						text: 'Eine Abschluss-Checkliste nutzen, damit keine Zugriffe oder geteilten Datenbestände übersehen werden.',
						linkText: 'Checkliste erneut aufrufen',
						href: 'checkliste-smart-home.html'
					}
				],
				technical: [
					'Geräte auf Werkseinstellungen zurücksetzen und verbundene Konten entfernen.',
					'Lokale und cloudbasierte Datenbestände gezielt löschen.',
					'Prüfen, ob Backups, Automationen oder App-Berechtigungen weiterhin auf das Gerät verweisen.'
				]
			}
		}
	}
];

const SECURITY_PRACTICES = [
	{
		title: 'Allgemeine Sicherheitspraktiken für Verbraucher:innen',
		intro: 'Sicherheitsroutinen im Haushalt ergänzen die phasenbezogenen Maßnahmen und reduzieren Risiken im laufenden Betrieb.',
		groups: {
			social: [
				'Im Haushalt klar festlegen, wer Updates, Backups und Konten im Blick behält.',
				'Zugriffe und Sicherheitsänderungen regelmäßig gemeinsam überprüfen.'
			],
			technical: [
				'Separates IoT- oder Smart-Home-WLAN für vernetzte Geräte nutzen.',
				'Wo sinnvoll VPN, Firewall und Mehrfaktor-Authentifizierung einsetzen.',
				'Passwortmanagement, Sperrbildschirme und aktuelle Sicherheits-Updates konsequent nutzen.',
				'Backups und Sicherheitssoftware als feste Routine einplanen.'
			]
		}
	}
];

let activePhaseId = PHASES[0].id;

function countMeasures(groups) {
	return groups.social.length + groups.technical.length;
}

function buildMeasureList(items) {
	const listItems = items.length > 0 ? items : ['Keine expliziten Maßnahmen für diese Gruppe notiert.'];
	const list = createElement('ul', {
		class: `measure-list${items.length === 0 ? ' empty' : ''}`
	});

	listItems.forEach(item => {
		if (typeof item === 'string') {
			list.appendChild(createElement('li', {}, item));
			return;
		}

		if (item && typeof item === 'object') {
			list.appendChild(createElement('li', {}, [
				createElement('span', {}, `${item.text} `),
				createElement('a', {
					class: 'catalog-resource-link',
					href: item.href
				}, item.linkText)
			]));
		}
	});

	return list;
}

function buildMeasureGroup(label, variant, items) {
	return createElement('div', { class: 'measure-group' }, [
		createElement('span', { class: `group-tag ${variant}` }, label),
		buildMeasureList(items)
	]);
}

function buildPhaseCard(phase, groups) {
	const card = createElement('article', { class: 'phase-card' }, [
		createElement('div', { class: 'phase-card-header' }, [
			createElement('h3', {}, phase.title),
			createElement('span', { class: 'measure-count' }, `${countMeasures(groups)} Maßnahmen`)
		]),
		createElement('div', { class: 'measure-groups' }, [
			buildMeasureGroup('Sozial', 'social', groups.social),
			buildMeasureGroup('Technisch', 'technical', groups.technical)
		])
	]);

	card.dataset.phase = phase.id;
	card.hidden = phase.id !== activePhaseId;

	return card;
}

function renderAudienceSection(config) {
	const target = document.getElementById(config.targetId);
	if (!target) {
		return;
	}

	const phaseCards = PHASES.map(phase => buildPhaseCard(phase, config.phases[phase.id]));

	const panel = createElement('div', { class: 'audience-panel' }, [
		createElement('div', { class: 'audience-header' }, [
			createElement('span', { class: 'audience-tag' }, config.tag),
			createElement('h2', { id: config.titleId }, config.title),
			createElement('p', { class: 'audience-intro' }, config.intro)
		]),
		createElement('div', { class: 'phase-grid' }, phaseCards)
	]);

	target.textContent = '';
	target.appendChild(panel);
}

function buildSecurityCard(item) {
	return createElement('article', { class: 'security-card' }, [
		createElement('h3', {}, item.title),
		createElement('p', {}, item.intro),
		createElement('div', { class: 'measure-groups' }, [
			buildMeasureGroup('Sozial', 'social', item.groups.social),
			buildMeasureGroup('Technisch', 'technical', item.groups.technical)
		])
	]);
}

function renderSecuritySection() {
	const target = document.getElementById('securityCatalog');
	if (!target) {
		return;
	}

	const panel = createElement('div', { class: 'security-panel' }, [
		createElement('div', { class: 'security-header' }, [
			createElement('span', { class: 'audience-tag' }, 'Sicherheitspraktiken'),
			createElement('h2', { id: 'securityTitle' }, 'Allgemeine Sicherheits-Basics ergänzend zum Lebenszyklus'),
			createElement('p', {}, 'Diese Maßnahmen sind nicht auf eine einzelne Phase begrenzt. Sie schaffen eine belastbare Sicherheitsbasis für den alltäglichen Betrieb und für den verantwortlichen Umgang mit Smart-Home-Daten.')
		]),
		createElement('div', { class: 'security-grid' }, SECURITY_PRACTICES.map(buildSecurityCard))
	]);

	target.textContent = '';
	target.appendChild(panel);
}

function updatePhaseVisibility() {
	$$('.phase-card').forEach(card => {
		card.hidden = card.dataset.phase !== activePhaseId;
	});
}

function updateTabState() {
	$$('.phase-tab').forEach(tab => {
		const isActive = tab.dataset.phase === activePhaseId;
		tab.classList.toggle('active', isActive);
		tab.setAttribute('aria-selected', String(isActive));
		tab.tabIndex = isActive ? 0 : -1;
	});

	const activeTab = $(`.phase-tab[data-phase="${activePhaseId}"]`);
	const phasePanel = $('#phase-panel');

	if (activeTab && phasePanel) {
		phasePanel.setAttribute('aria-labelledby', activeTab.id);
	}
}

function setActivePhase(phaseId) {
	if (!PHASES.some(phase => phase.id === phaseId)) {
		return;
	}

	activePhaseId = phaseId;
	updateTabState();
	updatePhaseVisibility();
}

function onTabKeydown(event) {
	const tabs = Array.from($$('.phase-tab'));
	const currentIndex = tabs.findIndex(tab => tab.dataset.phase === activePhaseId);

	if (currentIndex === -1) {
		return;
	}

	let nextIndex = currentIndex;

	if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
		nextIndex = (currentIndex + 1) % tabs.length;
	} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
		nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
	} else if (event.key === 'Home') {
		nextIndex = 0;
	} else if (event.key === 'End') {
		nextIndex = tabs.length - 1;
	} else {
		return;
	}

	event.preventDefault();
	const nextTab = tabs[nextIndex];
	setActivePhase(nextTab.dataset.phase);
	nextTab.focus();
}

function bindPhaseTabs() {
	$$('.phase-tab').forEach(tab => {
		tab.addEventListener('click', () => setActivePhase(tab.dataset.phase));
		tab.addEventListener('keydown', onTabKeydown);
	});
}

function initCatalog() {
	AUDIENCE_CATALOG.forEach(renderAudienceSection);
	renderSecuritySection();
	bindPhaseTabs();
	updateTabState();
	updatePhaseVisibility();
}

window.addEventListener('DOMContentLoaded', initCatalog);
