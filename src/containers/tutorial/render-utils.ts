import * as React from 'react';
import { ada } from 'container/tutorial/ada';

interface RenderUtils {
  codeNode: React.RefObject<HTMLScriptElement>;
  fakeParent: { postMessage: (message: any) => void };
  parent: () => any;
  cleanUp: () => void;
  sendMessage: (any) => void;
  renderError: (error) => void;
  invokeCode: (...any) => void;
  onMessage: (any) => void;
  initialize: (any?) => void;
  setLoading: (string?) => void;
  setActive: () => void;
  loading?: HTMLElement;

  [key: string]: any;
}

const transform = (code) =>
  window.Babel.transform(ada(code), {
    filename: 'index.jsx',
    presets: ['react'],
  }).code;

export const RenderUtils: RenderUtils = {
  codeNode: {} as any,
  fakeParent: {
    postMessage(message) {
      window.log(message);
    },
  },

  parent() {
    if (typeof window === 'undefined') {
      return RenderUtils.fakeParent;
    }

    return window.parent !== self ? window.parent : this.fakeParent;
  },

  cleanUp() {
    document.body
      .querySelectorAll('body > :not([data-initial])')
      .forEach((e) => e.remove());
  },

  sendMessage(message) {
    this.parent().postMessage({ renderer: message }, '*');
  },

  renderError(error) {
    window.console.error(error);

    const tag = document.createElement('pre');
    tag.className = 'error';
    tag.innerHTML = error.toString();

    document.body.appendChild(tag);
  },

  async invokeCode(rawCode, newId) {
    this.state.innerHTML = '';

    try {
      await window.inlineImport(`#${newId}`);
    } catch (error) {
      this.renderError(error);
    }
  },

  setActive() {
    this.state.innerHTML += '<br/>setActive';

    this.loading?.remove();
    delete this.loading;
  },

  async setLoading(txt = 'Compiling...') {
    if (this.loading) {
      this.loading.innerHTML = txt;

      return;
    }
    this.state.innerHTML += '<br/>loading';

    this.loading = document.createElement('div');
    this.loading.dataset.initial = 'true';
    this.loading.innerHTML = txt;

    document.body.appendChild(this.loading);
  },

  async onMessage(message) {
    if (!message.data) return;

    if (message.data.clear) {
      this.state.innerHTML = '';
      this.cleanUp();
      this.state.innerHTML += '<br/>clearing';

      return this.setLoading();
    }

    if (!message.data.repl) return;

    const { code, id } = message.data.repl;

    try {
      const node = this.codeNode.current!;

      node.id = `code${id}`;
      node.textContent = transform(code);
    } catch (error) {
      this.renderError(error);
      this.renderError(code);
    }
    this.state.innerHTML += '<br/>beforeInvoke';

    await this.invokeCode(code, `code${id}`);

    this.setActive();
  },

  state: { innerHTML: '' } as any,

  freeze() {
    document
      .querySelectorAll('[rel=stylesheet],style:not([data-initial])')
      .forEach((s) => s.remove());

    document.querySelectorAll('body > *').forEach((n) => {
      (n as HTMLElement).dataset.initial = `true`;
    });
  },

  initialize(opts = { debug: false }) {
    this.freeze();
    this.state.innerHTML = 'initializing';
    this.state.dataset.initial = String(true);
    if (opts.debug) document.body.appendChild(this.state);

    window.messageParent = this.parent();

    this.setLoading();
    this.sendMessage('init');
  },
};
