import isFunction from "lodash/fp/isFunction";

const contextualActionDispatcher = (context = {}, dispatch) => (
  action,
  ...restDispatchArgs
) =>
  isFunction(action)
    ? contextualDispatcher(context, dispatch)(action, ...restDispatchArgs)
    : dispatch(
        {
          ...action,
          context
        },
        ...restDispatchArgs
      );

const contextualDispatcher = (context = {}, dispatch) => (
  action,
  ...restDispatchArgs
) =>
  isFunction(action)
    ? dispatch(
        (actionDispatch, ...restActionArgs) =>
          action(
            contextualActionDispatcher(context, actionDispatch),
            ...restActionArgs
          ),
        ...restDispatchArgs
      )
    : dispatch(action, ...restDispatchArgs);

export const contextualMiddleware = (context = {}, middlewareFn) => (
  { dispatch, ...restMiddlewareArgs } = {},
  ...restArgs
) =>
  middlewareFn(
    {
      dispatch: contextualDispatcher(context, dispatch),
      ...restMiddlewareArgs
    },
    ...restArgs
  );
