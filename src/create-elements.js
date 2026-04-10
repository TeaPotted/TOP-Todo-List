// an array to keep all the lists
let library = [{title: "list1", tasks: [{taskTitle: 'task1', description: 'first task kinda nervous', dueDate: '14:00', priority: 'urgent'}]}];

// create a function that creates a new list object and also pushes it to library
function List(title) {
  const list = {title, tasks: []}; // set the list's title and make it have an empty arra to keep the tasks in
  library.push(list)

  // create a method for adding a task object to the tasks array
  const addTask = (taskTitle, description, dueDate, priority) => {
      const task = {taskTitle, description, dueDate, priority}

      list.tasks.push(task)
    };

  return {addTask}
};

// create a function for creating elements and adding their class and textContent
function createElem(element, cls, text) {
  const elem = document.createElement(element);
  if (cls !== "") elem.classList.add(cls)
  elem.textContent = text;
  return elem
}


function createLabel(inputId, text) {
  const label = document.createElement("label");
  label.htmlFor = inputId;
  label.textContent = text;
  return label
}

function createInput(type, id, name) {
  const input = document.createElement("input");
  input.type = type;
  input.setAttribute("id", id);
  input.setAttribute("name", name);
  return input;
}

// create a function that returns an option element that has it's textContent and value set
function createOption(val) {
  const option = document.createElement("option");
  option.value = val;
  option.textContent = val;
  return option;
};

export {library, List, createElem, createLabel, createInput, createOption}