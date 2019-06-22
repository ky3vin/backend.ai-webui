/**
 @license
 Copyright (c) 2015-2019 Lablup Inc. All rights reserved.
 */

import {css, html, LitElement} from "lit-element";
import '@polymer/polymer/lib/elements/dom-if.js';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-styles/typography';
import '@polymer/paper-styles/color';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-image/iron-image';
import '@polymer/iron-flex-layout/iron-flex-layout';
import 'weightless/card';

import './backend-ai-agent-list.js';
import {BackendAiStyles} from "./backend-ai-console-styles";

/**
 Backend.AI Agent view page

 Example:

 <backend-ai-agent-view active=true>
 ... content ...
 </backend-ai-agent-view>

 @group Backend.AI Console
 */
class BackendAIAgentView extends LitElement {
  static get properties() {
    return {
      active: {
        type: Boolean
      },
      _status: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.active = false;
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
  }

  shouldUpdate() {
    return this.active;
  }

  attributeChangedCallback(name, oldval, newval) {
    if (name == 'active' && newval !== null) {
      this._menuChanged(true);
    } else {
      this._menuChanged(false);
    }
    super.attributeChangedCallback(name, oldval, newval);
  }

  async _menuChanged(active) {
    await this.updateComplete;
    if (active === false) {
      this.shadowRoot.querySelector('#running-agents').active = false;
      this.shadowRoot.querySelector('#finished-agents').active = false;
      this._status = 'inactive';
      return;
    }
    this.shadowRoot.querySelector('#running-agents').active = true;
    this.shadowRoot.querySelector('#finished-agents').active = true;
    this._status = 'active';
  }

  static get styles() {
    return [
      BackendAiStyles];
  }

  render() {
    // language=HTML
    return html`
      <style is="custom-style" include="backend-ai-styles">
      </style>
      <wl-card class="item" elevation="1">
        <h3 class="wl-card-title">Registered nodes</h3>
        <h4>Connected</h4>
        <div>
          <backend-ai-agent-list id="running-agents" condition="running"></backend-ai-agent-list>
        </div>
        <h4>Terminated</h4>
        <div>
          <backend-ai-agent-list id="finished-agents" condition="finished"></backend-ai-agent-list>
        </div>
      </wl-card>
    `;
  }
}

customElements.define('backend-ai-agent-view', BackendAIAgentView);
