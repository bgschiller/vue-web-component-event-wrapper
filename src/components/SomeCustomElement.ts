export interface SomeCustomElementEventMap extends HTMLElementEventMap {
  "some-event": CustomEvent;
}

export class SomeCustomElement extends HTMLElement {
  public constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  public connectedCallback(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = "<p>Magic Web Component Right Here</p>";
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent("some-event"));
    }, 1000);
  }

  // delegate to the component's own implementations.
  // these wrapper functions exist to expose the correct type information.
  public addEventListener<K extends keyof SomeCustomElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: SomeCustomElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    super.addEventListener(type, listener as any, options);
  }

  public removeEventListener<K extends keyof SomeCustomElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: SomeCustomElementEventMap[K]) => void,
    options?: boolean | EventListenerOptions | undefined
  ): void {
    super.removeEventListener(type, listener as any, options);
  }
}

customElements.define("some-custom-element", SomeCustomElement);
