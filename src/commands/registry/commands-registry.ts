import { ICommand } from "../command";
import HelpCommand from "../help";

/**
 * Command registry.
 * Any command must be added in this registry in order to be run and documented.
 * @author Matteo AUGER
 */
export const COMMAND_REGISTRY: ICommandsRegistry = {
    help: new HelpCommand(),
};

/**
 * Command registry type interface
 */
export interface ICommandsRegistry {
    [key: string]: ICommand;
}
