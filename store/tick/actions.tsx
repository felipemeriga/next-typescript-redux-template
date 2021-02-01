import {createAction} from "typesafe-actions";

export const updateTick = createAction('TICK', resolve => {
    return (message: string) => resolve(message);
});
