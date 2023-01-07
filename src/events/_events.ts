import interactionCreate from './interaction-create';
import ready from './ready';
import messageCreate from './message-create';

interface Event {
	name: string;
	once?: boolean;
	execute(...args: unknown[]): Promise<void> | void;
}

export default [ready, interactionCreate, messageCreate] as Event[];
