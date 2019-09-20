import { Message } from "discord.js";
import { injectable } from "inversify";
import IShibeService from "../services/image/shibe/IShibeService";
import { Command, ICommand } from "./command";

@Command("shibe", "Sends a random picture of Shiba Inu", "shibe")
export class ShibeCommand implements ICommand {
  constructor(private readonly shibeService: IShibeService)  {
  }

  public async run(m: Message): Promise<void> {
    const shibeUrl = this.shibeService.fetchRandomShibe();
    m.channel.send(shibeUrl);
  }
}
