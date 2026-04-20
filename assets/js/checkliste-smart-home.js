function initChecklistPage() {
    const printBtn = document.getElementById('printChecklistButton');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChecklistPage);
} else {
    initChecklistPage();
}
