import Datastore from 'nedb-promise';

export class Todo {
    constructor(title, description, importance, dueDate) {
        let now = new Date();

        this.title = title || '';
        this.creationDate = now;
        this.description = description || '';
        this.dueDate = dueDate || new Date(new Date(now).setMonth(now.getMonth()+1));
        this.importance = importance || 1;
        this.state = 'active';
    }
}

export class TodoStore {
    constructor(db) {
        this.db = db || new Datastore({
            filename: './data/todos.db',
            autoload: true
        });
    }

    // TODO: refactor params > req only
    async add (title, description, importance, dueDate) {
        let todo = new Todo(title, description, importance, dueDate);
        return await this.db.insert(todo);
    }

    async update (id, title, description, importance, dueDate, state) {
        return await this.db.update(
            { $set: {
                title: title,
                description: description,
                importance: importance,
                dueDate: dueDate,
                state: state
            }},
            { returnUpdatedDocs: true },
            function (err) {
                if (err){
                    return err;
                }
            }
        );
    }

    async delete(req) {
        return await this.db.remove({
            _id: req.params.id
        },{
            multi: false
        });
    }

    async get(currentUser, req) {
        return await this.db
            .findOne({
                _id: req.params.id
            });
    }

    async all(currentUser) {
        return await this.db.cfind()
            .sort({ creationDate: -1 })
            .exec();
    }
}

export const todoStore = new TodoStore();