export default function renderVirtualKeyboard() {
  const container = document.createElement('div');
  const input = document.querySelector('.search-input');
  const keyboard = document.createElement('div');

  let modifierLanguage;
  if (localStorage.getItem('lang') === undefined) {
    modifierLanguage = 'en';
  } else {
    modifierLanguage = localStorage.getItem('lang');
  }

  let modifierCapsLock = false;
  let currentPosition = 0;
  let previousButton;

  container.style.margin = '50px 240px';

  const keysEng = [
    { firstValue: '`', secondValue: '~' },
    { firstValue: '1', secondValue: '!' },
    { firstValue: '2', secondValue: '@' },
    { firstValue: '3', secondValue: '#' },
    { firstValue: '4', secondValue: '$' },
    { firstValue: '5', secondValue: '%' },
    { firstValue: '6', secondValue: '^' },
    { firstValue: '7', secondValue: '&' },
    { firstValue: '8', secondValue: '*' },
    { firstValue: '9', secondValue: '(' },
    { firstValue: '0', secondValue: ')' },
    { firstValue: '-', secondValue: '_' },
    { firstValue: '=', secondValue: '+' },
    { firstValue: 'q', secondValue: 'Q' },
    { firstValue: 'w', secondValue: 'W' },
    { firstValue: 'e', secondValue: 'E' },
    { firstValue: 'r', secondValue: 'R' },
    { firstValue: 't', secondValue: 'T' },
    { firstValue: 'y', secondValue: 'Y' },
    { firstValue: 'u', secondValue: 'U' },
    { firstValue: 'i', secondValue: 'I' },
    { firstValue: 'o', secondValue: 'O' },
    { firstValue: 'p', secondValue: 'P' },
    { firstValue: '[', secondValue: '{' },
    { firstValue: ']', secondValue: '}' },
    { firstValue: '\\', secondValue: '|' },
    { firstValue: 'a', secondValue: 'A' },
    { firstValue: 's', secondValue: 'S' },
    { firstValue: 'd', secondValue: 'D' },
    { firstValue: 'f', secondValue: 'F' },
    { firstValue: 'g', secondValue: 'G' },
    { firstValue: 'h', secondValue: 'H' },
    { firstValue: 'j', secondValue: 'J' },
    { firstValue: 'k', secondValue: 'K' },
    { firstValue: 'l', secondValue: 'L' },
    { firstValue: ';', secondValue: ':' },
    { firstValue: "'", secondValue: '"' },
    { firstValue: 'z', secondValue: 'Z' },
    { firstValue: 'x', secondValue: 'X' },
    { firstValue: 'c', secondValue: 'C' },
    { firstValue: 'v', secondValue: 'V' },
    { firstValue: 'b', secondValue: 'B' },
    { firstValue: 'n', secondValue: 'N' },
    { firstValue: 'm', secondValue: 'M' },
    { firstValue: ',', secondValue: '<' },
    { firstValue: '.', secondValue: '>' },
    { firstValue: '/', secondValue: '?' },
  ];

  const keysRus = [
    { firstValue: 'ё', secondValue: 'Ё' },
    { firstValue: '1', secondValue: '!' },
    { firstValue: '2', secondValue: '"' },
    { firstValue: '3', secondValue: '№' },
    { firstValue: '4', secondValue: ';' },
    { firstValue: '5', secondValue: '%' },
    { firstValue: '6', secondValue: ':' },
    { firstValue: '7', secondValue: '?' },
    { firstValue: '8', secondValue: '*' },
    { firstValue: '9', secondValue: '(' },
    { firstValue: '0', secondValue: ')' },
    { firstValue: '-', secondValue: '_' },
    { firstValue: '=', secondValue: '+' },
    { firstValue: 'й', secondValue: 'Й' },
    { firstValue: 'ц', secondValue: 'Ц' },
    { firstValue: 'у', secondValue: 'У' },
    { firstValue: 'к', secondValue: 'К' },
    { firstValue: 'е', secondValue: 'Е' },
    { firstValue: 'н', secondValue: 'Н' },
    { firstValue: 'г', secondValue: 'Г' },
    { firstValue: 'ш', secondValue: 'Ш' },
    { firstValue: 'щ', secondValue: 'Щ' },
    { firstValue: 'з', secondValue: 'З' },
    { firstValue: 'х', secondValue: 'Х' },
    { firstValue: 'ъ', secondValue: 'Ъ' },
    { firstValue: '\\', secondValue: '/' },
    { firstValue: 'ф', secondValue: 'Ф' },
    { firstValue: 'ы', secondValue: 'Ы' },
    { firstValue: 'в', secondValue: 'В' },
    { firstValue: 'а', secondValue: 'А' },
    { firstValue: 'п', secondValue: 'П' },
    { firstValue: 'р', secondValue: 'Р' },
    { firstValue: 'о', secondValue: 'О' },
    { firstValue: 'л', secondValue: 'Л' },
    { firstValue: 'д', secondValue: 'Д' },
    { firstValue: 'ж', secondValue: 'Ж' },
    { firstValue: 'э', secondValue: 'Э' },
    { firstValue: 'я', secondValue: 'Я' },
    { firstValue: 'ч', secondValue: 'Ч' },
    { firstValue: 'с', secondValue: 'С' },
    { firstValue: 'м', secondValue: 'М' },
    { firstValue: 'и', secondValue: 'И' },
    { firstValue: 'т', secondValue: 'Т' },
    { firstValue: 'ь', secondValue: 'Ь' },
    { firstValue: 'б', secondValue: 'Б' },
    { firstValue: 'ю', secondValue: 'Ю' },
    { firstValue: '.', secondValue: ',' },
  ];

  const keysDefault = [
    { firstValue: 'Backspace' },
    { firstValue: 'Tab' },
    { firstValue: 'Delete' },
    { firstValue: 'CapsLock' },
    { firstValue: 'Enter' },
    { firstValue: 'ShiftLeft' },
    { firstValue: 'ArrowUp' },
    { firstValue: 'ShiftRight' },
    { firstValue: 'ControlLeft' },
    { firstValue: 'En/Ru' },
    { firstValue: 'AltLeft' },
    { firstValue: 'Space' },
    { firstValue: 'AltRight' },
    { firstValue: 'ArrowLeft' },
    { firstValue: 'ArrowDown' },
    { firstValue: 'ArrowRight' },
    { firstValue: 'ControlRight' },
  ];

  const keyboardButtons = [];

  class Button {
    constructor(key) {
      this.elementButton = document.createElement('button');
      this.elementButton.classList.add('button');
      this.elementButton.textContent = key.firstValue;

      keysEng.forEach((keyEng) => {
        if (keyEng === key) {
          switch (key.firstValue) {
            case '`':
              this.keyCode = 'Backquote';
              break;
            case '-':
              this.keyCode = 'Minus';
              break;
            case '=':
              this.keyCode = 'Equal';
              break;
            case '[':
              this.keyCode = 'BracketLeft';
              break;
            case ']':
              this.keyCode = 'BracketRight';
              break;
            case '\\':
              this.keyCode = 'Backslash';
              break;
            case ';':
              this.keyCode = 'Semicolon';
              break;
            case "'":
              this.keyCode = 'Quote';
              break;
            case ',':
              this.keyCode = 'Comma';
              break;
            case '.':
              this.keyCode = 'Period';
              break;
            case '/':
              this.keyCode = 'Slash';
              break;
            default:
              break;
          }
          if (keysEng.indexOf(key) < 11 && keysEng.indexOf(key) > 0) {
            this.keyCode = `Digit${key.firstValue}`;
          }
          if (
            (keysEng.indexOf(key) < 23 && keysEng.indexOf(key) > 12)
            || (keysEng.indexOf(key) < 35 && keysEng.indexOf(key) > 25)
            || (keysEng.indexOf(key) < 44 && keysEng.indexOf(key) > 36)
          ) {
            this.keyCode = `Key${key.firstValue.toUpperCase()}`;
          }

          this.firstValue = key.firstValue;
          this.secondValue = key.secondValue;
        }
      });

      keysRus.forEach((keyRus) => {
        if (keyRus === key) {
          switch (key.firstValue) {
            case 'ё':
              this.keyCode = 'Backquote';
              break;
            case '-':
              this.keyCode = 'Minus';
              break;
            case '=':
              this.keyCode = 'Equal';
              break;
            case 'х':
              this.keyCode = 'BracketLeft';
              break;
            case 'ъ':
              this.keyCode = 'BracketRight';
              break;
            case '\\':
              this.keyCode = 'Backslash';
              break;
            case 'ж':
              this.keyCode = 'Semicolon';
              break;
            case 'э':
              this.keyCode = 'Quote';
              break;
            case 'б':
              this.keyCode = 'Comma';
              break;
            case 'ю':
              this.keyCode = 'Period';
              break;
            case '.':
              this.keyCode = 'Slash';
              break;
            default:
              break;
          }
          if (keysRus.indexOf(key) < 11 && keysRus.indexOf(key) > 0) {
            this.keyCode = `Digit${key.firstValue}`;
          }
          if (
            (keysRus.indexOf(key) < 23 && keysRus.indexOf(key) > 12)
            || (keysRus.indexOf(key) < 35 && keysRus.indexOf(key) > 25)
            || (keysRus.indexOf(key) < 44 && keysRus.indexOf(key) > 36)
          ) {
            this.keyCode = `Key${keysEng[
              keysRus.indexOf(key)
            ].firstValue.toUpperCase()}`;
          }

          this.firstValue = key.firstValue;
          this.secondValue = key.secondValue;
        }
      });

      keysDefault.forEach((defaultKey) => {
        if (key === defaultKey) {
          this.keyCode = key.firstValue;
          this.elementButton.textContent = key.firstValue;
          this.elementButton.classList.add(
            `button_${key.firstValue.toLowerCase()}`,
          );
          switch (key.firstValue) {
            case 'Backspace':
              this.elementButton.innerHTML = '&#8592;';
              break;
            case 'ArrowUp':
              this.elementButton.innerHTML = '&#8657;';
              break;
            case 'ArrowLeft':
              this.elementButton.innerHTML = '&#8656;';
              break;
            case 'ArrowRight':
              this.elementButton.innerHTML = '&#8658;';
              break;
            case 'ArrowDown':
              this.elementButton.innerHTML = '&#8659;';
              break;
            case 'ControlLeft':
            case 'ControlRight':
              this.elementButton.innerHTML = 'Ctrl';
              break;
            case 'AltLeft':
            case 'AltRight':
              this.elementButton.innerHTML = 'Alt';
              break;
            case 'ShiftLeft':
            case 'ShiftRight':
              this.elementButton.innerHTML = 'Shift';
              break;
            default:
              break;
          }
        }
      });
    }

    getElement() {
      return this.elementButton;
    }
  }

  const changeCurrentPosition = () => {
    input.focus();
    if (input.selectionStart) {
      currentPosition = input.selectionStart;
    } else {
      currentPosition = 0;
    }
  };

  const addText = (text) => {     
    const oldText = input.value.substring(currentPosition, input.value.length);
    input.value = input.value.substring(0, currentPosition) + text + oldText;
    currentPosition += text.length;
    
    input.focus();
    input.setSelectionRange(currentPosition, currentPosition);
  };

  const removeText = (modifier) => {
    if (modifier === 'backspace' && currentPosition >= 1) {
      const oldText = input.value.substring(currentPosition, input.value.length);
      input.value = input.value.substring(0, currentPosition - 1) + oldText;
      currentPosition -= 1;
    }
    if (modifier === 'Delete') {
      const oldText = input.value.substring(currentPosition + 1, input.value.length);
      input.value = input.value.substring(0, currentPosition) + oldText;
    }

    input.focus();
    input.setSelectionRange(currentPosition, currentPosition);
  };

  function createKeyboard() {
    for (let i = 0; i < keysDefault.length; i += 1) {
      const button = new Button(keysDefault[i]);
      keyboardButtons.push(button);
      keyboard.append(button.getElement());
    }
    for (let i = 0; i < keysEng.length; i += 1) {
      const button = new Button(keysEng[i]);
      keyboardButtons.push(button);
      button.getElement().style.gridArea = `button${i + 1}`;
      keyboard.append(button.getElement());
    }
  }

  function keyboardChangeCase(modifier) {
    if (modifierLanguage === 'ru') {
      keyboardButtons.map((button) => {
        if (
          keyboardButtons.indexOf(button) === 17
          || (keyboardButtons.indexOf(button) < 42
            && keyboardButtons.indexOf(button) > 39)
          || (keyboardButtons.indexOf(button) < 54
            && keyboardButtons.indexOf(button) > 51)
          || (keyboardButtons.indexOf(button) < 63
            && keyboardButtons.indexOf(button) > 60)
        ) {
          const newButton = button;
          if (modifier === 'upperCase') {
            newButton.elementButton.innerText = button.secondValue;
          } else {
            newButton.elementButton.innerText = button.firstValue;
          }
          return JSON.parse(JSON.stringify(newButton));
        } return button;
      });
    }

    keyboardButtons.map((button) => {
      if (
        (keyboardButtons.indexOf(button) < 40
          && keyboardButtons.indexOf(button) > 29)
        || (keyboardButtons.indexOf(button) < 52
          && keyboardButtons.indexOf(button) > 42)
        || (keyboardButtons.indexOf(button) < 61
          && keyboardButtons.indexOf(button) > 53)
      ) {
        const newButton = button;
        if (modifier === 'upperCase') {
          newButton.elementButton.innerText = button.secondValue;
        } else {
          newButton.elementButton.innerText = button.firstValue;
        }
        return JSON.parse(JSON.stringify(newButton));
      } return button;
    });
  }

  const onShiftHandler = (event) => {
    let countActiveShift = 0;
    countActiveShift += document.querySelector('.button_shiftleft').classList.contains('button_active');
    countActiveShift += document.querySelector('.button_shiftright').classList.contains('button_active');

    if ((event.type === 'mousedown' && countActiveShift !== 2) || (event.type === 'keydown' && countActiveShift !== 2)) {
      for (let i = 17; i < keyboardButtons.length; i += 1) {
        keyboardButtons[i].elementButton.innerHTML = keyboardButtons[i].secondValue;
      }
      if (modifierCapsLock) {
        keyboardChangeCase();
      }
    } else {
      for (let i = 17; i < keyboardButtons.length; i += 1) {
        keyboardButtons[i].elementButton.innerHTML = keyboardButtons[i].firstValue;
      }
      if (modifierCapsLock) {
        keyboardChangeCase('upperCase');
      }
      document.querySelector('.button_shiftleft').classList.remove('button_active');
      document.querySelector('.button_shiftright').classList.remove('button_active');
    }
  };

  const capsLockHandler = () => {
    if (
      document
        .querySelector('.button_capslock')
        .classList.contains('button_active')
    ) {
      modifierCapsLock = true;
      keyboardChangeCase('upperCase');
    } else {
      modifierCapsLock = false;
      keyboardChangeCase('lowerCase');
    }
  };

  function updateKeyboard(modifier) {
    let tempArrayButtons;
    if (modifier === 'ru') {
      tempArrayButtons = JSON.parse(JSON.stringify(keysRus));
    } else {
      tempArrayButtons = JSON.parse(JSON.stringify(keysEng));
    }
    keyboardButtons.map((button) => {
      const newButton = button;
      if (keyboardButtons.indexOf(button) > 16) {
        const tempButton = tempArrayButtons.shift();
        newButton.firstValue = tempButton.firstValue;
        newButton.secondValue = tempButton.secondValue;
        newButton.elementButton.innerText = tempButton.firstValue;
        if (modifierCapsLock === true) {
          capsLockHandler();
        }
        return newButton;
      }
      return button;
    });
  }

  const changeLanguage = () => {
    if (modifierLanguage === 'en') {
      modifierLanguage = 'ru';
      updateKeyboard('ru');
      localStorage.setItem('lang', modifierLanguage);
    } else {
      modifierLanguage = 'en';
      updateKeyboard('en');
      localStorage.setItem('lang', modifierLanguage);
    }
  };

  function virtualKeyboardMouseDownHandler(event) {
    event.preventDefault();

    if (event.target.classList.contains('button')) {
      event.target.classList.toggle('button_active');
      previousButton = event.target;

      if (modifierLanguage === 'en') {
        keysEng.forEach((key) => {
          if (
            (key.firstValue === event.target.innerText.toLowerCase())
            || (key.secondValue === event.target.innerText.toLowerCase())
          ) {
            addText(event.target.innerText);
          }
        });
      } else {
        keysRus.forEach((key) => {
          if (
            (key.firstValue === event.target.innerText.toLowerCase())
            || (key.secondValue === event.target.innerText.toLowerCase())
          ) {
            addText(event.target.innerHTML);
          }
        });
      }

      switch (event.target.innerHTML) {
        case 'Space':
          addText(' ');
          break;
        case '←':
          removeText('backspace');
          break;
        case 'Tab':
          addText('   ');
          break;
        case '⇑':
          addText('▲');
          break;
        case '⇒':
          addText('►');
          break;
        case '⇓':
          addText('▼');
          break;
        case '⇐':
          addText('◄');
          break;
        case 'Enter':
          document.querySelector('.button_search').click();        
          break;
        case 'Delete':
          removeText('Delete');
          break;
          case 'En/Ru':
          changeLanguage();
          break;
        default:
          break;
      }
      if (event.target.innerHTML === 'Shift') {
        onShiftHandler(event);
      }
    }
  }

  const virtualKeyboardMouseUpHandler = (event) => {
    if (event.target.innerHTML === 'CapsLock') {
      capsLockHandler();
      return;
    }
    if (event.target.innerHTML === 'Shift' || previousButton.innerHTML === 'Shift') {
      onShiftHandler(event);
    }
    previousButton.classList.remove('button_active');
  };

  createKeyboard();
  keyboard.classList.add('keyboard');

  keyboard.addEventListener('mousedown', virtualKeyboardMouseDownHandler);
  keyboard.addEventListener('mouseup', virtualKeyboardMouseUpHandler);
  keyboard.addEventListener('mouseleave', () => {
    Array.from(document.querySelectorAll('.button')).forEach(button => {
      button.classList.remove('button_active');
    });
  });

  container.append(keyboard);
  document.body.append(container);

 

  if (modifierLanguage === 'ru') {
    modifierLanguage = 'en';
    changeLanguage();
  }

  input.addEventListener('mouseup', changeCurrentPosition);
}
