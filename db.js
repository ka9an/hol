var { Database } = require('firebase-firestore-lite')
var D = new Database({ projectId: 'jiijii' })
var ref
var List = async x => {
    var results = await D.ref('!!').query({
        // where: [
        //     ['set', '==', X.set]
        // ],
        orderBy: { field: 'date', direction: 'desc' },
        limit: 50 // The max results
    }).run()
    results = JSON.parse(JSON.stringify(results))
    if (!x || !x.query || x.query != "+") results = results.filter(({ is }) => is>0)
      //  results = results.filter(({ set }) => set==X.set)
 if (!x) return results
    if (x === "-") return results
    if (x.query && (x.query === "-" || x.query === '\\')) return results.map(({ geo, cap, id, th, is, pic, url }, o) => ({
        type: 'photo',
        id: id,
        title: (1 + o) + " " + is,
        caption: [pic, "www.google.com/maps?q=" + geo, cap].join("\n"),
        thumb_url: url,
        photo_url: url,
        photo_height: 100
    })).slice(0, 49)
    return results.map(({ geo, cap, id, th, is, pic, url }, o) => ({
        type: 'article',
        id: id,
        title: (1 + o) + " " + is,
        description: [pic, "www.google.com/maps?q=" + geo, cap].join("\n"),
        thumb_url: th,
        input_message_content: {
            message_text: [pic, "www.google.com/maps?q=" + geo, cap].join("\n")
        },
    })).slice(0, 49)
}
var Get = async x => {
    return await D.ref('!/' + x).get().catch(r => { return {} }) //.then( r => r || 2)
}
var Del = async x => {
    return await D.ref('!!/' + x).delete().catch(r => { return {} }) //.then( r => r || 2)
}
var Put = async (x, z) => {

//if (z && x && z.from) return await D.ref(z.from + '/' + Date.now()).set(x)

    if (!z && x && x.id) return await D.ref(req.from + '/' + x.id).set(x)
    if (z) {
        ref = await D.ref('!/' + z)
        // ref = await D.ref('@/' + z)
        try {
            return await ref.update(x)
        } catch (err) {
            return await ref.set(x)
        }
    }
}
var Add = async (x, z) => {

    if (z) {
        ref = await D.ref('!/' + z)
        // ref = await D.ref('@/' + z)
        try {
            return await ref.update(x)
        } catch (err) {
            return await ref.set(x)
        }
    }
}
var db = function() {
    var del = async x => await Del(x)
    var get = async x => await Get(x)
    var list = async x => await List(x)
    var add = async (x, z) => await Add(x, z)
    var put = async (x, z) => await Put(x, z)
    return {
        del: del,
        put: put,
        add: add,
        list: list,
        get: get
    }
}()
module.exports = db