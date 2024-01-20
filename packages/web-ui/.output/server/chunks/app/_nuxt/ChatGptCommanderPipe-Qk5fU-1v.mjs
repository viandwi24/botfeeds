import { _ as __nuxt_component_2 } from './Textarea-6V0x6Apb.mjs';
import { _ as _sfc_main$1 } from './OutputSelectorDataConfig-lfVkf0CU.mjs';
import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import 'tailwind-merge';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './api-omXKkMTj.mjs';
import '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChatGptCommanderPipe",
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
    computed(() => {
      return props.runtimeContext.preparedPipes[props.i];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTextarea = __nuxt_component_2;
      const _component_PageTriggerEditorOutputSelectorDataConfig = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col gap-4"><div class="flex flex-col gap-2"><label>Prompt</label>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        placeholder: "Prompt",
        modelValue: unref(data).option.prompt,
        "onUpdate:modelValue": ($event) => unref(data).option.prompt = $event
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_PageTriggerEditorOutputSelectorDataConfig, { config: unref(data) }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/Editor/ChatGptCommanderPipe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ChatGptCommanderPipe-Qk5fU-1v.mjs.map
