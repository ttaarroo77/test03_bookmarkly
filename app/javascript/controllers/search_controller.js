import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "results"]

  search() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.formTarget.requestSubmit()
    }, 300)
  }

  async submit(event) {
    event.preventDefault()
    const url = this.formTarget.action + '?' + new URLSearchParams(new FormData(this.formTarget))
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/html',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    this.resultsTarget.innerHTML = await response.text()
  }
} 