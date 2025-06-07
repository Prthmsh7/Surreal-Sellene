export class Menu {
  private menu: HTMLElement;
  private menuItems: NodeListOf<HTMLElement>;
  private currentItem: number;
  private animating: boolean;

  constructor(el: HTMLElement) {
    this.menu = el;
    this.menuItems = this.menu.querySelectorAll('.menu__item');
    this.currentItem = -1;
    this.animating = false;

    this.init();
  }

  private init() {
    this.menuItems.forEach((item, pos) => {
      const link = item.querySelector('.menu__item-link');
      if (link) {
        link.addEventListener('mouseenter', () => {
          if (this.animating) return;
          this.showItem(pos);
        });
      }
    });

    this.menu.addEventListener('mouseleave', () => {
      if (this.animating) return;
      this.hideItems();
    });
  }

  private showItem(pos: number) {
    if (this.currentItem === pos) return;
    this.animating = true;

    const item = this.menuItems[pos];
    const marquee = item.querySelector('.marquee');
    const marqueeInner = item.querySelector('.marquee__inner');
    const marqueeInnerWrap = item.querySelector('.marquee__inner-wrap');

    if (!marquee || !marqueeInner || !marqueeInnerWrap) return;

    // Reset current item
    if (this.currentItem >= 0) {
      this.menuItems[this.currentItem].classList.remove('menu__item--current');
    }

    // Set new current item
    this.currentItem = pos;
    item.classList.add('menu__item--current');

    // Force reflow
    void marquee.offsetWidth;

    // Start animation immediately
    if (marqueeInner) {
      marqueeInner.style.animation = 'marquee 15s linear infinite';
    }

    // Reset animation flag after a short delay
    setTimeout(() => {
      this.animating = false;
    }, 50);
  }

  private hideItems() {
    this.animating = true;

    this.menuItems.forEach((item) => {
      const marqueeInner = item.querySelector('.marquee__inner');
      if (marqueeInner) {
        marqueeInner.style.animation = 'none';
      }
      item.classList.remove('menu__item--current');
    });

    this.currentItem = -1;

    // Reset animation flag after a short delay
    setTimeout(() => {
      this.animating = false;
    }, 50);
  }
} 