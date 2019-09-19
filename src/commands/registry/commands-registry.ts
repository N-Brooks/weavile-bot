import { ICommand } from "../command";

/**
 * Command registry.
 * Any command must be added in this registry in order to be run and documented.
 * @author Matteo AUGER
 */
export const COMMAND_REGISTRY: ICommandsRegistry = {
};

/**
 * Command registry type interface
 */
export interface ICommandsRegistry {
    [key: string]: ICommand;
}
