import { a as __nuxt_component_0$4 } from '../server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import 'tailwind-merge';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const menus = ref([
      {
        type: "item",
        name: "Dashboard",
        path: "/"
      },
      {
        type: "header",
        name: "Automation"
      },
      {
        type: "item",
        name: "Trigger",
        path: "/triggers"
      },
      {
        type: "item",
        name: "Feeds",
        path: "/feeds"
      },
      {
        type: "header",
        name: "Bots"
      },
      {
        type: "item",
        name: "Telegram",
        path: "/bots/telegram"
      },
      {
        type: "item",
        name: "Twitter",
        path: "/bots/twitter"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-950 text-gray-100 min-h-screen w-full flex flex-col" }, _attrs))}><div class="w-screen h-[64px] sticky flex border-b border-gray-600"><div class="flex-1 flex items-center max-w-screen-xl w-full mx-auto px-4"><div class="font-semibold text-xl">BOT FEEDS</div></div></div><div class="flex-1 max-w-screen-xl w-full mx-auto py-4 flex gap-6"><div class="w-[160px] flex flex-col"><!--[-->`);
      ssrRenderList(unref(menus), (item) => {
        _push(`<!--[-->`);
        if (item.type === "item" && item.path) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.path,
            class: "px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-50",
            "active-class": "bg-gray-700 text-gray-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (item.type === "header") {
          _push(`<div class="px-4 py-2 mt-4 rounded-lg text-gray-400">${ssrInterpolate(item.name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><div class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><footer class="border-t border-gray-600"><div class="max-w-screen-xl w-full mx-auto py-4 flex gap-6"> \xA9 2023 </div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-5gw8J3ho.mjs.map
