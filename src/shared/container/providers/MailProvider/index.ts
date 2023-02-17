import { container } from "tsyringe";
import { ImailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implamentations/EtherealMailProvider";
import { SESMailProvider } from "./implamentations/SESMailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
}

container.registerInstance<ImailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
)