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

  @Prop() dates!: string;

  componentWillLoad() {
    this.parseDates();
  }

  @Method()
  async scrollToDate(date: Date) {
    console.log('scrollToDate', date);
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
      <ul>
        {this.datesArray.map(date => (
          <li class="item">
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
