import { Message } from "discord.js";
import "reflect-metadata";

/**
 * Command interface.
 * Represents any runnable command.
 * @author Matteo AUGER
 */
export interface ICommand {
    /**
     * Runs the given command
     * @param {Message} command command to run
     */
    run(m: Message): void;
}

/**
 * Command annotation.
 * Each new command must be decorated with this annotation.
 * The metadata are stored as an object containing name, description and example.
 * @param {string} name command name. Used to resolve the command via the bot.
 * @param {string} description command description. Must explain what is the purpose of the command.
 * @param {string | undefined} example example (optionnal). Must show how to use the command.
 */
export function Command(name: string, description: string, example?: string) {
    return (target: any) => {
        Reflect.defineMetadata("command", {name, description, example}, target.prototype);
    };
}
