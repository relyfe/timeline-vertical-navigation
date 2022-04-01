import { Component, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'items-grid',
  styleUrl: 'items-grid.css',
  shadow: true,
})
export class ItemsGrid {
  datesArray: Date[];
  minDate: Date;
  maxDate: Date;
  items = [];
  container: HTMLElement;

  @Prop() dates!: string;

  componentWillLoad() {
    this.parseDates();
  }

  getDatePosition(date: Date) {
    const items = this.container.querySelectorAll('.item');
    let position = 0;
    items.forEach(item => {
      const li = item as HTMLElement;
      if (li.dataset.date === date.toISOString().split('T')[0]) {
        console.log('found', li.offsetTop);
        position = li.offsetTop;
        return;
      }
    });
    return position;
  }

  @Method()
  async scrollToDate(date: Date) {
    const position = this.getDatePosition(date);
    console.log('position', position);
    this.container.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  }
  @Watch('dates')
  parseDates() {
    if (this.dates) {
      this.datesArray = this.dates
        .replace('[', '')
        .replace(']', '')
        .replace(', ', ',')
        .split(',')
        .map(date => {
          const formatedDate = new Date(date);
          if (!this.minDate || formatedDate.getTime() < this.minDate.getTime()) this.minDate = formatedDate;
          if (!this.maxDate || formatedDate.getTime() > this.maxDate.getTime()) this.maxDate = formatedDate;
          return formatedDate;
        })
        .sort((a, b) => (b.getTime() - a.getTime() > 0 ? 1 : -1));
    }
  }

  render() {
    return (
      <ul ref={el => (this.container = el)}>
        {this.datesArray.map(date => (
          <li class="item" data-date={date.toISOString().split('T')[0]}>
            {Intl.DateTimeFormat(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(date)}
          </li>
        ))}
      </ul>
    );
  }
}
