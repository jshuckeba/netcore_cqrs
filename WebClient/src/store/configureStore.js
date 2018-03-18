import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/**
 * Configure the state store in production mode by applying middleware and wiring up the {@link rootReducer}.
 * This method will only be triggered if process.env.NODE_ENV is set to 'production'. See {@link configureStoreDev}
 * @param {Object} initialState The initial state of the store
 * @returns {Store<any>} The configured state store
 */
function configureStoreProd(initialState) {
    const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}

/**
 * Configure the state store in development mode by applying middleware and wiring up the {@link rootReducer}.
 * This method will be triggered as long as process.env.NODE_ENV is not set to 'production'. See {@link configureStoreProd}
 * @param {Object} initialState The initial state of the store
 * @returns {Store<any>} The configured state store
 */
function configureStoreDev(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    let createStoreWithMiddleware = composeEnhancers(
        applyMiddleware(reduxImmutableStateInvariant(), thunk)
    )(createStore);

    if (process.env.NODE_ENV !== 'test') {
        createStoreWithMiddleware = composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(), thunk))(createStore);
    }

    const store = createStoreWithMiddleware(rootReducer, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers',
            () => {
                const nextReducer = require('../reducers').default; // eslint-disable-line global-require
                store.replaceReducer(nextReducer);
            });
    }

    return store;
}

const store = process.env.NODE_ENV === 'production' ? configureStoreProd() : configureStoreDev();
export default store;