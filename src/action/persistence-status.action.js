import { createPromisedAction } from "/src/util/action.util";
import { invokeWith } from "/src/util/function.util";
import { WORKSPACE } from "/src/enum/object.enum";

export const SET_STATUS = "PERSISTENCE-STATUS/SET_STATUS";

export const setWorkspaceStatus = createPromisedAction(
  SET_STATUS,
  ["id", "status"],
  invokeWith(({ id, status }) => ({
    object: WORKSPACE,
    id,
    status
  }))
);
