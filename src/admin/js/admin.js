const criarBtn = document.getElementById('criarBtn');
const sidePanel = document.getElementById('sidePanel');
const closeBtn = document.getElementById('closeBtn');

criarBtn.addEventListener('click', () => {
  setTimeout(() => {
    sidePanel.classList.toggle('active');
  }, 50)
});

closeBtn.addEventListener('click', () => {
  setTimeout(() => {
    sidePanel.classList.remove('active');
  }, 50)
});