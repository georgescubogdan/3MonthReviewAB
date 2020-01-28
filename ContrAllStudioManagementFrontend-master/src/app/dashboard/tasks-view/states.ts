import {Task} from './task';

export interface States {
    stateId: number;
    title: string;
    tasks: Task[];
}
