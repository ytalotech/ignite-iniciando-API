interface ImailProvider {
    sendMail(to: string, subject: string, variables: any, path: string): Promise<void>
}

export { ImailProvider }