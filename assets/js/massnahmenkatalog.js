let activePhaseId = 'before-purchase';

function updatePhaseVisibility() {
    document.querySelectorAll('.phase-card').forEach(card => {
        card.hidden = card.dataset.phase !== activePhaseId;
    });
}

function updateTabState() {
    document.querySelectorAll('.phase-tab').forEach(tab => {
        const isActive = tab.dataset.phase === activePhaseId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
    });

    const activeTab = document.querySelector(`.phase-tab[data-phase="${activePhaseId}"]`);
    const phasePanel = document.getElementById('phase-panel');

    if (activeTab && phasePanel) {
        phasePanel.setAttribute('aria-labelledby', activeTab.id);
    }
}

function setActivePhase(phaseId) {
    const targetTab = document.querySelector(`.phase-tab[data-phase="${phaseId}"]`);
    if (!targetTab) {
        return;
    }

    activePhaseId = phaseId;
    updateTabState();
    updatePhaseVisibility();
}

function onTabKeydown(event) {
    const tabs = Array.from(document.querySelectorAll('.phase-tab'));
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
    document.querySelectorAll('.phase-tab').forEach(tab => {
        tab.addEventListener('click', () => setActivePhase(tab.dataset.phase));
        tab.addEventListener('keydown', onTabKeydown);
    });
}

function initCatalog() {
    bindPhaseTabs();
    updateTabState();
    updatePhaseVisibility();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalog);
} else {
    initCatalog();
}
