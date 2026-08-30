/**
 * 12TH BOARD RESULT 2026 CONTROLLER & SCORECARD GENERATOR
 * School: Govt. Sr. Sec. School 52 LNP (Manjhuwas), Padampur, Sri Ganganagar
 */

window.currentResultTab = 'toppers';

window.switchResultTab = function(tabName) {
  window.currentResultTab = tabName;
  document.querySelectorAll('.res-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  renderBoardResultTable();
};

window.renderBoardResultTable = function() {
  const container = document.getElementById('boardResultTableContainer');
  if (!container || !window.SCHOOL_DATA || !window.SCHOOL_DATA.boardResults2026) return;

  const data = window.SCHOOL_DATA.boardResults2026;
  const lang = document.documentElement.lang || 'en';

  if (window.currentResultTab === 'toppers') {
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px;">
        ${data.toppers.map(t => `
          <div class="quick-card" style="align-items: flex-start; text-align: left; padding: 20px; position: relative; border-left: 4px solid var(--brand-gold);">
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; margin-bottom: 8px;">
              <span style="background: rgba(255,179,0,0.15); color: var(--brand-gold); font-size: 0.72rem; font-weight: 800; padding: 3px 10px; border-radius: 9999px; border: 1px solid rgba(255,179,0,0.3);">
                ${t.badge}
              </span>
              <span style="font-size: 1.3rem; font-weight: 900; color: var(--brand-gold);">#${t.rank}</span>
            </div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 2px;">${t.name}</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">S/D/o Sh. ${t.father} • Roll No: <strong>${t.roll}</strong></p>
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Stream: ${t.stream}</span>
              <span style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${t.percent} <small style="font-size: 0.75rem; color: var(--text-muted);">(${t.marks}/${t.maxMarks})</small></span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (window.currentResultTab === 'arts') {
    container.innerHTML = `
      <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table class="notices-table" style="width: 100%; min-width: 720px;">
          <thead>
            <tr>
              <th>#</th>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Father's Name</th>
              <th>Hindi</th>
              <th>English</th>
              <th>Pol. Sci</th>
              <th>Geography</th>
              <th>Sociology</th>
              <th>Total</th>
              <th>%</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${data.artsStudents.map(s => `
              <tr style="cursor: pointer;" onclick="openStudentScorecard('${s.roll}')" title="Click to view detailed marksheet">
                <td style="font-weight: 700; color: var(--brand-gold);">${s.sNo}</td>
                <td><strong style="color: var(--brand-sky);">${s.roll}</strong></td>
                <td><strong>${s.name}</strong></td>
                <td style="color: var(--text-secondary); font-size: 0.85rem;">${s.father}</td>
                <td>${s.hindi}</td>
                <td>${s.english}</td>
                <td><span style="color: var(--brand-gold); font-weight: 700;">${s.polSci}</span></td>
                <td><span style="color: var(--brand-gold); font-weight: 700;">${s.geography}</span></td>
                <td>${s.sociology}</td>
                <td><strong>${s.total}</strong></td>
                <td><span style="background: rgba(16,185,129,0.15); color: #10B981; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${s.percent}%</span></td>
                <td><span style="color: #10B981; font-weight: 700; font-size: 0.8rem;"><i class="fa-solid fa-circle-check"></i> ${s.result}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else if (window.currentResultTab === 'science') {
    container.innerHTML = `
      <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table class="notices-table" style="width: 100%; min-width: 720px;">
          <thead>
            <tr>
              <th>#</th>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Father's Name</th>
              <th>Hindi</th>
              <th>English</th>
              <th>Physics</th>
              <th>Chemistry</th>
              <th>Biology</th>
              <th>Total</th>
              <th>%</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${data.scienceStudents.map(s => `
              <tr style="cursor: pointer;" onclick="openStudentScorecard('${s.roll}')" title="Click to view detailed marksheet">
                <td style="font-weight: 700; color: var(--brand-gold);">${s.sNo}</td>
                <td><strong style="color: var(--brand-sky);">${s.roll}</strong></td>
                <td><strong>${s.name}</strong></td>
                <td style="color: var(--text-secondary); font-size: 0.85rem;">${s.father}</td>
                <td>${s.hindi}</td>
                <td>${s.english}</td>
                <td>${s.physics}</td>
                <td><span style="color: var(--brand-gold); font-weight: 700;">${s.chemistry}</span></td>
                <td><span style="color: var(--brand-gold); font-weight: 700;">${s.biology}</span></td>
                <td><strong>${s.total}</strong></td>
                <td><span style="background: rgba(16,185,129,0.15); color: #10B981; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${s.percent}%</span></td>
                <td><span style="color: #10B981; font-weight: 700; font-size: 0.8rem;"><i class="fa-solid fa-circle-check"></i> ${s.result}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
};

window.openStudentScorecard = function(rollNo) {
  const data = window.SCHOOL_DATA.boardResults2026;
  if (!data) return;

  const student = data.artsStudents.find(s => s.roll === rollNo) || data.scienceStudents.find(s => s.roll === rollNo);
  if (!student) {
    alert('Student not found for Roll Number: ' + rollNo);
    return;
  }

  const isArts = !!student.polSci;
  const modal = document.getElementById('servicesModal');
  const title = document.getElementById('servicesModalTitle');
  const body = document.getElementById('servicesModalBody');
  if (!modal || !title || !body) return;

  title.textContent = 'RBSE 12th Board Official Scorecard 2026';
  body.innerHTML = `
    <div style="background: var(--bg-surface); border: 1.5px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
      <div style="text-align: center; border-bottom: 2px solid var(--brand-gold); padding-bottom: 14px; margin-bottom: 16px;">
        <div style="font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--brand-gold); font-weight: 800;">
          Rajasthan Board of Secondary Education (RBSE Ajmer)
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 900; margin: 4px 0; color: var(--text-primary);">
          GOVT. SR. SEC. SCHOOL 52 LNP (MANJHUWAS)
        </h3>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          School Code: 1240860 / 217004 • District: Sri Ganganagar • Year: 2026
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.88rem; margin-bottom: 18px; padding: 12px; background: rgba(255,255,255,0.04); border-radius: 8px;">
        <div><strong>Student Name:</strong> <span style="color: var(--brand-gold); font-weight: 700;">${student.name}</span></div>
        <div><strong>Roll Number:</strong> <span style="color: var(--brand-sky); font-weight: 700;">${student.roll}</span></div>
        <div><strong>Father's Name:</strong> Sh. ${student.father}</div>
        <div><strong>Stream:</strong> ${isArts ? 'Arts & Humanities (कला संकाय)' : 'Science Stream (विज्ञान संकाय)'}</div>
      </div>

      <table style="width: 100%; font-size: 0.88rem; border-collapse: collapse; margin-bottom: 18px;">
        <thead>
          <tr style="background: rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.15);">
            <th style="padding: 8px 12px; text-align: left;">Subject</th>
            <th style="padding: 8px 12px; text-align: center;">Max Marks</th>
            <th style="padding: 8px 12px; text-align: right;">Marks Obtained</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="padding: 8px 12px;">Hindi (Compulsory)</td>
            <td style="padding: 8px 12px; text-align: center;">100</td>
            <td style="padding: 8px 12px; text-align: right; font-weight: 700;">${student.hindi}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="padding: 8px 12px;">English (Compulsory)</td>
            <td style="padding: 8px 12px; text-align: center;">100</td>
            <td style="padding: 8px 12px; text-align: right; font-weight: 700;">${student.english}</td>
          </tr>
          ${isArts ? `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 8px 12px;">Political Science</td>
              <td style="padding: 8px 12px; text-align: center;">100</td>
              <td style="padding: 8px 12px; text-align: right; font-weight: 700; color: var(--brand-gold);">${student.polSci}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 8px 12px;">Geography</td>
              <td style="padding: 8px 12px; text-align: center;">100</td>
              <td style="padding: 8px 12px; text-align: right; font-weight: 700; color: var(--brand-gold);">${student.geography}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 8px 12px;">Sociology</td>
              <td style="padding: 8px 12px; text-align: center;">100</td>
              <td style="padding: 8px 12px; text-align: right; font-weight: 700;">${student.sociology}</td>
            </tr>
          ` : `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 8px 12px;">Physics</td>
              <td style="padding: 8px 12px; text-align: center;">100</td>
              <td style="padding: 8px 12px; text-align: right; font-weight: 700;">${student.physics}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 8px 12px;">Chemistry</td>
              <td style="padding: 8px 12px; text-align: center;">100</td>
              <td style="padding: 8px 12px; text-align: right; font-weight: 700; color: var(--brand-gold);">${student.chemistry}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 8px 12px;">Biology</td>
              <td style="padding: 8px 12px; text-align: center;">100</td>
              <td style="padding: 8px 12px; text-align: right; font-weight: 700; color: var(--brand-gold);">${student.biology}</td>
            </tr>
          `}
        </tbody>
        <tfoot>
          <tr style="background: rgba(255,179,0,0.12); font-weight: 800; border-top: 2px solid var(--brand-gold);">
            <td style="padding: 10px 12px;">Grand Total / Aggregate</td>
            <td style="padding: 10px 12px; text-align: center;">500</td>
            <td style="padding: 10px 12px; text-align: right; color: var(--brand-gold); font-size: 1.05rem;">${student.total} (${student.percent}%)</td>
          </tr>
        </tfoot>
      </table>

      <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; padding: 12px; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; margin-bottom: 16px;">
        <span style="color: #10B981; font-weight: 800;"><i class="fa-solid fa-award me-1"></i> FINAL RESULT: ${student.result.toUpperCase()}</span>
        ${student.gender === 'F' && student.percent >= 75 
          ? '<span style="background: #E11D48; color: #fff; padding: 3px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 800;"><i class="fa-solid fa-award me-1"></i> GARGI PURASKAR ELIGIBLE (गार्गी पुरस्कार - केवल छात्रा)</span>' 
          : (student.percent >= 75 ? '<span style="background: #10B981; color: #fff; padding: 3px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 800;"><i class="fa-solid fa-trophy me-1"></i> MERIT DISTINCTION (मेधावी छात्र सम्मान)</span>' : '')}
      </div>

      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary btn-sm w-100" style="flex: 1;" onclick="window.print()">
          <i class="fa-solid fa-print me-1"></i> Print Marksheet
        </button>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('servicesModal').classList.remove('open'); document.body.style.overflow='';">
          Close
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

// Search by Roll Number or Name
window.handleLiveResultSearch = function(query) {
  if (!query || !query.trim()) {
    renderBoardResultTable();
    return;
  }
  const q = query.trim().toLowerCase();
  const data = window.SCHOOL_DATA.boardResults2026;
  if (!data) return;

  const all = [...data.artsStudents, ...data.scienceStudents];
  const matched = all.filter(s => s.roll.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.father.toLowerCase().includes(q));

  const container = document.getElementById('boardResultTableContainer');
  if (!container) return;

  if (matched.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 text-muted">
        <i class="fa-solid fa-user-xmark" style="font-size: 2.2rem; margin-bottom: 10px; opacity: 0.7;"></i>
        <h4 style="color: var(--text-primary); margin-bottom: 4px;">No Student Found for "${query}"</h4>
        <p style="font-size: 0.85rem;">Please check your 7-digit RBSE Roll Number (e.g. 3359329 or 2737271).</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
      <table class="notices-table" style="width: 100%; min-width: 720px;">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>Father's Name</th>
            <th>Total Marks</th>
            <th>Percentage</th>
            <th>Division</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${matched.map(s => `
            <tr>
              <td><strong style="color: var(--brand-sky);">${s.roll}</strong></td>
              <td><strong>${s.name}</strong></td>
              <td style="color: var(--text-secondary); font-size: 0.85rem;">${s.father}</td>
              <td><strong>${s.total} / 500</strong></td>
              <td><span style="background: rgba(16,185,129,0.15); color: #10B981; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${s.percent}%</span></td>
              <td><span style="color: #10B981; font-weight: 700; font-size: 0.8rem;"><i class="fa-solid fa-circle-check"></i> ${s.result}</span></td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="openStudentScorecard('${s.roll}')">
                  <i class="fa-solid fa-eye me-1"></i> View Marksheet
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  renderBoardResultTable();
});
