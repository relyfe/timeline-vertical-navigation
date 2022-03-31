import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'timeline-vertical-navigation',
  styleUrl: 'timeline-vertical-navigation.css',
  shadow: true,
})
export class TimelineVerticalNavigation {
  currentDateUnderlineElement!: HTMLElement;
  currentDateElement!: HTMLElement;

  @State() show: boolean = false;

  onTvnInnerMouseMove = e => {
    this.currentDateUnderlineElement.style.transform = this.currentDateElement.style.transform = `translateY(${e.offsetY}px)`;
  };

  render() {
    return (
      <nav
        class="tvn-nav"
        role="slider"
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow="0"
        aria-orientation="vertical"
        aria-valuetext=""
        onMouseEnter={() => {
          this.show = true;
        }}
        onMouseLeave={() => {
          this.show = false;
        }}
      >
        <div class={`tvn-inner ${this.show ? 'show' : ''}`} onMouseMove={e => this.onTvnInnerMouseMove(e)}>
          <div class="tvn-list"></div>
          <div class="tvn-current-date-underline" ref={el => (this.currentDateUnderlineElement = el)}></div>
          <div class="tvn-current-time-line"></div>
          <div class="tvn-current-date" ref={el => (this.currentDateElement = el)}>
            <div class="tvn-current-date-label">mars 2015 </div>
          </div>
        </div>
      </nav>
    );
  }
}
