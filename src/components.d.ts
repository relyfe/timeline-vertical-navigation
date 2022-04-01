/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ItemsGrid {
        "dates": string;
        "scrollToDate": (date: Date) => Promise<void>;
        "smoothscroll": boolean;
    }
    interface TimelineVerticalNavigation {
        "darkmode": boolean;
        "dates": string;
        "lineartime": boolean;
        "pinned": boolean;
        "updateSelectedDate": (date: Date) => Promise<void>;
    }
}
declare global {
    interface HTMLItemsGridElement extends Components.ItemsGrid, HTMLStencilElement {
    }
    var HTMLItemsGridElement: {
        prototype: HTMLItemsGridElement;
        new (): HTMLItemsGridElement;
    };
    interface HTMLTimelineVerticalNavigationElement extends Components.TimelineVerticalNavigation, HTMLStencilElement {
    }
    var HTMLTimelineVerticalNavigationElement: {
        prototype: HTMLTimelineVerticalNavigationElement;
        new (): HTMLTimelineVerticalNavigationElement;
    };
    interface HTMLElementTagNameMap {
        "items-grid": HTMLItemsGridElement;
        "timeline-vertical-navigation": HTMLTimelineVerticalNavigationElement;
    }
}
declare namespace LocalJSX {
    interface ItemsGrid {
        "dates": string;
        "onScrolledToDate"?: (event: CustomEvent<Date>) => void;
        "smoothscroll"?: boolean;
    }
    interface TimelineVerticalNavigation {
        "darkmode"?: boolean;
        "dates": string;
        "lineartime"?: boolean;
        "onDateSelected"?: (event: CustomEvent<Date>) => void;
        "pinned"?: boolean;
    }
    interface IntrinsicElements {
        "items-grid": ItemsGrid;
        "timeline-vertical-navigation": TimelineVerticalNavigation;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "items-grid": LocalJSX.ItemsGrid & JSXBase.HTMLAttributes<HTMLItemsGridElement>;
            "timeline-vertical-navigation": LocalJSX.TimelineVerticalNavigation & JSXBase.HTMLAttributes<HTMLTimelineVerticalNavigationElement>;
        }
    }
}
