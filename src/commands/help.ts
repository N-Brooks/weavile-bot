import { Message } from "discord.js";
import {Command, ICommand} from "./command";
import {COMMAND_REGISTRY, ICommandsRegistry} from "./registry/commands-registry";

/**
 * Represents the help command.
 * This command sends by DM everything to know about the bot usage and the command documentation. This command
 * will also notify the user on the channel that they've been contacted via DM.
 * Called when the user types <prefix>help.
 * @author Matteo AUGER
 */
@Command("help", "Provides help about the bot usage.")
export default class HelpCommand implements ICommand {
    /**
     * Runs the given command
     * @param {Message} command command to run
     */
    public run(command: Message): void {
        // displaying the help for each registered command
        const content: string = this.buildMessage();

        // sending the help to the message author via DM.
        command.author
            .send(content)
            .catch((err) => console.log(err));

        // notifying the user in the channel
        command
            .reply("Help sent in DM !")
            .catch((err) => console.log(err));
    }

    /**
     * Builds the help message for every command of the registry (except the current 'help' command).
     * The help message lists and displays help about each command via Direct Message.
     * @returns {string} Help message.
     */
    private buildMessage(): string {
        const registeredCommands = COMMAND_REGISTRY;
        const currentMetadata = Reflect.getMetadata("command", this); // current command metadata

        let content: string = "Need some help huh?\n\n";
        content += "*Here's the list of the available commands :* \n";

        content += "\`\`\` ";
        for (const key in registeredCommands) {
            if (registeredCommands.hasOwnProperty(key) && key !== currentMetadata.name) {
                // getting the @Command meta data
                const metadata = Reflect.getMetadata("command", registeredCommands[key]);
                if (metadata) {
                    content += `- ${metadata.name}\t\t ${metadata.description}\n`;

                    if (metadata.example) {
                        content += "\t" + metadata.example + "\n";
                    }
                }
            }
        }
        content += "\`\`\`";

        return content;
    }
}
