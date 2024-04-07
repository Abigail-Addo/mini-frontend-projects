const logout = document.querySelector('.sidebar-panel ul li:last-child');
console.log(logout);

logout.addEventListener('click', async (e) => {
    e.preventDefault();
    
    window.location.href = '/login';
});

window.addEventListener('load', async (e) => {
    e.preventDefault();




});