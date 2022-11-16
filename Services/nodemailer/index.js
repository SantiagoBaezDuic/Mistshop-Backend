import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_MAIL,
        pass: process.env.ETHEREAL_PASS
    }
});

const sendMail = async (obj) => {
    const mailOptions = {
        from: "MistShop",
        to: 'raoul.jaskolski@ethereal.email',
        subject: `Your order has been submitted`,
        html: `<h1 style="color: blue;">Your order has been submitted with the following items:</h1><span>${obj.products.map((item) => `<span>${item.amount} X ${item.name}, price: $${item.price}</span><br>`)}</span><h2>total price: $${obj.price}</h2>`
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info)
    } catch ( err) {
        console.log(err)
    }
}

export {sendMail}