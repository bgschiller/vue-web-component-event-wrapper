import { defineComponent, h } from "vue";
import "./SomeCustomElement";

export const SomeWrapper = defineComponent({
  // I tried adding this emits: { ... } block because I thought it might affect the typings for the element.
  // But it turns out that enumerating the events a component might emit means event listeners are no longer
  // attached to <some-custom-element> (docs at https://vuejs.org/api/options-state.html#emits)
  // And it doesn't seem to fix the type issue anyway
  // emits: {
  //   "some-event": (e: CustomEvent) => true,
  // },
  setup: (_props, { attrs }) => {
    return () => {
      return h("some-custom-element", { ...attrs });
    };
  },
});
