import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import Handlebars from "handlebars";
import fs from "fs";

import { ImailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements ImailProvider {
    private client: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then(account => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });

                this.client = transporter;
            })
            .catch((err) => console.log(err))
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = Handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            html: templateHTML
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider }