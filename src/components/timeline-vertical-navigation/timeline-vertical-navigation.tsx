import { Component, h } from '@stencil/core';

@Component({
  tag: 'timeline-vertical-navigation',
  styleUrl: 'timeline-vertical-navigation.css',
  shadow: true,
})
export class TimelineVerticalNavigation {
  render() {
    return (
      <nav class="tvn-nav" role="slider" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0" aria-orientation="vertical" aria-valuetext="">
        <div class="tvn-inner">
          <div class="tvn-list"></div>
          <div class="tvn-current-date-underline"></div>
          <div class="tvn-current-time-line"></div>
          <div class="tvn-current-date">
            <div class="tvn-current-date-label">mars 2015</div>
          </div>
        </div>
      </nav>
    );
  }
}
