class EateryErrorIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="error-message" id="errorIndicator"></div>
    `;
  }
}

customElements.define('eatery-error-indicator', EateryErrorIndicator);
