// an array to keep all the lists
let library = localStorage.getItem("library") ? // set it to the "library" item in localStorage
  JSON.parse(localStorage.getItem("library")) : []; // if there is no "library" item in localStorage, set it to an empty array

// create a function that creates a new list object and also pushes it to library
function List(title) {
  // create a method for adding a task object to the tasks array
  const addTask = (taskTitle, description, dueDate, priority) => {
    const task = {taskTitle, description, dueDate, priority}

    list.tasks.push(task)
  };

  const list = {title, tasks: [], id: crypto.randomUUID(), addTask}; // set the list's title and make it have an empty arra to keep the tasks in
  library.push(list)
};

// create a function for creating elements and adding their class and textContent
function createElem(element, cls, text) {
  const elem = document.createElement(element);
  if (cls !== "") elem.classList.add(cls) // if cls is'nt empty add a class
  elem.textContent = text;
  return elem
}


// create a function that creates label elements and also sets it's for attribute and textContent
function createLabel(inputId, text) {
  const label = document.createElement("label");
  label.htmlFor = inputId; // set it's for attribute
  label.textContent = text;
  return label
}

// create a function that creates inputs and also sets it's type, id and name
function createInput(type, id, name) {
  const input = document.createElement("input");
  input.type = type;
  input.setAttribute("id", id);
  input.setAttribute("name", name);
  input.required = true; // sets the input to be required
  return input;
}

// create a function that returns an option element that has it's textContent and value set
function createOption(val) {
  const option = document.createElement("option");
  option.value = val;
  option.textContent = val;
  return option;
};

// create a function that returns a div that holds a label and input
function createInputContainer(labelText, inputID, inputType) {
  const inputContainer = createElem("div", "input-container", "");
  const label = createLabel(inputID, labelText);
  const input = createInput(inputType, inputID, inputID);
  inputContainer.append(label, input);

  return inputContainer
};

// create a function that returns a button with a set class or id and textContent
function createButton(cls, textContent) {
  const btn = document.createElement("button");
  if (cls !== "") btn.classList.add(cls);
  btn.textContent = textContent;
  btn.type = "button";
  return btn;
}

export {library, List, createElem, createLabel, createOption, createInputContainer, createButton}