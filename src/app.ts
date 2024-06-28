// Draggable interface
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

// DragTarget interface
interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

// Project Type
enum ProjectStatus {
  Active,
  Finished
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// State interface
interface State<T> {
  addListener(listenerFn: (items: T[]) => void): void;
  // Other methods
}

// ProjectState class
class ProjectState implements State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (!ProjectState.instance) {
      ProjectState.instance = new ProjectState();
    }
    return ProjectState.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  private listeners: ((items: Project[]) => void)[] = [];

  addListener(listenerFn: (items: Project[]) => void) {
    this.listeners.push(listenerFn);
  }
}

const projectState = ProjectState.getInstance();

// Validatable interface
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// Validation function
function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (validatableInput.minLength != null) {
    isValid = isValid && validatableInput.value.toString().length >= validatableInput.minLength;
  }
  if (validatableInput.maxLength != null) {
    isValid = isValid && validatableInput.value.toString().length <= validatableInput.maxLength;
  }
  if (validatableInput.min != null) {
    isValid = isValid && typeof validatableInput.value === 'number' && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null) {
    if (typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    } else {
      console.error('Invalid value type for max validation');
      isValid = false;
    }
  }
  return isValid;
}

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}
