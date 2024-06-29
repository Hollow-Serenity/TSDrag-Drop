// Component Base Class

export const something = '...';

export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  /**
 * Attaches the component's element to the host element.
 *
 * @param insertAtBeginning - Indicates whether to insert the component's element at the beginning of the host element.
 * If true, the component's element will be inserted after the beginning of the host element.
 * If false, the component's element will be inserted before the end of the host element.
 *
 * @returns {void} - This method does not return any value.
 */
private attach(insertAtBeginning: boolean): void {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
}

  abstract configure(): void;
  abstract renderContent(): void;
}
