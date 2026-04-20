function initProtocolPage() {
    const printBtn = document.getElementById('printProtocolButton');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProtocolPage);
} else {
    initProtocolPage();
}
