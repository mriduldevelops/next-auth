import nodemailer from 'nodemailer'
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        const htmlForVerificationLink = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to Verify your email or copy and paste the link below in your browser.
        <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`

        const htmlForResetLink = `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to Reset your password or copy and paste the link below in your browser.
        <br> ${process.env.DOMAIN}/resetPassword?token=${hashedToken}
        </p>`

        if (emailType === "Verify") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 36000
                }
            })
        } else if (emailType === "Reset") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 36000
                }
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "28bc26ca81c4ff",
                pass: "56af2c11c3e42e"
            }
        });

        const mailOptions = {
            from: 'mridul@sharma.ai',
            to: email,
            subject: emailType === 'Verify' ? 'Verify your email' : 'Reset your password',
            html: emailType === 'Verify' ? htmlForVerificationLink : htmlForResetLink,
            // html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "Verify" ? "Verify your email" : "Reset your password"}
            // or copy and paste the link below in your browser
            // <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            // </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}