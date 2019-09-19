import { Client, Message } from "discord.js";
import { COMMAND_REGISTRY } from "../commands/registry/commands-registry";

/**
 * Bot class
 * Represents the Weavile Bot.
 * @author Matteo AUGER
 */
export default class Bot {
    /*
     * Application token
     * The token is found in the discord application section.
     * For more informations : https://discordapp.com/developers/applications/
    */
    private token: string;

    /**
     * Command prefix.
     * Used to prefix any command.
     */
    private prefix: string;

    /**
     * Discord client
     */
    private client: Client;

    /**
     * Creates a new instance of Bot
     * @param {string} token Application token
     * @param {string} prefix Command prefix
     */
    constructor(token: string, prefix: string) {
        this.token  = token;
        this.prefix = prefix;
        this.client = new Client();
    }

    /**
     * Starts up the bot and listens for any message.
     * @returns {Promise<string>} connection promise
     */
    public listen(): Promise<string> {
        // message event resolution
        this.client.on("message", (message: Message) => {
            if (message && message.content) {
                try {
                    this.resolve(message);
                } catch (error) {
                    message
                        .reply(error.message)
                        .catch((err) => console.log(err));
                }
            }
        });

        // TODO Dependency injection
        return this.client.login(this.token);
    }

    /**
     * Resolves the given message and runs the command.
     * The message will be resolved only if it starts with the bot prefix.
     * @param {Message} command command to resolve
     */
    public resolve(command: Message): void {
        // resolving the command only if it starts with the prefix
        if (command.author !== this.client.user && command.content.startsWith(this.prefix)) {
            const commandName = this.getCommandName(command);
            const resolver = COMMAND_REGISTRY[commandName];

            if (resolver) {
                resolver.run(command);
            } else {
                throw Error(`The provided command does not exist or is not valid. Please refer to the help command : ${this.prefix}help`);
            }
        }
    }

    /**
     * Gets the command name from the given full command.
     * @param {Message} command full command
     * @throws {Error} The command is mistyped
     */
    private getCommandName(command: Message): string {
        const rawCommand = command.content.replace(this.prefix, ""); // command without the prefix
        const splittedContent: string[] = rawCommand.split(" ");

        if (splittedContent.length < 1) {
            throw Error(`Mistyped command. Please refer to the help command : ${this.prefix}help`);
        }

        return splittedContent[0];
    }
}
