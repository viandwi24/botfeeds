import { c as __nuxt_component_1 } from './api-omXKkMTj.mjs';
import { defineComponent, ref, watch, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OutputSelectorDataConfig",
  __ssrInlineRender: true,
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const data = ref({ ...props.config });
    const outputKey = ref((_b = (_a = data.value) == null ? void 0 : _a.option) == null ? void 0 : _b.output[0]);
    watch(outputKey, (val) => {
      try {
        data.value.option.output[0] = val;
      } catch (error) {
        data.value["option"]["output"] = [val, "string"];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-2" }, _attrs))}><label>Variable Output</label><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_UInput, {
        placeholder: "Prompt",
        modelValue: unref(outputKey),
        "onUpdate:modelValue": ($event) => isRef(outputKey) ? outputKey.value = $event : null,
        class: "flex-1"
      }, null, _parent));
      _push(`<span>, ${ssrInterpolate(unref(data).option.output[1])}</span></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/Editor/OutputSelectorDataConfig.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=OutputSelectorDataConfig-lfVkf0CU.mjs.map
