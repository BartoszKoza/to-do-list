{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
       tasks = [
        ...tasks,
        {content: newTaskContent}
       ];
        
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
      tasks = [
        ...tasks.slice(0, taskIndex),
        {...tasks[taskIndex], done: !tasks[taskIndex].done},
        ...tasks.slice(taskIndex + 1)
      ];
      render();  
    };

    const hideShowDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const allDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks,
            done: true,
        }));
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {

            removeButton.addEventListener("click", () => {
                removeTask(index);
            });

        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
             toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
                });
    
            });
    };
    

    const renderTasks = () => {
        let htmlString = "";

        for(const task of tasks) {
            htmlString += `
            <li class= ${task.done && hideDoneTasks? "listItemHidden" : "listItem"}>
                <button class="js-done taskButton--done"> ${task.done ? "✔" : ""} </button>
                <span class="taskContent ${task.done ? "listItemDone" : ""}">${task.content}</span>
                <button class="js-remove taskButton--remove">🗑</button></section> 
            
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

    
    };
    
    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-newButtons");
        if (tasks.length > 0){
            buttonsElement.innerHTML = `
            <button class="list_newButtons js-toggleDoneTask">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
             </button>

             <button class="list_newButtons js-markAllDone"
             ${tasks.every(({done})=>done)? "disabled" : ""}>
             Ukończ wszystkie
             </button>
            `;
            
        } else {
            buttonsElement.innerHTML = ``;
        }
    };

    const bindButtonEvents = () => {
        const toggleDoneTasks = document.querySelector(".js-toggleDoneTask");
        if (toggleDoneTasks) {
            toggleDoneTasks.addEventListener("click", hideShowDoneTasks);
        }

        const markAllDone = document.querySelector(".js-markAllDone");
        if(markAllDone){
            markAllDone.addEventListener("click", allDone);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonEvents();
        
    };
    

    const onFormSubmit = (event) => {
        event.preventDefault();

        
        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();

        if(newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskInput.value = "";
        }

       
       newTaskInput.focus();

       
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        
    };

    init();
}