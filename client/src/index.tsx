import 'dotenv/config'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { client } from '@client'
import mobxStores from './stores'
import { I18nextProvider } from 'react-i18next'
import i18n from './translation'
import './atnd.less'

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Provider stores={mobxStores}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

// registerServiceWorker();
