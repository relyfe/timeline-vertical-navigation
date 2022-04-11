# timeline-vertical-navigation

Navigate in time same way as Google Photos.

[<img src="screenshot.png" width="300" alt=""/>](https://timeline-vertical-navigation.herokuapp.com/)

## Properties

| Property             | Attribute          | Description | Type               | Default     |
| -------------------- | ------------------ | ----------- | ------------------ | ----------- |
| `darkmode`           | `darkmode`         |             | `boolean`          | `false`     |
| `dates` _(required)_ | `dates`            |             | `Date[] \| string` | `undefined` |
| `opaquebackground`   | `opaquebackground` |             | `boolean`          | `false`     |
| `pinned`             | `pinned`           |             | `boolean`          | `false`     |

## Events

| Event          | Description | Type                |
| -------------- | ----------- | ------------------- |
| `dateSelected` |             | `CustomEvent<Date>` |

## Methods

`updateSelectedDate(date: Date) => Promise<void>`

#### Returns

Type: `Promise<void>`

## Example with native HTML & JavaScript

```html
<timeline-vertical-navigation
  dates="2020-03-31, 2022-09-12, 2022-04-01, 2022-03-12, 2022-03-13, 2022-03-14, 2022-03-15, 2000-01-01, 2010-12-01, 2013-10-01, 2010-11-21, 1998-07-28, 2000-01-01, 2000-01-11, 2002-03-11, 2002-04-11, 2002-04-12, 2025-01-01"
></timeline-vertical-navigation>
<script>
  const timelineVerticalNavigation = document.querySelector('timeline-vertical-navigation');
  timelineVerticalNavigation.addEventListener('dateSelected', e => {
    const selectedDate = e.detail;
    {yourComponent}.scrollToDate(selectedDate);
  });
</script>
```

[Online demo](https://timeline-vertical-navigation.herokuapp.com/)

_Built with [StencilJS](https://stenciljs.com/)_
