const userId = sessionStorage.getItem('userId');

if (userId) {
    const getData = async (link) => {
        return await fetch(link)
            .catch(error => console.error('Error:', error))
            .then(response => response.json());
    }

    const usuario = await getData(`http://localhost:3000/usuarios/${userId}`);

    const loginBtn = document.querySelector('.login-button');
    loginBtn.textContent = usuario.name;
    loginBtn.href = '../html/user-info.html';

    const userNav = document.querySelector('.user-nav');
    userNav.textContent = usuario.name;
    userNav.href = '../html/user-info.html';
}