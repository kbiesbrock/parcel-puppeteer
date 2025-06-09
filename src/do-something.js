class MyWebComponent extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #heading;
    #inputField;
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
            <input id="inputField" type="text" placeholder="Type something here..." />
            <button id="submitButton">Click me!</button>
        `;
        this.#heading = this.#shadow.querySelector('#heading');
        this.#inputField = this.#shadow.querySelector('#inputField');
        this.#submitButton = this.#shadow.querySelector('#submitButton');
    }

    #doSomething() { this.#heading.textContent = 'Hello, World!'; }

    connectedCallback() { this.#submitButton.addEventListener('click', this.doSomethingBound = () => this.#doSomething()); }
    disconnectedCallback() { this.#submitButton.removeEventListener('click', this.doSomethingBound); }

    talkToMe(message) {
        const inputValue = this.#inputField.value;
        this.#heading.textContent = `${inputValue} ${message}`;
    }
}

customElements.define('my-web-component', MyWebComponent)
