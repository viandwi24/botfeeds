import { _ as __nuxt_component_0 } from './SelectMenu-eaR332gX.mjs';
import { useSSRContext, defineComponent, ref, computed, unref, watch, mergeProps, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { d as __nuxt_component_1 } from '../server.mjs';
import { c as __nuxt_component_1$1 } from './api-omXKkMTj.mjs';
import { _ as _sfc_main$2 } from './OutputSelectorDataConfig-lfVkf0CU.mjs';
import '@vueuse/core';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'tailwind-merge';
import '@tanstack/vue-virtual';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InputSelectorDataConfig",
  __ssrInlineRender: true,
  props: {
    runtimeContext: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    itemType: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const inputKey = ref((_b = (_a = props == null ? void 0 : props.config) == null ? void 0 : _a.option) == null ? void 0 : _b.input);
    watch(inputKey, (value) => {
      props.config["option"]["input"] = value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelectMenu = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-2" }, _attrs))}><label>Select Input Variable</label><div><div class="">`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(inputKey),
        "onUpdate:modelValue": ($event) => isRef(inputKey) ? inputKey.value = $event : null,
        options: __props.runtimeContext.inputs.filter((item) => __props.itemType ? __props.itemType === item[1] : true).map((item) => item[0])
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/Editor/InputSelectorDataConfig.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FilterSimplePipe",
  __ssrInlineRender: true,
  props: {
    i: {
      type: Number,
      required: true
    },
    trigger: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    runtimeContext: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const data = ref({ ...props.config });
    const pipeContext = computed(() => {
      return props.runtimeContext.preparedPipes[props.i];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageTriggerEditorInputSelectorDataConfig = _sfc_main$1;
      const _component_UButton = __nuxt_component_1;
      const _component_UInput = __nuxt_component_1$1;
      const _component_PageTriggerEditorOutputSelectorDataConfig = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col gap-4">`);
      _push(ssrRenderComponent(_component_PageTriggerEditorInputSelectorDataConfig, {
        "runtime-context": unref(pipeContext),
        config: __props.config
      }, null, _parent));
      _push(`<div class="flex flex-col gap-2"><label>Blacklist Words</label><div>`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "xs",
        color: "green",
        onClick: () => unref(data).option.blacklistWords.push(""),
        icon: "i-heroicons-plus-20-solid",
        label: "Add",
        class: "mb-2"
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(data).option.blacklistWords, (item, i) => {
        _push(`<div class="flex">`);
        _push(ssrRenderComponent(_component_UButton, {
          class: "mr-2",
          size: "xs",
          color: "red",
          onClick: () => unref(data).option.blacklistWords.splice(i, 1),
          icon: "i-heroicons-minus-20-solid"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          class: "",
          modelValue: unref(data).option.blacklistWords[i],
          "onUpdate:modelValue": ($event) => unref(data).option.blacklistWords[i] = $event
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_PageTriggerEditorOutputSelectorDataConfig, {
        config: unref(data),
        itemType: "string"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/Editor/FilterSimplePipe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=FilterSimplePipe-TJWlM5Jg.mjs.map
