const form = document.getElementById('projectForm');
const loomWhatsApp = '2349047868006';

form.addEventListener('submit', (event) => {
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

  window.open(`https://wa.me/${loomWhatsApp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
