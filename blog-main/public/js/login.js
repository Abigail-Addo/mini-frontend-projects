const btn = document.querySelector('.submit');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    
   let url = '/home?username=isaac';
   console.log(url)
   window.location.href = url;
   

});
