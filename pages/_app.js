import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css"
import 'react-notifications/lib/notifications.css';
import "nprogress/nprogress.css"

import io from 'socket.io-client'
import {useEffect,useState,useContext } from 'react'
import NProgress from 'nprogress';
import Router from 'next/router';
import React from 'react';
//Components
import Context from '../components/Context'
import Layout from '../components/Layout'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


const MyApp = ({ Component, pageProps }) => {

  return (
    	<Context.Provider>
  	  	  <Layout>
  	  		   <Component {...pageProps} />
          </Layout>
    	</Context.Provider>
  )
}

export default MyApp