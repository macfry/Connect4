import { ActionContext, ActionTree } from 'vuex';
import { State } from './state';
import { Mutations } from './mutations';
import { ActionTypes } from './action-types';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.NO_ACTION](
    { commit }: AugmentedActionContext,
    data: unknown,
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.NO_ACTION]({ commit }, data: unknown) {
    console.log(data, commit);
  },
};