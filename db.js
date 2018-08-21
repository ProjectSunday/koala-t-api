const { MongoClient, ObjectID } = require('mongodb')

const DATABASE_NAME = process.env.DATABASE_NAME || 'koalat'
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/'



let _db;

const init = async () => {
	try {
		const client = await MongoClient.connect(DATABASE_URL + DATABASE_NAME, { useNewUrlParser: true })
		_db = client.db(DATABASE_NAME)
		console.log('Mongo server connected:', DATABASE_URL + DATABASE_NAME)
	} catch (err) {
		console.error('Unable to connect to mongo server.', err)
	}
}


// MongoClient.connect(DATABASE_URL + DATABASE_NAME, { useNewUrlParser: true },function (err, database) {
// 	if (err) {
// 		console.error('Unable to connect to mongo server.', err)
// 	} else {
// 		_db = database.db(DATABASE_NAME)
// 		console.log('Mongo server connected:', DATABASE_URL + DATABASE_NAME);
// 	}
// })

const create = async (collection, value) => {
	var r = await _db.collection(collection).insertOne(value)
	var i = await _db.collection(collection).find({ _id: r.insertedId }).toArray()
	return i[0]
}

const createMany = async (collection, docs) => {
	await _db.collection(collection).insertMany(docs)
}


const read = async (collection, filter) => {
	var r = await _db.collection(collection).find(filter).toArray()
	return r[0]
}

const readMany = async (collection, query, options) => {
	return await _db.collection(collection).find(query, options).toArray()
}


const Update = async (collection, filter, value) => {
	if (typeof collection !== 'string') throw 'DB.Update error: collection name must be a string'

	var doc = await _db.collection(collection).findOneAndUpdate(filter, { $set: value }, { upsert: true })

	if (doc.lastErrorObject.updatedExisting) {
		return (await _db.collection(collection).find({ _id: doc.value._id }).toArray())[0]
	}

	if (doc.value) {
		return doc.value
	} else {
		return (await _db.collection(collection).find({ _id: doc.lastErrorObject.upserted }).toArray())[0]
	}

}


const Delete = async (collection, filter) => {
	var r = await _db.collection(collection).deleteOne(filter)

	if (r.deletedCount === 1) {
		return { status: 'DELETE_SUCCESS' }
	} else {
		return { status: 'DELETE_FAIL' }
	}
}

const DeleteMany = async (collection, filter) => {
	var r = await _db.collection(collection).deleteMany(filter)
	if (r.result.ok === 1) {
		return { status: 'DELETE_SUCCESS' }
	} else {
		return { status: 'DELETE_FAIL' }
	}
}

module.exports = {init, create, createMany, Delete, DeleteMany, read, readMany, Update }

