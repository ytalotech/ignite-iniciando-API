import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { ImailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implamentations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

container.registerInstance<ImailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    LocalStorageProvider
)