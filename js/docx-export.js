// ─────────────────────────────────────────────────────
// docx-export.js — convert briefing to .docx download
// Requires docx.js loaded from CDN in index.html
// ─────────────────────────────────────────────────────

async function downloadDocx() {
  const btn = document.getElementById('btn-download');
  btn.textContent = 'Generating…';
  btn.disabled = true;

  try {
    const { Document, Packer, Paragraph, TextRun,
            HeadingLevel, AlignmentType, LevelFormat } = docx;

    const sections = [];
    for (let i = 1; i <= 5; i++) {
      const header = document.querySelector(
        `.section-card:nth-child(${i}) .section-title`);
      const items = document.querySelectorAll(`#body-${i} li`);
      if (header) {
        sections.push({
          title:   header.textContent,
          bullets: Array.from(items).map(li => li.textContent),
        });
      }
    }

    const title = document.getElementById('briefing-title').textContent;
    const date  = document.getElementById('briefing-date').textContent;

    const doc = new Document({
      numbering: {
        config: [{
          reference: 'bullets',
          levels: [{
            level: 0,
            format: LevelFormat.BULLET,
            text: '•',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 },
              },
            },
          }],
        }],
      },
      sections: [{
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: [
          new Paragraph({
            heading: HeadingLevel.TITLE,
            children: [new TextRun({ text: title, bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: date, color: '666666', size: 22 })],
            spacing: { after: 400 },
          }),
          ...sections.flatMap(s => [
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              children: [new TextRun(s.title)],
              spacing: { before: 240, after: 120 },
            }),
            ...s.bullets.map(b =>
              new Paragraph({
                numbering: { reference: 'bullets', level: 0 },
                children: [new TextRun(b)],
              })
            ),
          ]),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    a.href     = url;
    a.download = `meeting-briefing-${slug}.docx`;
    a.click();
    URL.revokeObjectURL(url);

    btn.textContent = '✓ Downloaded';
    setTimeout(() => {
      btn.textContent = 'Download .docx';
      btn.disabled = false;
    }, 3000);

  } catch (err) {
    alert('Download failed: ' + err.message);
    btn.textContent = 'Download .docx';
    btn.disabled = false;
  }
}