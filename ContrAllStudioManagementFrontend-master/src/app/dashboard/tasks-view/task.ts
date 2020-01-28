import { Comment } from './comment';
export interface Task {
 taskId: number;
 title: string;
 description: string;
 stateId: number;
 userId: number;
 priority: number;
 comments: Comment[];

}
