function generateProtocolPdf() {
    const { jsPDF } = window.jspdf;
    
    // Gather form data
    const date = document.getElementById('protocolDate')?.value || '';
    const address = document.getElementById('protocolAddress')?.value || '';
    
    // Member data
    const members = [];
    for (let i = 0; i < 4; i++) {
        const name = document.getElementById(`memberName${i}`)?.value || '';
        const role = document.getElementById(`memberRole${i}`)?.value || '';
        if (name || role) {
            members.push({ name, role });
        }
    }
    
    // Device data from table
    const devices = [];
    const rows = document.querySelectorAll('.protocol-table tbody tr:not(.blank-row)');
    rows.forEach((row, index) => {
        const deviceNameInput = row.querySelector('.device-cell input.notes-input');
        const locationInput = row.querySelector('.location-cell input.notes-input');
        const dataInput = row.querySelector('.data-cell input.notes-input');
        const notesInput = row.querySelector('.notes-cell input.notes-input');

        const name = deviceNameInput?.value.trim() || '';
        const location = locationInput?.value.trim() || '';
        const data = dataInput?.value.trim() || '';

        // Only include row if at least a device name is entered
        if (name) {
            const allowed = document.getElementById(`allowed_${index}`)?.checked || false;
            const local = document.getElementById(`local_${index}`)?.checked || false;
            const noThird = document.getElementById(`nothird_${index}`)?.checked || false;
            const notes = notesInput?.value || '';

            devices.push({ name, location, data, allowed, local, noThird, notes });
        }
    });
    
    const protocolNotes = document.getElementById('protocolNotes')?.value || '';
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let yPos = 15;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    
    // Header
    pdf.setFontSize(18);
    pdf.text('Konsens-Protokoll', margin, yPos);
    yPos += 8;
    
    pdf.setFontSize(12);
    pdf.text('Gemeinsame Nutzungsvereinbarung im Smart-Home Haushalt', margin, yPos);
    yPos += 12;
    
    // Meta information
    pdf.setFontSize(10);
    pdf.setTextColor(80);
    if (date) {
        pdf.text(`Datum: ${date}`, margin, yPos);
        yPos += 6;
    }
    if (address) {
        const addressLines = pdf.splitTextToSize(`Haushalt: ${address}`, maxWidth);
        pdf.text(addressLines, margin, yPos);
        yPos += addressLines.length * 6 + 2;
    }
    yPos += 4;
    
    // Members section
    pdf.setTextColor(0);
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('Haushaltsmitglieder und Mitbetroffene', margin, yPos);
    yPos += 8;
    
    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(9);
    if (members.length > 0) {
        members.forEach((member, i) => {
            const memberText = `${i + 1}. ${member.name}${member.role ? ` (${member.role})` : ''}`;
            pdf.text(memberText, margin + 5, yPos);
            yPos += 5;
        });
    } else {
        pdf.setTextColor(150);
        pdf.text('Keine Mitglieder eingetragen', margin + 5, yPos);
        pdf.setTextColor(0);
    }
    yPos += 4;
    
    // Devices section
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('Geräte und Vereinbarungen', margin, yPos);
    yPos += 7;
    
    // Create device table
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    
    if (devices.length > 0) {
        const tableData = devices.map(d => [
            d.name || '',
            d.location || '',
            d.allowed ? '✓' : '',
            d.local ? '✓' : '',
            d.noThird ? '✓' : '',
            d.notes || ''
        ]);
        
        pdf.autoTable({
            head: [['Gerät', 'Standort', 'Erlaubt', 'Abschaltbar', 'Keine 3.', 'Absprachen']],
            body: tableData,
            startY: yPos,
            margin: { left: margin, right: margin },
            styles: { font: 'helvetica', fontSize: 8, cellPadding: 3, overflow: 'linebreak' },
            headerStyles: { fillColor: [47, 93, 80], textColor: [255, 255, 255], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [245, 251, 248] },
            columnStyles: {
                2: { halign: 'center' },
                3: { halign: 'center' },
                4: { halign: 'center' }
            }
        });
        
        yPos = pdf.lastAutoTable.finalY + 8;
    }
    
    // Check if we need a new page
    if (yPos > pdf.internal.pageSize.getHeight() - 40) {
        pdf.addPage();
        yPos = 15;
    }
    
    // Notes section
    if (protocolNotes) {
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'bold');
        pdf.text('Weitere Vereinbarungen und Anmerkungen', margin, yPos);
        yPos += 6;
        
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(9);
        const notesLines = pdf.splitTextToSize(protocolNotes, maxWidth);
        pdf.text(notesLines, margin, yPos);
        yPos += notesLines.length * 5 + 6;
    }
    
    // Signature section
    if (yPos > pdf.internal.pageSize.getHeight() - 50) {
        pdf.addPage();
        yPos = 15;
    }
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'bold');
    pdf.text('Unterschriften', margin, yPos);
    yPos += 8;
    
    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(9);
    const sigX = margin;
    const sigSpacing = (pageWidth - 2 * margin) / 2;
    const sigLineY = yPos + 12;
    const sigLabelY = sigLineY + 8;
    
    // Draw signature lines
    for (let i = 0; i < 2; i++) {
        const x = sigX + (i * sigSpacing);
        pdf.line(x, sigLineY, x + sigSpacing - 10, sigLineY);
        pdf.text(`Person ${i + 1}`, x, sigLabelY);
    }
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.text(`Seite ${i} von ${pageCount}`, pageWidth / 2, pdf.internal.pageSize.getHeight() - 8, { align: 'center' });
    }
    
    // Generate filename with date
    const filename = `Konsens-Protokoll_${date || 'undatiert'}.pdf`;
    pdf.save(filename);
}

function initProtocolPage() {
    const downloadBtn = document.getElementById('downloadPdfButton');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generateProtocolPdf);
    }
}

document.addEventListener('DOMContentLoaded', initProtocolPage);
