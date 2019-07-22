import View from './view';

class FighterView extends View {
  constructor(fighter, handleDetalisClick) {
    super();

    this.createFighter(fighter, handleDetalisClick);
  }

  createFighter(fighter,  handleDetalisClick) {
    const { name, source } = fighter; // деструктизация
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);

    this.element = this.createElement({ tagName: 'div', className: ['fighter'] });
    this.element.append(imageElement, nameElement);
    //const fighterMain = this.createElement({tagName: "div", classNames: ["fighter-body"]});
    this.element.addEventListener("click", event => handleDetalisClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
}

export default FighterView;