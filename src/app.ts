// Define a class for handling project input
class ProjectInput {
    // Declare properties for the template element, host element, and the form element
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    // Constructor for the ProjectInput class
    constructor() {
        // Get the template element from the DOM using its ID
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;

        // Get the host element from the DOM using its ID
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        // Import the content of the template element into a document fragment
        const importNode = document.importNode(this.templateElement.content, true);

        // Get the first child of the imported content as the form element
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'; // Set the ID of the form element
        // Attach the form element to the host element

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
        
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }


    // Private method to attach the form element to the host element
    private attach() {
        // Insert the form element as the first child of the host element
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

// Create an instance of the ProjectInput class
const projectInput = new ProjectInput();

// Define a class for handling project input
