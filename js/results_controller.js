/**
 * RBSE BOARD EXAMINATION RESULTS 2026 CONTROLLER
 * EXCLUSIVE MERIT TOPPERS SHOWCASE
 * School: Govt. Sr. Sec. School 52 LNP (Manjhuwas), Padampur, Sri Ganganagar (Code: 212024)
 */

window.currentClassTab = 'all'; // 'all', '10th', '12th'

window.switchResultClass = function(cls) {
  window.currentClassTab = cls;

  document.querySelectorAll('.class-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.class === cls);
  });

  renderToppersShowcase();
};

window.renderToppersShowcase = function(searchQuery = '') {
  const container = document.getElementById('boardResultTableContainer');
  if (!container || !window.SCHOOL_DATA) return;

  const data10 = window.SCHOOL_DATA.boardResults10th2026;
  const data12 = window.SCHOOL_DATA.boardResults2026;

  let allToppers = [];

  if (data10 && data10.toppers) {
    data10.toppers.forEach(t => {
      allToppers.push({
        ...t,
        classLevel: '10th',
        classTitle: 'Class 10th (Secondary)',
        classTitleHi: 'कक्षा 10वीं (माध्यमिक)'
      });
    });
  }

  if (data12 && data12.toppers) {
    data12.toppers.forEach(t => {
      allToppers.push({
        ...t,
        classLevel: '12th',
        classTitle: `Class 12th (${t.stream})`,
        classTitleHi: `कक्षा 12वीं (${t.stream})`
      });
    });
  }

  // Filter by Class Tab
  let filtered = allToppers;
  if (window.currentClassTab === '10th') {
    filtered = filtered.filter(t => t.classLevel === '10th');
  } else if (window.currentClassTab === '12th') {
    filtered = filtered.filter(t => t.classLevel === '12th');
  }

  // Filter by Search Query if present
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    filtered = allToppers.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.roll.toString().includes(q) || 
      t.father.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <i class="fa-solid fa-user-slash" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.5;"></i>
        <h4 style="color: var(--text-primary); font-size: 1.1rem; margin-bottom: 4px;">No Topper Found for "${searchQuery}"</h4>
        <p style="font-size: 0.85rem;">Try searching with a student name or roll number (e.g. 1240860, 2650101, Vaibhav, Manisha)</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 18px;">
      ${filtered.map(t => {
        const isRank1 = t.rank === 1;
        const isGirl = t.badge && t.badge.includes('गार्गी');
        const badgeColor = isRank1 ? 'var(--brand-gold)' : (isGirl ? '#EC4899' : '#38BDF8');
        const badgeBg = isRank1 ? 'rgba(255,179,0,0.14)' : (isGirl ? 'rgba(236,72,153,0.12)' : 'rgba(56,189,248,0.12)');
        const badgeBorder = isRank1 ? 'rgba(255,179,0,0.35)' : (isGirl ? 'rgba(236,72,153,0.35)' : 'rgba(56,189,248,0.35)');

        return `
          <div class="quick-card liquid-glass-card" style="align-items: flex-start; text-align: left; padding: 22px; position: relative; border-left: 4.5px solid ${badgeColor}; transition: transform 0.2s ease, box-shadow 0.2s ease;">
            
            <!-- Top Badge Strip -->
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; margin-bottom: 12px;">
              <span style="background: ${badgeBg}; color: ${badgeColor}; font-size: 0.72rem; font-weight: 800; padding: 4px 12px; border-radius: 9999px; border: 1px solid ${badgeBorder}; display: inline-flex; align-items: center; gap: 5px;">
                <i class="fa-solid ${isRank1 ? 'fa-crown' : (isGirl ? 'fa-award' : 'fa-star')}"></i>
                ${t.badge}
              </span>
              <span style="font-size: 1.35rem; font-weight: 900; color: ${badgeColor};">#${t.rank}</span>
            </div>

            <!-- Student Info -->
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 3px; font-family: var(--font-serif);">
              ${t.name}
            </h3>
            <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 6px;">
              S/D/o Sh. <strong>${t.father}</strong>
            </p>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px; display: flex; gap: 10px;">
              <span>Roll No: <strong style="color: var(--brand-sky);">${t.roll}</strong></span>
              <span>•</span>
              <span>${t.classTitle}</span>
            </div>

            <!-- Score Details -->
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; padding: 10px 14px; background: rgba(0,0,0,0.2); border-radius: 10px; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.05);">
              <div>
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Score / Total</div>
                <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary);">${t.marks} / ${t.maxMarks}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Percentage</div>
                <div style="font-size: 1.3rem; font-weight: 900; color: ${badgeColor};">${t.percent}</div>
              </div>
            </div>

            <!-- Action Button -->
            <button type="button" class="btn btn-secondary btn-sm" onclick="openStudentScorecard('${t.roll}')" style="width: 100%; justify-content: center; font-size: 0.82rem; padding: 8px 12px;">
              <i class="fa-solid fa-file-invoice me-1"></i> View Official Marksheet
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

window.handleLiveResultSearch = function(query) {
  renderToppersShowcase(query);
};

// Marksheet Modal Generator
window.openStudentScorecard = function(rollNo) {
  const modal = document.getElementById('servicesModal');
  const modalBody = document.getElementById('servicesModalBody');
  const modalTitle = document.getElementById('servicesModalTitle');
  if (!modal || !modalBody) return;

  const data10 = window.SCHOOL_DATA.boardResults10th2026;
  const data12 = window.SCHOOL_DATA.boardResults2026;

  let student = null;
  let isClass10 = false;

  // Search 10th
  if (data10) {
    student = data10.students.find(s => s.roll.toString() === rollNo.toString());
    if (student) isClass10 = true;
  }

  // Search 12th
  if (!student && data12) {
    student = data12.artsStudents.find(s => s.roll.toString() === rollNo.toString());
    if (!student) {
      student = data12.scienceStudents.find(s => s.roll.toString() === rollNo.toString());
    }
  }

  if (!student) {
    alert('Student marksheet not found for Roll No: ' + rollNo);
    return;
  }

  if (modalTitle) {
    modalTitle.textContent = isClass10 ? 'RBSE Secondary Examination Marksheet 2026' : 'RBSE Sr. Secondary Examination Marksheet 2026';
  }

  const subjectsHtml = isClass10 ? `
    <tr><td>01. Hindi (अनिवार्य हिन्दी)</td><td>100</td><td>${student.hindi}</td><td>${student.hindi >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>02. English (अनिवार्य अंग्रेजी)</td><td>100</td><td>${student.english}</td><td>${student.english >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>03. Science (विज्ञान)</td><td>100</td><td>${student.science}</td><td>${student.science >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>04. Social Science (सामाजिक विज्ञान)</td><td>100</td><td>${student.socSci}</td><td>${student.socSci >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>05. Mathematics (गणित)</td><td>100</td><td>${student.maths}</td><td>${student.maths >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>06. Third Language (तृतीय भाषा)</td><td>100</td><td>${student.thirdLang}</td><td>${student.thirdLang >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
  ` : (student.stream === 'Science' ? `
    <tr><td>01. Hindi (Compulsory)</td><td>100</td><td>${student.hindi}</td><td>Pass</td></tr>
    <tr><td>02. English (Compulsory)</td><td>100</td><td>${student.english}</td><td>Pass</td></tr>
    <tr><td>03. Physics (भौतिक विज्ञान)</td><td>100</td><td>${student.physics}</td><td>${student.physics >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>04. Chemistry (रसायन विज्ञान)</td><td>100</td><td>${student.chemistry}</td><td>${student.chemistry >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>05. Biology / Maths (जीव/गणित)</td><td>100</td><td>${student.bioMaths}</td><td>${student.bioMaths >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
  ` : `
    <tr><td>01. Hindi (Compulsory)</td><td>100</td><td>${student.hindi}</td><td>Pass</td></tr>
    <tr><td>02. English (Compulsory)</td><td>100</td><td>${student.english}</td><td>Pass</td></tr>
    <tr><td>03. Political Science (राजनीति विज्ञान)</td><td>100</td><td>${student.polSci}</td><td>${student.polSci >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>04. Geography (भूगोल)</td><td>100</td><td>${student.geography}</td><td>${student.geography >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
    <tr><td>05. Sociology (समाजशास्त्र)</td><td>100</td><td>${student.sociology}</td><td>${student.sociology >= 75 ? '<span style="color:#10B981;font-weight:700;">D (Distinction)</span>' : 'Pass'}</td></tr>
  `);

  modalBody.innerHTML = `
    <div style="background: rgba(255,255,255,0.03); padding: 18px; border-radius: 14px; border: 1px solid rgba(227,202,165,0.3); margin-bottom: 16px;">
      <div style="text-align: center; margin-bottom: 14px; border-bottom: 1px dashed rgba(255,255,255,0.15); padding-bottom: 12px;">
        <h4 style="color: var(--brand-gold); font-size: 1.1rem; font-weight: 800; margin-bottom: 2px;">BOARD OF SECONDARY EDUCATION, RAJASTHAN</h4>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">Govt. Sr. Sec. School 52 LNP (मांझूवास) • School Code: <strong>212024</strong></p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.85rem; margin-bottom: 16px;">
        <div><strong>Student Name:</strong> <span style="color: var(--text-primary);">${student.name}</span></div>
        <div><strong>Roll Number:</strong> <span style="color: var(--brand-gold); font-weight: 800;">${student.roll}</span></div>
        <div><strong>Father's Name:</strong> <span style="color: var(--text-primary);">${student.father}</span></div>
        <div><strong>Class:</strong> <span style="color: var(--text-primary);">${isClass10 ? '10th Secondary' : `12th (${student.stream})`}</span></div>
      </div>

      <table class="notices-table" style="width: 100%; font-size: 0.82rem; margin-bottom: 14px;">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Max</th>
            <th>Marks Obtained</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          ${subjectsHtml}
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(16,185,129,0.12); border-radius: 10px; border: 1px solid rgba(16,185,129,0.3);">
        <div>
          <div style="font-size: 0.74rem; text-transform: uppercase; color: #10B981; font-weight: 700;">Result Status</div>
          <div style="font-size: 1.1rem; font-weight: 900; color: #10B981;"><i class="fa-solid fa-circle-check me-1"></i> PASSED (FIRST DIVISION)</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.74rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Percentage</div>
          <div style="font-size: 1.35rem; font-weight: 900; color: var(--brand-gold);">${student.percent}%</div>
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 10px; justify-content: flex-end;">
      <button class="btn btn-secondary btn-sm" onclick="window.print()"><i class="fa-solid fa-print me-1"></i> Print Marksheet</button>
      <button class="btn btn-primary btn-sm" onclick="document.getElementById('servicesModal').classList.remove('open'); document.body.style.overflow='';"><i class="fa-solid fa-check me-1"></i> Close</button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

document.addEventListener('DOMContentLoaded', () => {
  renderToppersShowcase();
});
