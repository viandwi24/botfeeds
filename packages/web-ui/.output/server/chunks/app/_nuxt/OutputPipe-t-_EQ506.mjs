import { _ as __nuxt_component_0 } from './SelectMenu-eaR332gX.mjs';
import { d as __nuxt_component_1 } from '../server.mjs';
import { _ as __nuxt_component_2 } from './Textarea-6V0x6Apb.mjs';
import { c as __nuxt_component_1$1 } from './api-omXKkMTj.mjs';
import { useSSRContext, defineComponent, ref, watch, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "OutputPipeBotConfigTelegram",
  __ssrInlineRender: true,
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  emits: ["configUpdated"],
  setup(__props, { emit: __emit }) {
    var _a2;
    var _a;
    const props = __props;
    const emit = __emit;
    const chatIds = ref([...(_a2 = (_a = props.config.telegram) == null ? void 0 : _a.chatIds) != null ? _a2 : []]);
    watch(chatIds, () => {
      emit("configUpdated", {
        ...props.config,
        telegram: {
          ...props.config.telegram,
          chatIds: chatIds.value
        }
      });
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_1;
      const _component_UInput = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col gap-2"><label>Chat Ids (Channel / Group id)</label><div>`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "xs",
        color: "green",
        onClick: () => unref(chatIds).push(""),
        icon: "i-heroicons-plus-20-solid",
        label: "Add",
        class: "mb-2"
      }, null, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(unref(chatIds), (item, i) => {
        _push(`<div class="flex">`);
        _push(ssrRenderComponent(_component_UButton, {
          class: "mr-2",
          size: "xs",
          color: "red",
          onClick: () => unref(chatIds).splice(i, 1),
          icon: "i-heroicons-minus-20-solid"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          class: "",
          modelValue: unref(chatIds)[i],
          "onUpdate:modelValue": ($event) => unref(chatIds)[i] = $event
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/Editor/OutputPipeBotConfigTelegram.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OutputPipe",
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
    },
    bots: {
      type: Array,
      required: true
    }
  },
  emits: ["config-updated"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const data = ref({ ...props.config });
    const botsOptions = ref([...data.value.option.bots]);
    watch(botsOptions, () => {
      emit("config-updated", botsOptions.value.map((item) => {
        return {
          id: item.id,
          content: item.content,
          telegram: item.telegram,
          twitter: item.twitter
        };
      }));
    }, { deep: true });
    const addNewBot = (id) => {
      console.log(id);
      const botdata = props.bots.find((item) => item.id === id);
      if (!botdata)
        return;
      let newOpt = {
        id: botdata.id,
        content: "",
        bot: botdata
      };
      if (botdata.service === "twitter") {
        newOpt["twitter"] = {};
      } else if (botdata.service === "telegram") {
        newOpt["telegram"] = {
          chatIds: []
        };
      }
      botsOptions.value.push(newOpt);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelectMenu = __nuxt_component_0;
      const _component_UButton = __nuxt_component_1;
      const _component_UTextarea = __nuxt_component_2;
      const _component_PageTriggerEditorOutputPipeBotConfigTelegram = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col gap-4"><div class="flex flex-col gap-2"><div class="font-bold">Bots</div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        options: [...props.bots].filter((item) => !unref(botsOptions).find((s) => s.id === item.id)),
        placeholder: "Select bots to add",
        "value-attribute": "id",
        "option-attribute": "name",
        onChange: async (value) => {
          addNewBot(value);
        }
      }, null, _parent));
      _push(`</div><div class="flex flex-col gap-4"><!--[-->`);
      ssrRenderList(unref(botsOptions), (bot, i) => {
        var _a, _b, _c;
        _push(`<div class="border border-gray-500 px-2 py-2 flex flex-col gap-2"><div class="flex justify-between"><div class="mb-2 font-semibold">[${ssrInterpolate((_a = bot.bot) == null ? void 0 : _a.service)}] ${ssrInterpolate((_b = bot.bot) == null ? void 0 : _b.name)}</div>`);
        _push(ssrRenderComponent(_component_UButton, {
          size: "xs",
          color: "red",
          onClick: () => unref(botsOptions).splice(i, 1),
          icon: "i-heroicons-trash-20-solid",
          label: "Remove"
        }, null, _parent));
        _push(`</div><div class="flex flex-col gap-4"><div class="flex flex-col gap-2"><label>Content</label>`);
        _push(ssrRenderComponent(_component_UTextarea, {
          modelValue: unref(botsOptions)[i].content,
          "onUpdate:modelValue": ($event) => unref(botsOptions)[i].content = $event,
          rows: 10
        }, null, _parent));
        _push(`</div></div>`);
        if (((_c = unref(botsOptions)[i].bot) == null ? void 0 : _c.service) === "telegram") {
          _push(ssrRenderComponent(_component_PageTriggerEditorOutputPipeBotConfigTelegram, {
            config: unref(botsOptions)[i],
            onConfigUpdated: (newConfig) => {
              unref(botsOptions)[i]["telegram"] = newConfig.telegram;
            }
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Trigger/Editor/OutputPipe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=OutputPipe-t-_EQ506.mjs.map
