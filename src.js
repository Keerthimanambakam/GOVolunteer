const menu=document.getElementById('menu');
const buttn=document.getElementById('buttn');
const lst=document.getElementById('lst');


//alert("Hello! I am an alert box!!");

buttn.addEventListener('click',()=>{
    if(menu.classList.contains('hidden')){
       lst.classList.remove('flex-row');
       alert("Hello! I am an alert box!!");
       lst.classList.add('flex-col');
       alert("Hello! I am an alert box!!");
       menu.classList.remove('hidden');
    }
    else
    {
        lst.classList.add('flex-row');
        lst.classList.remove('flex-col');
        menu.classList.add('hidden');
        alert("Hooo!!");
    }
})