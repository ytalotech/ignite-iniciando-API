import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { ImailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implamentations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

container.registerInstance<ImailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)