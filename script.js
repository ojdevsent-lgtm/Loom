const form = document.getElementById('projectForm');
const status = document.getElementById('formStatus');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const loomWhatsApp = '2349047868006';
let lastCaseTrigger = null;

function setMenu(open) {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuToggle?.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', event => {
  if (!mobileMenu?.classList.contains('open')) return;
  if (!mobileMenu.contains(event.target) && !menuToggle?.contains(event.target)) setMenu(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setMenu(false);
    if (caseModal?.classList.contains('open')) closeCaseStudy();
  }
});

const caseStudies = {
  batish: { type: 'HOSPITALITY · WEBSITE', title: 'Batish Hotel', summary: 'A premium hospitality direction designed to make the property feel bookable before the visitor ever reaches the reservation step.', problem: 'The hotel needs a polished digital first impression that communicates the stay clearly and makes booking intent obvious.', approach: 'Lead with atmosphere, concise information, strong hierarchy and a clear booking action instead of burying visitors in content.', deliverable: 'Responsive hotel website concept with accommodation-focused presentation, navigation and booking CTA.', role: 'Strategy · UX · Visual design · Front-end development' },
  property: { type: 'REAL ESTATE · CONCEPT', title: 'Property4Naija', summary: 'A property discovery direction focused on reducing friction between a visitor arriving and finding a place that fits.', problem: 'Property seekers need to scan options quickly and understand the platform without fighting through unnecessary interface complexity.', approach: 'Prioritise search intent, property hierarchy and mobile-first browsing patterns with a strong visual entry point.', deliverable: 'Real-estate website concept with discovery-focused layout, property cards and conversion-oriented structure.', role: 'Product direction · UX · Visual design' },
  loom: { type: 'BUSINESS · WEB DESIGN', title: 'LOOM Business Concept', summary: 'A visual exploration of how a service business can communicate its value with less noise and more confidence.', problem: 'Generic agency websites often explain too much and prove too little. The visitor needs a reason to trust and act.', approach: 'Use sharp positioning, editorial typography, restrained colour and a direct conversion path from proof to project brief.', deliverable: 'Conversion-led business website direction and reusable visual system.', role: 'Strategy · UX · Art direction · Front-end development' }
};

const caseModal = document.getElementById('caseModal');
const caseFields = { type: document.getElementById('caseType'), title: document.getElementById('caseTitle'), summary: document.getElementById('caseSummary'), problem: document.getElementById('caseProblem'), approach: document.getElementById('caseApproach'), deliverable: document.getElementById('caseDeliverable'), role: document.getElementById('caseRole') };

function closeCaseStudy() {
  caseModal?.classList.remove('open');
  caseModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastCaseTrigger?.focus();
}

document.querySelectorAll('.work-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const project = caseStudies[trigger.dataset.case];
    if (!project || !caseModal) return;
    lastCaseTrigger = trigger;
    Object.entries(caseFields).forEach(([key, element]) => { if (element) element.textContent = project[key]; });
    caseModal.classList.add('open');
    caseModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.querySelector('.case-close')?.focus();
  });
});

document.querySelectorAll('[data-close-case]').forEach(element => element.addEventListener('click', closeCaseStudy));

form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const data = new FormData(form);
  const clean = value => String(value ?? '').trim();
  const phone = clean(data.get('phone')).replace(/[^\d+]/g, '');
  const message = ['Hello LOOM AGENCY 👋', '', "I'd like to build a website.", '', `Name: ${clean(data.get('name'))}`, `Business: ${clean(data.get('business'))}`, `Website type: ${clean(data.get('type'))}`, `Budget: ${clean(data.get('budget'))}`, `My WhatsApp: ${phone}`, '', `Project details: ${clean(data.get('details'))}`].join('\n');
  const url = `https://wa.me/${loomWhatsApp}?text=${encodeURIComponent(message)}`;
  status.textContent = 'Opening WhatsApp…';
  const submit = form.querySelector('button[type="submit"]');
  if (submit) submit.disabled = true;
  const popup = window.open(url, '_blank', 'noopener,noreferrer');
  if (!popup) {
    status.textContent = 'Opening WhatsApp in this tab…';
    window.location.href = url;
  }
  window.setTimeout(() => { if (submit) submit.disabled = false; }, 1500);
});