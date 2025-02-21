import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "tagList"]

  connect() {
    this.tags = new Set()
    const initialTags = this.inputTarget.value.split(',').map(tag => tag.trim()).filter(tag => tag)
    initialTags.forEach(tag => this.tags.add(tag))
    this.updateDisplay()
  }

  addTag(event) {
    if (event.key === ',' || event.key === 'Enter') {
      event.preventDefault()
      const tag = event.target.value.replace(/,/g, '').trim()
      if (tag) {
        this.tags.add(tag)
        event.target.value = ''
        this.updateInput()
        this.updateDisplay()
      }
    }
  }

  removeTag(event) {
    const tag = event.target.dataset.tag
    this.tags.delete(tag)
    this.updateInput()
    this.updateDisplay()
  }

  updateInput() {
    this.inputTarget.value = Array.from(this.tags).join(', ')
  }

  updateDisplay() {
    this.tagListTarget.innerHTML = Array.from(this.tags)
      .map(tag => `
        <span class="badge bg-secondary me-1">
          ${tag}
          <button type="button" class="btn-close btn-close-white" 
            data-action="click->tag-input#removeTag" 
            data-tag="${tag}">
          </button>
        </span>
      `).join('')
  }
} 