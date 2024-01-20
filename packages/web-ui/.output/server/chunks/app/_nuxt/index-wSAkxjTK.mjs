import { m as me, p as pe, x as xe, I as Ie, y as ye } from './tabs-YeRvdbO8.mjs';
import { x as useFormGroup, p as parseApiURL, a as __nuxt_component_1$1, b as _sfc_main$1$1, c as __nuxt_component_1$2, _ as _sfc_main$4$1 } from './api-omXKkMTj.mjs';
import { m as mergeConfig, s as select, f as appConfig, h as __nuxt_component_0$2, g as useUI, i as useInjectButtonGroup, _ as _export_sfc, b as useToast, d as __nuxt_component_1, j as get, k as __nuxt_component_3$1 } from '../server.mjs';
import { useSSRContext, defineComponent, toRef, computed, defineAsyncComponent, mergeProps, withCtx, createVNode, ref, watch, unref, withModifiers, openBlock, createBlock, createCommentVNode, createTextVNode, Fragment, renderList, toDisplayString, Teleport } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderTeleport, ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot } from 'vue/server-renderer';
import { twMerge, twJoin } from 'tailwind-merge';
import debounce from 'lodash/debounce.js';
import 'dayjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@vueuse/core';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "RuntimeContextInputsViewer",
  __ssrInlineRender: true,
  props: {
    runtimeContext: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const toast = useToast();
    const copyClip = (text) => {
      if ((void 0).clipboard) {
        (void 0).clipboard.writeText(text);
      } else {
        const input = (void 0).createElement("input");
        input.value = text;
        (void 0).body.appendChild(input);
        input.select();
        (void 0).execCommand("copy");
        (void 0).body.removeChild(input);
      }
      toast.add({
        title: "Copied",
        description: `Copied ${text}`,
        color: "green"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDropdown = __nuxt_component_1$1;
      const _component_UButton = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UDropdown, mergeProps({
        items: [__props.runtimeContext.inputs.map((item) => ({
          label: `{{${item[0]}}}`,
          click: () => copyClip(`{{${item[0]}}}`)
        }))]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              label: "Variables",
              "trailing-icon": "i-heroicons-chevron-down-20-solid"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "white",
                label: "Variables",
                "trailing-icon": "i-heroicons-chevron-down-20-solid"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/Editor/RuntimeContextInputsViewer.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.select, select);
const _sfc_main$4 = defineComponent({
  components: {
    UIcon: __nuxt_component_0$2
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
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
    padded: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
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
      default: "value"
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
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    const { ui, attrs } = useUI("select", toRef(props, "ui"), config, toRef(props, "class"));
    const { size: sizeButtonGroup, rounded } = useInjectButtonGroup({ ui, props });
    const { emitFormChange, inputId, color, size: sizeFormGroup, name } = useFormGroup(props, config);
    const size = computed(() => sizeButtonGroup.value || sizeFormGroup.value);
    const onInput = (event) => {
      emit("update:modelValue", event.target.value);
    };
    const onChange = (event) => {
      emitFormChange();
      emit("change", event);
    };
    const guessOptionValue = (option) => {
      return get(option, props.valueAttribute, get(option, props.optionAttribute));
    };
    const guessOptionText = (option) => {
      return get(option, props.optionAttribute, get(option, props.valueAttribute));
    };
    const normalizeOption = (option) => {
      if (["string", "number", "boolean"].includes(typeof option)) {
        return {
          [props.valueAttribute]: option,
          [props.optionAttribute]: option
        };
      }
      return {
        ...option,
        [props.valueAttribute]: guessOptionValue(option),
        [props.optionAttribute]: guessOptionText(option)
      };
    };
    const normalizedOptions = computed(() => {
      return props.options.map((option) => normalizeOption(option));
    });
    const normalizedOptionsWithPlaceholder = computed(() => {
      if (!props.placeholder) {
        return normalizedOptions.value;
      }
      return [
        {
          [props.valueAttribute]: "",
          [props.optionAttribute]: props.placeholder,
          disabled: true
        },
        ...normalizedOptions.value
      ];
    });
    const normalizedValue = computed(() => {
      const normalizeModelValue = normalizeOption(props.modelValue);
      const foundOption = normalizedOptionsWithPlaceholder.value.find((option) => option[props.valueAttribute] === normalizeModelValue[props.valueAttribute]);
      if (!foundOption) {
        return "";
      }
      return foundOption[props.valueAttribute];
    });
    const selectClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        rounded.value,
        ui.value.size[size.value],
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
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      normalizedOptionsWithPlaceholder,
      normalizedValue,
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
      onInput,
      onChange
    };
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><select${ssrRenderAttrs(mergeProps({
    id: _ctx.inputId,
    name: _ctx.name,
    value: _ctx.modelValue,
    required: _ctx.required,
    disabled: _ctx.disabled,
    class: _ctx.selectClass
  }, _ctx.attrs))}><!--[-->`);
  ssrRenderList(_ctx.normalizedOptionsWithPlaceholder, (option, index2) => {
    _push(`<!--[-->`);
    if (option.children) {
      _push(`<optgroup${ssrRenderAttr("value", option[_ctx.valueAttribute])}${ssrRenderAttr("label", option[_ctx.optionAttribute])}><!--[-->`);
      ssrRenderList(option.children, (childOption, index22) => {
        _push(`<option${ssrRenderAttr("value", childOption[_ctx.valueAttribute])}${ssrIncludeBooleanAttr(childOption[_ctx.valueAttribute] === _ctx.normalizedValue) ? " selected" : ""}${ssrIncludeBooleanAttr(childOption.disabled) ? " disabled" : ""}>${ssrInterpolate(childOption[_ctx.optionAttribute])}</option>`);
      });
      _push(`<!--]--></optgroup>`);
    } else {
      _push(`<option${ssrRenderAttr("value", option[_ctx.valueAttribute])}${ssrIncludeBooleanAttr(option[_ctx.valueAttribute] === _ctx.normalizedValue) ? " selected" : ""}${ssrIncludeBooleanAttr(option.disabled) ? " disabled" : ""}>${ssrInterpolate(option[_ctx.optionAttribute])}</option>`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></select>`);
  if (_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading) {
    _push(`<span class="${ssrRenderClass(_ctx.leadingWrapperIconClass)}">`);
    ssrRenderSlot(_ctx.$slots, "leading", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.leadingIconName,
        class: _ctx.leadingIconClass
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing) {
    _push(`<span class="${ssrRenderClass(_ctx.trailingWrapperIconClass)}">`);
    ssrRenderSlot(_ctx.$slots, "trailing", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.trailingIconName,
        class: _ctx.trailingIconClass,
        "aria-hidden": "true"
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt/ui/dist/runtime/components/forms/Select.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const __nuxt_component_4_lazy = defineAsyncComponent(() => import('./ChatGptCommanderPipe-Qk5fU-1v.mjs').then((m) => m.default || m));
const __nuxt_component_5_lazy = defineAsyncComponent(() => import('./FilterSimplePipe-TJWlM5Jg.mjs').then((m) => m.default || m));
const __nuxt_component_6_lazy = defineAsyncComponent(() => import('./OutputPipe-t-_EQ506.mjs').then((m) => m.default || m));
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Trigger",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const data = ref(props.data);
    const bots = ref([]);
    ref(false);
    const save = async () => {
      try {
        if (props.mode === "edit") {
          const res = await $fetch(parseApiURL(`/triggers/${props.data.id}`), {
            method: "PUT",
            body: JSON.stringify({
              name: data.value.name,
              config: {
                ...data.value.config
              }
              // bots: selectedBots.value
            })
          });
          console.log(res);
        } else {
          const res = await $fetch(parseApiURL(`/triggers`), {
            method: "POST",
            body: JSON.stringify({
              name: data.value.name,
              config: {
                ...data.value.config
              }
            })
          });
          console.log(res);
        }
        toast.add({
          title: "Success",
          description: `Source ${data.value.name} saved`,
          color: "green"
        });
      } catch (error) {
        console.error(error);
        toast.add({
          title: "Error",
          description: `Error: ${error}`,
          color: "red"
        });
      }
      emit("close");
    };
    const currentConfig = ref({ ...data.value.config });
    const runtimeContext = ref();
    const getTgetTestedContextFromRuntimeLoading = ref(false);
    const getTestedContextFromRuntime = async () => {
      var _a;
      try {
        getTgetTestedContextFromRuntimeLoading.value = true;
        const res = await $fetch(parseApiURL(`/triggers/test-runtime`), {
          method: "POST",
          body: JSON.stringify({
            config: currentConfig.value
          })
        });
        runtimeContext.value = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.context;
        console.log("getTestedContextFromRuntime", runtimeContext.value);
      } catch (error) {
        console.error(error);
      }
      getTgetTestedContextFromRuntimeLoading.value = false;
    };
    const getPipeContextByIndex = (runtimeContext2, index2) => {
      return runtimeContext2.preparedPipes[index2];
    };
    const debouncedGetTestedContextFromRuntime = debounce(getTestedContextFromRuntime, 1e3);
    watch(currentConfig, () => {
      debouncedGetTestedContextFromRuntime();
    }, { deep: true });
    const modalAddPipeList = ref([
      {
        name: "chatgpt.commander",
        label: "Chat GPT - Commander Prompt",
        initialConfig: {
          name: "chatgpt.commander",
          option: {
            input: void 0,
            prompt: "input your prompt here",
            output: ["Summarized", "string"]
          }
        }
      },
      {
        name: "filter.simple",
        label: "Filter - Simple",
        initialConfig: {
          name: "filter.simple",
          option: { input: void 0, blacklistWords: ["ngentod"], output: ["Filtered", "string"] }
        }
      }
    ]);
    const modalAddPipe = ref();
    const modalAddPipeActionSave = () => {
      const pipe = modalAddPipeList.value.find((item) => {
        var _a;
        return item.name === ((_a = modalAddPipe.value) == null ? void 0 : _a.pipe);
      });
      if (modalAddPipe.value && modalAddPipe.value.pipe && pipe) {
        let prevI = 0;
        if (modalAddPipe.value.mode === "after") {
          const _prevI = modalAddPipe.value.currI;
          prevI = _prevI + 1;
        } else {
          const _prevI = modalAddPipe.value.currI;
          prevI = _prevI;
        }
        if (pipe) {
          currentConfig.value.pipes.splice(prevI, 0, pipe.initialConfig);
        }
        modalAddPipe.value.show = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$1$1;
      const _component_UInput = __nuxt_component_1$2;
      const _component_PageTriggerEditorRuntimeContextInputsViewer = _sfc_main$5;
      const _component_Icon = __nuxt_component_3$1;
      const _component_LazyPageTriggerEditorChatGptCommanderPipe = __nuxt_component_4_lazy;
      const _component_LazyPageTriggerEditorFilterSimplePipe = __nuxt_component_5_lazy;
      const _component_LazyPageTriggerEditorOutputPipe = __nuxt_component_6_lazy;
      const _component_UButton = __nuxt_component_1;
      const _component_USelect = __nuxt_component_8;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: true,
        title: __props.mode === "edit" ? "Edit Trigger" : "Create Trigger",
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
            {
              _push2(`<div class="flex flex-col gap-4"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Name</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(data).name,
                "onUpdate:modelValue": ($event) => unref(data).name = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="h-0.5 w-full bg-gray-500 rounded"${_scopeId}></div><div class="flex flex-col gap-2"${_scopeId}><div class="font-semibold"${_scopeId}> Pipes `);
              if (unref(getTgetTestedContextFromRuntimeLoading)) {
                _push2(`<span${_scopeId}>Testing in runtime...</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(runtimeContext) && unref(currentConfig) && unref(data)) {
                _push2(`<div class="flex flex-col gap-4"${_scopeId}><!--[-->`);
                ssrRenderList(unref(currentConfig).pipes, (pipe, i) => {
                  _push2(`<div${_scopeId}><div class="flex flex-col gap-2 items-center justify-center mb-3"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_PageTriggerEditorRuntimeContextInputsViewer, {
                    "runtime-context": unref(runtimeContext).preparedPipes[i]
                  }, null, _parent2, _scopeId));
                  _push2(`<div${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: "i-heroicons-arrow-down-20-solid",
                    class: "text-gray-500 text-2xl"
                  }, null, _parent2, _scopeId));
                  _push2(`</div></div><div class="py-4 rounded border border-gray-500"${_scopeId}><div class="font-semibold pb-4 w-full text-center border-b border-gray-500"${_scopeId}>${ssrInterpolate(pipe.name)}</div><div class="px-4 pt-4"${_scopeId}>`);
                  if (pipe.name === "chatgpt.commander") {
                    _push2(ssrRenderComponent(_component_LazyPageTriggerEditorChatGptCommanderPipe, {
                      i,
                      trigger: unref(data),
                      config: unref(currentConfig).pipes[i],
                      runtimeContext: unref(runtimeContext)
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  if (pipe.name === "filter.simple") {
                    _push2(ssrRenderComponent(_component_LazyPageTriggerEditorFilterSimplePipe, {
                      i,
                      trigger: unref(data),
                      config: unref(currentConfig).pipes[i],
                      runtimeContext: unref(runtimeContext)
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  if (pipe.name === "output") {
                    _push2(ssrRenderComponent(_component_LazyPageTriggerEditorOutputPipe, {
                      i,
                      trigger: unref(data),
                      config: unref(currentConfig).pipes[i],
                      runtimeContext: unref(runtimeContext),
                      bots: unref(bots),
                      onConfigUpdated: (newConfig) => {
                        unref(currentConfig).pipes[i]["option"]["bots"] = newConfig;
                      }
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="px-4 mt-4 pt-4 flex justify-between items-center border-t border-gray-500 text-sm"${_scopeId}><div${_scopeId}>`);
                  if (getPipeContextByIndex(unref(runtimeContext), i).outputs.length > 0) {
                    _push2(`<div${_scopeId}><div${_scopeId}> Output Variable : <!--[-->`);
                    ssrRenderList(getPipeContextByIndex(unref(runtimeContext), i).outputs, (item, j) => {
                      _push2(`<span${_scopeId}>${ssrInterpolate(item[0])}</span>`);
                    });
                    _push2(`<!--]--></div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="flex gap-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UButton, {
                    size: "xs",
                    color: "green",
                    label: "+",
                    icon: "i-heroicons-arrow-up-20-solid",
                    onClick: () => {
                      modalAddPipe.value = {
                        show: true,
                        pipe: "chatgpt.commander",
                        currI: i,
                        mode: "before"
                      };
                    }
                  }, null, _parent2, _scopeId));
                  if (pipe.name !== "output") {
                    _push2(`<!--[-->`);
                    _push2(ssrRenderComponent(_component_UButton, {
                      size: "xs",
                      color: "green",
                      label: "+",
                      icon: "i-heroicons-arrow-down-20-solid",
                      onClick: () => {
                        modalAddPipe.value = {
                          show: true,
                          pipe: "chatgpt.commander",
                          currI: i,
                          mode: "after"
                        };
                      }
                    }, null, _parent2, _scopeId));
                    _push2(ssrRenderComponent(_component_UButton, {
                      size: "xs",
                      color: "red",
                      icon: "i-heroicons-trash-20-solid",
                      onClick: () => {
                        unref(currentConfig).pipes.splice(i, 1);
                      }
                    }, null, _parent2, _scopeId));
                    _push2(`<!--]-->`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></div>`);
                  if (i !== unref(currentConfig).pipes.length - 1) {
                    _push2(`<div class="flex items-center justify-center mt-3"${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_Icon, {
                      name: "i-heroicons-arrow-down-20-solid",
                      class: "text-gray-500 text-2xl"
                    }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            }
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(_component_Modal, {
                open: unref(modalAddPipe) && unref(modalAddPipe).show,
                title: "Add Pipe",
                onClose: () => {
                  if (unref(modalAddPipe)) {
                    unref(modalAddPipe).show = false;
                  }
                }
              }, {
                "footer-actions": withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_UButton, {
                      color: "green",
                      label: "Add",
                      onClick: modalAddPipeActionSave
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        color: "green",
                        label: "Add",
                        onClick: withModifiers(modalAddPipeActionSave, ["prevent"])
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    if (unref(modalAddPipe)) {
                      _push4(`<div class="flex flex-col"${_scopeId2}><div class="flex flex-col gap-2"${_scopeId2}><label${_scopeId2}>Pipe</label>`);
                      _push4(ssrRenderComponent(_component_USelect, {
                        modelValue: unref(modalAddPipe).pipe,
                        "onUpdate:modelValue": ($event) => unref(modalAddPipe).pipe = $event,
                        options: unref(modalAddPipeList),
                        placeholder: "Select Pipe",
                        "value-attribute": "name",
                        "option-attribute": "label"
                      }, null, _parent3, _scopeId2));
                      _push4(`</div></div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      unref(modalAddPipe) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col"
                      }, [
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("label", null, "Pipe"),
                          createVNode(_component_USelect, {
                            modelValue: unref(modalAddPipe).pipe,
                            "onUpdate:modelValue": ($event) => unref(modalAddPipe).pipe = $event,
                            options: unref(modalAddPipeList),
                            placeholder: "Select Pipe",
                            "value-attribute": "name",
                            "option-attribute": "label"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                        ])
                      ])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, "body", false, _parent2);
          } else {
            return [
              (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col gap-4"
              }, [
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", null, "Name"),
                  createVNode(_component_UInput, {
                    modelValue: unref(data).name,
                    "onUpdate:modelValue": ($event) => unref(data).name = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "h-0.5 w-full bg-gray-500 rounded" }),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("div", { class: "font-semibold" }, [
                    createTextVNode(" Pipes "),
                    unref(getTgetTestedContextFromRuntimeLoading) ? (openBlock(), createBlock("span", { key: 0 }, "Testing in runtime...")) : createCommentVNode("", true)
                  ]),
                  unref(runtimeContext) && unref(currentConfig) && unref(data) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col gap-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(currentConfig).pipes, (pipe, i) => {
                      return openBlock(), createBlock("div", { key: i }, [
                        createVNode("div", { class: "flex flex-col gap-2 items-center justify-center mb-3" }, [
                          createVNode(_component_PageTriggerEditorRuntimeContextInputsViewer, {
                            "runtime-context": unref(runtimeContext).preparedPipes[i]
                          }, null, 8, ["runtime-context"]),
                          createVNode("div", null, [
                            createVNode(_component_Icon, {
                              name: "i-heroicons-arrow-down-20-solid",
                              class: "text-gray-500 text-2xl"
                            })
                          ])
                        ]),
                        createVNode("div", { class: "py-4 rounded border border-gray-500" }, [
                          createVNode("div", { class: "font-semibold pb-4 w-full text-center border-b border-gray-500" }, toDisplayString(pipe.name), 1),
                          createVNode("div", { class: "px-4 pt-4" }, [
                            pipe.name === "chatgpt.commander" ? (openBlock(), createBlock(_component_LazyPageTriggerEditorChatGptCommanderPipe, {
                              key: 0,
                              i,
                              trigger: unref(data),
                              config: unref(currentConfig).pipes[i],
                              runtimeContext: unref(runtimeContext)
                            }, null, 8, ["i", "trigger", "config", "runtimeContext"])) : createCommentVNode("", true),
                            pipe.name === "filter.simple" ? (openBlock(), createBlock(_component_LazyPageTriggerEditorFilterSimplePipe, {
                              key: 1,
                              i,
                              trigger: unref(data),
                              config: unref(currentConfig).pipes[i],
                              runtimeContext: unref(runtimeContext)
                            }, null, 8, ["i", "trigger", "config", "runtimeContext"])) : createCommentVNode("", true),
                            pipe.name === "output" ? (openBlock(), createBlock(_component_LazyPageTriggerEditorOutputPipe, {
                              key: 2,
                              i,
                              trigger: unref(data),
                              config: unref(currentConfig).pipes[i],
                              runtimeContext: unref(runtimeContext),
                              bots: unref(bots),
                              onConfigUpdated: (newConfig) => {
                                unref(currentConfig).pipes[i]["option"]["bots"] = newConfig;
                              }
                            }, null, 8, ["i", "trigger", "config", "runtimeContext", "bots", "onConfigUpdated"])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "px-4 mt-4 pt-4 flex justify-between items-center border-t border-gray-500 text-sm" }, [
                            createVNode("div", null, [
                              getPipeContextByIndex(unref(runtimeContext), i).outputs.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("div", null, [
                                  createTextVNode(" Output Variable : "),
                                  (openBlock(true), createBlock(Fragment, null, renderList(getPipeContextByIndex(unref(runtimeContext), i).outputs, (item, j) => {
                                    return openBlock(), createBlock("span", { key: j }, toDisplayString(item[0]), 1);
                                  }), 128))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(_component_UButton, {
                                size: "xs",
                                color: "green",
                                label: "+",
                                icon: "i-heroicons-arrow-up-20-solid",
                                onClick: withModifiers(() => {
                                  modalAddPipe.value = {
                                    show: true,
                                    pipe: "chatgpt.commander",
                                    currI: i,
                                    mode: "before"
                                  };
                                }, ["prevent"])
                              }, null, 8, ["onClick"]),
                              pipe.name !== "output" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(_component_UButton, {
                                  size: "xs",
                                  color: "green",
                                  label: "+",
                                  icon: "i-heroicons-arrow-down-20-solid",
                                  onClick: withModifiers(() => {
                                    modalAddPipe.value = {
                                      show: true,
                                      pipe: "chatgpt.commander",
                                      currI: i,
                                      mode: "after"
                                    };
                                  }, ["prevent"])
                                }, null, 8, ["onClick"]),
                                createVNode(_component_UButton, {
                                  size: "xs",
                                  color: "red",
                                  icon: "i-heroicons-trash-20-solid",
                                  onClick: withModifiers(() => {
                                    unref(currentConfig).pipes.splice(i, 1);
                                  }, ["prevent"])
                                }, null, 8, ["onClick"])
                              ], 64)) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        i !== unref(currentConfig).pipes.length - 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-center mt-3"
                        }, [
                          createVNode(_component_Icon, {
                            name: "i-heroicons-arrow-down-20-solid",
                            class: "text-gray-500 text-2xl"
                          })
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ])
              ])),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                createVNode(_component_Modal, {
                  open: unref(modalAddPipe) && unref(modalAddPipe).show,
                  title: "Add Pipe",
                  onClose: () => {
                    if (unref(modalAddPipe)) {
                      unref(modalAddPipe).show = false;
                    }
                  }
                }, {
                  "footer-actions": withCtx(() => [
                    createVNode(_component_UButton, {
                      color: "green",
                      label: "Add",
                      onClick: withModifiers(modalAddPipeActionSave, ["prevent"])
                    })
                  ]),
                  default: withCtx(() => [
                    unref(modalAddPipe) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col"
                    }, [
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("label", null, "Pipe"),
                        createVNode(_component_USelect, {
                          modelValue: unref(modalAddPipe).pipe,
                          "onUpdate:modelValue": ($event) => unref(modalAddPipe).pipe = $event,
                          options: unref(modalAddPipeList),
                          placeholder: "Select Pipe",
                          "value-attribute": "name",
                          "option-attribute": "label"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["open", "onClose"])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/Modal/Trigger.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const datatable = ref(null);
    const editModalData = ref();
    const editModalMode = ref("edit");
    const deleteFeed = async (id) => {
      var _a;
      const confirm = (void 0).confirm("Are you sure?");
      try {
        if (!confirm)
          return;
        const res = await $fetch(parseApiURL(`/triggers/${id}`), {
          method: "DELETE"
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      (_a = datatable.value) == null ? void 0 : _a.refresh();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = _sfc_main$4$1;
      const _component_UDropdown = __nuxt_component_1$1;
      const _component_UButton = __nuxt_component_1;
      const _component_PageTriggerModalTrigger = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_DataTable, {
        ref_key: "datatable",
        ref: datatable,
        title: "Bot Triggers",
        columns: [
          { key: "name", data: "name", label: "Name" },
          { key: "action", label: "" }
        ],
        rows: [],
        "api-url": ("parseApiURL" in _ctx ? _ctx.parseApiURL : unref(parseApiURL))("/triggers")
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="px-4 py-2 bg-gray-800 text-sm rounded"${_scopeId}> New </button>`);
          } else {
            return [
              createVNode("button", {
                class: "px-4 py-2 bg-gray-800 text-sm rounded",
                onClick: () => {
                  editModalData.value = {
                    config: {
                      pipes: [
                        { name: "output", option: { bots: [] } }
                      ]
                    },
                    id: -1,
                    name: "your trigger name"
                  };
                  editModalMode.value = "create";
                }
              }, " New ", 8, ["onClick"])
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
                      editModalData.value = data;
                      editModalMode.value = "edit";
                    }
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
                        editModalData.value = data;
                        editModalMode.value = "edit";
                      }
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
        _push(ssrRenderComponent(_component_PageTriggerModalTrigger, {
          mode: unref(editModalMode),
          data: unref(editModalData),
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_DataTable = _sfc_main$4$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_DataTable, {
    title: "Triggered History",
    columns: [
      { key: "name", data: "name", label: "Name" },
      { key: "bots", label: "Bots" },
      { key: "action", label: "" }
    ],
    rows: [],
    "api-url": ("parseApiURL" in _ctx ? _ctx.parseApiURL : unref(parseApiURL))("/triggers")
  }, {
    action: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<button class="px-4 py-2 bg-gray-800 text-sm rounded"${_scopeId}> New </button>`);
      } else {
        return [
          createVNode("button", {
            class: "px-4 py-2 bg-gray-800 text-sm rounded",
            onClick: () => {
            }
          }, " New ")
        ];
      }
    }),
    "col-bots": withCtx(({ data }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}>${[...(data == null ? void 0 : data.Bots) || []].map((item) => `<span>${item == null ? void 0 : item.name}</span>`).join(", ")}</div>`);
      } else {
        return [
          createVNode("div", {
            innerHTML: [...(data == null ? void 0 : data.Bots) || []].map((item) => `<span>${item == null ? void 0 : item.name}</span>`).join(", ")
          }, null, 8, ["innerHTML"])
        ];
      }
    }),
    "col-action": withCtx(({}, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<button class="text-sm text-gray-200"${_scopeId}> View </button>`);
      } else {
        return [
          createVNode("button", {
            class: "text-sm text-gray-200",
            onClick: () => {
            }
          }, " View ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/History.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_HeadlessTabGroup = me;
  const _component_HeadlessTabList = pe;
  const _component_HeadlessTab = xe;
  const _component_HeadlessTabPanels = Ie;
  const _component_HeadlessTabPanel = ye;
  const _component_PageTrigger = _sfc_main$2;
  const _component_PageTriggerHistory = __nuxt_component_6;
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
                    _push4(`<button class="${ssrRenderClass({ "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true })}"${_scopeId3}> Triggers </button>`);
                  } else {
                    return [
                      createVNode("button", {
                        class: { "px-4 py-2 bg-gray-800": selected, "px-4 py-2 bg-transparent": !selected, "outline-none": true }
                      }, " Triggers ", 2)
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
                    }, " Triggers ", 2)
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
                    _push4(ssrRenderComponent(_component_PageTrigger, null, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PageTrigger)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_HeadlessTabPanel, { class: "mt-6" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_PageTriggerHistory, null, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PageTriggerHistory)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                  default: withCtx(() => [
                    createVNode(_component_PageTrigger)
                  ]),
                  _: 1
                }),
                createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                  default: withCtx(() => [
                    createVNode(_component_PageTriggerHistory)
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
                  }, " Triggers ", 2)
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
                  createVNode(_component_PageTrigger)
                ]),
                _: 1
              }),
              createVNode(_component_HeadlessTabPanel, { class: "mt-6" }, {
                default: withCtx(() => [
                  createVNode(_component_PageTriggerHistory)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/triggers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-wSAkxjTK.mjs.map
