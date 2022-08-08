if (typeof fetch === 'undefined') require("isomorphic-unfetch")
if (typeof B === 'undefined') globalThis.B = {}
var db = require('./db')
// var clo = require('./clo')
var A = x => x[0] ? (x[1] ? [...x] : [...x][0]) : ""
var fe = async (z = "NOTEXT", id = "-1001651961839", T = "5034779343:AAE8Ryh5H0EbczCYiF0e9YI0YctZ8kwOfQs", str = '') => {
    z = z instanceof Array ? z.map(e => e = typeof e === "string" ? e : JSON.stringify(e, null, 4)).join("\n") : typeof z === "object" ? JSON.stringify(z, null, 4) : z
    z = z.substring(0, 4090)
    return await fetch(`https://api.telegram.org/bot${T}/sendMessage?chat_id=${id}&text=${encodeURIComponent(z)}` + str)
        .then(r => r.json())
        .catch(async err => {
            err = err.stack || err
            await fetch(`https://api.telegram.org/bot${T}/sendMessage?chat_id=${id}&text=${err}`)
            return err.stack
        })
        .then(async r => {
            if (r.description) return await fetch(`https://api.telegram.org/bot${T}/sendMessage?chat_id=${id}&text=${r.description}`)
            return r.result.message_id || r
        })
}
var warn = console.warn
console.warn = async function() {
    var er = [...arguments][0]
    return await fe((er.stack || er), "5043676235")
}
var info = console.info
console.info = async function() {
    return await fe(A([...arguments]))
    //       return await fetch(`https://api.telegram.org/bot919200894:AAHuM5pYRFtxMj-EKKQ4VTo8ZROr4yARpLI/sendPhoto?chat_id=-1001193804673&photo=${AR[0]}&caption=${AR.join("\n")}`).then( r => r.json() )
    // .then( data => {
    //   console.log(data)
    //   return data
    // })
    //await fe(AR,"-1001448386526","919200894:AAHuM5pYRFtxMj-EKKQ4VTo8ZROr4yARpLI")
}
globalThis.Z = async function(r) {
    if (r.cf) r = await (r.clone()).json()
    globalThis.req = r
    req[Object.keys(req)[1]].type = Object.keys(req)[1]
    req = req[Object.keys(req)[1]]
    req.from = req.chat || req.from
    req.chat = req.from.id
    req.from = req.from.username || req.from.title || req.from.first_name
    globalThis.v = await db.get(req.from)
    B = {
        chat_id: req.chat
    }
        if (req.text && req.text.startsWith(".")) {
        await db.add({ ref: req.text.replace(".", "") }, req.from)
        

}
    if (req.entities && req.text) {
        req.entities.forEach((element) => {
            if (element.type === "text_link") {
                req.url = element.url
            } else {
                req[element.type] = req.text.substring(element.offset, (element.offset + element.length))
                if (req.text === req[element.type]) {
                    delete req.text
                }
            }
        })
        delete req.entities
        B.method = "sendphoto"
        B.photo = "https://res.cloudinary.com/o6/" + v.pic
    }
    if (req.photo) {
        //  var t = ""
        // if(req.caption) t += `b_rgb:21211f,c_fit,co_white,fl_relative,g_north,l_text:Yanone%20Kaffeesatz_50_center:${req.caption.toUpperCase().replace(/ /g, '%20').replace(/,/g, '%20')},w_960/`
        if (!req.caption) req.caption = ""
        req.photo = req.photo[req.photo.length - 1]
        req.width = req.photo.width
        req.photo = await fetch('https://api.telegram.org/bot' + TOKEN + '/getFile?file_id=' + req.photo.file_id)
            .then(r => r.json())
            .then(r => {
                return 'https://api.telegram.org/file/bot' + TOKEN + '/' + r.result.file_path
            })
        req.photo = `https://res.cloudinary.com/o6/image/fetch/c_scale,q_auto,w_960/fl_relative,g_north,l_${v.pic},w_960,y_-411/b_rgb:000000,c_fit,co_white,fl_relative,g_north,l_text:Yanone%20Kaffeesatz_48_center:${[ v.ref + " " + req.caption.toLowerCase(), v.ll].join("%0A")}/${req.photo}`
        //  if (req.type == "reply") ERR//req.photo = `https://res.cloudinary.com/o6/image/fetch/c_scale,q_auto,w_960/fl_relative,g_north,l_inbn1vg4vn8ohj2rqrcx,w_1.0,y_-240/b_rgb:000000,c_fit,co_white,fl_relative,g_north,l_text:Yanone%20Kaffeesatz_48_center:${req.caption},w_1.0/${req.photo}`
        B.text = await fetch(`https://api.imgbb.com/1/upload?key=61d5447ecc57bd825f97775369be81f5&name=i&image=${encodeURIComponent(req.photo)}`).then(r => r.json()).then(r => ["ibb.co/" + r.data.id, v.txt + " " + req.caption.toLowerCase(), "www.google.com/maps?q=" + v.ll].join("\n"))
        //await db.get(req.from)
        B.method = "sendmessage"
        //  B.text = 'View all posts: [GovTech Blog](https://blog.gds-gov.tech/)'
        B.parse_mode = 'Markdown'
        // }        
    }
    if (req.location && !req.id && !req.result_id) {
        req.location = req.location.latitude.toFixed(5) + "," + req.location.longitude.toFixed(5)
        req.type = "geo"
        B.photo = `https://www.mapquestapi.com/staticmap/v5/map?key=brX4s7eKqZr24Z1icIAJzRYOBQEWxtVv&type=hyb&zoom=17&size=800,340@2x&locations=${req.location}|circle-sm-000000-ffffff`
        await fetch(`https://api.cloudinary.com/v1_1/o6/image/upload?upload_preset=o6oooo&file=${encodeURIComponent(B.photo)}`).then(r => r.json()).then(async r => {
            // B.caption = r.public_id
            await db.add({ ll: req.location, pic: r.public_id }, req.from)
        })
        B.method = "sendphoto"
        //   B.caption = "ws.wwv.workers.dev/x?c=" + req.chat
        // B.reply_markup = {
        //     inline_keyboard: [
        //         [ {
        //             "text": "▶️",
        //             "switch_inline_query_current_chat": ""
        //         },{
        //             "text": "➖",
        //             "switch_inline_query_current_chat": "-"
        //         }, {
        //             "text": "➕",
        //             "switch_inline_query_current_chat": "+"
        //         }],[ {
        //             "text": "-",
        //              "callback_data": "-"
        //         }, {
        //             "text": "👁‍🗨",
        //             "url": "https://gre4a.4l.workers.dev"
        //         }]
        //     ]
        // }
    }
    if (req.type == "inline_query") {
        B = {
            method: "answerInlineQuery",
            //    switch_pm_text:"🚩"+ll,
            cache_time: 0,
            is_personal: true,
            //     switch_pm_parameter: ll,
            inline_query_id: req.id,
            results: [{
                'type': 'article',
                'id': 'ec',
                'title': 'Edison Chee on Medium',
                'description': 'UX Research. UI Design. Web Development',
                'thumb_url': 'http://edisonchee.com/img/favicon.ico',
                'input_message_content': {
                    'message_text': 'Featured article: [Rethinking top-level navigation labels](https://blog.gds-gov.tech/rethinking-top-level-navigation-labels-75c9759613af#.ke516y2qw)',
                    'parse_mode': 'Markdown',
                    'disable_web_page_preview': false
                }
            }, {
                'type': 'article',
                'id': 'gt',
                'title': 'Singapore GovTech Blog',
                'description': 'Be Happy, Be Awesome!',
                'thumb_url': 'https://cdn-images-1.medium.com/max/82/1*hB4KIovectkFlSXV3NhHUQ.png',
                'input_message_content': {
                    'message_text': 'View all posts: [GovTech Blog](https://blog.gds-gov.tech/)',
                    'parse_mode': 'Markdown',
                    'disable_web_page_preview': false
                }
            }]
        }
    }
    delete req.forward_from
    delete req.forward_date
    // if (B.method == "sendphoto") {
    //     B.caption = Object.values(v).join("\n")
    // }
    // else {
    //     B.text = Object.values(v).join("\n")
    // }
    if (!B.method) {
        B.parse_mode = 'HTML'
        B.method = "sendmessage"
        B.text = "<code>" + (Object.values(v).sort().join("\n")) + "</code>"
        if (v.pic) {
            B.photo = "https://res.cloudinary.com/o6/" + v.pic
            B.caption = B.text
            B.method == "sendphoto"
        }
        //"copy ```re```".push("```").unshift("```")
    }
    if (req.message_id) await fetch(`https://api.telegram.org/bot${TOKEN}/deleteMessage?chat_id=${req.chat}&message_id=${req.message_id}`)
}