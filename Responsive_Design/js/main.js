const menu_bar = document.querySelector('.bi-list');

const wrapper = document.querySelector('.wrapper');
const main_sidebar = document.querySelector('.sidebar-panel');
const first_sidebar = document.querySelector('.sidebar-panel-one');
const second_sidebar = document.querySelector('.sidebar-panel-two');
const container = document.querySelector('.container');
const library = document.querySelector('.library');

const menuItems = document.querySelectorAll('div.sidebar ul li a');

let isToggled = false;

menu_bar.addEventListener('click', () => {
    isToggled = !isToggled;

    if (isToggled) {
        wrapper.style.gridTemplateColumns = '7% 1fr';
        main_sidebar.style.border = 0;
        first_sidebar.style.display = 'none';
        second_sidebar.style.display = 'none';
        container.style.gridTemplateColumns = 'repeat(4, 1fr)';
        library.style.display = 'block';

        menuItems.forEach(item => {
            item.style.flexDirection = 'column';
            item.style.alignItems = 'center';
            item.style.fontSize = '0.9rem';
        });
        
    } else {
        wrapper.style.gridTemplateColumns = '';
        main_sidebar.style.border = '';
        first_sidebar.style.display = '';
        second_sidebar.style.display = '';
        container.style.gridTemplateColumns = '';
        library.style.display = 'none';

        menuItems.forEach(item => {
            item.style.flexDirection = '';
            item.style.alignItems = '';
            item.style.fontSize = '';
        });
    }
});