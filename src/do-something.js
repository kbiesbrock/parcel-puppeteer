class MyWebComponent extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #heading;
    #submitButton;

    constructor() {
        super();
        this.#shadow.innerHTML = `
            <style>
                :host{ display: flex; flex-direction: column; height: 100%; margin: 0; padding: 0;  }
                h1, button{ text-align: center; }
                button{ flex: 1; margin: 1em; }
            </style>
            <h1 id="heading">Hello, X!</h1>
            <button id="submitButton">Click me!</button>
        `;
        this.#heading = this.#shadow.querySelector('#heading');
        this.#submitButton = this.#shadow.querySelector('#submitButton');
    }

    connectedCallback() {
        this.#submitButton.addEventListener('click', () => this.#doSomething());
    }

    #doSomething() {
        this.#heading.textContent = 'Hello, World!';
    }
}

customElements.define('my-web-component', MyWebComponent)
