function generateChecklistPdf() {
    const element = document.querySelector('main.checklist-page');
    
    if (!element) {
        alert('Checklisten-Inhalt nicht gefunden.');
        return;
    }
    
    // Create a clone to modify for PDF generation (avoid modifying the actual page)
    const clone = element.cloneNode(true);
    
    // Remove page-actions section from the PDF
    const actionsToRemove = clone.querySelector('.page-actions');
    if (actionsToRemove) {
        actionsToRemove.remove();
    }
    
    // Generate filename with current date
    const today = new Date().toISOString().split('T')[0];
    const filename = `Smart-Home-Datencheck_${today}.pdf`;
    
    // PDF options
    const options = {
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Generate PDF
    html2pdf().set(options).from(clone).save();
}

function initChecklistPage() {
    const downloadBtn = document.getElementById('downloadPdfButton');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generateChecklistPdf);
    }
}

document.addEventListener('DOMContentLoaded', initChecklistPage);
