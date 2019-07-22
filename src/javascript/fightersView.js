import View from './view';
import FighterView from './fighterView';
import { fighterService } from "./services/fightersService";
import Fighter from './Fighter'

class FightersView extends View {
  constructor(fighters) {
    super();

    this.handleDetailsClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();
  static rootElement = document.getElementById("root");
  modalInfo = document.querySelector(".overlay");
  fighters = [];

  createFighters(fighters) {
      const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleDetailsClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements); // оператор spread, таким образом разбиваем на элементы массив
  }

  async handleFighterClick(event, fighters) {
        const fighterDetails = await this.getFighterDetails(fighters._id, fighters);
        this.showPopUp(fighterDetails);
    };

  async getFighterDetails(id, fighters) {
        let fighterDetails = this.fightersDetailsMap.get(id);
        const fighter = new Fighter(fighters);
        if (!fighterDetails) {
            fighterDetails = await fighterService.getFighterDetails(id);
            this.fightersDetailsMap.set(id, fighterDetails);
        }
        return fighterDetails;
    }
    showPopUp(fighter) {
        this.modalInfo.classList.add("modal-show");
        this.createPopUp(fighter);
    }

    closeModal() {
        this.modalInfo.classList.remove("modal-show");
        this.modalInfo.innerHTML = '';
    }
    createPopUp({ name, health, attack, defense }) {
        let popup = document.createElement('div');
        popup.setAttribute('class', 'modal-info');
        let popupHeader = document.createElement('div');
        popupHeader.setAttribute('class', 'modal-header');
        popup.appendChild(popupHeader);
        let popupHeaderTExt = document.createElement('h1');
        popupHeaderTExt.innerText = name;
        popupHeader.appendChild(popupHeaderTExt);
        let popupBody = document.createElement('div');
        popupBody.setAttribute('class', 'modal-body');
        popup.appendChild(popupBody);
        let arrayData = [health, attack, defense];
        let arrayText = ['HEALTH', 'ATTACK', 'DEFENSE'];
        for(let i = 0; i < arrayData.length; i++){
            let bodyItem = document.createElement('div');
            bodyItem.setAttribute('id', [arrayData[i], 'info'].join('-'));
            bodyItem.innerText = [arrayText[i], arrayData[i]].join(': ');
            popupBody.appendChild(bodyItem);
        }
        let closeButton = document.createElement('a');
        closeButton.setAttribute('class', 'close');
        closeButton.setAttribute('href', '#');
        closeButton.innerHTML = `&times;`;
        popup.appendChild(closeButton);
        closeButton.addEventListener("click", () => this.closeModal());
        this.modalInfo.appendChild(popup)
    }

}

export default FightersView;