import { defineComponent, ref, h, computed, provide, onMounted, watch, watchEffect, Fragment, onUnmounted, inject } from 'vue';
import { k as f$1, l as s$2, O as O$1, o as o$3, g as A$3, C as T$1, j as t$5, s as s$3, q as N$3, u as u$6, z as o$2, T as T$2, D as t$1, i as i$4, P, r as N$4 } from './api-omXKkMTj.mjs';

let d = defineComponent({ props: { onFocus: { type: Function, required: true } }, setup(t2) {
  let n = ref(true);
  return () => n.value ? h(f$1, { as: "button", type: "button", features: s$2.Focusable, onFocus(o2) {
    o2.preventDefault();
    let e, a = 50;
    function r() {
      var u2;
      if (a-- <= 0) {
        e && cancelAnimationFrame(e);
        return;
      }
      if ((u2 = t2.onFocus) != null && u2.call(t2)) {
        n.value = false, cancelAnimationFrame(e);
        return;
      }
      e = requestAnimationFrame(r);
    }
    e = requestAnimationFrame(r);
  } }) : null;
} });
var te = ((i2) => (i2[i2.Forwards = 0] = "Forwards", i2[i2.Backwards = 1] = "Backwards", i2))(te || {}), le = ((s2) => (s2[s2.Less = -1] = "Less", s2[s2.Equal = 0] = "Equal", s2[s2.Greater = 1] = "Greater", s2))(le || {});
let U = Symbol("TabsContext");
function k(a) {
  let v = inject(U, null);
  if (v === null) {
    let i2 = new Error(`<${a} /> is missing a parent <TabGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(i2, k), i2;
  }
  return v;
}
let j = Symbol("TabsSSRContext"), me = defineComponent({ name: "TabGroup", emits: { change: (a) => true }, props: { as: { type: [Object, String], default: "template" }, selectedIndex: { type: [Number], default: null }, defaultIndex: { type: [Number], default: 0 }, vertical: { type: [Boolean], default: false }, manual: { type: [Boolean], default: false } }, inheritAttrs: false, setup(a, { slots: v, attrs: i2, emit: s2 }) {
  var P2;
  let l = ref((P2 = a.selectedIndex) != null ? P2 : a.defaultIndex), n = ref([]), d$1 = ref([]), h$1 = computed(() => a.selectedIndex !== null), b = computed(() => h$1.value ? a.selectedIndex : l.value);
  function m(t2) {
    var S;
    let e = O$1(r.tabs.value, o$3), u$1 = O$1(r.panels.value, o$3), f2 = e.filter((p) => {
      var g;
      return !((g = o$3(p)) != null && g.hasAttribute("disabled"));
    });
    if (t2 < 0 || t2 > e.length - 1) {
      let p = u$6(l.value === null ? 0 : Math.sign(t2 - l.value), { [-1]: () => 1, [0]: () => u$6(Math.sign(t2), { [-1]: () => 0, [0]: () => 0, [1]: () => 1 }), [1]: () => 0 }), g = u$6(p, { [0]: () => e.indexOf(f2[0]), [1]: () => e.indexOf(f2[f2.length - 1]) });
      g !== -1 && (l.value = g), r.tabs.value = e, r.panels.value = u$1;
    } else {
      let p = e.slice(0, t2), G = [...e.slice(t2), ...p].find((W) => f2.includes(W));
      if (!G)
        return;
      let B = (S = e.indexOf(G)) != null ? S : r.selectedIndex.value;
      B === -1 && (B = r.selectedIndex.value), l.value = B, r.tabs.value = e, r.panels.value = u$1;
    }
  }
  let r = { selectedIndex: computed(() => {
    var t2, e;
    return (e = (t2 = l.value) != null ? t2 : a.defaultIndex) != null ? e : null;
  }), orientation: computed(() => a.vertical ? "vertical" : "horizontal"), activation: computed(() => a.manual ? "manual" : "auto"), tabs: n, panels: d$1, setSelectedIndex(t2) {
    b.value !== t2 && s2("change", t2), h$1.value || m(t2);
  }, registerTab(t2) {
    var f2;
    if (n.value.includes(t2))
      return;
    let e = n.value[l.value];
    n.value.push(t2), n.value = O$1(n.value, o$3);
    let u2 = (f2 = n.value.indexOf(e)) != null ? f2 : l.value;
    u2 !== -1 && (l.value = u2);
  }, unregisterTab(t2) {
    let e = n.value.indexOf(t2);
    e !== -1 && n.value.splice(e, 1);
  }, registerPanel(t2) {
    d$1.value.includes(t2) || (d$1.value.push(t2), d$1.value = O$1(d$1.value, o$3));
  }, unregisterPanel(t2) {
    let e = d$1.value.indexOf(t2);
    e !== -1 && d$1.value.splice(e, 1);
  } };
  provide(U, r);
  let w = ref({ tabs: [], panels: [] }), y = ref(false);
  onMounted(() => {
    y.value = true;
  }), provide(j, computed(() => y.value ? null : w.value));
  let E = computed(() => a.selectedIndex);
  return onMounted(() => {
    watch([E], () => {
      var t2;
      return m((t2 = a.selectedIndex) != null ? t2 : a.defaultIndex);
    }, { immediate: true });
  }), watchEffect(() => {
    if (!h$1.value || b.value == null || r.tabs.value.length <= 0)
      return;
    let t2 = O$1(r.tabs.value, o$3);
    t2.some((u2, f2) => o$3(r.tabs.value[f2]) !== o$3(u2)) && r.setSelectedIndex(t2.findIndex((u2) => o$3(u2) === o$3(r.tabs.value[b.value])));
  }), () => {
    let t2 = { selectedIndex: l.value };
    return h(Fragment, [n.value.length <= 0 && h(d, { onFocus: () => {
      for (let e of n.value) {
        let u2 = o$3(e);
        if ((u2 == null ? void 0 : u2.tabIndex) === 0)
          return u2.focus(), true;
      }
      return false;
    } }), A$3({ theirProps: { ...i2, ...T$1(a, ["selectedIndex", "defaultIndex", "manual", "vertical", "onChange"]) }, ourProps: {}, slot: t2, slots: v, attrs: i2, name: "TabGroup" })]);
  };
} }), pe = defineComponent({ name: "TabList", props: { as: { type: [Object, String], default: "div" } }, setup(a, { attrs: v, slots: i2 }) {
  let s2 = k("TabList");
  return () => {
    let l = { selectedIndex: s2.selectedIndex.value }, n = { role: "tablist", "aria-orientation": s2.orientation.value };
    return A$3({ ourProps: n, theirProps: a, slot: l, attrs: v, slots: i2, name: "TabList" });
  };
} }), xe = defineComponent({ name: "Tab", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-tabs-tab-${t$5()}` } }, setup(a, { attrs: v, slots: i$1, expose: s2 }) {
  let l = k("Tab"), n = ref(null);
  s2({ el: n, $el: n }), onMounted(() => l.registerTab(n)), onUnmounted(() => l.unregisterTab(n));
  let d2 = inject(j), h2 = computed(() => {
    if (d2.value) {
      let e = d2.value.tabs.indexOf(a.id);
      return e === -1 ? d2.value.tabs.push(a.id) - 1 : e;
    }
    return -1;
  }), b = computed(() => {
    let e = l.tabs.value.indexOf(n);
    return e === -1 ? h2.value : e;
  }), m = computed(() => b.value === l.selectedIndex.value);
  function r(e) {
    var f2;
    let u2 = e();
    if (u2 === T$2.Success && l.activation.value === "auto") {
      let S = (f2 = i$4(n)) == null ? void 0 : f2.activeElement, p = l.tabs.value.findIndex((g) => o$3(g) === S);
      p !== -1 && l.setSelectedIndex(p);
    }
    return u2;
  }
  function w(e) {
    let u$1 = l.tabs.value.map((S) => o$3(S)).filter(Boolean);
    if (e.key === o$2.Space || e.key === o$2.Enter) {
      e.preventDefault(), e.stopPropagation(), l.setSelectedIndex(b.value);
      return;
    }
    switch (e.key) {
      case o$2.Home:
      case o$2.PageUp:
        return e.preventDefault(), e.stopPropagation(), r(() => P(u$1, N$4.First));
      case o$2.End:
      case o$2.PageDown:
        return e.preventDefault(), e.stopPropagation(), r(() => P(u$1, N$4.Last));
    }
    if (r(() => u$6(l.orientation.value, { vertical() {
      return e.key === o$2.ArrowUp ? P(u$1, N$4.Previous | N$4.WrapAround) : e.key === o$2.ArrowDown ? P(u$1, N$4.Next | N$4.WrapAround) : T$2.Error;
    }, horizontal() {
      return e.key === o$2.ArrowLeft ? P(u$1, N$4.Previous | N$4.WrapAround) : e.key === o$2.ArrowRight ? P(u$1, N$4.Next | N$4.WrapAround) : T$2.Error;
    } })) === T$2.Success)
      return e.preventDefault();
  }
  let y = ref(false);
  function E() {
    var e;
    y.value || (y.value = true, !a.disabled && ((e = o$3(n)) == null || e.focus({ preventScroll: true }), l.setSelectedIndex(b.value), t$1(() => {
      y.value = false;
    })));
  }
  function P$1(e) {
    e.preventDefault();
  }
  let t2 = s$3(computed(() => ({ as: a.as, type: v.type })), n);
  return () => {
    var p;
    let e = { selected: m.value }, { id: u2, ...f2 } = a, S = { ref: n, onKeydown: w, onMousedown: P$1, onClick: E, id: u2, role: "tab", type: t2.value, "aria-controls": (p = o$3(l.panels.value[b.value])) == null ? void 0 : p.id, "aria-selected": m.value, tabIndex: m.value ? 0 : -1, disabled: a.disabled ? true : void 0 };
    return A$3({ ourProps: S, theirProps: f2, slot: e, attrs: v, slots: i$1, name: "Tab" });
  };
} }), Ie = defineComponent({ name: "TabPanels", props: { as: { type: [Object, String], default: "div" } }, setup(a, { slots: v, attrs: i2 }) {
  let s2 = k("TabPanels");
  return () => {
    let l = { selectedIndex: s2.selectedIndex.value };
    return A$3({ theirProps: a, ourProps: {}, slot: l, attrs: i2, slots: v, name: "TabPanels" });
  };
} }), ye = defineComponent({ name: "TabPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-tabs-panel-${t$5()}` }, tabIndex: { type: Number, default: 0 } }, setup(a, { attrs: v, slots: i2, expose: s2 }) {
  let l = k("TabPanel"), n = ref(null);
  s2({ el: n, $el: n }), onMounted(() => l.registerPanel(n)), onUnmounted(() => l.unregisterPanel(n));
  let d2 = inject(j), h$1 = computed(() => {
    if (d2.value) {
      let r = d2.value.panels.indexOf(a.id);
      return r === -1 ? d2.value.panels.push(a.id) - 1 : r;
    }
    return -1;
  }), b = computed(() => {
    let r = l.panels.value.indexOf(n);
    return r === -1 ? h$1.value : r;
  }), m = computed(() => b.value === l.selectedIndex.value);
  return () => {
    var t2;
    let r = { selected: m.value }, { id: w, tabIndex: y, ...E } = a, P2 = { ref: n, id: w, role: "tabpanel", "aria-labelledby": (t2 = o$3(l.tabs.value[b.value])) == null ? void 0 : t2.id, tabIndex: m.value ? y : -1 };
    return !m.value && a.unmount && !a.static ? h(f$1, { as: "span", "aria-hidden": true, ...P2 }) : A$3({ ourProps: P2, theirProps: E, slot: r, attrs: v, slots: i2, features: N$3.Static | N$3.RenderStrategy, visible: m.value, name: "TabPanel" });
  };
} });

export { Ie as I, me as m, pe as p, xe as x, ye as y };
//# sourceMappingURL=tabs-YeRvdbO8.mjs.map
