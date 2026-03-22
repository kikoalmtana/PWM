document.addEventListener('DOMContentLoaded', () => {
    console.log('overlay:', document.getElementById('overlay'));
    console.log('openBtn:', document.getElementById('openPopup'));
    console.log('closeBtn:', document.getElementById('closePopup'));
    console.log('sendBtn:', document.getElementById('sendBtn'));
    console.log('formContent:', document.getElementById('formContent'));
    console.log('successMsg:', document.getElementById('successMsg'));
    console.log('inputEmail:', document.getElementById('inputEmail'));
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openPopup');
    const closeBtn = document.getElementById('closePopup');
    const sendBtn = document.getElementById('sendBtn');
    const formContent = document.getElementById('formContent');
    const successMsg = document.getElementById('successMsg');
    const inputEmail = document.getElementById('inputEmail');

    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('open');
            formContent.style.display = 'flex';
            successMsg.style.display = 'none';
            inputEmail.value = '';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    }


    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('open');
        });
    }

    if (sendBtn){
        sendBtn.addEventListener('click', () => {
            if (!inputEmail.value) {
                inputEmail.focus();
                return;
            }
            formContent.style.display = 'none';
            successMsg.style.display = 'block';
        });
    }

});
