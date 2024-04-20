class EateryLoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="loading-indicator" id="loadingIndicator">
        <div class="loader"></div>
      </div>
    `;
  }
}

customElements.define('eatery-loading-indicator', EateryLoadingIndicator);
