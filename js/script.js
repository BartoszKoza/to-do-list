{
    let tasks = [];

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

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {

            removeButton.addEventListener("click", () => {
                removeTask(index);
            });

        });


        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {

            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });

        });
    };

    const render = () => {
        let htmlString = "";

        for(const task of tasks) {
            htmlString += `
            <li class="listItem">

            <button class="js-done taskButton--done"> ${task.done ? "✔" : ""} </button>
            <span class="taskContent" ${task.done ? "style=\"text-decoration: line-through\"":""}>${task.content}</span>
            <button class="js-remove taskButton--remove">🗑</button></section> 
            
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
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