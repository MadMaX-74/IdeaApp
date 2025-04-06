import _memoize from 'lodash/memoize'
import {promises as fs} from 'fs'
import fg from 'fast-glob'
import path from 'path'
import {env} from './env'
import { Idea, User } from '@prisma/client'


const getHtmlTemplates = _memoize(async () => {
    const htmlPathsPattern = path.resolve(__dirname, '../emails/dist/**/*.html')
    const htmlPaths = fg.sync(htmlPathsPattern)
    const htmlHemplates: Record<string, string> = {}
    for (const htmlPath of htmlPaths) {
        const htmlName = path.basename(htmlPath, '.html')
        htmlHemplates[htmlName] = await fs.readFile(htmlPath, 'utf8')
    }
    return htmlHemplates
})

const getHtmlTemplate = async (name: string) => {
    const htmlTemplates = await getHtmlTemplates()
    return htmlTemplates[name]
}

const sendEmail = async({
    to,
    subject,
    templateName,
    templateVariables = {}
}: {
    to: string,
    subject: string,
    templateName: string,
    templateVariables?: Record<string, string>
}) => {
    try {
        const htmlTemplate = await getHtmlTemplate(templateName)
        const fullTemplateVariables = {
            ...templateVariables,
            homeUrl: env.WEBAPP_URL
        }
        console.info('Send email', {
            to,
            subject,
            templateName,
            fullTemplateVariables,
            htmlTemplate
        })
        return {ok: true}
    } catch (err) {
        console.error(err)
        return {ok: false}
    }
}

export const sendWelcomeEmail = async ({
    user
}: {
    user: Pick<User, 'nick' | 'email'>
}) => {
    return await sendEmail({
        to: user.email,
        subject: 'Welcome to IdeaApp',
        templateName: 'welcome',
        templateVariables: {
            nick: user.nick,
            addIdeaUrl: `${env.WEBAPP_URL}/ideas/new`
        }
    })
}

export const sendIdeaBlockedEmail = async ({
    user,
    idea
}: {
    user: Pick<User, 'email'>,
    idea: Pick<Idea, 'title' | 'description'>
}) => {
    return await sendEmail({
        to: user.email,
        subject: 'Your idea has been blocked',
        templateName: 'idea-blocked',
        templateVariables: {
            ideaNick: idea.title
        }
    })
}