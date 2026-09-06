const form = document.getElementById('projectForm');
const status = document.getElementById('formStatus');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const loomWhatsApp = '2349047868006';

menuToggle?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    'Hello LOOM AGENCY 👋',
    '',
    "I'd like to build a website.",
    '',
    `Name: ${data.get('name')}`,
    `Business: ${data.get('business')}`,
    `Website type: ${data.get('type')}`,
    `Budget: ${data.get('budget')}`,
    `My WhatsApp: ${data.get('phone')}`,
    '',
    `Project details: ${data.get('details')}`
  ].join('\n');

  status.textContent = 'Opening WhatsApp…';
  const url = `https://wa.me/${loomWhatsApp}?text=${encodeURIComponent(message)}`;
  const popup = window.open(url, '_blank', 'noopener,noreferrer');
  if (!popup) {
    status.textContent = 'WhatsApp was blocked. Please allow pop-ups or use the WhatsApp link in the footer.';
  }
});
