/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/



import '@quasar/extras/mdi-v4/mdi-v4.css'

import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'




// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'




import 'src/css/app.sass'


import Vue from 'vue'
import createApp from './app.js'




import qboot_Bootbus from 'boot/bus'

import qboot_Bootamap from 'boot/amap'

import qboot_Bootaxios from 'boot/axios'

import qboot_Bootsocket from 'boot/socket'

import qboot_Bootpeer from 'boot/peer'

import qboot_Bootgamepad from 'boot/gamepad'







Vue.config.devtools = true
Vue.config.productionTip = false



console.info('[Quasar] Running SPA.')





async function start () {
  const { app, store, router } = await createApp()

  

  
  let routeUnchanged = true
  const redirect = url => {
    routeUnchanged = false
    window.location.href = url
  }

  const urlPath = window.location.href.replace(window.location.origin, '')
  const bootFiles = [qboot_Bootbus,qboot_Bootamap,qboot_Bootaxios,qboot_Bootsocket,qboot_Bootpeer,qboot_Bootgamepad]

  for (let i = 0; routeUnchanged === true && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue
    }

    try {
      await bootFiles[i]({
        app,
        router,
        store,
        Vue,
        ssrContext: null,
        redirect,
        urlPath
      })
    }
    catch (err) {
      if (err && err.url) {
        window.location.href = err.url
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (routeUnchanged === false) {
    return
  }
  

  

    

    

    new Vue(app)

    

  

}

start()
