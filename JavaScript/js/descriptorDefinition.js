/**
 * For displaying descriptions to the player (text about game that replaces itself)
 */
class Descriptor {

  /**
    * @param descriptionArea A dom object in which to place description text
    */
  constructor($descriptionArea) {
    this.descriptionArea = $descriptionArea   // A dom object in which to place text

    /**
    * @param description A string to display to the user
    */
    this.display = description => {
      // Format the description for html
      const htmlDescription = `<div class="description">${description}</div>`

      // Display the description
      this.descriptionArea.children().remove()
      this.descriptionArea.append(htmlDescription)
    }
  }
}