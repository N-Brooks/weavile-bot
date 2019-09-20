import { Container } from "inversify";
import "reflect-metadata";
import IShibeService from "../../services/image/shibe/IShibeService";
import ShibeService from "../../services/image/shibe/ShibeService";
import { ICommand } from "../command";
import HelpCommand from "../help";
import { ShibeCommand } from "../shibe";

// dependency injection
const container = new Container();
container.bind<IShibeService>("IShibeService").to(ShibeService);

/**
 * Command registry.
 * Any command must be added in this registry in order to be run and documented.
 * @author Matteo AUGER
 */
export const COMMAND_REGISTRY: ICommandsRegistry = {
    help: new HelpCommand(),
    shibe: container.resolve(ShibeCommand),
};

/**
 * Command registry type interface
 */
export interface ICommandsRegistry {
    [key: string]: ICommand;
}
