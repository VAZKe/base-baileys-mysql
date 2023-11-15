const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

const { MessageType, MessageOptions, Mimetype } = require('@whiskeysockets/baileys')

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = 'Facuvaz1999'
const MYSQL_DB_NAME = 'bot'
const MYSQL_DB_PORT = '3306'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const response1 = [    
    'Te invito a que visites el siguiente enlace de nuestra página web donde encontrarás recursos para diferentes situaciones, permitiéndote gestionar el estrés y la ansiedad de manera precisa. https://posiivibess-saludmental.my.canva.site/recursos-actividades',
    'Para regresar al menú principal, escribe 👉 volver.'    
    ]

const response2 = [
    '¡Por supuesto! Puedes hablar con nosotros con total confianza. Estamos aquí para ayudarte. En unos minutos, un miembro de nuestro equipo estará contigo. 💙',
    'Para regresar al menú principal, escribe 👉 volver.'    
    ]

const response3 = [
    'Somos una página dedicada a la salud mental, comprometida con brindar recursos para el bienestar de nuestra comunidad. Explora nuestro sitio para descubrir más sobre cómo apoyamos la salud mental y proporcionamos herramientas para cultivar la positividad y la paz interior. ¡Estamos aquí para ti!',
    'Para regresar al menú principal, escribe 👉 volver.'    
    ]

const response4 = [
    'Si necesitas ayuda urgente, por favor, comunícate con la Línea Nacional de Prevención del Suicidio en Argentina. Están disponibles las 24 horas. 📞 Teléfono: 135',
    'Para regresar al menú principal, escribe 👉 volver.'    
    ]

const flujoRespuesta1 = addKeyword(['1'])
    .addAnswer(response1)
        
const flujoRespuesta2 = addKeyword(['2'])
    .addAnswer(response2)

const flujoRespuesta3 = addKeyword(['3'])
    .addAnswer(response3)

const flujoRespuesta4 = addKeyword(['4'])
    .addAnswer(response4)  

const opcionesPrincipales = [
    '1. Descubre recursos para gestionar el estrés y la ansiedad',
    '2. Quiero hablar con alguien',
    '3. ¿Qué es PosiVibes?',
    '4. Necesito ayuda urgente (Argentina)',
    ]    

const flujoSecundario = addKeyword(['volver'])
    .addAnswer(
        opcionesPrincipales,
        null,
        null,
        [flujoRespuesta1, flujoRespuesta2, flujoRespuesta3, flujoRespuesta4]
    )

const flujoInicial = addKeyword(['hola'])
    .addAnswer('Hola, bienvenido/a a PosiVibes, tu espacio de apoyo emocional. Estamos aquí para ayudarte a cultivar una mente positiva y saludable. ¿En qué podemos asistirte hoy? 💙✨')
    .addAnswer(
        opcionesPrincipales,
        null,
        null,
        [flujoRespuesta1, flujoRespuesta2, flujoRespuesta3, flujoRespuesta4]
    )

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flujoInicial, flujoSecundario])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}
main()
