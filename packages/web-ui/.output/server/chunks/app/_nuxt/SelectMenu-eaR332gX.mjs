import { m as mergeConfig, s as select, f as appConfig, A as selectMenu, h as __nuxt_component_0$2, p as __nuxt_component_1$1, g as useUI, i as useInjectButtonGroup, j as get, _ as _export_sfc } from '../server.mjs';
import { defineComponent, computed, ref, watch, provide, h, cloneVNode, reactive, toRaw, onMounted, Fragment, watchEffect, inject, onUnmounted, nextTick, toRef, useSSRContext, resolveComponent, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot, openBlock, createBlock, createCommentVNode, toDisplayString, renderList, createTextVNode, Transition } from 'vue';
import { useDebounceFn, computedAsync } from '@vueuse/core';
import { n as defu } from '../../nitro/node-server.mjs';
import { twMerge, twJoin } from 'tailwind-merge';
import { o as o$3, u as u$6, F as c$1, G as f$1, w as w$1, t as t$3, d as i$1, k as f$1$1, H as E$2, l as s$2, g as A$3, C as T$1, j as t$5, s as s$3, i as i$4, q as N$3, m as l$1, I as i$2, J as u$4, f as w$3, h as h$1, K as p, y as usePopper, x as useFormGroup, O as O$1, z as o$2, L as o$1, M as t$2, Q as n$2 } from './api-omXKkMTj.mjs';
import { ssrRenderVNode, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderSlot, ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { useVirtualizer } from '@tanstack/vue-virtual';

function d(u2, e2, r) {
  let i2 = ref(r == null ? void 0 : r.value), f2 = computed(() => u2.value !== void 0);
  return [computed(() => f2.value ? u2.value : i2.value), function(t2) {
    return f2.value || (i2.value = t2), e2 == null ? void 0 : e2(t2);
  }];
}
function e(i2 = {}, s2 = null, t2 = []) {
  for (let [r, n2] of Object.entries(i2))
    o(t2, f(s2, r), n2);
  return t2;
}
function f(i2, s2) {
  return i2 ? i2 + "[" + s2 + "]" : s2;
}
function o(i2, s2, t2) {
  if (Array.isArray(t2))
    for (let [r, n2] of t2.entries())
      o(i2, f(s2, r.toString()), n2);
  else
    t2 instanceof Date ? i2.push([s2, t2.toISOString()]) : typeof t2 == "boolean" ? i2.push([s2, t2 ? "1" : "0"]) : typeof t2 == "string" ? i2.push([s2, t2]) : typeof t2 == "number" ? i2.push([s2, `${t2}`]) : t2 == null ? i2.push([s2, ""]) : e(t2, s2, i2);
}
function Pe(a, I) {
  return a === I;
}
var we = ((r) => (r[r.Open = 0] = "Open", r[r.Closed = 1] = "Closed", r))(we || {}), Ee = ((r) => (r[r.Single = 0] = "Single", r[r.Multi = 1] = "Multi", r))(Ee || {}), Ve = ((O2) => (O2[O2.Pointer = 0] = "Pointer", O2[O2.Focus = 1] = "Focus", O2[O2.Other = 2] = "Other", O2))(Ve || {});
let ne = Symbol("ComboboxContext");
function N(a) {
  let I = inject(ne, null);
  if (I === null) {
    let r = new Error(`<${a} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, N), r;
  }
  return I;
}
let ie = Symbol("VirtualContext"), ke = defineComponent({ name: "VirtualProvider", setup(a, { slots: I }) {
  let r = N("VirtualProvider"), O2 = computed(() => {
    let u2 = o$3(r.optionsRef);
    if (!u2)
      return { start: 0, end: 0 };
    let d2 = (void 0).getComputedStyle(u2);
    return { start: parseFloat(d2.paddingBlockStart || d2.paddingTop), end: parseFloat(d2.paddingBlockEnd || d2.paddingBottom) };
  }), t2 = useVirtualizer(computed(() => ({ scrollPaddingStart: O2.value.start, scrollPaddingEnd: O2.value.end, count: r.virtual.value.options.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return o$3(r.optionsRef);
  }, overscan: 12 }))), e2 = computed(() => {
    var u2;
    return (u2 = r.virtual.value) == null ? void 0 : u2.options;
  }), R = ref(0);
  return watch([e2], () => {
    R.value += 1;
  }), provide(ie, r.virtual.value ? t2 : null), () => [h("div", { style: { position: "relative", width: "100%", height: `${t2.value.getTotalSize()}px` }, ref: (u2) => {
    if (u2) {
      if (typeof process != "undefined" && process.env.JEST_WORKER_ID !== void 0 || r.activationTrigger.value === 0)
        return;
      r.activeOptionIndex.value !== null && r.virtual.value.options.length > r.activeOptionIndex.value && t2.value.scrollToIndex(r.activeOptionIndex.value);
    }
  } }, t2.value.getVirtualItems().map((u2) => cloneVNode(I.default({ option: r.virtual.value.options[u2.index], open: r.comboboxState.value === 0 })[0], { key: `${R.value}-${u2.index}`, "data-index": u2.index, "aria-setsize": r.virtual.value.options.length, "aria-posinset": u2.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${u2.start}px)`, overflowAnchor: "none" } })))];
} }), Ze = defineComponent({ name: "Combobox", emits: { "update:modelValue": (a) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], nullable: true, default: null }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, form: { type: String, optional: true }, name: { type: String, optional: true }, nullable: { type: Boolean, default: false }, multiple: { type: [Boolean], default: false }, immediate: { type: [Boolean], default: false }, virtual: { type: Object, default: null } }, inheritAttrs: false, setup(a, { slots: I, attrs: r, emit: O$1$1 }) {
  let t$12 = ref(1), e$1 = ref(null), R = ref(null), u$12 = ref(null), d$1 = ref(null), g = ref({ static: false, hold: false }), S = ref([]), m = ref(null), w$12 = ref(2), h$12 = ref(false);
  function F(l2 = (i2) => i2) {
    let i2 = m.value !== null ? S.value[m.value] : null, s2 = l2(S.value.slice()), f2 = s2.length > 0 && s2[0].dataRef.order.value !== null ? s2.sort((T2, L) => T2.dataRef.order.value - L.dataRef.order.value) : O$1(s2, (T2) => o$3(T2.dataRef.domRef)), y = i2 ? f2.indexOf(i2) : null;
    return y === -1 && (y = null), { options: f2, activeOptionIndex: y };
  }
  let M = computed(() => a.multiple ? 1 : 0), K = computed(() => a.nullable), [p2, o2] = d(computed(() => a.modelValue), (l2) => O$1$1("update:modelValue", l2), computed(() => a.defaultValue)), v = computed(() => p2.value === void 0 ? u$6(M.value, { [1]: [], [0]: void 0 }) : p2.value), c$1$1 = null, P = null;
  function C(l2) {
    return u$6(M.value, { [0]() {
      return o2 == null ? void 0 : o2(l2);
    }, [1]: () => {
      let i2 = toRaw(n2.value.value).slice(), s2 = toRaw(l2), f2 = i2.findIndex((y) => n2.compare(s2, toRaw(y)));
      return f2 === -1 ? i2.push(s2) : i2.splice(f2, 1), o2 == null ? void 0 : o2(i2);
    } });
  }
  let V = computed(() => {
  });
  watch([V], ([l2], [i2]) => {
    if (n2.virtual.value && l2 && i2 && m.value !== null) {
      let s2 = l2.indexOf(i2[m.value]);
      s2 !== -1 ? m.value = s2 : m.value = null;
    }
  });
  let n2 = { comboboxState: t$12, value: v, mode: M, compare(l2, i2) {
    if (typeof a.by == "string") {
      let s2 = a.by;
      return (l2 == null ? void 0 : l2[s2]) === (i2 == null ? void 0 : i2[s2]);
    }
    return a.by === null ? Pe(l2, i2) : a.by(l2, i2);
  }, calculateIndex(l2) {
    return n2.virtual.value ? a.by === null ? n2.virtual.value.options.indexOf(l2) : n2.virtual.value.options.findIndex((i2) => n2.compare(i2, l2)) : S.value.findIndex((i2) => n2.compare(i2.dataRef.value, l2));
  }, defaultValue: computed(() => a.defaultValue), nullable: K, immediate: computed(() => false), virtual: computed(() => null), inputRef: R, labelRef: e$1, buttonRef: u$12, optionsRef: d$1, disabled: computed(() => a.disabled), options: S, change(l2) {
    o2(l2);
  }, activeOptionIndex: computed(() => {
    if (h$12.value && m.value === null && (n2.virtual.value ? n2.virtual.value.options.length > 0 : S.value.length > 0)) {
      if (n2.virtual.value) {
        let i2 = n2.virtual.value.options.findIndex((s2) => {
          var f2;
          return !((f2 = n2.virtual.value) != null && f2.disabled(s2));
        });
        if (i2 !== -1)
          return i2;
      }
      let l2 = S.value.findIndex((i2) => !i2.dataRef.disabled);
      if (l2 !== -1)
        return l2;
    }
    return m.value;
  }), activationTrigger: w$12, optionsPropsRef: g, closeCombobox() {
    h$12.value = false, !a.disabled && t$12.value !== 1 && (t$12.value = 1, m.value = null);
  }, openCombobox() {
    if (h$12.value = true, !a.disabled && t$12.value !== 0) {
      if (n2.value.value) {
        let l2 = n2.calculateIndex(n2.value.value);
        l2 !== -1 && (m.value = l2);
      }
      t$12.value = 0;
    }
  }, setActivationTrigger(l2) {
    w$12.value = l2;
  }, goToOption(l2, i2, s2) {
    h$12.value = false, c$1$1 !== null && cancelAnimationFrame(c$1$1), c$1$1 = requestAnimationFrame(() => {
      if (a.disabled || d$1.value && !g.value.static && t$12.value === 1)
        return;
      if (n2.virtual.value) {
        m.value = l2 === c$1.Specific ? i2 : f$1({ focus: l2 }, { resolveItems: () => n2.virtual.value.options, resolveActiveIndex: () => {
          var T2, L;
          return (L = (T2 = n2.activeOptionIndex.value) != null ? T2 : n2.virtual.value.options.findIndex((W) => {
            var U;
            return !((U = n2.virtual.value) != null && U.disabled(W));
          })) != null ? L : null;
        }, resolveDisabled: (T2) => n2.virtual.value.disabled(T2), resolveId() {
          throw new Error("Function not implemented.");
        } }), w$12.value = s2 != null ? s2 : 2;
        return;
      }
      let f2 = F();
      if (f2.activeOptionIndex === null) {
        let T2 = f2.options.findIndex((L) => !L.dataRef.disabled);
        T2 !== -1 && (f2.activeOptionIndex = T2);
      }
      let y = l2 === c$1.Specific ? i2 : f$1({ focus: l2 }, { resolveItems: () => f2.options, resolveActiveIndex: () => f2.activeOptionIndex, resolveId: (T2) => T2.id, resolveDisabled: (T2) => T2.dataRef.disabled });
      m.value = y, w$12.value = s2 != null ? s2 : 2, S.value = f2.options;
    });
  }, selectOption(l2) {
    let i2 = S.value.find((f2) => f2.id === l2);
    if (!i2)
      return;
    let { dataRef: s2 } = i2;
    C(s2.value);
  }, selectActiveOption() {
    if (n2.activeOptionIndex.value !== null) {
      if (n2.virtual.value)
        C(n2.virtual.value.options[n2.activeOptionIndex.value]);
      else {
        let { dataRef: l2 } = S.value[n2.activeOptionIndex.value];
        C(l2.value);
      }
      n2.goToOption(c$1.Specific, n2.activeOptionIndex.value);
    }
  }, registerOption(l2, i2) {
    let s2 = reactive({ id: l2, dataRef: i2 });
    if (n2.virtual.value) {
      S.value.push(s2);
      return;
    }
    P && cancelAnimationFrame(P);
    let f2 = F((y) => (y.push(s2), y));
    m.value === null && n2.isSelected(i2.value.value) && (f2.activeOptionIndex = f2.options.indexOf(s2)), S.value = f2.options, m.value = f2.activeOptionIndex, w$12.value = 2, f2.options.some((y) => !o$3(y.dataRef.domRef)) && (P = requestAnimationFrame(() => {
      let y = F();
      S.value = y.options, m.value = y.activeOptionIndex;
    }));
  }, unregisterOption(l2, i2) {
    if (c$1$1 !== null && cancelAnimationFrame(c$1$1), i2 && (h$12.value = true), n2.virtual.value) {
      S.value = S.value.filter((f2) => f2.id !== l2);
      return;
    }
    let s2 = F((f2) => {
      let y = f2.findIndex((T2) => T2.id === l2);
      return y !== -1 && f2.splice(y, 1), f2;
    });
    S.value = s2.options, m.value = s2.activeOptionIndex, w$12.value = 2;
  }, isSelected(l2) {
    return u$6(M.value, { [0]: () => n2.compare(toRaw(n2.value.value), toRaw(l2)), [1]: () => toRaw(n2.value.value).some((i2) => n2.compare(toRaw(i2), toRaw(l2))) });
  }, isActive(l2) {
    return m.value === n2.calculateIndex(l2);
  } };
  w$1([R, u$12, d$1], () => n2.closeCombobox(), computed(() => t$12.value === 0)), provide(ne, n2), t$3(computed(() => u$6(t$12.value, { [0]: i$1.Open, [1]: i$1.Closed })));
  let D = computed(() => {
    var l2;
    return (l2 = o$3(R)) == null ? void 0 : l2.closest("form");
  });
  return onMounted(() => {
    watch([D], () => {
      if (!D.value || a.defaultValue === void 0)
        return;
      function l2() {
        n2.change(a.defaultValue);
      }
      return D.value.addEventListener("reset", l2), () => {
        var i2;
        (i2 = D.value) == null || i2.removeEventListener("reset", l2);
      };
    }, { immediate: true });
  }), () => {
    var T$1$1, L, W;
    let { name: l2, disabled: i2, form: s$12, ...f2 } = a, y = { open: t$12.value === 0, disabled: i2, activeIndex: n2.activeOptionIndex.value, activeOption: n2.activeOptionIndex.value === null ? null : n2.virtual.value ? n2.virtual.value.options[(T$1$1 = n2.activeOptionIndex.value) != null ? T$1$1 : 0] : (W = (L = n2.options.value[n2.activeOptionIndex.value]) == null ? void 0 : L.dataRef.value.value) != null ? W : null, value: v.value };
    return h(Fragment, [...l2 != null && v.value != null ? e({ [l2]: v.value }).map(([U, ue]) => h(f$1$1, E$2({ features: s$2.Hidden, key: U, as: "input", type: "hidden", hidden: true, readOnly: true, form: s$12, name: U, value: ue }))) : [], A$3({ theirProps: { ...r, ...T$1(f2, ["by", "defaultValue", "immediate", "modelValue", "multiple", "nullable", "onUpdate:modelValue", "virtual"]) }, ourProps: {}, slot: y, slots: I, attrs: r, name: "Combobox" })]);
  };
} });
defineComponent({ name: "ComboboxLabel", props: { as: { type: [Object, String], default: "label" }, id: { type: String, default: () => `headlessui-combobox-label-${t$5()}` } }, setup(a, { attrs: I, slots: r }) {
  let O2 = N("ComboboxLabel");
  function t2() {
    var e2;
    (e2 = o$3(O2.inputRef)) == null || e2.focus({ preventScroll: true });
  }
  return () => {
    let e2 = { open: O2.comboboxState.value === 0, disabled: O2.disabled.value }, { id: R, ...u2 } = a, d2 = { id: R, ref: O2.labelRef, onClick: t2 };
    return A$3({ ourProps: d2, theirProps: u2, slot: e2, attrs: I, slots: r, name: "ComboboxLabel" });
  };
} });
let tt = defineComponent({ name: "ComboboxButton", props: { as: { type: [Object, String], default: "button" }, id: { type: String, default: () => `headlessui-combobox-button-${t$5()}` } }, setup(a, { attrs: I, slots: r, expose: O2 }) {
  let t2 = N("ComboboxButton");
  O2({ el: t2.buttonRef, $el: t2.buttonRef });
  function e2(d2) {
    t2.disabled.value || (t2.comboboxState.value === 0 ? t2.closeCombobox() : (d2.preventDefault(), t2.openCombobox()), nextTick(() => {
      var g;
      return (g = o$3(t2.inputRef)) == null ? void 0 : g.focus({ preventScroll: true });
    }));
  }
  function R(d2) {
    switch (d2.key) {
      case o$2.ArrowDown:
        d2.preventDefault(), d2.stopPropagation(), t2.comboboxState.value === 1 && t2.openCombobox(), nextTick(() => {
          var g;
          return (g = t2.inputRef.value) == null ? void 0 : g.focus({ preventScroll: true });
        });
        return;
      case o$2.ArrowUp:
        d2.preventDefault(), d2.stopPropagation(), t2.comboboxState.value === 1 && (t2.openCombobox(), nextTick(() => {
          t2.value.value || t2.goToOption(c$1.Last);
        })), nextTick(() => {
          var g;
          return (g = t2.inputRef.value) == null ? void 0 : g.focus({ preventScroll: true });
        });
        return;
      case o$2.Escape:
        if (t2.comboboxState.value !== 0)
          return;
        d2.preventDefault(), t2.optionsRef.value && !t2.optionsPropsRef.value.static && d2.stopPropagation(), t2.closeCombobox(), nextTick(() => {
          var g;
          return (g = t2.inputRef.value) == null ? void 0 : g.focus({ preventScroll: true });
        });
        return;
    }
  }
  let u2 = s$3(computed(() => ({ as: a.as, type: I.type })), t2.buttonRef);
  return () => {
    var w2, h2;
    let d2 = { open: t2.comboboxState.value === 0, disabled: t2.disabled.value, value: t2.value.value }, { id: g, ...S } = a, m = { ref: t2.buttonRef, id: g, type: u2.value, tabindex: "-1", "aria-haspopup": "listbox", "aria-controls": (w2 = o$3(t2.optionsRef)) == null ? void 0 : w2.id, "aria-expanded": t2.comboboxState.value === 0, "aria-labelledby": t2.labelRef.value ? [(h2 = o$3(t2.labelRef)) == null ? void 0 : h2.id, g].join(" ") : void 0, disabled: t2.disabled.value === true ? true : void 0, onKeydown: R, onClick: e2 };
    return A$3({ ourProps: m, theirProps: S, slot: d2, attrs: I, slots: r, name: "ComboboxButton" });
  };
} }), ot = defineComponent({ name: "ComboboxInput", props: { as: { type: [Object, String], default: "input" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, displayValue: { type: Function }, defaultValue: { type: String, default: void 0 }, id: { type: String, default: () => `headlessui-combobox-input-${t$5()}` } }, emits: { change: (a) => true }, setup(a, { emit: I, attrs: r, slots: O2, expose: t2 }) {
  let e2 = N("ComboboxInput"), R = computed(() => i$4(o$3(e2.inputRef))), u$12 = { value: false };
  t2({ el: e2.inputRef, $el: e2.inputRef });
  function d2() {
    e2.change(null);
    let o2 = o$3(e2.optionsRef);
    o2 && (o2.scrollTop = 0), e2.goToOption(c$1.Nothing);
  }
  let g = computed(() => {
    var v;
    let o2 = e2.value.value;
    return o$3(e2.inputRef) ? typeof a.displayValue != "undefined" && o2 !== void 0 ? (v = a.displayValue(o2)) != null ? v : "" : typeof o2 == "string" ? o2 : "" : "";
  });
  onMounted(() => {
    watch([g, e2.comboboxState, R], ([o2, v], [c2, P]) => {
      if (u$12.value)
        return;
      let C = o$3(e2.inputRef);
      C && ((P === 0 && v === 1 || o2 !== c2) && (C.value = o2), requestAnimationFrame(() => {
        var D;
        if (u$12.value || !C || ((D = R.value) == null ? void 0 : D.activeElement) !== C)
          return;
        let { selectionStart: V, selectionEnd: n2 } = C;
        Math.abs((n2 != null ? n2 : 0) - (V != null ? V : 0)) === 0 && V === 0 && C.setSelectionRange(C.value.length, C.value.length);
      }));
    }, { immediate: true }), watch([e2.comboboxState], ([o2], [v]) => {
      if (o2 === 0 && v === 1) {
        if (u$12.value)
          return;
        let c2 = o$3(e2.inputRef);
        if (!c2)
          return;
        let P = c2.value, { selectionStart: C, selectionEnd: V, selectionDirection: n2 } = c2;
        c2.value = "", c2.value = P, n2 !== null ? c2.setSelectionRange(C, V, n2) : c2.setSelectionRange(C, V);
      }
    });
  });
  let S = ref(false);
  function m() {
    S.value = true;
  }
  function w2() {
    o$1().nextFrame(() => {
      S.value = false;
    });
  }
  function h2(o2) {
    switch (u$12.value = true, o2.key) {
      case o$2.Enter:
        if (u$12.value = false, e2.comboboxState.value !== 0 || S.value)
          return;
        if (o2.preventDefault(), o2.stopPropagation(), e2.activeOptionIndex.value === null) {
          e2.closeCombobox();
          return;
        }
        e2.selectActiveOption(), e2.mode.value === 0 && e2.closeCombobox();
        break;
      case o$2.ArrowDown:
        return u$12.value = false, o2.preventDefault(), o2.stopPropagation(), u$6(e2.comboboxState.value, { [0]: () => e2.goToOption(c$1.Next), [1]: () => e2.openCombobox() });
      case o$2.ArrowUp:
        return u$12.value = false, o2.preventDefault(), o2.stopPropagation(), u$6(e2.comboboxState.value, { [0]: () => e2.goToOption(c$1.Previous), [1]: () => {
          e2.openCombobox(), nextTick(() => {
            e2.value.value || e2.goToOption(c$1.Last);
          });
        } });
      case o$2.Home:
        if (o2.shiftKey)
          break;
        return u$12.value = false, o2.preventDefault(), o2.stopPropagation(), e2.goToOption(c$1.First);
      case o$2.PageUp:
        return u$12.value = false, o2.preventDefault(), o2.stopPropagation(), e2.goToOption(c$1.First);
      case o$2.End:
        if (o2.shiftKey)
          break;
        return u$12.value = false, o2.preventDefault(), o2.stopPropagation(), e2.goToOption(c$1.Last);
      case o$2.PageDown:
        return u$12.value = false, o2.preventDefault(), o2.stopPropagation(), e2.goToOption(c$1.Last);
      case o$2.Escape:
        if (u$12.value = false, e2.comboboxState.value !== 0)
          return;
        o2.preventDefault(), e2.optionsRef.value && !e2.optionsPropsRef.value.static && o2.stopPropagation(), e2.nullable.value && e2.mode.value === 0 && e2.value.value === null && d2(), e2.closeCombobox();
        break;
      case o$2.Tab:
        if (u$12.value = false, e2.comboboxState.value !== 0)
          return;
        e2.mode.value === 0 && e2.activationTrigger.value !== 1 && e2.selectActiveOption(), e2.closeCombobox();
        break;
    }
  }
  function F(o2) {
    I("change", o2), e2.nullable.value && e2.mode.value === 0 && o2.target.value === "" && d2(), e2.openCombobox();
  }
  function M(o2) {
    var c2, P, C;
    let v = (c2 = o2.relatedTarget) != null ? c2 : t$2.find((V) => V !== o2.currentTarget);
    if (u$12.value = false, !((P = o$3(e2.optionsRef)) != null && P.contains(v)) && !((C = o$3(e2.buttonRef)) != null && C.contains(v)) && e2.comboboxState.value === 0)
      return o2.preventDefault(), e2.mode.value === 0 && (e2.nullable.value && e2.value.value === null ? d2() : e2.activationTrigger.value !== 1 && e2.selectActiveOption()), e2.closeCombobox();
  }
  function K(o2) {
    var c2, P, C;
    let v = (c2 = o2.relatedTarget) != null ? c2 : t$2.find((V) => V !== o2.currentTarget);
    (P = o$3(e2.buttonRef)) != null && P.contains(v) || (C = o$3(e2.optionsRef)) != null && C.contains(v) || e2.disabled.value || e2.immediate.value && e2.comboboxState.value !== 0 && (e2.openCombobox(), o$1().nextFrame(() => {
      e2.setActivationTrigger(1);
    }));
  }
  let p2 = computed(() => {
    var o2, v, c2, P;
    return (P = (c2 = (v = a.defaultValue) != null ? v : e2.defaultValue.value !== void 0 ? (o2 = a.displayValue) == null ? void 0 : o2.call(a, e2.defaultValue.value) : null) != null ? c2 : e2.defaultValue.value) != null ? P : "";
  });
  return () => {
    var n2, D, l2, i2, s2, f2, y;
    let o2 = { open: e2.comboboxState.value === 0 }, { id: v, displayValue: c2, onChange: P, ...C } = a, V = { "aria-controls": (n2 = e2.optionsRef.value) == null ? void 0 : n2.id, "aria-expanded": e2.comboboxState.value === 0, "aria-activedescendant": e2.activeOptionIndex.value === null ? void 0 : e2.virtual.value ? (D = e2.options.value.find((T2) => !e2.virtual.value.disabled(T2.dataRef.value) && e2.compare(T2.dataRef.value, e2.virtual.value.options[e2.activeOptionIndex.value]))) == null ? void 0 : D.id : (l2 = e2.options.value[e2.activeOptionIndex.value]) == null ? void 0 : l2.id, "aria-labelledby": (f2 = (i2 = o$3(e2.labelRef)) == null ? void 0 : i2.id) != null ? f2 : (s2 = o$3(e2.buttonRef)) == null ? void 0 : s2.id, "aria-autocomplete": "list", id: v, onCompositionstart: m, onCompositionend: w2, onKeydown: h2, onInput: F, onFocus: K, onBlur: M, role: "combobox", type: (y = r.type) != null ? y : "text", tabIndex: 0, ref: e2.inputRef, defaultValue: p2.value, disabled: e2.disabled.value === true ? true : void 0 };
    return A$3({ ourProps: V, theirProps: C, slot: o2, attrs: r, slots: O2, features: N$3.RenderStrategy | N$3.Static, name: "ComboboxInput" });
  };
} }), lt = defineComponent({ name: "ComboboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, hold: { type: [Boolean], default: false } }, setup(a, { attrs: I, slots: r, expose: O2 }) {
  let t2 = N("ComboboxOptions"), e2 = `headlessui-combobox-options-${t$5()}`;
  O2({ el: t2.optionsRef, $el: t2.optionsRef }), watchEffect(() => {
    t2.optionsPropsRef.value.static = a.static;
  }), watchEffect(() => {
    t2.optionsPropsRef.value.hold = a.hold;
  });
  let R = l$1(), u2 = computed(() => R !== null ? (R.value & i$1.Open) === i$1.Open : t2.comboboxState.value === 0);
  return i$2({ container: computed(() => o$3(t2.optionsRef)), enabled: computed(() => t2.comboboxState.value === 0), accept(d2) {
    return d2.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : d2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(d2) {
    d2.setAttribute("role", "none");
  } }), () => {
    var m, w2, h$12;
    let d2 = { open: t2.comboboxState.value === 0 }, g = { "aria-labelledby": (h$12 = (m = o$3(t2.labelRef)) == null ? void 0 : m.id) != null ? h$12 : (w2 = o$3(t2.buttonRef)) == null ? void 0 : w2.id, id: e2, ref: t2.optionsRef, role: "listbox", "aria-multiselectable": t2.mode.value === 1 ? true : void 0 }, S = T$1(a, ["hold"]);
    return A$3({ ourProps: g, theirProps: S, slot: d2, attrs: I, slots: t2.virtual.value && t2.comboboxState.value === 0 ? { ...r, default: () => [h(ke, {}, r.default)] } : r, features: N$3.RenderStrategy | N$3.Static, visible: u2.value, name: "ComboboxOptions" });
  };
} }), at = defineComponent({ name: "ComboboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false }, order: { type: [Number], default: null } }, setup(a, { slots: I, attrs: r, expose: O2 }) {
  let t2 = N("ComboboxOption"), e2 = `headlessui-combobox-option-${t$5()}`, R = ref(null);
  O2({ el: R, $el: R });
  let u2 = computed(() => {
    var p2;
    return t2.virtual.value ? t2.activeOptionIndex.value === t2.calculateIndex(a.value) : t2.activeOptionIndex.value === null ? false : ((p2 = t2.options.value[t2.activeOptionIndex.value]) == null ? void 0 : p2.id) === e2;
  }), d2 = computed(() => t2.isSelected(a.value)), g = inject(ie, null), S = computed(() => ({ disabled: a.disabled, value: a.value, domRef: R, order: computed(() => a.order) }));
  onMounted(() => t2.registerOption(e2, S)), onUnmounted(() => t2.unregisterOption(e2, u2.value)), watchEffect(() => {
    let p2 = o$3(R);
    p2 && (g == null || g.value.measureElement(p2));
  }), watchEffect(() => {
    t2.comboboxState.value === 0 && u2.value && (t2.virtual.value || t2.activationTrigger.value !== 0 && nextTick(() => {
      var p2, o2;
      return (o2 = (p2 = o$3(R)) == null ? void 0 : p2.scrollIntoView) == null ? void 0 : o2.call(p2, { block: "nearest" });
    }));
  });
  function m(p2) {
    var o2;
    if (a.disabled || (o2 = t2.virtual.value) != null && o2.disabled(a.value))
      return p2.preventDefault();
    t2.selectOption(e2), n$2() || requestAnimationFrame(() => {
      var v;
      return (v = o$3(t2.inputRef)) == null ? void 0 : v.focus({ preventScroll: true });
    }), t2.mode.value === 0 && requestAnimationFrame(() => t2.closeCombobox());
  }
  function w2() {
    var o2;
    if (a.disabled || (o2 = t2.virtual.value) != null && o2.disabled(a.value))
      return t2.goToOption(c$1.Nothing);
    let p2 = t2.calculateIndex(a.value);
    t2.goToOption(c$1.Specific, p2);
  }
  let h2 = u$4();
  function F(p2) {
    h2.update(p2);
  }
  function M(p2) {
    var v;
    if (!h2.wasMoved(p2) || a.disabled || (v = t2.virtual.value) != null && v.disabled(a.value) || u2.value)
      return;
    let o2 = t2.calculateIndex(a.value);
    t2.goToOption(c$1.Specific, o2, 0);
  }
  function K(p2) {
    var o2;
    h2.wasMoved(p2) && (a.disabled || (o2 = t2.virtual.value) != null && o2.disabled(a.value) || u2.value && (t2.optionsPropsRef.value.hold || t2.goToOption(c$1.Nothing)));
  }
  return () => {
    let { disabled: p2 } = a, o2 = { active: u2.value, selected: d2.value, disabled: p2 }, v = { id: e2, ref: R, role: "option", tabIndex: p2 === true ? void 0 : -1, "aria-disabled": p2 === true ? true : void 0, "aria-selected": d2.value, disabled: void 0, onClick: m, onFocus: w2, onPointerenter: F, onMouseenter: F, onPointermove: M, onMousemove: M, onPointerleave: K, onMouseleave: K }, c2 = T$1(a, ["order", "value"]);
    return A$3({ ourProps: v, theirProps: c2, slot: o2, attrs: r, slots: I, name: "ComboboxOption" });
  };
} });
function pe(t2, c2) {
  return t2 === c2;
}
var ce = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(ce || {}), ve = ((l2) => (l2[l2.Single = 0] = "Single", l2[l2.Multi = 1] = "Multi", l2))(ve || {}), be = ((l2) => (l2[l2.Pointer = 0] = "Pointer", l2[l2.Other = 1] = "Other", l2))(be || {});
function me(t2) {
  requestAnimationFrame(() => requestAnimationFrame(t2));
}
let $ = Symbol("ListboxContext");
function A(t2) {
  let c2 = inject($, null);
  if (c2 === null) {
    let l2 = new Error(`<${t2} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, A), l2;
  }
  return c2;
}
let Ie = defineComponent({ name: "Listbox", emits: { "update:modelValue": (t2) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => pe }, horizontal: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, form: { type: String, optional: true }, name: { type: String, optional: true }, multiple: { type: [Boolean], default: false } }, inheritAttrs: false, setup(t$12, { slots: c$1$1, attrs: l2, emit: L }) {
  let e$1 = ref(1), d$1 = ref(null), v = ref(null), b = ref(null), f2 = ref([]), o2 = ref(""), i$12 = ref(null), T$1$1 = ref(1);
  function D(a = (n2) => n2) {
    let n2 = i$12.value !== null ? f2.value[i$12.value] : null, u2 = O$1(a(f2.value.slice()), (O2) => o$3(O2.dataRef.domRef)), s2 = n2 ? u2.indexOf(n2) : null;
    return s2 === -1 && (s2 = null), { options: u2, activeOptionIndex: s2 };
  }
  let y = computed(() => t$12.multiple ? 1 : 0), [h$2, V] = d(computed(() => t$12.modelValue), (a) => L("update:modelValue", a), computed(() => t$12.defaultValue)), M = computed(() => h$2.value === void 0 ? u$6(y.value, { [1]: [], [0]: void 0 }) : h$2.value), r = { listboxState: e$1, value: M, mode: y, compare(a, n2) {
    if (typeof t$12.by == "string") {
      let u2 = t$12.by;
      return (a == null ? void 0 : a[u2]) === (n2 == null ? void 0 : n2[u2]);
    }
    return t$12.by(a, n2);
  }, orientation: computed(() => t$12.horizontal ? "horizontal" : "vertical"), labelRef: d$1, buttonRef: v, optionsRef: b, disabled: computed(() => t$12.disabled), options: f2, searchQuery: o2, activeOptionIndex: i$12, activationTrigger: T$1$1, closeListbox() {
    t$12.disabled || e$1.value !== 1 && (e$1.value = 1, i$12.value = null);
  }, openListbox() {
    t$12.disabled || e$1.value !== 0 && (e$1.value = 0);
  }, goToOption(a, n2, u2) {
    if (t$12.disabled || e$1.value === 1)
      return;
    let s2 = D(), O2 = f$1(a === c$1.Specific ? { focus: c$1.Specific, id: n2 } : { focus: a }, { resolveItems: () => s2.options, resolveActiveIndex: () => s2.activeOptionIndex, resolveId: (k) => k.id, resolveDisabled: (k) => k.dataRef.disabled });
    o2.value = "", i$12.value = O2, T$1$1.value = u2 != null ? u2 : 1, f2.value = s2.options;
  }, search(a) {
    if (t$12.disabled || e$1.value === 1)
      return;
    let u2 = o2.value !== "" ? 0 : 1;
    o2.value += a.toLowerCase();
    let O2 = (i$12.value !== null ? f2.value.slice(i$12.value + u2).concat(f2.value.slice(0, i$12.value + u2)) : f2.value).find((I) => I.dataRef.textValue.startsWith(o2.value) && !I.dataRef.disabled), k = O2 ? f2.value.indexOf(O2) : -1;
    k === -1 || k === i$12.value || (i$12.value = k, T$1$1.value = 1);
  }, clearSearch() {
    t$12.disabled || e$1.value !== 1 && o2.value !== "" && (o2.value = "");
  }, registerOption(a, n2) {
    let u2 = D((s2) => [...s2, { id: a, dataRef: n2 }]);
    f2.value = u2.options, i$12.value = u2.activeOptionIndex;
  }, unregisterOption(a) {
    let n2 = D((u2) => {
      let s2 = u2.findIndex((O2) => O2.id === a);
      return s2 !== -1 && u2.splice(s2, 1), u2;
    });
    f2.value = n2.options, i$12.value = n2.activeOptionIndex, T$1$1.value = 1;
  }, theirOnChange(a) {
    t$12.disabled || V(a);
  }, select(a) {
    t$12.disabled || V(u$6(y.value, { [0]: () => a, [1]: () => {
      let n2 = toRaw(r.value.value).slice(), u2 = toRaw(a), s2 = n2.findIndex((O2) => r.compare(u2, toRaw(O2)));
      return s2 === -1 ? n2.push(u2) : n2.splice(s2, 1), n2;
    } }));
  } };
  w$1([v, b], (a, n2) => {
    var u2;
    r.closeListbox(), w$3(n2, h$1.Loose) || (a.preventDefault(), (u2 = o$3(v)) == null || u2.focus());
  }, computed(() => e$1.value === 0)), provide($, r), t$3(computed(() => u$6(e$1.value, { [0]: i$1.Open, [1]: i$1.Closed })));
  let m = computed(() => {
    var a;
    return (a = o$3(v)) == null ? void 0 : a.closest("form");
  });
  return onMounted(() => {
    watch([m], () => {
      if (!m.value || t$12.defaultValue === void 0)
        return;
      function a() {
        r.theirOnChange(t$12.defaultValue);
      }
      return m.value.addEventListener("reset", a), () => {
        var n2;
        (n2 = m.value) == null || n2.removeEventListener("reset", a);
      };
    }, { immediate: true });
  }), () => {
    let { name: a, modelValue: n2, disabled: u2, form: s$12, ...O2 } = t$12, k = { open: e$1.value === 0, disabled: u2, value: M.value };
    return h(Fragment, [...a != null && M.value != null ? e({ [a]: M.value }).map(([I, Q]) => h(f$1$1, E$2({ features: s$2.Hidden, key: I, as: "input", type: "hidden", hidden: true, readOnly: true, form: s$12, name: I, value: Q }))) : [], A$3({ ourProps: {}, theirProps: { ...l2, ...T$1(O2, ["defaultValue", "onUpdate:modelValue", "horizontal", "multiple", "by"]) }, slot: k, slots: c$1$1, attrs: l2, name: "Listbox" })]);
  };
} });
defineComponent({ name: "ListboxLabel", props: { as: { type: [Object, String], default: "label" }, id: { type: String, default: () => `headlessui-listbox-label-${t$5()}` } }, setup(t2, { attrs: c2, slots: l2 }) {
  let L = A("ListboxLabel");
  function e2() {
    var d2;
    (d2 = o$3(L.buttonRef)) == null || d2.focus({ preventScroll: true });
  }
  return () => {
    let d2 = { open: L.listboxState.value === 0, disabled: L.disabled.value }, { id: v, ...b } = t2, f2 = { id: v, ref: L.labelRef, onClick: e2 };
    return A$3({ ourProps: f2, theirProps: b, slot: d2, attrs: c2, slots: l2, name: "ListboxLabel" });
  };
} });
let je = defineComponent({ name: "ListboxButton", props: { as: { type: [Object, String], default: "button" }, id: { type: String, default: () => `headlessui-listbox-button-${t$5()}` } }, setup(t2, { attrs: c$1$1, slots: l2, expose: L }) {
  let e2 = A("ListboxButton");
  L({ el: e2.buttonRef, $el: e2.buttonRef });
  function d2(o2) {
    switch (o2.key) {
      case o$2.Space:
      case o$2.Enter:
      case o$2.ArrowDown:
        o2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i2;
          (i2 = o$3(e2.optionsRef)) == null || i2.focus({ preventScroll: true }), e2.value.value || e2.goToOption(c$1.First);
        });
        break;
      case o$2.ArrowUp:
        o2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i2;
          (i2 = o$3(e2.optionsRef)) == null || i2.focus({ preventScroll: true }), e2.value.value || e2.goToOption(c$1.Last);
        });
        break;
    }
  }
  function v(o2) {
    switch (o2.key) {
      case o$2.Space:
        o2.preventDefault();
        break;
    }
  }
  function b(o2) {
    e2.disabled.value || (e2.listboxState.value === 0 ? (e2.closeListbox(), nextTick(() => {
      var i2;
      return (i2 = o$3(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
    })) : (o2.preventDefault(), e2.openListbox(), me(() => {
      var i2;
      return (i2 = o$3(e2.optionsRef)) == null ? void 0 : i2.focus({ preventScroll: true });
    })));
  }
  let f2 = s$3(computed(() => ({ as: t2.as, type: c$1$1.type })), e2.buttonRef);
  return () => {
    var y, h2;
    let o2 = { open: e2.listboxState.value === 0, disabled: e2.disabled.value, value: e2.value.value }, { id: i2, ...T2 } = t2, D = { ref: e2.buttonRef, id: i2, type: f2.value, "aria-haspopup": "listbox", "aria-controls": (y = o$3(e2.optionsRef)) == null ? void 0 : y.id, "aria-expanded": e2.listboxState.value === 0, "aria-labelledby": e2.labelRef.value ? [(h2 = o$3(e2.labelRef)) == null ? void 0 : h2.id, i2].join(" ") : void 0, disabled: e2.disabled.value === true ? true : void 0, onKeydown: d2, onKeyup: v, onClick: b };
    return A$3({ ourProps: D, theirProps: T2, slot: o2, attrs: c$1$1, slots: l2, name: "ListboxButton" });
  };
} }), Ae = defineComponent({ name: "ListboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-listbox-options-${t$5()}` } }, setup(t2, { attrs: c$1$1, slots: l$1$1, expose: L }) {
  let e2 = A("ListboxOptions"), d2 = ref(null);
  L({ el: e2.optionsRef, $el: e2.optionsRef });
  function v(o2) {
    switch (d2.value && clearTimeout(d2.value), o2.key) {
      case o$2.Space:
        if (e2.searchQuery.value !== "")
          return o2.preventDefault(), o2.stopPropagation(), e2.search(o2.key);
      case o$2.Enter:
        if (o2.preventDefault(), o2.stopPropagation(), e2.activeOptionIndex.value !== null) {
          let i2 = e2.options.value[e2.activeOptionIndex.value];
          e2.select(i2.dataRef.value);
        }
        e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
          var i2;
          return (i2 = o$3(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
        }));
        break;
      case u$6(e2.orientation.value, { vertical: o$2.ArrowDown, horizontal: o$2.ArrowRight }):
        return o2.preventDefault(), o2.stopPropagation(), e2.goToOption(c$1.Next);
      case u$6(e2.orientation.value, { vertical: o$2.ArrowUp, horizontal: o$2.ArrowLeft }):
        return o2.preventDefault(), o2.stopPropagation(), e2.goToOption(c$1.Previous);
      case o$2.Home:
      case o$2.PageUp:
        return o2.preventDefault(), o2.stopPropagation(), e2.goToOption(c$1.First);
      case o$2.End:
      case o$2.PageDown:
        return o2.preventDefault(), o2.stopPropagation(), e2.goToOption(c$1.Last);
      case o$2.Escape:
        o2.preventDefault(), o2.stopPropagation(), e2.closeListbox(), nextTick(() => {
          var i2;
          return (i2 = o$3(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
        });
        break;
      case o$2.Tab:
        o2.preventDefault(), o2.stopPropagation();
        break;
      default:
        o2.key.length === 1 && (e2.search(o2.key), d2.value = setTimeout(() => e2.clearSearch(), 350));
        break;
    }
  }
  let b = l$1(), f2 = computed(() => b !== null ? (b.value & i$1.Open) === i$1.Open : e2.listboxState.value === 0);
  return () => {
    var y, h2;
    let o2 = { open: e2.listboxState.value === 0 }, { id: i2, ...T2 } = t2, D = { "aria-activedescendant": e2.activeOptionIndex.value === null || (y = e2.options.value[e2.activeOptionIndex.value]) == null ? void 0 : y.id, "aria-multiselectable": e2.mode.value === 1 ? true : void 0, "aria-labelledby": (h2 = o$3(e2.buttonRef)) == null ? void 0 : h2.id, "aria-orientation": e2.orientation.value, id: i2, onKeydown: v, role: "listbox", tabIndex: 0, ref: e2.optionsRef };
    return A$3({ ourProps: D, theirProps: T2, slot: o2, attrs: c$1$1, slots: l$1$1, features: N$3.RenderStrategy | N$3.Static, visible: f2.value, name: "ListboxOptions" });
  };
} }), Fe = defineComponent({ name: "ListboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-listbox.option-${t$5()}` } }, setup(t2, { slots: c$1$1, attrs: l2, expose: L }) {
  let e2 = A("ListboxOption"), d2 = ref(null);
  L({ el: d2, $el: d2 });
  let v = computed(() => e2.activeOptionIndex.value !== null ? e2.options.value[e2.activeOptionIndex.value].id === t2.id : false), b = computed(() => u$6(e2.mode.value, { [0]: () => e2.compare(toRaw(e2.value.value), toRaw(t2.value)), [1]: () => toRaw(e2.value.value).some((r) => e2.compare(toRaw(r), toRaw(t2.value))) })), f2 = computed(() => u$6(e2.mode.value, { [1]: () => {
    var m;
    let r = toRaw(e2.value.value);
    return ((m = e2.options.value.find((a) => r.some((n2) => e2.compare(toRaw(n2), toRaw(a.dataRef.value))))) == null ? void 0 : m.id) === t2.id;
  }, [0]: () => b.value })), o2 = p(d2), i2 = computed(() => ({ disabled: t2.disabled, value: t2.value, get textValue() {
    return o2();
  }, domRef: d2 }));
  onMounted(() => e2.registerOption(t2.id, i2)), onUnmounted(() => e2.unregisterOption(t2.id)), onMounted(() => {
    watch([e2.listboxState, b], () => {
      e2.listboxState.value === 0 && b.value && u$6(e2.mode.value, { [1]: () => {
        f2.value && e2.goToOption(c$1.Specific, t2.id);
      }, [0]: () => {
        e2.goToOption(c$1.Specific, t2.id);
      } });
    }, { immediate: true });
  }), watchEffect(() => {
    e2.listboxState.value === 0 && v.value && e2.activationTrigger.value !== 0 && nextTick(() => {
      var r, m;
      return (m = (r = o$3(d2)) == null ? void 0 : r.scrollIntoView) == null ? void 0 : m.call(r, { block: "nearest" });
    });
  });
  function T2(r) {
    if (t2.disabled)
      return r.preventDefault();
    e2.select(t2.value), e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
      var m;
      return (m = o$3(e2.buttonRef)) == null ? void 0 : m.focus({ preventScroll: true });
    }));
  }
  function D() {
    if (t2.disabled)
      return e2.goToOption(c$1.Nothing);
    e2.goToOption(c$1.Specific, t2.id);
  }
  let y = u$4();
  function h2(r) {
    y.update(r);
  }
  function V(r) {
    y.wasMoved(r) && (t2.disabled || v.value || e2.goToOption(c$1.Specific, t2.id, 0));
  }
  function M(r) {
    y.wasMoved(r) && (t2.disabled || v.value && e2.goToOption(c$1.Nothing));
  }
  return () => {
    let { disabled: r } = t2, m = { active: v.value, selected: b.value, disabled: r }, { id: a, value: n2, disabled: u2, ...s2 } = t2, O2 = { id: a, ref: d2, role: "option", tabIndex: r === true ? void 0 : -1, "aria-disabled": r === true ? true : void 0, "aria-selected": b.value, disabled: void 0, onClick: T2, onFocus: D, onPointerenter: h2, onMouseenter: h2, onPointermove: V, onMousemove: V, onPointerleave: M, onMouseleave: M };
    return A$3({ ourProps: O2, theirProps: s2, slot: m, attrs: l2, slots: c$1$1, name: "ListboxOption" });
  };
} });
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.select, select);
const configMenu = mergeConfig(appConfig.ui.strategy, appConfig.ui.selectMenu, selectMenu);
const _sfc_main = defineComponent({
  components: {
    HCombobox: Ze,
    HComboboxButton: tt,
    HComboboxOptions: lt,
    HComboboxOption: at,
    HComboboxInput: ot,
    HListbox: Ie,
    HListboxButton: je,
    HListboxOptions: Ae,
    HListboxOption: Fe,
    UIcon: __nuxt_component_0$2,
    UAvatar: __nuxt_component_1$1
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object, Array],
      default: ""
    },
    query: {
      type: String,
      default: null
    },
    by: {
      type: String,
      default: void 0
    },
    options: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    loadingIcon: {
      type: String,
      default: () => config.default.loadingIcon
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: () => config.default.trailingIcon
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedIcon: {
      type: String,
      default: () => configMenu.default.selectedIcon
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: [Boolean, Function],
      default: false
    },
    searchablePlaceholder: {
      type: String,
      default: "Search..."
    },
    clearSearchOnClose: {
      type: Boolean,
      default: () => configMenu.default.clearSearchOnClose
    },
    debounce: {
      type: Number,
      default: 200
    },
    creatable: {
      type: Boolean,
      default: false
    },
    showCreateOptionWhen: {
      type: String,
      default: () => configMenu.default.showCreateOptionWhen
    },
    placeholder: {
      type: String,
      default: null
    },
    padded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config.default.variant,
      validator(value) {
        return [
          ...Object.keys(config.variant),
          ...Object.values(config.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    optionAttribute: {
      type: String,
      default: "label"
    },
    valueAttribute: {
      type: String,
      default: null
    },
    searchAttributes: {
      type: Array,
      default: null
    },
    popper: {
      type: Object,
      default: () => ({})
    },
    selectClass: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    uiMenu: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "update:query", "open", "close", "change"],
  setup(props, { emit, slots }) {
    const { ui, attrs } = useUI("select", toRef(props, "ui"), config, toRef(props, "class"));
    const { ui: uiMenu } = useUI("selectMenu", toRef(props, "uiMenu"), configMenu);
    const popper = computed(() => defu({}, props.popper, uiMenu.value.popper));
    const [trigger, container] = usePopper(popper.value);
    const { size: sizeButtonGroup, rounded } = useInjectButtonGroup({ ui, props });
    const { emitFormBlur, emitFormChange, inputId, color, size: sizeFormGroup, name } = useFormGroup(props, config);
    const size = computed(() => sizeButtonGroup.value || sizeFormGroup.value);
    const internalQuery = ref("");
    const query = computed({
      get() {
        var _a;
        return (_a = props.query) != null ? _a : internalQuery.value;
      },
      set(value) {
        internalQuery.value = value;
        emit("update:query", value);
      }
    });
    const selectClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        uiMenu.value.select,
        rounded.value,
        ui.value.size[size.value],
        ui.value.gap[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant == null ? void 0 : variant.replaceAll("{color}", color.value),
        (isLeading.value || slots.leading) && ui.value.leading.padding[size.value],
        (isTrailing.value || slots.trailing) && ui.value.trailing.padding[size.value]
      ), props.selectClass);
    });
    const isLeading = computed(() => {
      return props.icon && props.leading || props.icon && !props.trailing || props.loading && !props.trailing || props.leadingIcon;
    });
    const isTrailing = computed(() => {
      return props.icon && props.trailing || props.loading && props.trailing || props.trailingIcon;
    });
    const leadingIconName = computed(() => {
      if (props.loading) {
        return props.loadingIcon;
      }
      return props.leadingIcon || props.icon;
    });
    const trailingIconName = computed(() => {
      if (props.loading && !isLeading.value) {
        return props.loadingIcon;
      }
      return props.trailingIcon || props.icon;
    });
    const leadingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.leading.wrapper,
        ui.value.icon.leading.pointer,
        ui.value.icon.leading.padding[size.value]
      );
    });
    const leadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        color.value && appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && ui.value.icon.loading
      );
    });
    const trailingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.trailing.wrapper,
        ui.value.icon.trailing.pointer,
        ui.value.icon.trailing.padding[size.value]
      );
    });
    const trailingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        color.value && appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && !isLeading.value && ui.value.icon.loading
      );
    });
    const debouncedSearch = typeof props.searchable === "function" ? useDebounceFn(props.searchable, props.debounce) : void 0;
    const filteredOptions = computedAsync(async () => {
      if (props.searchable && debouncedSearch) {
        return await debouncedSearch(query.value);
      }
      if (query.value === "") {
        return props.options;
      }
      return props.options.filter((option) => {
        var _a;
        return (((_a = props.searchAttributes) == null ? void 0 : _a.length) ? props.searchAttributes : [props.optionAttribute]).some((searchAttribute) => {
          if (["string", "number"].includes(typeof option)) {
            return String(option).search(new RegExp(query.value, "i")) !== -1;
          }
          const child = get(option, searchAttribute);
          return child !== null && child !== void 0 && String(child).search(new RegExp(query.value, "i")) !== -1;
        });
      });
    });
    const createOption = computed(() => {
      if (query.value === "") {
        return null;
      }
      if (props.showCreateOptionWhen === "empty" && filteredOptions.value.length) {
        return null;
      }
      if (props.showCreateOptionWhen === "always") {
        const existingOption = filteredOptions.value.find((option) => ["string", "number"].includes(typeof option) ? option === query.value : option[props.optionAttribute] === query.value);
        if (existingOption) {
          return null;
        }
      }
      return ["string", "number"].includes(typeof props.modelValue) ? query.value : { [props.optionAttribute]: query.value };
    });
    function clearOnClose() {
      if (props.clearSearchOnClose) {
        query.value = "";
      }
    }
    watch(container, (value) => {
      if (value) {
        emit("open");
      } else {
        clearOnClose();
        emit("close");
        emitFormBlur();
      }
    });
    function onUpdate(event) {
      emit("update:modelValue", event);
      emit("change", event);
      emitFormChange();
    }
    function onChange(event) {
      query.value = event.target.value;
    }
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      // eslint-disable-next-line vue/no-dupe-keys
      uiMenu,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      // eslint-disable-next-line vue/no-dupe-keys
      popper,
      trigger,
      container,
      isLeading,
      isTrailing,
      // eslint-disable-next-line vue/no-dupe-keys
      selectClass,
      leadingIconName,
      leadingIconClass,
      leadingWrapperIconClass,
      trailingIconName,
      trailingIconClass,
      trailingWrapperIconClass,
      filteredOptions,
      createOption,
      // eslint-disable-next-line vue/no-dupe-keys
      query,
      onUpdate,
      onChange
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_0$2;
  const _component_HComboboxInput = resolveComponent("HComboboxInput");
  const _component_UAvatar = __nuxt_component_1$1;
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.searchable ? "HCombobox" : "HListbox"), mergeProps({
    by: _ctx.by,
    name: _ctx.name,
    "model-value": _ctx.modelValue,
    multiple: _ctx.multiple,
    disabled: _ctx.disabled,
    as: "div",
    class: _ctx.ui.wrapper,
    "onUpdate:modelValue": _ctx.onUpdate
  }, _attrs), {
    default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.required) {
          _push2(`<input${ssrRenderAttr("value", _ctx.modelValue)}${ssrIncludeBooleanAttr(_ctx.required) ? " required" : ""} class="${ssrRenderClass(_ctx.uiMenu.required)}" tabindex="-1" aria-hidden="true"${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
        ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(_ctx.searchable ? "HComboboxButton" : "HListboxButton"), {
          ref: "trigger",
          as: "div",
          role: "button",
          class: _ctx.uiMenu.trigger
        }, {
          default: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "default", {
                open,
                disabled: _ctx.disabled,
                loading: _ctx.loading
              }, () => {
                _push3(`<button${ssrRenderAttrs(mergeProps({
                  id: _ctx.inputId,
                  class: _ctx.selectClass,
                  disabled: _ctx.disabled,
                  type: "button"
                }, _ctx.attrs))}${_scopeId2}>`);
                if (_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading) {
                  _push3(`<span class="${ssrRenderClass(_ctx.leadingWrapperIconClass)}"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "leading", {
                    disabled: _ctx.disabled,
                    loading: _ctx.loading
                  }, () => {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: _ctx.leadingIconName,
                      class: _ctx.leadingIconClass
                    }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</span>`);
                } else {
                  _push3(`<!---->`);
                }
                ssrRenderSlot(_ctx.$slots, "label", {}, () => {
                  if (_ctx.multiple && Array.isArray(_ctx.modelValue) && _ctx.modelValue.length) {
                    _push3(`<span class="${ssrRenderClass(_ctx.uiMenu.label)}"${_scopeId2}>${ssrInterpolate(_ctx.modelValue.length)} selected</span>`);
                  } else if (!_ctx.multiple && _ctx.modelValue) {
                    _push3(`<span class="${ssrRenderClass(_ctx.uiMenu.label)}"${_scopeId2}>${ssrInterpolate(["string", "number"].includes(typeof _ctx.modelValue) ? _ctx.modelValue : _ctx.modelValue[_ctx.optionAttribute])}</span>`);
                  } else {
                    _push3(`<span class="${ssrRenderClass(_ctx.uiMenu.label)}"${_scopeId2}>${ssrInterpolate(_ctx.placeholder || "\xA0")}</span>`);
                  }
                }, _push3, _parent3, _scopeId2);
                if (_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing) {
                  _push3(`<span class="${ssrRenderClass(_ctx.trailingWrapperIconClass)}"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "trailing", {
                    disabled: _ctx.disabled,
                    loading: _ctx.loading
                  }, () => {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: _ctx.trailingIconName,
                      class: _ctx.trailingIconClass,
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</span>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</button>`);
              }, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", {
                  open,
                  disabled: _ctx.disabled,
                  loading: _ctx.loading
                }, () => [
                  createVNode("button", mergeProps({
                    id: _ctx.inputId,
                    class: _ctx.selectClass,
                    disabled: _ctx.disabled,
                    type: "button"
                  }, _ctx.attrs), [
                    _ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: _ctx.leadingWrapperIconClass
                    }, [
                      renderSlot(_ctx.$slots, "leading", {
                        disabled: _ctx.disabled,
                        loading: _ctx.loading
                      }, () => [
                        createVNode(_component_UIcon, {
                          name: _ctx.leadingIconName,
                          class: _ctx.leadingIconClass
                        }, null, 8, ["name", "class"])
                      ])
                    ], 2)) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "label", {}, () => [
                      _ctx.multiple && Array.isArray(_ctx.modelValue) && _ctx.modelValue.length ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: _ctx.uiMenu.label
                      }, toDisplayString(_ctx.modelValue.length) + " selected", 3)) : !_ctx.multiple && _ctx.modelValue ? (openBlock(), createBlock("span", {
                        key: 1,
                        class: _ctx.uiMenu.label
                      }, toDisplayString(["string", "number"].includes(typeof _ctx.modelValue) ? _ctx.modelValue : _ctx.modelValue[_ctx.optionAttribute]), 3)) : (openBlock(), createBlock("span", {
                        key: 2,
                        class: _ctx.uiMenu.label
                      }, toDisplayString(_ctx.placeholder || "\xA0"), 3))
                    ]),
                    _ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: _ctx.trailingWrapperIconClass
                    }, [
                      renderSlot(_ctx.$slots, "trailing", {
                        disabled: _ctx.disabled,
                        loading: _ctx.loading
                      }, () => [
                        createVNode(_component_UIcon, {
                          name: _ctx.trailingIconName,
                          class: _ctx.trailingIconClass,
                          "aria-hidden": "true"
                        }, null, 8, ["name", "class"])
                      ])
                    ], 2)) : createCommentVNode("", true)
                  ], 16, ["id", "disabled"])
                ])
              ];
            }
          }),
          _: 2
        }), _parent2, _scopeId);
        if (open) {
          _push2(`<div class="${ssrRenderClass([_ctx.uiMenu.container, _ctx.uiMenu.width])}"${_scopeId}><template><div${_scopeId}>`);
          if (_ctx.popper.arrow) {
            _push2(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.uiMenu.arrow))}"${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
          ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(_ctx.searchable ? "HComboboxOptions" : "HListboxOptions"), {
            static: "",
            class: [_ctx.uiMenu.base, _ctx.uiMenu.ring, _ctx.uiMenu.rounded, _ctx.uiMenu.shadow, _ctx.uiMenu.background, _ctx.uiMenu.padding, _ctx.uiMenu.height]
          }, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                if (_ctx.searchable) {
                  _push3(ssrRenderComponent(_component_HComboboxInput, {
                    "display-value": () => _ctx.query,
                    name: "q",
                    placeholder: _ctx.searchablePlaceholder,
                    autofocus: "",
                    autocomplete: "off",
                    class: _ctx.uiMenu.input,
                    onChange: _ctx.onChange
                  }, null, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                _push3(`<!--[-->`);
                ssrRenderList(_ctx.filteredOptions, (option, index) => {
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                    key: index,
                    as: "template",
                    value: _ctx.valueAttribute ? option[_ctx.valueAttribute] : option,
                    disabled: option.disabled
                  }, {
                    default: withCtx(({ active, selected, disabled: optionDisabled }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li class="${ssrRenderClass([_ctx.uiMenu.option.base, _ctx.uiMenu.option.rounded, _ctx.uiMenu.option.padding, _ctx.uiMenu.option.size, _ctx.uiMenu.option.color, active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive, selected && _ctx.uiMenu.option.selected, optionDisabled && _ctx.uiMenu.option.disabled])}"${_scopeId3}><div class="${ssrRenderClass(_ctx.uiMenu.option.container)}"${_scopeId3}>`);
                        ssrRenderSlot(_ctx.$slots, "option", {
                          option,
                          active,
                          selected
                        }, () => {
                          if (option.icon) {
                            _push4(ssrRenderComponent(_component_UIcon, {
                              name: option.icon,
                              class: [_ctx.uiMenu.option.icon.base, active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive, option.iconClass],
                              "aria-hidden": "true"
                            }, null, _parent4, _scopeId3));
                          } else if (option.avatar) {
                            _push4(ssrRenderComponent(_component_UAvatar, mergeProps({ size: _ctx.uiMenu.option.avatar.size, ...option.avatar }, {
                              class: _ctx.uiMenu.option.avatar.base,
                              "aria-hidden": "true"
                            }), null, _parent4, _scopeId3));
                          } else if (option.chip) {
                            _push4(`<span class="${ssrRenderClass(_ctx.uiMenu.option.chip.base)}" style="${ssrRenderStyle({ background: `#${option.chip}` })}"${_scopeId3}></span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(["string", "number"].includes(typeof option) ? option : option[_ctx.optionAttribute])}</span>`);
                        }, _push4, _parent4, _scopeId3);
                        _push4(`</div>`);
                        if (selected) {
                          _push4(`<span class="${ssrRenderClass([_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UIcon, {
                            name: _ctx.selectedIcon,
                            class: _ctx.uiMenu.option.selectedIcon.base,
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</li>`);
                      } else {
                        return [
                          createVNode("li", {
                            class: [_ctx.uiMenu.option.base, _ctx.uiMenu.option.rounded, _ctx.uiMenu.option.padding, _ctx.uiMenu.option.size, _ctx.uiMenu.option.color, active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive, selected && _ctx.uiMenu.option.selected, optionDisabled && _ctx.uiMenu.option.disabled]
                          }, [
                            createVNode("div", {
                              class: _ctx.uiMenu.option.container
                            }, [
                              renderSlot(_ctx.$slots, "option", {
                                option,
                                active,
                                selected
                              }, () => [
                                option.icon ? (openBlock(), createBlock(_component_UIcon, {
                                  key: 0,
                                  name: option.icon,
                                  class: [_ctx.uiMenu.option.icon.base, active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive, option.iconClass],
                                  "aria-hidden": "true"
                                }, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({ key: 1 }, { size: _ctx.uiMenu.option.avatar.size, ...option.avatar }, {
                                  class: _ctx.uiMenu.option.avatar.base,
                                  "aria-hidden": "true"
                                }), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: _ctx.uiMenu.option.chip.base,
                                  style: { background: `#${option.chip}` }
                                }, null, 6)) : createCommentVNode("", true),
                                createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : option[_ctx.optionAttribute]), 1)
                              ])
                            ], 2),
                            selected ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
                            }, [
                              createVNode(_component_UIcon, {
                                name: _ctx.selectedIcon,
                                class: _ctx.uiMenu.option.selectedIcon.base,
                                "aria-hidden": "true"
                              }, null, 8, ["name", "class"])
                            ], 2)) : createCommentVNode("", true)
                          ], 2)
                        ];
                      }
                    }),
                    _: 2
                  }), _parent3, _scopeId2);
                });
                _push3(`<!--]-->`);
                if (_ctx.creatable && _ctx.createOption) {
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                    value: _ctx.createOption,
                    as: "template"
                  }, {
                    default: withCtx(({ active, selected }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li class="${ssrRenderClass([_ctx.uiMenu.option.base, _ctx.uiMenu.option.rounded, _ctx.uiMenu.option.padding, _ctx.uiMenu.option.size, _ctx.uiMenu.option.color, active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive])}"${_scopeId3}><div class="${ssrRenderClass(_ctx.uiMenu.option.container)}"${_scopeId3}>`);
                        ssrRenderSlot(_ctx.$slots, "option-create", {
                          option: _ctx.createOption,
                          active,
                          selected
                        }, () => {
                          _push4(`<span class="${ssrRenderClass(_ctx.uiMenu.option.create)}"${_scopeId3}>Create &quot;${ssrInterpolate(_ctx.createOption[_ctx.optionAttribute])}&quot;</span>`);
                        }, _push4, _parent4, _scopeId3);
                        _push4(`</div></li>`);
                      } else {
                        return [
                          createVNode("li", {
                            class: [_ctx.uiMenu.option.base, _ctx.uiMenu.option.rounded, _ctx.uiMenu.option.padding, _ctx.uiMenu.option.size, _ctx.uiMenu.option.color, active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive]
                          }, [
                            createVNode("div", {
                              class: _ctx.uiMenu.option.container
                            }, [
                              renderSlot(_ctx.$slots, "option-create", {
                                option: _ctx.createOption,
                                active,
                                selected
                              }, () => [
                                createVNode("span", {
                                  class: _ctx.uiMenu.option.create
                                }, 'Create "' + toDisplayString(_ctx.createOption[_ctx.optionAttribute]) + '"', 3)
                              ])
                            ], 2)
                          ], 2)
                        ];
                      }
                    }),
                    _: 2
                  }), _parent3, _scopeId2);
                } else if (_ctx.searchable && _ctx.query && !_ctx.filteredOptions.length) {
                  _push3(`<p class="${ssrRenderClass(_ctx.uiMenu.option.empty)}"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => {
                    _push3(` No results for &quot;${ssrInterpolate(_ctx.query)}&quot;. `);
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</p>`);
                } else if (!_ctx.filteredOptions.length) {
                  _push3(`<p class="${ssrRenderClass(_ctx.uiMenu.empty)}"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => {
                    _push3(` No options. `);
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</p>`);
                } else {
                  _push3(`<!---->`);
                }
              } else {
                return [
                  _ctx.searchable ? (openBlock(), createBlock(_component_HComboboxInput, {
                    key: 0,
                    "display-value": () => _ctx.query,
                    name: "q",
                    placeholder: _ctx.searchablePlaceholder,
                    autofocus: "",
                    autocomplete: "off",
                    class: _ctx.uiMenu.input,
                    onChange: _ctx.onChange
                  }, null, 8, ["display-value", "placeholder", "class", "onChange"])) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.filteredOptions, (option, index) => {
                    return openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                      key: index,
                      as: "template",
                      value: _ctx.valueAttribute ? option[_ctx.valueAttribute] : option,
                      disabled: option.disabled
                    }, {
                      default: withCtx(({ active, selected, disabled: optionDisabled }) => [
                        createVNode("li", {
                          class: [_ctx.uiMenu.option.base, _ctx.uiMenu.option.rounded, _ctx.uiMenu.option.padding, _ctx.uiMenu.option.size, _ctx.uiMenu.option.color, active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive, selected && _ctx.uiMenu.option.selected, optionDisabled && _ctx.uiMenu.option.disabled]
                        }, [
                          createVNode("div", {
                            class: _ctx.uiMenu.option.container
                          }, [
                            renderSlot(_ctx.$slots, "option", {
                              option,
                              active,
                              selected
                            }, () => [
                              option.icon ? (openBlock(), createBlock(_component_UIcon, {
                                key: 0,
                                name: option.icon,
                                class: [_ctx.uiMenu.option.icon.base, active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive, option.iconClass],
                                "aria-hidden": "true"
                              }, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({ key: 1 }, { size: _ctx.uiMenu.option.avatar.size, ...option.avatar }, {
                                class: _ctx.uiMenu.option.avatar.base,
                                "aria-hidden": "true"
                              }), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
                                key: 2,
                                class: _ctx.uiMenu.option.chip.base,
                                style: { background: `#${option.chip}` }
                              }, null, 6)) : createCommentVNode("", true),
                              createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : option[_ctx.optionAttribute]), 1)
                            ])
                          ], 2),
                          selected ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
                          }, [
                            createVNode(_component_UIcon, {
                              name: _ctx.selectedIcon,
                              class: _ctx.uiMenu.option.selectedIcon.base,
                              "aria-hidden": "true"
                            }, null, 8, ["name", "class"])
                          ], 2)) : createCommentVNode("", true)
                        ], 2)
                      ]),
                      _: 2
                    }, 1032, ["value", "disabled"]);
                  }), 128)),
                  _ctx.creatable && _ctx.createOption ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                    key: 1,
                    value: _ctx.createOption,
                    as: "template"
                  }, {
                    default: withCtx(({ active, selected }) => [
                      createVNode("li", {
                        class: [_ctx.uiMenu.option.base, _ctx.uiMenu.option.rounded, _ctx.uiMenu.option.padding, _ctx.uiMenu.option.size, _ctx.uiMenu.option.color, active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive]
                      }, [
                        createVNode("div", {
                          class: _ctx.uiMenu.option.container
                        }, [
                          renderSlot(_ctx.$slots, "option-create", {
                            option: _ctx.createOption,
                            active,
                            selected
                          }, () => [
                            createVNode("span", {
                              class: _ctx.uiMenu.option.create
                            }, 'Create "' + toDisplayString(_ctx.createOption[_ctx.optionAttribute]) + '"', 3)
                          ])
                        ], 2)
                      ], 2)
                    ]),
                    _: 3
                  }, 8, ["value"])) : _ctx.searchable && _ctx.query && !_ctx.filteredOptions.length ? (openBlock(), createBlock("p", {
                    key: 2,
                    class: _ctx.uiMenu.option.empty
                  }, [
                    renderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => [
                      createTextVNode(' No results for "' + toDisplayString(_ctx.query) + '". ', 1)
                    ])
                  ], 2)) : !_ctx.filteredOptions.length ? (openBlock(), createBlock("p", {
                    key: 3,
                    class: _ctx.uiMenu.empty
                  }, [
                    renderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => [
                      createTextVNode(" No options. ")
                    ])
                  ], 2)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }), _parent2, _scopeId);
          _push2(`</div></template></div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          _ctx.required ? (openBlock(), createBlock("input", {
            key: 0,
            value: _ctx.modelValue,
            required: _ctx.required,
            class: _ctx.uiMenu.required,
            tabindex: "-1",
            "aria-hidden": "true"
          }, null, 10, ["value", "required"])) : createCommentVNode("", true),
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxButton" : "HListboxButton"), {
            ref: "trigger",
            as: "div",
            role: "button",
            class: _ctx.uiMenu.trigger
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                open,
                disabled: _ctx.disabled,
                loading: _ctx.loading
              }, () => [
                createVNode("button", mergeProps({
                  id: _ctx.inputId,
                  class: _ctx.selectClass,
                  disabled: _ctx.disabled,
                  type: "button"
                }, _ctx.attrs), [
                  _ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: _ctx.leadingWrapperIconClass
                  }, [
                    renderSlot(_ctx.$slots, "leading", {
                      disabled: _ctx.disabled,
                      loading: _ctx.loading
                    }, () => [
                      createVNode(_component_UIcon, {
                        name: _ctx.leadingIconName,
                        class: _ctx.leadingIconClass
                      }, null, 8, ["name", "class"])
                    ])
                  ], 2)) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "label", {}, () => [
                    _ctx.multiple && Array.isArray(_ctx.modelValue) && _ctx.modelValue.length ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: _ctx.uiMenu.label
                    }, toDisplayString(_ctx.modelValue.length) + " selected", 3)) : !_ctx.multiple && _ctx.modelValue ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: _ctx.uiMenu.label
                    }, toDisplayString(["string", "number"].includes(typeof _ctx.modelValue) ? _ctx.modelValue : _ctx.modelValue[_ctx.optionAttribute]), 3)) : (openBlock(), createBlock("span", {
                      key: 2,
                      class: _ctx.uiMenu.label
                    }, toDisplayString(_ctx.placeholder || "\xA0"), 3))
                  ]),
                  _ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: _ctx.trailingWrapperIconClass
                  }, [
                    renderSlot(_ctx.$slots, "trailing", {
                      disabled: _ctx.disabled,
                      loading: _ctx.loading
                    }, () => [
                      createVNode(_component_UIcon, {
                        name: _ctx.trailingIconName,
                        class: _ctx.trailingIconClass,
                        "aria-hidden": "true"
                      }, null, 8, ["name", "class"])
                    ])
                  ], 2)) : createCommentVNode("", true)
                ], 16, ["id", "disabled"])
              ])
            ]),
            _: 2
          }, 1032, ["class"])),
          open ? (openBlock(), createBlock("div", {
            key: 1,
            ref: "container",
            class: [_ctx.uiMenu.container, _ctx.uiMenu.width]
          }, [
            createVNode(Transition, mergeProps({ appear: "" }, _ctx.uiMenu.transition), {
              default: withCtx(() => [
                createVNode("div", null, [
                  _ctx.popper.arrow ? (openBlock(), createBlock("div", {
                    key: 0,
                    "data-popper-arrow": "",
                    class: Object.values(_ctx.uiMenu.arrow)
                  }, null, 2)) : createCommentVNode("", true),
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOptions" : "HListboxOptions"), {
                    static: "",
                    class: [_ctx.uiMenu.base, _ctx.uiMenu.ring, _ctx.uiMenu.rounded, _ctx.uiMenu.shadow, _ctx.uiMenu.background, _ctx.uiMenu.padding, _ctx.uiMenu.height]
                  }, {
                    default: withCtx(() => [
                      _ctx.searchable ? (openBlock(), createBlock(_component_HComboboxInput, {
                        key: 0,
                        "display-value": () => _ctx.query,
                        name: "q",
                        placeholder: _ctx.searchablePlaceholder,
                        autofocus: "",
                        autocomplete: "off",
                        class: _ctx.uiMenu.input,
                        onChange: _ctx.onChange
                      }, null, 8, ["display-value", "placeholder", "class", "onChange"])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.filteredOptions, (option, index) => {
                        return openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                          key: index,
                          as: "template",
                          value: _ctx.valueAttribute ? option[_ctx.valueAttribute] : option,
                          disabled: option.disabled
                        }, {
                          default: withCtx(({ active, selected, disabled: optionDisabled }) => [
                            createVNode("li", {
                              class: [_ctx.uiMenu.option.base, _ctx.uiMenu.option.rounded, _ctx.uiMenu.option.padding, _ctx.uiMenu.option.size, _ctx.uiMenu.option.color, active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive, selected && _ctx.uiMenu.option.selected, optionDisabled && _ctx.uiMenu.option.disabled]
                            }, [
                              createVNode("div", {
                                class: _ctx.uiMenu.option.container
                              }, [
                                renderSlot(_ctx.$slots, "option", {
                                  option,
                                  active,
                                  selected
                                }, () => [
                                  option.icon ? (openBlock(), createBlock(_component_UIcon, {
                                    key: 0,
                                    name: option.icon,
                                    class: [_ctx.uiMenu.option.icon.base, active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive, option.iconClass],
                                    "aria-hidden": "true"
                                  }, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({ key: 1 }, { size: _ctx.uiMenu.option.avatar.size, ...option.avatar }, {
                                    class: _ctx.uiMenu.option.avatar.base,
                                    "aria-hidden": "true"
                                  }), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    class: _ctx.uiMenu.option.chip.base,
                                    style: { background: `#${option.chip}` }
                                  }, null, 6)) : createCommentVNode("", true),
                                  createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : option[_ctx.optionAttribute]), 1)
                                ])
                              ], 2),
                              selected ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
                              }, [
                                createVNode(_component_UIcon, {
                                  name: _ctx.selectedIcon,
                                  class: _ctx.uiMenu.option.selectedIcon.base,
                                  "aria-hidden": "true"
                                }, null, 8, ["name", "class"])
                              ], 2)) : createCommentVNode("", true)
                            ], 2)
                          ]),
                          _: 2
                        }, 1032, ["value", "disabled"]);
                      }), 128)),
                      _ctx.creatable && _ctx.createOption ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                        key: 1,
                        value: _ctx.createOption,
                        as: "template"
                      }, {
                        default: withCtx(({ active, selected }) => [
                          createVNode("li", {
                            class: [_ctx.uiMenu.option.base, _ctx.uiMenu.option.rounded, _ctx.uiMenu.option.padding, _ctx.uiMenu.option.size, _ctx.uiMenu.option.color, active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive]
                          }, [
                            createVNode("div", {
                              class: _ctx.uiMenu.option.container
                            }, [
                              renderSlot(_ctx.$slots, "option-create", {
                                option: _ctx.createOption,
                                active,
                                selected
                              }, () => [
                                createVNode("span", {
                                  class: _ctx.uiMenu.option.create
                                }, 'Create "' + toDisplayString(_ctx.createOption[_ctx.optionAttribute]) + '"', 3)
                              ])
                            ], 2)
                          ], 2)
                        ]),
                        _: 3
                      }, 8, ["value"])) : _ctx.searchable && _ctx.query && !_ctx.filteredOptions.length ? (openBlock(), createBlock("p", {
                        key: 2,
                        class: _ctx.uiMenu.option.empty
                      }, [
                        renderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => [
                          createTextVNode(' No results for "' + toDisplayString(_ctx.query) + '". ', 1)
                        ])
                      ], 2)) : !_ctx.filteredOptions.length ? (openBlock(), createBlock("p", {
                        key: 3,
                        class: _ctx.uiMenu.empty
                      }, [
                        renderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => [
                          createTextVNode(" No options. ")
                        ])
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 8, ["class"]))
                ])
              ]),
              _: 3
            }, 16)
          ], 2)) : createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }), _parent);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt/ui/dist/runtime/components/forms/SelectMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=SelectMenu-eaR332gX.mjs.map
