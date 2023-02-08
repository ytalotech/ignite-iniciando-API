interface ImailProvider {
    sendMail(to: string, subject: string, body: string): Promise<void>
}

export { ImailProvider }