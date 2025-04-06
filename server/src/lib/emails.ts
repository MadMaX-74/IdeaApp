import _memoize from 'lodash/memoize'
import {promises as fs} from 'fs'
import fg from 'fast-glob'
import path from 'path'
import {env} from './env'
import { Idea, User } from '@prisma/client'
import Handlebars from 'handlebars'


const getHbrTemplates = _memoize(async () => {
    const htmlPathsPattern = path.resolve(__dirname, '../emails/dist/**/*.html')
    const htmlPaths = fg.sync(htmlPathsPattern)
    const hbrHemplates: Record<string, HandlebarsTemplateDelegate> = {}
    for (const htmlPath of htmlPaths) {
        const htmlName = path.basename(htmlPath, '.html')
        const htmlTemplate = await fs.readFile(htmlPath, 'utf8')
        hbrHemplates[htmlName] = Handlebars.compile(htmlTemplate)
    }
    return hbrHemplates
})

const getEmailHtml = async (templateName: string, templateVariables: Record<string, string> = {}) => {
    const hbrTemplates = await getHbrTemplates()
    return hbrTemplates[templateName](templateVariables)
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
        const fullTemplateVariables = {
            ...templateVariables,
            homeUrl: env.WEBAPP_URL
        }
        const html = await getEmailHtml(templateName, templateVariables)
        console.info('Send email', {
            to,
            subject,
            templateName,
            fullTemplateVariables,
            html
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