import { Message } from "discord.js";
import { inject,  injectable } from "inversify";
import IShibeService from "../services/image/shibe/IShibeService";
import { Command, ICommand } from "./command";

/**
 * Shibe command.
 * Returns a random shiba inu picture on the channel.
 * @author Matteo AUGER
 */
@injectable()
@Command("shibe", "Sends a random picture of Shiba Inu", "shibe")
export class ShibeCommand implements ICommand {

  /**
   * Creates a new instance of ShibeCommand
   * @param {IShibeService} shibeService Shibe picture service (provided by DI)
   */
  constructor(@inject("IShibeService") private readonly shibeService: IShibeService) {
  }

 /**
  * Runs the given command
  * @param {Message} command command to run
  */
  public async run(m: Message): Promise<void> {
    const shibeUrl = await this.shibeService.fetchRandomShibe();
    m.channel.send(shibeUrl);
  }
}
