import { Message } from "discord.js";
import { inject,  injectable } from "inversify";
import IShibeService from "../services/image/shibe/IShibeService";
import { Command, ICommand } from "./command";

@injectable()
@Command("shibe", "Sends a random picture of Shiba Inu", "shibe")
export class ShibeCommand implements ICommand {

  constructor(@inject("IShibeService") private readonly shibeService: IShibeService) {
  }

  public async run(m: Message): Promise<void> {
    const shibeUrl = await this.shibeService.fetchRandomShibe();
    m.channel.send(shibeUrl);
  }
}
