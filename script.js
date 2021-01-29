const addButton = document.querySelector("#add")
const note_container = document.querySelector("#note_container")
const updateLocalStorageData = () => {
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    textAreaData.forEach((notesElement) => {
        return notes.push(notesElement.value)
    })
    // console.log(notes)
    localStorage.setItem("notes", JSON.stringify(notes))
}
const addNewNote = (text = '') => {
    const note = document.createElement('div')
    note.classList.add('note')
    const htmlData = `  <div class="icons">
    <i class="edit fas fa-edit"></i>
    <i class="remove fa fa-trash" aria-hidden="true"></i>
   </div>
   <div class="main ${text ? "" : "hidden"}"></div>

<textarea class=" ${text ? "hidden" : ""}"></textarea>
`;

    note.insertAdjacentHTML("afterbegin", htmlData)


    const edit = note.querySelector(".edit")
    const removeNote = note.querySelector(".remove")
    const textarea = note.querySelector("textarea")
    const main = note.querySelector(".main")
    note_container.appendChild(note);



    //delete note
    removeNote.addEventListener("click", () => {
        note.remove();
        updateLocalStorageData() //update local storage after delete
    })


    // toggle textarea and main 

    textarea.value = text;
    main.innerHTML = text
    edit.addEventListener("click", () => {
        main.classList.toggle("hidden")
        textarea.classList.toggle("hidden")
    })
    textarea.addEventListener("change", (event) => {
        const value = event.target.value;
        main.innerHTML = value;


        updateLocalStorageData();
    })
}


// getting data back 
const notes = JSON.parse(localStorage.getItem('notes'))
if (notes) {
    notes.forEach((note) => addNewNote(note))
}
addButton.addEventListener("click", () => addNewNote())