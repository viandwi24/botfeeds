import { p as parseApiURL, _ as _sfc_main$4, a as __nuxt_component_1$1, b as _sfc_main$1$1, c as __nuxt_component_1$2 } from './api-omXKkMTj.mjs';
import { b as useToast, d as __nuxt_component_1 } from '../server.mjs';
import { useSSRContext, defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, mergeProps, openBlock, createBlock, createCommentVNode, Fragment } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Bot",
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
    const save = async () => {
      try {
        if (props.mode === "edit") {
          const res = await $fetch(parseApiURL(`/bots/${props.data.id}`), {
            method: "PUT",
            body: JSON.stringify({
              name: data.value.name,
              config: data.value.config
            })
          });
          toast.add({
            title: "Success",
            description: `Source ${data.value.name} saved`,
            color: "green"
          });
        } else {
          const res = await $fetch(parseApiURL(`/bots/`), {
            method: "POST",
            body: JSON.stringify({
              name: data.value.name,
              service: data.value.service,
              config: data.value.config
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
      const _component_UInput = __nuxt_component_1$2;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: true,
        title: props.mode === "edit" ? "Edit Bot" : "New Bot",
        modalSize: "2xl",
        onClose: () => _ctx.$emit("close")
      }, _attrs), {
        "footer-actions": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="px-4 py-2 bg-blue-400 text-sm rounded"${_scopeId}>`);
            if (__props.mode === "create") {
              _push2(`<span${_scopeId}>Save</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.mode === "edit") {
              _push2(`<span${_scopeId}>Save &amp; Restart</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                class: "px-4 py-2 bg-blue-400 text-sm rounded",
                onClick: save
              }, [
                __props.mode === "create" ? (openBlock(), createBlock("span", { key: 0 }, "Save")) : createCommentVNode("", true),
                __props.mode === "edit" ? (openBlock(), createBlock("span", { key: 1 }, "Save & Restart")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-4"${_scopeId}>`);
            if (__props.mode === "edit") {
              _push2(`<div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Current Status</label><div class="flex items-center gap-2"${_scopeId}><span class="${ssrRenderClass({
                "h-2 w-2 rounded-full": true,
                "bg-green-500": unref(data).status === "connected",
                "bg-red-500": unref(data).status === "disconnected",
                "bg-yellow-500": unref(data).status === "started",
                "bg-gray-500": unref(data).status === "stopped"
              })}"${_scopeId}></span> ${ssrInterpolate(unref(data).status)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(data).name,
              "onUpdate:modelValue": ($event) => unref(data).name = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="w-full h-0.5 border-b border-gray-500"${_scopeId}></div>`);
            if (unref(data).config.telegram) {
              _push2(`<!--[--><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Api Hash</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(data).config.telegram.apiHash,
                "onUpdate:modelValue": ($event) => unref(data).config.telegram.apiHash = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Api Id</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                type: "number",
                modelValue: unref(data).config.telegram.apiId,
                "onUpdate:modelValue": ($event) => unref(data).config.telegram.apiId = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Bot Api Token</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(data).config.telegram.botApiToken,
                "onUpdate:modelValue": ($event) => unref(data).config.telegram.botApiToken = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Session</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(data).config.telegram.session,
                "onUpdate:modelValue": ($event) => unref(data).config.telegram.session = $event
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-red-500 text-xs"${_scopeId}>*nb: ignore this, this only session string saved from telegram to authorize our bot</div></div><!--]-->`);
            } else if (unref(data).config.twitter) {
              _push2(`<!--[--><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Access Token</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(data).config.twitter.accessToken,
                "onUpdate:modelValue": ($event) => unref(data).config.twitter.accessToken = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>Access Secret</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(data).config.twitter.accessTokenSecret,
                "onUpdate:modelValue": ($event) => unref(data).config.twitter.accessTokenSecret = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>App Key</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(data).config.twitter.apiKey,
                "onUpdate:modelValue": ($event) => unref(data).config.twitter.apiKey = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label${_scopeId}>App Secret</label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(data).config.twitter.apiSecret,
                "onUpdate:modelValue": ($event) => unref(data).config.twitter.apiSecret = $event
              }, null, _parent2, _scopeId));
              _push2(`</div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4" }, [
                __props.mode === "edit" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex flex-col gap-2"
                }, [
                  createVNode("label", null, "Current Status"),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("span", {
                      class: {
                        "h-2 w-2 rounded-full": true,
                        "bg-green-500": unref(data).status === "connected",
                        "bg-red-500": unref(data).status === "disconnected",
                        "bg-yellow-500": unref(data).status === "started",
                        "bg-gray-500": unref(data).status === "stopped"
                      }
                    }, null, 2),
                    createTextVNode(" " + toDisplayString(unref(data).status), 1)
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("label", null, "Name"),
                  createVNode(_component_UInput, {
                    modelValue: unref(data).name,
                    "onUpdate:modelValue": ($event) => unref(data).name = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "w-full h-0.5 border-b border-gray-500" }),
                unref(data).config.telegram ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("label", null, "Api Hash"),
                    createVNode(_component_UInput, {
                      modelValue: unref(data).config.telegram.apiHash,
                      "onUpdate:modelValue": ($event) => unref(data).config.telegram.apiHash = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("label", null, "Api Id"),
                    createVNode(_component_UInput, {
                      type: "number",
                      modelValue: unref(data).config.telegram.apiId,
                      "onUpdate:modelValue": ($event) => unref(data).config.telegram.apiId = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("label", null, "Bot Api Token"),
                    createVNode(_component_UInput, {
                      modelValue: unref(data).config.telegram.botApiToken,
                      "onUpdate:modelValue": ($event) => unref(data).config.telegram.botApiToken = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("label", null, "Session"),
                    createVNode(_component_UInput, {
                      modelValue: unref(data).config.telegram.session,
                      "onUpdate:modelValue": ($event) => unref(data).config.telegram.session = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "text-red-500 text-xs" }, "*nb: ignore this, this only session string saved from telegram to authorize our bot")
                  ])
                ], 64)) : unref(data).config.twitter ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("label", null, "Access Token"),
                    createVNode(_component_UInput, {
                      modelValue: unref(data).config.twitter.accessToken,
                      "onUpdate:modelValue": ($event) => unref(data).config.twitter.accessToken = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("label", null, "Access Secret"),
                    createVNode(_component_UInput, {
                      modelValue: unref(data).config.twitter.accessTokenSecret,
                      "onUpdate:modelValue": ($event) => unref(data).config.twitter.accessTokenSecret = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("label", null, "App Key"),
                    createVNode(_component_UInput, {
                      modelValue: unref(data).config.twitter.apiKey,
                      "onUpdate:modelValue": ($event) => unref(data).config.twitter.apiKey = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("label", null, "App Secret"),
                    createVNode(_component_UInput, {
                      modelValue: unref(data).config.twitter.apiSecret,
                      "onUpdate:modelValue": ($event) => unref(data).config.twitter.apiSecret = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ], 64)) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Bot/Modal/Bot.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const capitalizeEachWord = (str) => {
  return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Table",
  __ssrInlineRender: true,
  props: {
    service: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const datatable = ref(null);
    const editModalMode = ref("edit");
    const editModalData = ref();
    const nodeAction = async (id, action = "restart") => {
      try {
        const res = await $fetch(parseApiURL(`/bots/${id}/action/${action}`), {
          method: "POST"
        });
        toast.add({
          title: "Success",
          description: `Bot ${id} ${action} success`,
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
    };
    const botDelete = async (id) => {
      var _a;
      const confirm = (void 0).confirm("Are you sure?");
      try {
        if (!confirm)
          return;
        const res = await $fetch(parseApiURL(`/bots/${id}`), {
          method: "DELETE"
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      (_a = datatable.value) == null ? void 0 : _a.refresh();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = _sfc_main$4;
      const _component_UDropdown = __nuxt_component_1$1;
      const _component_UButton = __nuxt_component_1;
      const _component_PageBotModalBot = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_DataTable, {
        ref_key: "datatable",
        ref: datatable,
        title: `${("capitalizeEachWord" in _ctx ? _ctx.capitalizeEachWord : unref(capitalizeEachWord))(__props.service)} Bot`,
        columns: [
          { key: "name", data: "name", label: "Name" },
          { key: "status", label: "status" },
          { key: "action", label: "" }
        ],
        rows: [],
        "api-url": ("parseApiURL" in _ctx ? _ctx.parseApiURL : unref(parseApiURL))(`/bots/${__props.service}`)
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="px-4 py-2 bg-gray-800 text-sm rounded"${_scopeId}> New </button>`);
          } else {
            return [
              createVNode("button", {
                class: "px-4 py-2 bg-gray-800 text-sm rounded",
                onClick: () => {
                  let config = {};
                  if (props.service === "telegram") {
                    config = {
                      telegram: {
                        apiHash: "",
                        apiId: 0,
                        botApiToken: "",
                        session: ""
                      }
                    };
                  } else if (props.service === "twitter") {
                    config = {
                      twitter: {
                        apiKey: "",
                        apiSecret: "",
                        accessToken: "",
                        accessTokenSecret: ""
                      }
                    };
                  }
                  editModalMode.value = "create";
                  editModalData.value = {
                    id: -1,
                    name: "",
                    service: props.service,
                    config
                  };
                }
              }, " New ", 8, ["onClick"])
            ];
          }
        }),
        "col-status": withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><span class="${ssrRenderClass({
              "h-2 w-2 rounded-full": true,
              "bg-green-500": data.status === "connected",
              "bg-red-500": data.status === "disconnected",
              "bg-yellow-500": data.status === "started",
              "bg-gray-500": data.status === "stopped"
            })}"${_scopeId}></span> ${ssrInterpolate(data.status)}</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode("span", {
                  class: {
                    "h-2 w-2 rounded-full": true,
                    "bg-green-500": data.status === "connected",
                    "bg-red-500": data.status === "disconnected",
                    "bg-yellow-500": data.status === "started",
                    "bg-gray-500": data.status === "stopped"
                  }
                }, null, 2),
                createTextVNode(" " + toDisplayString(data.status), 1)
              ])
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
                  }
                ],
                [
                  {
                    label: "Delete",
                    icon: "i-heroicons-trash-20-solid",
                    click: () => botDelete(data.id)
                  }
                ],
                [
                  {
                    label: "Start",
                    icon: "i-heroicons-play-20-solid",
                    click: () => nodeAction(data.id, "start")
                  },
                  {
                    label: "Stop",
                    icon: "i-heroicons-stop-20-solid",
                    click: () => nodeAction(data.id, "stop")
                  },
                  {
                    label: "Restart",
                    icon: "i-heroicons-arrow-path-20-solid",
                    click: () => nodeAction(data.id, "restart")
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
                    }
                  ],
                  [
                    {
                      label: "Delete",
                      icon: "i-heroicons-trash-20-solid",
                      click: () => botDelete(data.id)
                    }
                  ],
                  [
                    {
                      label: "Start",
                      icon: "i-heroicons-play-20-solid",
                      click: () => nodeAction(data.id, "start")
                    },
                    {
                      label: "Stop",
                      icon: "i-heroicons-stop-20-solid",
                      click: () => nodeAction(data.id, "stop")
                    },
                    {
                      label: "Restart",
                      icon: "i-heroicons-arrow-path-20-solid",
                      click: () => nodeAction(data.id, "restart")
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
        _push(ssrRenderComponent(_component_PageBotModalBot, {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Bot/Table.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Table-Tion668v.mjs.map
