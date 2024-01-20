import { m as me, p as pe, x as xe, I as Ie, y as ye$1 } from './tabs-YeRvdbO8.mjs';
import { i as i$4, o as o$3, E as E$3, u as u$6, t as t$3, d as i$1, A as A$1, N as N$1, e as E$1, w as w$1, f as w$3, h, g as A$3, j as t$5, s as s$3, n, k as f$1, l as s$2, m as l$1, q as N$3, P, r as N$4, v, x as useFormGroup, y as usePopper, z as o$2, p as parseApiURL, B as d$1, T as T$2, b as _sfc_main$1$1, c as __nuxt_component_1$1, _ as _sfc_main$4$1, a as __nuxt_component_1$1$1 } from './api-omXKkMTj.mjs';
import { m as mergeConfig, f as appConfig, g as useUI, _ as _export_sfc, e as arrow, b as useToast, d as __nuxt_component_1$2 } from '../server.mjs';
import { _ as __nuxt_component_0 } from './SelectMenu-eaR332gX.mjs';
import { defineComponent, ref, computed, provide, watchEffect, h as h$1, Fragment, onMounted, onUnmounted, shallowRef, toRef, useSSRContext, watch, inject, mergeProps, withCtx, createVNode, unref, isRef, openBlock, createBlock, renderList, toDisplayString, createCommentVNode, createTextVNode, resolveComponent, renderSlot, Transition } from 'vue';
import { twMerge, twJoin } from 'tailwind-merge';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderAttr, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { n as defu } from '../../nitro/node-server.mjs';
import { _ as __nuxt_component_2 } from './Textarea-6V0x6Apb.mjs';
import 'dayjs';
import '@vueuse/core';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@tanstack/vue-virtual';

