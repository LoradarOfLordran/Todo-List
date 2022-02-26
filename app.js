const d = document;
const $formulario = d.querySelector(".todo-form");
const $list = d.querySelector(".todo-list");

const $noNotes = d.querySelector(".no-notes");
let list = [];

d.addEventListener("DOMContentLoaded", e=>{
   if(localStorage.getItem("notes")){
    $noNotes.textContent = "";
       let items = localStorage.getItem("notes");
       list = JSON.parse(items).list;
       JSON.parse(items).list.forEach(el => {
           createNote(el);
       });
   }else{
    $noNotes.textContent = "No hay notas";
   }
});

d.addEventListener("click", e=>{
    if(e.target.matches("button")){     
        $list.removeChild(e.target.parentNode);
        let items = $list.childNodes;
        list = [];
        for(let i=1; i<items.length; i++){
            list.push(items[i].firstChild.textContent);
        }
        const item = {
            list
        }
        localStorage.setItem("notes", JSON.stringify(item));

        if(!$list.querySelector("li")){
            $noNotes.textContent = "No hay notas";
            localStorage.removeItem("notes");
        }
    } 
});

d.addEventListener("submit", e=>{
    e.preventDefault();
    if(e.target === $formulario){
        createList(e.target.todoText.value);
        createNote(e.target.todoText.value);
    }
});

function createNote(note){
    const $note = d.createElement("li"),
    $noteText = d.createElement("p");
    $noteBtn = d.createElement("button");

    $noteText.textContent = note;
    $noteBtn.textContent = "X"; 

    $note.appendChild($noteText);
    $note.appendChild($noteBtn);
    
    $list.append($note);
    $formulario.todoText.value = "";
    $noNotes.textContent = "";
}

function createList(note){
    list.push(note);
    const item = {
        list
    }
    localStorage.setItem("notes", JSON.stringify(item));
}