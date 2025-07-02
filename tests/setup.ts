import { createTestingPinia } from '@pinia/testing'
import { config } from '@vue/test-utils'
import ResizeObserverPolyfill from 'resize-observer-polyfill'
import vuetify from '../src/plugins/vuetify'

config.global.plugins = [vuetify, createTestingPinia()]
config.global.stubs = { VContainer: false, VApp: false }

global.ResizeObserver = ResizeObserverPolyfill
