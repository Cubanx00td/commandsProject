let currentTheme = getTheme();


//initial
document.addEventListener('DOMContentLoaded', () => {
    changeTheme(currentTheme);
  
    //copy
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-copy-target');
            const codeBlock = document.getElementById(targetId);
            const codeText = codeBlock.textContent.trim();

            navigator.clipboard.writeText(codeText).then(() => {
                const defaultMessage = button.querySelector('.default-message');
                const successMessage = button.querySelector('.success-message');

                // Show success message
                defaultMessage.classList.add('hidden');
                successMessage.classList.remove('hidden');

                // Revert back to default message after 2 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    defaultMessage.classList.remove('hidden');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code:', err);
            });
        });
    });


    // Load any saved code from local storage when the page loads
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(codeBlock => {
        const blockId = codeBlock.id;
        const savedCode = localStorage.getItem(blockId);
        if (savedCode) {
            codeBlock.textContent = savedCode;
        }
    });

    //edit
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-edit-target');
            const codeBlock = document.getElementById(targetId);

            const targetButton = button.getAttribute('data-edit-button-target');
            const buttonText = document.getElementById(targetButton);

            if (!codeBlock.isContentEditable) {
                // Enable editing
                codeBlock.contentEditable = 'true';

                // codeBlock.classList.add('border', 'border-blue-500', 'p-2', 'rounded');
                buttonText.textContent = 'Save';
            } else {
                // Save changes permanently to local storage
                codeBlock.contentEditable = 'false';

                // codeBlock.classList.remove('border', 'border-blue-500', 'p-2', 'rounded');
                buttonText.textContent = 'Edit';
                localStorage.setItem(targetId, codeBlock.textContent.trim());
            }
        });
    });
});

function setTheme(theme){
    localStorage.setItem("theme", theme);
}

function getTheme(){
    theme = localStorage.getItem("theme");
    if(theme != null){
        return theme;
    }
    else{
        return "light";
    }
}

function changeTheme(){
    //set to webpage
    changePageTheme(currentTheme, currentTheme);

    //set the listener to change theme button
    const changeThemeButton = document.querySelector('#theme_change_button');

    const oldTheme = currentTheme;
    
    changeThemeButton.addEventListener("click", (event) => {
        let oldTheme = currentTheme;
        console.log("change theme button clicked");
        if(currentTheme === "dark"){
            currentTheme = "light"
        }
        else{
            currentTheme = "dark"
        }

        changePageTheme(currentTheme, oldTheme);
      
    });
}



function changePageTheme(theme, oldTheme){
    //localstorage
    setTheme(currentTheme);

    //remove old theme
    document.querySelector("html").classList.remove(oldTheme);

    //set current theme
    document.querySelector("html").classList.add(theme);

    //Change text of button
    document.querySelector("#theme_change_button").querySelector("span").textContent = currentTheme == "light" ? "Dark" : "Light";
}