const checkbox = {
  wrapper: "relative flex items-start",
  container: "flex items-center h-5",
  base: "h-4 w-4 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent",
  form: "form-checkbox",
  rounded: "rounded",
  color: "text-{color}-500 dark:text-{color}-400",
  background: "bg-white dark:bg-gray-900",
  border: "border border-gray-300 dark:border-gray-700",
  ring: "focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
  inner: "ms-3 flex flex-col",
  label: "text-sm font-medium text-gray-700 dark:text-gray-200",
  required: "text-sm text-red-500 dark:text-red-400",
  help: "text-sm text-gray-500 dark:text-gray-400",
  default: {
    color: "primary"
  }
};
const popover = {
  wrapper: "relative",
  container: "z-50 group",
  trigger: "inline-flex w-full",
  width: "",
  background: "bg-white dark:bg-gray-900",
  shadow: "shadow-lg",
  rounded: "rounded-md",
  ring: "ring-1 ring-gray-200 dark:ring-gray-800",
  base: "overflow-hidden focus:outline-none relative",
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    enterActiveClass: "transition ease-out duration-200",
    enterFromClass: "opacity-0 translate-y-1",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "transition ease-in duration-150",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 translate-y-1"
  },
  overlay: {
    base: "fixed inset-0 transition-opacity z-50",
    background: "bg-gray-200/75 dark:bg-gray-800/75",
    transition: {
      enterActiveClass: "ease-out duration-200",
      enterFromClass: "opacity-0",
      enterToClass: "opacity-100",
      leaveActiveClass: "ease-in duration-150",
      leaveFromClass: "opacity-100",
      leaveToClass: "opacity-0"
    }
  },
  popper: {
    strategy: "fixed"
  },
  arrow
};
var Se = ((p) => (p[p.Open = 0] = "Open", p[p.Closed = 1] = "Closed", p))(Se || {});
let re = Symbol("PopoverContext");
function V(P2) {
  let b = inject(re, null);
  if (b === null) {
    let p = new Error(`<${P2} /> is missing a parent <${ye.name} /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(p, V), p;
  }
  return b;
}
let le = Symbol("PopoverGroupContext");
function ae() {
  return inject(le, null);
}
let ue = Symbol("PopoverPanelContext");
function ge() {
  return inject(ue, null);
}
let ye = defineComponent({ name: "Popover", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" } }, setup(P2, { slots: b, attrs: p, expose: h$2 }) {
  var v2;
  let t$12 = ref(null);
  h$2({ el: t$12, $el: t$12 });
  let e = ref(1), c = ref(null), d2 = ref(null), O = ref(null), f2 = ref(null), y = computed(() => i$4(t$12)), M = computed(() => {
    var Y, Z;
    if (!o$3(c) || !o$3(f2))
      return false;
    for (let B of (void 0).querySelectorAll("body > *"))
      if (Number(B == null ? void 0 : B.contains(o$3(c))) ^ Number(B == null ? void 0 : B.contains(o$3(f2))))
        return true;
    let o$12 = E$3(), a = o$12.indexOf(o$3(c)), g = (a + o$12.length - 1) % o$12.length, E$12 = (a + 1) % o$12.length, N2 = o$12[g], $ = o$12[E$12];
    return !((Y = o$3(f2)) != null && Y.contains(N2)) && !((Z = o$3(f2)) != null && Z.contains($));
  }), l2 = { popoverState: e, buttonId: ref(null), panelId: ref(null), panel: f2, button: c, isPortalled: M, beforePanelSentinel: d2, afterPanelSentinel: O, togglePopover() {
    e.value = u$6(e.value, { [0]: 1, [1]: 0 });
  }, closePopover() {
    e.value !== 1 && (e.value = 1);
  }, close(o$12) {
    l2.closePopover();
    let a = (() => o$12 ? o$12 instanceof HTMLElement ? o$12 : o$12.value instanceof HTMLElement ? o$3(o$12) : o$3(l2.button) : o$3(l2.button))();
    a == null || a.focus();
  } };
  provide(re, l2), t$3(computed(() => u$6(e.value, { [0]: i$1.Open, [1]: i$1.Closed })));
  let m = { buttonId: l2.buttonId, panelId: l2.panelId, close() {
    l2.closePopover();
  } }, S = ae(), I = S == null ? void 0 : S.registerPopover, [s2, u$1] = A$1(), i$2 = N$1({ mainTreeNodeRef: S == null ? void 0 : S.mainTreeNodeRef, portals: s2, defaultContainers: [c, f2] });
  function n2() {
    var o$12, a, g, E2;
    return (E2 = S == null ? void 0 : S.isFocusWithinPopoverGroup()) != null ? E2 : ((o$12 = y.value) == null ? void 0 : o$12.activeElement) && (((a = o$3(c)) == null ? void 0 : a.contains(y.value.activeElement)) || ((g = o$3(f2)) == null ? void 0 : g.contains(y.value.activeElement)));
  }
  return watchEffect(() => I == null ? void 0 : I(m)), E$1((v2 = y.value) == null ? void 0 : v2.defaultView, "focus", (o$12) => {
    var a, g;
    o$12.target !== void 0 && o$12.target instanceof HTMLElement && e.value === 0 && (n2() || c && f2 && (i$2.contains(o$12.target) || (a = o$3(l2.beforePanelSentinel)) != null && a.contains(o$12.target) || (g = o$3(l2.afterPanelSentinel)) != null && g.contains(o$12.target) || l2.closePopover()));
  }, true), w$1(i$2.resolveContainers, (o$12, a) => {
    var g;
    l2.closePopover(), w$3(a, h.Loose) || (o$12.preventDefault(), (g = o$3(c)) == null || g.focus());
  }, computed(() => e.value === 0)), () => {
    let o2 = { open: e.value === 0, close: l2.close };
    return h$1(Fragment, [h$1(u$1, {}, () => A$3({ theirProps: { ...P2, ...p }, ourProps: { ref: t$12 }, slot: o2, slots: b, attrs: p, name: "Popover" })), h$1(i$2.MainTreeNode)]);
  };
} }), Ge = defineComponent({ name: "PopoverButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-popover-button-${t$5()}` } }, inheritAttrs: false, setup(P$1, { attrs: b, slots: p, expose: h2 }) {
  let t2 = V("PopoverButton"), e = computed(() => i$4(t2.button));
  h2({ el: t2.button, $el: t2.button }), onMounted(() => {
    t2.buttonId.value = P$1.id;
  }), onUnmounted(() => {
    t2.buttonId.value = null;
  });
  let c = ae(), d$1$1 = c == null ? void 0 : c.closeOthers, O = ge(), f$1$1 = computed(() => O === null ? false : O.value === t2.panelId.value), y = ref(null), M = `headlessui-focus-sentinel-${t$5()}`;
  f$1$1.value || watchEffect(() => {
    t2.button.value = o$3(y);
  });
  let l2 = s$3(computed(() => ({ as: P$1.as, type: b.type })), y);
  function m(n2) {
    var v2, o$2$1, a, g, E2;
    if (f$1$1.value) {
      if (t2.popoverState.value === 1)
        return;
      switch (n2.key) {
        case o$2.Space:
        case o$2.Enter:
          n2.preventDefault(), (o$2$1 = (v2 = n2.target).click) == null || o$2$1.call(v2), t2.closePopover(), (a = o$3(t2.button)) == null || a.focus();
          break;
      }
    } else
      switch (n2.key) {
        case o$2.Space:
        case o$2.Enter:
          n2.preventDefault(), n2.stopPropagation(), t2.popoverState.value === 1 && (d$1$1 == null || d$1$1(t2.buttonId.value)), t2.togglePopover();
          break;
        case o$2.Escape:
          if (t2.popoverState.value !== 0)
            return d$1$1 == null ? void 0 : d$1$1(t2.buttonId.value);
          if (!o$3(t2.button) || (g = e.value) != null && g.activeElement && !((E2 = o$3(t2.button)) != null && E2.contains(e.value.activeElement)))
            return;
          n2.preventDefault(), n2.stopPropagation(), t2.closePopover();
          break;
      }
  }
  function S(n2) {
    f$1$1.value || n2.key === o$2.Space && n2.preventDefault();
  }
  function I(n2) {
    var v2, o$12;
    P$1.disabled || (f$1$1.value ? (t2.closePopover(), (v2 = o$3(t2.button)) == null || v2.focus()) : (n2.preventDefault(), n2.stopPropagation(), t2.popoverState.value === 1 && (d$1$1 == null || d$1$1(t2.buttonId.value)), t2.togglePopover(), (o$12 = o$3(t2.button)) == null || o$12.focus()));
  }
  function s$2$1(n2) {
    n2.preventDefault(), n2.stopPropagation();
  }
  let u$1 = n();
  function i$12() {
    let n2 = o$3(t2.panel);
    if (!n2)
      return;
    function v2() {
      u$6(u$1.value, { [d$1.Forwards]: () => P(n2, N$4.First), [d$1.Backwards]: () => P(n2, N$4.Last) }) === T$2.Error && P(E$3().filter((a) => a.dataset.headlessuiFocusGuard !== "true"), u$6(u$1.value, { [d$1.Forwards]: N$4.Next, [d$1.Backwards]: N$4.Previous }), { relativeTo: o$3(t2.button) });
    }
    v2();
  }
  return () => {
    let n2 = t2.popoverState.value === 0, v2 = { open: n2 }, { id: o$12, ...a } = P$1, g = f$1$1.value ? { ref: y, type: l2.value, onKeydown: m, onClick: I } : { ref: y, id: o$12, type: l2.value, "aria-expanded": t2.popoverState.value === 0, "aria-controls": o$3(t2.panel) ? t2.panelId.value : void 0, disabled: P$1.disabled ? true : void 0, onKeydown: m, onKeyup: S, onClick: I, onMousedown: s$2$1 };
    return h$1(Fragment, [A$3({ ourProps: g, theirProps: { ...b, ...a }, slot: v2, attrs: b, slots: p, name: "PopoverButton" }), n2 && !f$1$1.value && t2.isPortalled.value && h$1(f$1, { id: M, features: s$2.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: i$12 })]);
  };
} });
defineComponent({ name: "PopoverOverlay", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(P2, { attrs: b, slots: p }) {
  let h2 = V("PopoverOverlay"), t2 = `headlessui-popover-overlay-${t$5()}`, e = l$1(), c = computed(() => e !== null ? (e.value & i$1.Open) === i$1.Open : h2.popoverState.value === 0);
  function d2() {
    h2.closePopover();
  }
  return () => {
    let O = { open: h2.popoverState.value === 0 };
    return A$3({ ourProps: { id: t2, "aria-hidden": true, onClick: d2 }, theirProps: P2, slot: O, attrs: b, slots: p, features: N$3.RenderStrategy | N$3.Static, visible: c.value, name: "PopoverOverlay" });
  };
} });
let je = defineComponent({ name: "PopoverPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, focus: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-popover-panel-${t$5()}` } }, inheritAttrs: false, setup(P$1, { attrs: b, slots: p, expose: h2 }) {
  let { focus: t2 } = P$1, e = V("PopoverPanel"), c = computed(() => i$4(e.panel)), d$1$1 = `headlessui-focus-sentinel-before-${t$5()}`, O = `headlessui-focus-sentinel-after-${t$5()}`;
  h2({ el: e.panel, $el: e.panel }), onMounted(() => {
    e.panelId.value = P$1.id;
  }), onUnmounted(() => {
    e.panelId.value = null;
  }), provide(ue, e.panelId), watchEffect(() => {
    var u2, i2;
    if (!t2 || e.popoverState.value !== 0 || !e.panel)
      return;
    let s2 = (u2 = c.value) == null ? void 0 : u2.activeElement;
    (i2 = o$3(e.panel)) != null && i2.contains(s2) || P(o$3(e.panel), N$4.First);
  });
  let f$1$1 = l$1(), y = computed(() => f$1$1 !== null ? (f$1$1.value & i$1.Open) === i$1.Open : e.popoverState.value === 0);
  function M(s2) {
    var u2, i2;
    switch (s2.key) {
      case o$2.Escape:
        if (e.popoverState.value !== 0 || !o$3(e.panel) || c.value && !((u2 = o$3(e.panel)) != null && u2.contains(c.value.activeElement)))
          return;
        s2.preventDefault(), s2.stopPropagation(), e.closePopover(), (i2 = o$3(e.button)) == null || i2.focus();
        break;
    }
  }
  function l$1$1(s2) {
    var i2, n2, v2, o$12, a;
    let u2 = s2.relatedTarget;
    u2 && o$3(e.panel) && ((i2 = o$3(e.panel)) != null && i2.contains(u2) || (e.closePopover(), ((v2 = (n2 = o$3(e.beforePanelSentinel)) == null ? void 0 : n2.contains) != null && v2.call(n2, u2) || (a = (o$12 = o$3(e.afterPanelSentinel)) == null ? void 0 : o$12.contains) != null && a.call(o$12, u2)) && u2.focus({ preventScroll: true })));
  }
  let m = n();
  function S() {
    let s2 = o$3(e.panel);
    if (!s2)
      return;
    function u$1() {
      u$6(m.value, { [d$1.Forwards]: () => {
        var n2;
        P(s2, N$4.First) === T$2.Error && ((n2 = o$3(e.afterPanelSentinel)) == null || n2.focus());
      }, [d$1.Backwards]: () => {
        var i2;
        (i2 = o$3(e.button)) == null || i2.focus({ preventScroll: true });
      } });
    }
    u$1();
  }
  function I() {
    let s2 = o$3(e.panel);
    if (!s2)
      return;
    function u$1() {
      u$6(m.value, { [d$1.Forwards]: () => {
        let i2 = o$3(e.button), n2 = o$3(e.panel);
        if (!i2)
          return;
        let v2 = E$3(), o$12 = v2.indexOf(i2), a = v2.slice(0, o$12 + 1), E$12 = [...v2.slice(o$12 + 1), ...a];
        for (let N2 of E$12.slice())
          if (N2.dataset.headlessuiFocusGuard === "true" || n2 != null && n2.contains(N2)) {
            let $ = E$12.indexOf(N2);
            $ !== -1 && E$12.splice($, 1);
          }
        P(E$12, N$4.First, { sorted: false });
      }, [d$1.Backwards]: () => {
        var n2;
        P(s2, N$4.Previous) === T$2.Error && ((n2 = o$3(e.button)) == null || n2.focus());
      } });
    }
    u$1();
  }
  return () => {
    let s2 = { open: e.popoverState.value === 0, close: e.close }, { id: u2, focus: i2, ...n2 } = P$1, v2 = { ref: e.panel, id: u2, onKeydown: M, onFocusout: t2 && e.popoverState.value === 0 ? l$1$1 : void 0, tabIndex: -1 };
    return A$3({ ourProps: v2, theirProps: { ...b, ...n2 }, attrs: b, slot: s2, slots: { ...p, default: (...o2) => {
      var a;
      return [h$1(Fragment, [y.value && e.isPortalled.value && h$1(f$1, { id: d$1$1, ref: e.beforePanelSentinel, features: s$2.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: S }), (a = p.default) == null ? void 0 : a.call(p, ...o2), y.value && e.isPortalled.value && h$1(f$1, { id: O, ref: e.afterPanelSentinel, features: s$2.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: I })])];
    } }, features: N$3.RenderStrategy | N$3.Static, visible: y.value, name: "PopoverPanel" });
  };
} });
defineComponent({ name: "PopoverGroup", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" } }, setup(P2, { attrs: b, slots: p, expose: h2 }) {
  let t2 = ref(null), e = shallowRef([]), c = computed(() => i$4(t2)), d2 = v();
  h2({ el: t2, $el: t2 });
  function O(l2) {
    let m = e.value.indexOf(l2);
    m !== -1 && e.value.splice(m, 1);
  }
  function f2(l2) {
    return e.value.push(l2), () => {
      O(l2);
    };
  }
  function y() {
    var S;
    let l2 = c.value;
    if (!l2)
      return false;
    let m = l2.activeElement;
    return (S = o$3(t2)) != null && S.contains(m) ? true : e.value.some((I) => {
      var s2, u2;
      return ((s2 = l2.getElementById(I.buttonId.value)) == null ? void 0 : s2.contains(m)) || ((u2 = l2.getElementById(I.panelId.value)) == null ? void 0 : u2.contains(m));
    });
  }
  function M(l2) {
    for (let m of e.value)
      m.buttonId.value !== l2 && m.close();
  }
  return provide(le, { registerPopover: f2, unregisterPopover: O, isFocusWithinPopoverGroup: y, closeOthers: M, mainTreeNodeRef: d2.mainTreeNodeRef }), () => h$1(Fragment, [A$3({ ourProps: { ref: t2 }, theirProps: { ...P2, ...b }, slot: {}, attrs: b, slots: p, name: "PopoverGroup" }), h$1(d2.MainTreeNode)]);
} });
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.checkbox, checkbox);
const _sfc_main$7 = defineComponent({
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: () => null
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null
    },
    modelValue: {
      type: [Boolean, Array],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: () => config$1.default.color,
      validator(value) {
        return appConfig.ui.colors.includes(value);
      }
    },
    inputClass: {
      type: String,
      default: ""
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("checkbox", toRef(props, "ui"), config$1, toRef(props, "class"));
    const { emitFormChange, color, name, inputId } = useFormGroup(props);
    const toggle = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const onChange = (event) => {
      emit("change", event);
      emitFormChange();
    };
    const inputClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        ui.value.rounded,
        ui.value.background,
        ui.value.border,
        color.value && ui.value.ring.replaceAll("{color}", color.value),
        color.value && ui.value.color.replaceAll("{color}", color.value)
      ), props.inputClass);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      toggle,
      inputId,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      // eslint-disable-next-line vue/no-dupe-keys
      inputClass,
      onChange
    };
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><div class="${ssrRenderClass(_ctx.ui.container)}"><input${ssrRenderAttrs((_temp0 = mergeProps({
    id: _ctx.inputId,
    checked: Array.isArray(_ctx.toggle) ? ssrLooseContain(_ctx.toggle, _ctx.value) : _ctx.toggle,
    name: _ctx.name,
    required: _ctx.required,
    value: _ctx.value,
    disabled: _ctx.disabled,
    indeterminate: _ctx.indeterminate,
    type: "checkbox",
    class: _ctx.inputClass
  }, _ctx.attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, _ctx.toggle))))}></div>`);
  if (_ctx.label || _ctx.$slots.label) {
    _push(`<div class="${ssrRenderClass(_ctx.ui.inner)}"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass(_ctx.ui.label)}">`);
    ssrRenderSlot(_ctx.$slots, "label", {}, () => {
      _push(`${ssrInterpolate(_ctx.label)}`);
    }, _push, _parent);
    if (_ctx.required) {
      _push(`<span class="${ssrRenderClass(_ctx.ui.required)}">*</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</label>`);
    if (_ctx.help) {
      _push(`<p class="${ssrRenderClass(_ctx.ui.help)}">${ssrInterpolate(_ctx.help)}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt/ui/dist/runtime/components/forms/Checkbox.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Source",
  __ssrInlineRender: true,
  props: {
    mode: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const data = ref(props.data);
    const triggers = ref([]);
    const selectedTriggers = ref([...data.value.Triggers.map((item) => item.id)]);
    const save = async () => {
      try {
        if (props.mode === "edit") {
          const res = await $fetch(parseApiURL(`/feeds/${props.data.id}`), {
            method: "PUT",
            body: JSON.stringify({
              name: data.value.name,
              url: data.value.url,
              config: {
                ...data.value.config
              },
              triggers: selectedTriggers.value
            })
          });
          toast.add({
            title: "Success",
            description: `Source ${data.value.name} saved`,
            color: "green"
          });
        } else {
          const res = await $fetch(parseApiURL(`/feeds/`), {
            method: "POST",
            body: JSON.stringify({
              name: data.value.name,
              url: data.value.url,
              config: {
                ...data.value.config
              },
              triggers: selectedTriggers.value
            })
          });
          toast.add({
            title: "Success",
            description: `Source ${data.value.name} created`,
            color: "green"
          });
        }
        emit("close");
      } catch (error) {
        console.error(error);
        toast.add({
          title: "Error",
          description: `Error: ${error}`,
          color: "red"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$1$1;
      const _component_UInput = __nuxt_component_1$1;
      const _component_USelectMenu = __nuxt_component_0;
      const _component_UCheckbox = __nuxt_component_3;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: true,
        title: props.mode === "edit" ? "Edit Source" : "New Source",
        modalSize: "2xl",
        onClose: () => _ctx.$emit("close")
      }, _attrs), {
        "footer-actions": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="px-4 py-2 bg-blue-400 text-sm rounded"${_scopeId}>Save</button>`);
          } else {
            return [
              createVNode("button", {
                class: "px-4 py-2 bg-blue-400 text-sm rounded",
                onClick: save
              }, "Save")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-4"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(data).name,
              "onUpdate:modelValue": ($event) => unref(data).name = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>RSS URL</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(data).url,
              "onUpdate:modelValue": ($event) => unref(data).url = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Triggers when item getted</label>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(selectedTriggers),
              "onUpdate:modelValue": ($event) => isRef(selectedTriggers) ? selectedTriggers.value = $event : null,
              options: unref(triggers),
              placeholder: "Select triggers",
              "value-attribute": "id",
              "option-attribute": "name",
              multiple: ""
            }, null, _parent2, _scopeId));
            if (unref(selectedTriggers).length > 0) {
              _push2(`<div class="flex flex-col gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(unref(triggers).filter((item) => unref(selectedTriggers).find((s2) => item.id === s2)), (item, i2) => {
                _push2(`<div class="w-full"${_scopeId}><span class="text-sm px-2 py-1 w-full rounded bg-primary-500"${_scopeId}>${ssrInterpolate(item.name)}</span></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="w-full h-0.5 border-b border-gray-500"${_scopeId}></div><div${_scopeId}>Options</div><div class="flex gap-2"${_scopeId}><label class="w-1/4"${_scopeId}>Max Items to Get</label><div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "number",
              modelValue: unref(data).config.maxItemGet,
              "onUpdate:modelValue": ($event) => unref(data).config.maxItemGet = $event,
              min: "1"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-xs italic ml-1 text-yellow-600"${_scopeId}>* only get ${ssrInterpolate(unref(data).config.maxItemGet)} newest item from RSS</div></div></div><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: unref(data).config.forceSameItem,
              "onUpdate:modelValue": ($event) => unref(data).config.forceSameItem = $event,
              label: "Force Same Item (if item already exist force to trigger again)"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", null, "Name"),
                  createVNode(_component_UInput, {
                    modelValue: unref(data).name,
                    "onUpdate:modelValue": ($event) => unref(data).name = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", null, "RSS URL"),
                  createVNode(_component_UInput, {
                    modelValue: unref(data).url,
                    "onUpdate:modelValue": ($event) => unref(data).url = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", null, "Triggers when item getted"),
                  createVNode(_component_USelectMenu, {
                    modelValue: unref(selectedTriggers),
                    "onUpdate:modelValue": ($event) => isRef(selectedTriggers) ? selectedTriggers.value = $event : null,
                    options: unref(triggers),
                    placeholder: "Select triggers",
                    "value-attribute": "id",
                    "option-attribute": "name",
                    multiple: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  unref(selectedTriggers).length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col gap-1"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(triggers).filter((item) => unref(selectedTriggers).find((s2) => item.id === s2)), (item, i2) => {
                      return openBlock(), createBlock("div", {
                        class: "w-full",
                        key: i2
                      }, [
                        createVNode("span", { class: "text-sm px-2 py-1 w-full rounded bg-primary-500" }, toDisplayString(item.name), 1)
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "w-full h-0.5 border-b border-gray-500" }),
                createVNode("div", null, "Options"),
                createVNode("div", { class: "flex gap-2" }, [
                  createVNode("label", { class: "w-1/4" }, "Max Items to Get"),
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode(_component_UInput, {
                      type: "number",
                      modelValue: unref(data).config.maxItemGet,
                      "onUpdate:modelValue": ($event) => unref(data).config.maxItemGet = $event,
                      min: "1"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "text-xs italic ml-1 text-yellow-600" }, "* only get " + toDisplayString(unref(data).config.maxItemGet) + " newest item from RSS", 1)
                  ])
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode(_component_UCheckbox, {
                    modelValue: unref(data).config.forceSameItem,
                    "onUpdate:modelValue": ($event) => unref(data).config.forceSameItem = $event,
                    label: "Force Same Item (if item already exist force to trigger again)"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Feed/Modal/Source.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const datatable = ref(null);
    const editModalMode = ref("edit");
    const editModalData = ref();
    const run = async (item) => {
      const toast2 = useToast();
      const rand = Math.random();
      toast2.add({
        id: `feed-run-${item.id}${rand}`,
        title: `Running feed ${item.name}`,
        description: "Please wait...",
        color: "gray",
        timeout: 0
      });
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      try {
        const res = await fetch(parseApiURL(`/feeds/${item.id}/run`), {
          method: "POST"
        });
        console.log(await res.json());
        toast2.remove(`feed-run-${item.id}${rand}`);
        toast2.add({
          id: `feed-runned-${item.id}-${Math.random()}`,
          title: `Feed ${item.name} runned`,
          color: "green",
          icon: "i-heroicons-check-circle"
        });
      } catch (error) {
        toast2.remove(`feed-run-${item.id}${rand}`);
        toast2.add({
          id: `feed-runned-${item.id}-${Math.random()}`,
          title: `Feed ${item.name} failed to run`,
          color: "red",
          icon: "i-heroicons-x-circle"
        });
      }
    };
    const resetFeed = async (id) => {
      const confirm = (void 0).confirm("Are you sure?");
      try {
        if (!confirm)
          return;
        const res = await $fetch(parseApiURL(`/feeds/${id}/reset`), {
          method: "POST"
        });
        console.log(res);
        toast.add({
          title: "Success",
          description: `Feed ${id} resetted`,
          color: "green"
        });
      } catch (error) {
        console.error(error);
      }
    };
    const deleteFeed = async (id) => {
      var _a;
      const confirm = (void 0).confirm("Are you sure?");
      try {
        if (!confirm)
          return;
        const res = await $fetch(parseApiURL(`/feeds/${id}`), {
          method: "DELETE"
        });
        console.log(res);
        toast.add({
          title: "Success",
          description: `Feed ${id} deleted`,
          color: "green"
        });
      } catch (error) {
        console.error(error);
      }
      (_a = datatable.value) == null ? void 0 : _a.refresh();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = _sfc_main$4$1;
      const _component_UDropdown = __nuxt_component_1$1$1;
      const _component_UButton = __nuxt_component_1$2;
      const _component_PageFeedModalSource = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_DataTable, {
        ref_key: "datatable",
        ref: datatable,
        title: "Sources",
        columns: [
          { key: "name", data: "name", label: "Name" },
          { key: "rss", data: "url", label: "rss" },
          // { key: 'lastUpdateDate', data: 'lastUpdateDate', label: 'Last Updated' },
          // { key: 'lastUpdateItemsCount', data: 'lastUpdateItemsCount', label: 'Last Count' },
          { key: "triggers", label: "Triggers" },
          { key: "action", label: "" }
        ],
        rows: [],
        "api-url": ("parseApiURL" in _ctx ? _ctx.parseApiURL : unref(parseApiURL))("/feeds")
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="px-4 py-2 bg-gray-800 text-sm rounded"${_scopeId}> New </button>`);
          } else {
            return [
              createVNode("button", {
                class: "px-4 py-2 bg-gray-800 text-sm rounded",
                onClick: () => {
                  editModalMode.value = "create";
                  editModalData.value = {
                    id: -1,
                    config: {
                      forceSameItem: false,
                      maxItemGet: 10
                    },
                    name: "your source name",
                    url: "",
                    Triggers: []
                  };
                }
              }, " New ", 8, ["onClick"])
            ];
          }
        }),
        "col-triggers": withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>${[...(data == null ? void 0 : data.Triggers) || []].map((item) => item == null ? void 0 : item.name).join("<br>")}</div>`);
          } else {
            return [
              createVNode("div", {
                innerHTML: [...(data == null ? void 0 : data.Triggers) || []].map((item) => item == null ? void 0 : item.name).join("<br>")
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        "col-action": withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UDropdown, {
              items: [
                [
                  {
                    label: "Edit",
                    icon: "i-heroicons-pencil-square-20-solid",
                    click: () => {
                      editModalMode.value = "edit";
                      editModalData.value = data;
                    }
                  },
                  {
                    label: "Run (Test)",
                    icon: "i-heroicons-play-20-solid",
                    click: () => run(data)
                  }
                ],
                [
                  {
                    label: "Reset Feed Items",
                    icon: "i-heroicons-archive-box-arrow-down-16-solid",
                    click: () => resetFeed(data.id)
                  }
                ],
                [
                  {
                    label: "Delete",
                    icon: "i-heroicons-trash-20-solid",
                    click: () => deleteFeed(data.id)
                  }
                ]
              ]
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-heroicons-ellipsis-horizontal-20-solid"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "gray",
                      variant: "ghost",
                      icon: "i-heroicons-ellipsis-horizontal-20-solid"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UDropdown, {
                items: [
                  [
                    {
                      label: "Edit",
                      icon: "i-heroicons-pencil-square-20-solid",
                      click: () => {
                        editModalMode.value = "edit";
                        editModalData.value = data;
                      }
                    },
                    {
                      label: "Run (Test)",
                      icon: "i-heroicons-play-20-solid",
                      click: () => run(data)
                    }
                  ],
                  [
                    {
                      label: "Reset Feed Items",
                      icon: "i-heroicons-archive-box-arrow-down-16-solid",
                      click: () => resetFeed(data.id)
                    }
                  ],
                  [
                    {
                      label: "Delete",
                      icon: "i-heroicons-trash-20-solid",
                      click: () => deleteFeed(data.id)
                    }
                  ]
                ]
              }, {
                default: withCtx(() => [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-heroicons-ellipsis-horizontal-20-solid"
                  })
                ]),
                _: 2
              }, 1032, ["items"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(editModalData)) {
        _push(ssrRenderComponent(_component_PageFeedModalSource, {
          data: unref(editModalData),
          mode: unref(editModalMode),
          onClose: () => {
            var _a;
            editModalData.value = void 0;
            (_a = unref(datatable)) == null ? void 0 : _a.refresh();
          }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Feed/index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.popover, popover);
const _sfc_main$4 = defineComponent({
  components: {
    HPopover: ye,
    HPopoverButton: Ge,
    HPopoverPanel: je
  },
  inheritAttrs: false,
  props: {
    mode: {
      type: String,
      default: "click",
      validator: (value) => ["click", "hover"].includes(value)
    },
    open: {
      type: Boolean,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    overlay: {
      type: Boolean,
      default: false
    },
    popper: {
      type: Object,
      default: () => ({})
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:open"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("popover", toRef(props, "ui"), config, toRef(props, "class"));
    const popper = computed(() => defu(props.mode === "hover" ? { offsetDistance: 0 } : {}, props.popper, ui.value.popper));
    const [trigger, container] = usePopper(popper.value);
    const popover2 = ref(null);
    const popoverApi = ref(null);
    let openTimeout = null;
    let closeTimeout = null;
    const containerStyle = computed(() => {
      var _a, _b, _c;
      if (props.mode !== "hover") {
        return {};
      }
      const offsetDistance = ((_a = props.popper) == null ? void 0 : _a.offsetDistance) || ((_b = ui.value.popper) == null ? void 0 : _b.offsetDistance) || 8;
      const placement = (_c = popper.value.placement) == null ? void 0 : _c.split("-")[0];
      const padding = `${offsetDistance}px`;
      if (placement === "top" || placement === "bottom") {
        return {
          paddingTop: padding,
          paddingBottom: padding
        };
      } else if (placement === "left" || placement === "right") {
        return {
          paddingLeft: padding,
          paddingRight: padding
        };
      } else {
        return {
          paddingTop: padding,
          paddingBottom: padding,
          paddingLeft: padding,
          paddingRight: padding
        };
      }
    });
    function onMouseOver() {
      if (props.mode !== "hover" || !popoverApi.value) {
        return;
      }
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      if (popoverApi.value.popoverState === 0) {
        return;
      }
      openTimeout = openTimeout || setTimeout(() => {
        popoverApi.value.togglePopover && popoverApi.value.togglePopover();
        openTimeout = null;
      }, props.openDelay);
    }
    function onMouseLeave() {
      if (props.mode !== "hover" || !popoverApi.value) {
        return;
      }
      if (openTimeout) {
        clearTimeout(openTimeout);
        openTimeout = null;
      }
      if (popoverApi.value.popoverState === 1) {
        return;
      }
      closeTimeout = closeTimeout || setTimeout(() => {
        popoverApi.value.closePopover && popoverApi.value.closePopover();
        closeTimeout = null;
      }, props.closeDelay);
    }
    watch(() => props.open, (newValue, oldValue) => {
      if (!popoverApi.value)
        return;
      if (oldValue === void 0 || newValue === oldValue)
        return;
      if (newValue) {
        popoverApi.value.popoverState = 0;
      } else {
        popoverApi.value.closePopover();
      }
    });
    watch(() => {
      var _a;
      return (_a = popoverApi.value) == null ? void 0 : _a.popoverState;
    }, (newValue, oldValue) => {
      if (oldValue === void 0 || newValue === oldValue)
        return;
      emit("update:open", newValue === 0);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      popover: popover2,
      // eslint-disable-next-line vue/no-dupe-keys
      popper,
      trigger,
      container,
      containerStyle,
      onMouseOver,
      onMouseLeave
    };
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HPopover = resolveComponent("HPopover");
  const _component_HPopoverButton = resolveComponent("HPopoverButton");
  const _component_HPopoverPanel = resolveComponent("HPopoverPanel");
  _push(ssrRenderComponent(_component_HPopover, mergeProps({
    ref: "popover",
    class: _ctx.ui.wrapper
  }, _ctx.attrs, { onMouseleave: _ctx.onMouseLeave }, _attrs), {
    default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HPopoverButton, {
          ref: "trigger",
          as: "div",
          disabled: _ctx.disabled,
          class: _ctx.ui.trigger,
          role: "button",
          onMouseover: _ctx.onMouseOver
        }, {
          default: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "default", {
                open,
                close
              }, () => {
                _push3(`<button${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${_scopeId2}> Open </button>`);
              }, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", {
                  open,
                  close
                }, () => [
                  createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
        if (_ctx.overlay) {
          _push2(`<template>`);
          if (open) {
            _push2(`<div class="${ssrRenderClass([_ctx.ui.overlay.base, _ctx.ui.overlay.background])}"${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</template>`);
        } else {
          _push2(`<!---->`);
        }
        if (open) {
          _push2(`<div class="${ssrRenderClass([_ctx.ui.container, _ctx.ui.width])}" style="${ssrRenderStyle(_ctx.containerStyle)}"${_scopeId}><template><div${_scopeId}>`);
          if (_ctx.popper.arrow) {
            _push2(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_HPopoverPanel, {
            class: [_ctx.ui.base, _ctx.ui.background, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.shadow],
            static: ""
          }, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "panel", {
                  open,
                  close
                }, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "panel", {
                    open,
                    close
                  })
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div></template></div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(_component_HPopoverButton, {
            ref: "trigger",
            as: "div",
            disabled: _ctx.disabled,
            class: _ctx.ui.trigger,
            role: "button",
            onMouseover: _ctx.onMouseOver
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                open,
                close
              }, () => [
                createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])
              ])
            ]),
            _: 2
          }, 1032, ["disabled", "class", "onMouseover"]),
          _ctx.overlay ? (openBlock(), createBlock(Transition, mergeProps({
            key: 0,
            appear: ""
          }, _ctx.ui.overlay.transition), {
            default: withCtx(() => [
              open ? (openBlock(), createBlock("div", {
                key: 0,
                class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
              }, null, 2)) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1040)) : createCommentVNode("", true),
          open ? (openBlock(), createBlock("div", {
            key: 1,
            ref: "container",
            class: [_ctx.ui.container, _ctx.ui.width],
            style: _ctx.containerStyle,
            onMouseover: _ctx.onMouseOver
          }, [
            createVNode(Transition, mergeProps({ appear: "" }, _ctx.ui.transition), {
              default: withCtx(() => [
                createVNode("div", null, [
                  _ctx.popper.arrow ? (openBlock(), createBlock("div", {
                    key: 0,
                    "data-popper-arrow": "",
                    class: Object.values(_ctx.ui.arrow)
                  }, null, 2)) : createCommentVNode("", true),
                  createVNode(_component_HPopoverPanel, {
                    class: [_ctx.ui.base, _ctx.ui.background, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.shadow],
                    static: ""
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "panel", {
                        open,
                        close
                      })
                    ]),
                    _: 2
                  }, 1032, ["class"])
                ])
              ]),
              _: 2
            }, 1040)
          ], 46, ["onMouseover"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt/ui/dist/runtime/components/overlays/Popover.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_DataTable = _sfc_main$4$1;
  const _component_UPopover = __nuxt_component_1;
  _push(ssrRenderComponent(_component_DataTable, mergeProps({
    title: "Histories",
    columns: [
      { key: "feed-name", data: "Feed.name", label: "Name" },
      { key: "date", data: "date", label: "Date", type: "date" },
      // { key: 'status', data: 'status', label: 'Status' },
      { key: "rssUrl", data: "rssUrl", label: "rssUrl" },
      { key: "itemsCount", data: "itemsCount", label: "Total Item" },
      { key: "items", label: "Processed Items" },
      { key: "action", label: "" }
    ],
    rows: [],
    "api-url": ("parseApiURL" in _ctx ? _ctx.parseApiURL : unref(parseApiURL))("/feeds/histories")
  }, _attrs), {
    "col-feed-name": withCtx(({ data }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_UPopover, { mode: "hover" }, {
          panel: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="p-2 border border-gray-500 rounded-lg"${_scopeId2}>${ssrInterpolate(data == null ? void 0 : data.status)}</div>`);
            } else {
              return [
                createVNode("div", { class: "p-2 border border-gray-500 rounded-lg" }, toDisplayString(data == null ? void 0 : data.status), 1)
              ];
            }
          }),
          default: withCtx((_, _push3, _parent3, _scopeId2) => {
            var _a, _b;
            if (_push3) {
              _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
              if ((data == null ? void 0 : data.status) == "success") {
                _push3(`<div class="h-2 w-2 inline-block rounded-full bg-green-500"${_scopeId2}></div>`);
              } else if ((data == null ? void 0 : data.status) == "pending") {
                _push3(`<div class="h-2 w-2 inline-block rounded-full bg-yellow-500"${_scopeId2}></div>`);
              } else if ((data == null ? void 0 : data.status) == "failed") {
                _push3(`<div class="h-2 w-2 inline-block rounded-full bg-red-500"${_scopeId2}></div>`);
              } else {
                _push3(`<!---->`);
              }
              _push3(` ${ssrInterpolate((_a = data == null ? void 0 : data.Feed) == null ? void 0 : _a.name)}</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  (data == null ? void 0 : data.status) == "success" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "h-2 w-2 inline-block rounded-full bg-green-500"
                  })) : (data == null ? void 0 : data.status) == "pending" ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "h-2 w-2 inline-block rounded-full bg-yellow-500"
                  })) : (data == null ? void 0 : data.status) == "failed" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "h-2 w-2 inline-block rounded-full bg-red-500"
                  })) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString((_b = data == null ? void 0 : data.Feed) == null ? void 0 : _b.name), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_UPopover, { mode: "hover" }, {
            panel: withCtx(() => [
              createVNode("div", { class: "p-2 border border-gray-500 rounded-lg" }, toDisplayString(data == null ? void 0 : data.status), 1)
            ]),
            default: withCtx(() => {
              var _a;
              return [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  (data == null ? void 0 : data.status) == "success" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "h-2 w-2 inline-block rounded-full bg-green-500"
                  })) : (data == null ? void 0 : data.status) == "pending" ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "h-2 w-2 inline-block rounded-full bg-yellow-500"
                  })) : (data == null ? void 0 : data.status) == "failed" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "h-2 w-2 inline-block rounded-full bg-red-500"
                  })) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString((_a = data == null ? void 0 : data.Feed) == null ? void 0 : _a.name), 1)
                ])
              ];
            }),
            _: 2
          }, 1024)
        ];
      }
    }),
    "col-items": withCtx(({ data }, _push2, _parent2, _scopeId) => {
      var _a, _b, _c, _d;
      if (_push2) {
        _push2(`<div${_scopeId}>${ssrInterpolate(data == null ? void 0 : data.itemsProcessed)}/${ssrInterpolate((_b = (_a = data == null ? void 0 : data.Feed) == null ? void 0 : _a.config) == null ? void 0 : _b.maxItemGet)}</div>`);
      } else {
        return [
          createVNode("div", null, toDisplayString(data == null ? void 0 : data.itemsProcessed) + "/" + toDisplayString((_d = (_c = data == null ? void 0 : data.Feed) == null ? void 0 : _c.config) == null ? void 0 : _d.maxItemGet), 1)
        ];
      }
    }),
    "col-action": withCtx(({ data }, _push2, _parent2, _scopeId) => {
      if (_push2)
        ;
      else {
        return [];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Feed/History.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ViewFeedItem",
  __ssrInlineRender: true,
  props: {
    feedItem: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$1$1;
      const _component_UInput = __nuxt_component_1$1;
      const _component_UTextarea = __nuxt_component_2;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: true,
        title: "View Feed Item Data",
        modalSize: "2xl",
        onClose: () => {
          emit("close");
        }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-4"${_scopeId}><div${_scopeId}><label class="block"${_scopeId}>Title</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.title || "-",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block"${_scopeId}>URL</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.url || "-",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block"${_scopeId}>Byline</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.byline || "-",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-4"${_scopeId}><div class="flex-1"${_scopeId}><label class="block"${_scopeId}>Byline</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.lang || "-",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1"${_scopeId}><label class="block"${_scopeId}>Dir</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.dir || "-",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}><label class="block"${_scopeId}>Content Length</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.contentLength || "-",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block"${_scopeId}>Site Name</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.siteName || "-",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block"${_scopeId}>Excerpt</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.excerpt || "-",
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block"${_scopeId}>Text Content</label>`);
            _push2(ssrRenderComponent(_component_UTextarea, {
              type: "text",
              class: "w-full",
              value: __props.feedItem.textContent || "-",
              readonly: "",
              rows: 25
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block"${_scopeId}>RSS Item</label>`);
            _push2(ssrRenderComponent(_component_UTextarea, {
              type: "text",
              class: "w-full",
              value: JSON.stringify(__props.feedItem.rssItem || "{}", null, 2),
              readonly: "",
              rows: 25
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block" }, "Title"),
                  createVNode(_component_UInput, {
                    type: "text",
                    class: "w-full",
                    value: __props.feedItem.title || "-",
                    readonly: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block" }, "URL"),
                  createVNode(_component_UInput, {
                    type: "text",
                    class: "w-full",
                    value: __props.feedItem.url || "-",
                    readonly: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block" }, "Byline"),
                  createVNode(_component_UInput, {
                    type: "text",
                    class: "w-full",
                    value: __props.feedItem.byline || "-",
                    readonly: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", { class: "flex gap-4" }, [
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("label", { class: "block" }, "Byline"),
                    createVNode(_component_UInput, {
                      type: "text",
                      class: "w-full",
                      value: __props.feedItem.lang || "-",
                      readonly: ""
                    }, null, 8, ["value"])
                  ]),
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("label", { class: "block" }, "Dir"),
                    createVNode(_component_UInput, {
                      type: "text",
                      class: "w-full",
                      value: __props.feedItem.dir || "-",
                      readonly: ""
                    }, null, 8, ["value"])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block" }, "Content Length"),
                  createVNode(_component_UInput, {
                    type: "text",
                    class: "w-full",
                    value: __props.feedItem.contentLength || "-",
                    readonly: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block" }, "Site Name"),
                  createVNode(_component_UInput, {
                    type: "text",
                    class: "w-full",
                    value: __props.feedItem.siteName || "-",
                    readonly: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block" }, "Excerpt"),
                  createVNode(_component_UInput, {
                    type: "text",
                    class: "w-full",
                    value: __props.feedItem.excerpt || "-",
                    readonly: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block" }, "Text Content"),
                  createVNode(_component_UTextarea, {
                    type: "text",
                    class: "w-full",
                    value: __props.feedItem.textContent || "-",
                    readonly: "",
                    rows: 25
                  }, null, 8, ["value"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block" }, "RSS Item"),
                  createVNode(_component_UTextarea, {
                    type: "text",
                    class: "w-full",
                    value: JSON.stringify(__props.feedItem.rssItem || "{}", null, 2),
                    readonly: "",
                    rows: 25
                  }, null, 8, ["value"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Feed/Modal/ViewFeedItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Table",
  __ssrInlineRender: true,
  setup(__props) {
    const datatable = ref(null);
    const feedItem = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = _sfc_main$4$1;
      const _component_PageFeedModalViewFeedItem = _sfc_main$2;
      _push(ssrRenderComponent(_component_DataTable, mergeProps({
        ref_key: "datatable",
        ref: datatable,
        title: "Data",
        columns: [
          { key: "FeedHistory.name", data: "FeedHistory.Feed.name", label: "Name" },
          { key: "title", data: "title", label: "Title" },
          { key: "title", data: "rssItem.pubDate", label: "Pub Date" },
          { key: "url", data: "url", label: "URL" },
          { key: "action", label: "" }
        ],
        rows: [],
        "api-url": ("parseApiURL" in _ctx ? _ctx.parseApiURL : unref(parseApiURL))("/feeds/items")
      }, _attrs), {
        "col-items": withCtx(({ data }, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div${_scopeId}>${ssrInterpolate(data == null ? void 0 : data.itemsProcessed)}/${ssrInterpolate((_b = (_a = data == null ? void 0 : data.Feed) == null ? void 0 : _a.config) == null ? void 0 : _b.maxItemGet)}</div>`);
          } else {
            return [
              createVNode("div", null, toDisplayString(data == null ? void 0 : data.itemsProcessed) + "/" + toDisplayString((_d = (_c = data == null ? void 0 : data.Feed) == null ? void 0 : _c.config) == null ? void 0 : _d.maxItemGet), 1)
            ];
          }
        }),
        "col-action": withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="text-sm text-gray-200"${_scopeId}> View </button>`);
          } else {
            return [
              createVNode("button", {
                class: "text-sm text-gray-200",
                onClick: () => {
                  feedItem.value = data;
                }
              }, " View ", 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(feedItem)) {
              _push2(ssrRenderComponent(_component_PageFeedModalViewFeedItem, {
                feedItem: unref(feedItem),
                onClose: () => {
                  var _a;
                  feedItem.value = void 0;
                  (_a = unref(datatable)) == null ? void 0 : _a.refresh();
                }
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(feedItem) ? (openBlock(), createBlock(_component_PageFeedModalViewFeedItem, {
                key: 0,
                feedItem: unref(feedItem),
                onClose: () => {
                  var _a;
                  feedItem.value = void 0;
                  (_a = unref(datatable)) == null ? void 0 : _a.refresh();
                }
              }, null, 8, ["feedItem", "onClose"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Feed/Table.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_HeadlessTabGroup = me;
  const _component_HeadlessTabList = pe;
  const _component_HeadlessTab = xe;
  const _component_HeadlessTabPanels = Ie;
  const _component_HeadlessTabPanel = ye$1;
  const _component_PageFeed = _sfc_main$5;
  const _component_PageFeedHistory = __nuxt_component_6;
  const _component_PageFeedTable = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_HeadlessTabGroup, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HeadlessTabList, { class: "flex rounded overflow-hidden w-auto" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_HeadlessTab, { as: "template" }, {
                default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<button class="${ssrRenderClass({ "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true })}"${_scopeId3}> Feed Sources </button>`);
                  } else {
                    return [
                      createVNode("button", {
                        class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                      }, " Feed Sources ", 2)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_HeadlessTab, { as: "template" }, {
                default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<button class="${ssrRenderClass({ "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true })}"${_scopeId3}> Feeds History </button>`);
                  } else {
                    return [
                      createVNode("button", {
                        class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                      }, " Feeds History ", 2)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_HeadlessTab, { as: "template" }, {
                default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<button class="${ssrRenderClass({ "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true })}"${_scopeId3}> Feeds Data </button>`);
                  } else {
                    return [
                      createVNode("button", {
                        class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                      }, " Feeds Data ", 2)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_HeadlessTab, { as: "template" }, {
                  default: withCtx(({ selected }) => [
                    createVNode("button", {
                      class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                    }, " Feed Sources ", 2)
                  ]),
                  _: 1
                }),
                createVNode(_component_HeadlessTab, { as: "template" }, {
                  default: withCtx(({ selected }) => [
                    createVNode("button", {
                      class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                    }, " Feeds History ", 2)
                  ]),
                  _: 1
                }),
                createVNode(_component_HeadlessTab, { as: "template" }, {
                  default: withCtx(({ selected }) => [
                    createVNode("button", {
                      class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                    }, " Feeds Data ", 2)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_HeadlessTabPanels, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_HeadlessTabPanel, { class: "mt-6" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_PageFeed, null, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PageFeed)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_HeadlessTabPanel, { class: "mt-6" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_PageFeedHistory, null, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PageFeedHistory)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_HeadlessTabPanel, { class: "mt-6" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_PageFeedTable, null, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PageFeedTable)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                  default: withCtx(() => [
                    createVNode(_component_PageFeed)
                  ]),
                  _: 1
                }),
                createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                  default: withCtx(() => [
                    createVNode(_component_PageFeedHistory)
                  ]),
                  _: 1
                }),
                createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                  default: withCtx(() => [
                    createVNode(_component_PageFeedTable)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_HeadlessTabList, { class: "flex rounded overflow-hidden w-auto" }, {
            default: withCtx(() => [
              createVNode(_component_HeadlessTab, { as: "template" }, {
                default: withCtx(({ selected }) => [
                  createVNode("button", {
                    class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                  }, " Feed Sources ", 2)
                ]),
                _: 1
              }),
              createVNode(_component_HeadlessTab, { as: "template" }, {
                default: withCtx(({ selected }) => [
                  createVNode("button", {
                    class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                  }, " Feeds History ", 2)
                ]),
                _: 1
              }),
              createVNode(_component_HeadlessTab, { as: "template" }, {
                default: withCtx(({ selected }) => [
                  createVNode("button", {
                    class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                  }, " Feeds Data ", 2)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_HeadlessTabPanels, null, {
            default: withCtx(() => [
              createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                default: withCtx(() => [
                  createVNode(_component_PageFeed)
                ]),
                _: 1
              }),
              createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                default: withCtx(() => [
                  createVNode(_component_PageFeedHistory)
                ]),
                _: 1
              }),
              createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                default: withCtx(() => [
                  createVNode(_component_PageFeedTable)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/feeds/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-ngKBUUk9.mjs.map
