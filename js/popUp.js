document.addEventListener('DOMContentLoaded', () => {
    console.log('1overlay:', document.getElementById('overlay'));
    console.log('2openBtn:', document.getElementById('openPopup'));
    console.log('3closeBtn:', document.getElementById('closePopup'));
    console.log('4sendBtn:', document.getElementById('sendBtn'));
    console.log('5formContent:', document.getElementById('formContent'));
    console.log('6successMsg:', document.getElementById('successMsg'));
    console.log('7inputEmail:', document.getElementById('inputEmail'));
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openPopup');
    const closeBtn = document.getElementById('closePopup');
    const sendBtn = document.getElementById('sendBtn');
    const formContent = document.getElementById('formContent');
    const successMsg = document.getElementById('successMsg');
    const inputEmail = document.getElementById('inputEmail');

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('open');
        formContent.style.display = 'flex';
        successMsg.style.display = 'none';
        inputEmail.value = '';
    });

    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
    });

    sendBtn.addEventListener('click', () => {
        if (!inputEmail.value) {
            inputEmail.focus();
            return;
        }
        formContent.style.display = 'none';
        successMsg.style.display = 'block';
    });
});
